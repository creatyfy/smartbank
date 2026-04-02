import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Download, Share, PlusSquare, X, AlertCircle } from 'lucide-react';
import { assets } from '../data/assets';
import { supabase } from '../lib/supabase';
import { useBankManifest } from '../hooks/useBankManifest';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bankParam = searchParams.get('bank');
  
  const initialBank = (['santander', 'nubank', 'inter', 'mercadopago', 'itau', 'bradesco'].includes(bankParam || '')) ? bankParam : 'smartbank';
  useBankManifest(initialBank as any);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  
  const [isIOS] = useState(() => {
    const ua = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream && !/android/i.test(ua);
  });
  const [isAndroid] = useState(() => /android/i.test(navigator.userAgent));
  
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const getTargetRoute = () => {
    if (bankParam === 'santander') return '/santander';
    if (bankParam === 'nubank') return '/nubank/dashboard';
    if (bankParam === 'inter') return '/inter/home';
    if (bankParam === 'mercadopago') return '/mp/dashboard';
    if (bankParam === 'itau') return '/itau/dashboard';
    if (bankParam === 'bradesco') return '/bradesco/dashboard';
    return '/dashboard';
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await handlePostLogin(session.user.id);
        }
      } catch (err) {
        // Silencioso
      }
    };
    checkSession();

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handlePostLogin = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('is_admin, is_blocked, access_expires_at')
        .eq('id', userId)
        .single();

      if (profileError || !profile) {
        setError('Acesso não autorizado. Entre em contato com o suporte.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (profile.is_blocked) {
        setError('Sua conta foi bloqueada pelo administrador.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (profile.access_expires_at && new Date(profile.access_expires_at) < new Date()) {
        setError('Seu tempo de acesso expirou. Entre em contato com o suporte.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (profile.is_admin) {
        navigate('/admin');
      } else {
        navigate(getTargetRoute());
      }
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError('Bloqueio de rede. Clique em "Publish" no topo da tela para testar.');
      } else {
        setError('Erro ao verificar perfil. Tente novamente.');
      }
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('E-mail ou senha incorretos.');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('E-mail não confirmado. Verifique seu e-mail ou peça ao admin para desativar a confirmação.');
        } else if (signInError.message === 'Failed to fetch') {
          setError('Bloqueio de rede. Clique em "Publish" no topo da tela para testar.');
        } else {
          setError(`Erro: ${signInError.message}`);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        await handlePostLogin(data.session.user.id);
      }
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError('Bloqueio de rede. Clique em "Publish" no topo da tela para testar.');
      } else {
        setError('Sem conexão com o servidor. Tente novamente.');
      }
      setLoading(false);
    }
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Dispara o prompt nativo do Android
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      // Fallback: Mostra o modal de instruções manuais
      setShowInstallModal(true);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-8 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-10"
      >
        <div className="w-[280px] h-auto mb-4">
          <img src={assets.logo} alt="Smartbank Logo" className="w-full h-full object-contain" />
        </div>
        <p className="text-gray-500 text-sm font-medium">O banco inteligente para você</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        onSubmit={handleLogin}
        className="w-full space-y-4"
      >
        <div className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#D9385E] focus:ring-2 focus:ring-rose-100 transition-all"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#D9385E] focus:ring-2 focus:ring-rose-100 transition-all"
              required
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-rose-600 text-sm font-medium px-1"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D9385E] hover:bg-[#c02e4d] text-white font-semibold rounded-2xl py-4 mt-2 shadow-lg shadow-rose-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Entrar
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </motion.form>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={handleInstallClick}
        className={`absolute bottom-10 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 font-medium text-sm hover:bg-gray-200 transition-colors active:scale-95 ${!isIOS && !isAndroid ? 'hidden' : ''}`}
      >
        <Download className="w-4 h-4" />
        Baixar App
      </motion.button>

      <AnimatePresence>
        {showInstallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm"
            onClick={() => setShowInstallModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white w-full rounded-t-[32px] p-6 pb-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {isAndroid ? 'Instalar no Android' : 'Instalar no iPhone'}
                </h3>
                <button onClick={() => setShowInstallModal(false)} className="p-1 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-6">
                {isAndroid ? (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-lg font-bold">⋮</div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">1. Toque nos 3 pontinhos</p>
                        <p className="text-gray-500 text-xs mt-1">No canto superior direito do Chrome.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <PlusSquare className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">2. "Adicionar à tela inicial"</p>
                        <p className="text-gray-500 text-xs mt-1">Role o menu para baixo e toque nessa opção.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <Share className="w-5 h-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">1. Toque em Compartilhar</p>
                        <p className="text-gray-500 text-xs mt-1">Procure o ícone na barra inferior do navegador.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <PlusSquare className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">2. Adicionar à Tela de Início</p>
                        <p className="text-gray-500 text-xs mt-1">Role para baixo nas opções e selecione esta opção para instalar o app.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
