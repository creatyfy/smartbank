import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, PlusSquare } from 'lucide-react';

interface InstallBankPromptProps {
  bankName: string;
  themeColor: string;
  logoUrl: string;
}

export function InstallBankPrompt({ bankName, themeColor, logoUrl }: InstallBankPromptProps) {
  const [isStandalone, setIsStandalone] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Verifica se já está instalado (rodando como app)
    const checkStandalone = () => {
      return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    };
    setIsStandalone(checkStandalone());
    
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream && !/android/i.test(ua));
    setIsAndroid(/android/i.test(ua));

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Dispara o prompt nativo do Android
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      // Fallback: Mostra o modal de instruções manuais
      setShowModal(true);
    }
  };

  // Se já estiver instalado, não mostra o banner
  if (isStandalone) return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between z-50 relative shadow-md"
      >
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt={bankName} className="w-8 h-8 rounded-md object-cover" />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">App do {bankName}</span>
            <span className="text-[10px] text-gray-300 leading-tight">Instale para notificações reais</span>
          </div>
        </div>
        <button 
          onClick={handleInstallClick}
          style={{ backgroundColor: themeColor }}
          className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm active:scale-95 transition-transform"
        >
          Instalar
        </button>
      </motion.div>

      {/* Modal de Instruções */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-end justify-center backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full rounded-t-[32px] p-6 pb-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <img src={logoUrl} alt={bankName} className="w-8 h-8 rounded-md" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isAndroid ? `Instalar ${bankName}` : `Instalar ${bankName}`}
                  </h3>
                </div>
                <button onClick={() => setShowModal(false)} className="p-1 bg-gray-100 rounded-full">
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
                        <p className="text-gray-500 text-xs mt-1">Procure o ícone na barra inferior do seu navegador.</p>
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
    </>
  );
}
