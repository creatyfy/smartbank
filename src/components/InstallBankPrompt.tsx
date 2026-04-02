import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, PlusSquare, MoreVertical } from 'lucide-react';

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
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Verifica se já está instalado (rodando como app standalone)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (standalone) {
      setIsStandalone(true);
      return;
    }
    setIsStandalone(false);

    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream);
    setIsAndroid(/Android/.test(ua));

    // Captura o evento beforeinstallprompt do Android/Chrome
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detecta quando o app foi instalado
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // iOS Safari: mostrar instruções manuais
      setShowModal(true);
    } else if (deferredPrompt) {
      // Android Chrome: usar prompt nativo do navegador
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsStandalone(true);
        }
        setDeferredPrompt(null);
      } catch {
        setShowModal(true);
      }
    } else {
      // Fallback: instruções manuais para Android
      setShowModal(true);
    }
  };

  // Não mostrar se já está instalado ou foi dispensado
  if (isStandalone || dismissed) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between z-50 relative shadow-md"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img src={logoUrl} alt={bankName} className="w-8 h-8 rounded-md object-cover shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold leading-tight truncate">App do {bankName}</span>
            <span className="text-[10px] text-gray-300 leading-tight">
              {deferredPrompt ? 'Toque para instalar' : 'Instale para notificações reais'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button
            onClick={handleInstallClick}
            style={{ backgroundColor: themeColor }}
            className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm active:scale-95 transition-transform flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Instalar
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
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
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full rounded-t-[32px] p-6 pb-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <img src={logoUrl} alt={bankName} className="w-8 h-8 rounded-md" />
                  <h3 className="text-xl font-bold text-gray-900">Instalar {bankName}</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="p-1 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {isIOS ? (
                /* Instruções para iOS (Safari) */
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Share className="w-5 h-5 text-[#007AFF]" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">1. Toque em Compartilhar</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Procure o ícone <span className="font-medium">⬆</span> na barra inferior do Safari.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <PlusSquare className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">2. Adicionar à Tela de Início</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Role para baixo e toque em <span className="font-medium">"Adicionar à Tela de Início"</span>.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">3. Confirme a instalação</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Toque em <span className="font-medium">"Adicionar"</span> no canto superior direito.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Instruções para Android (Chrome) */
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <MoreVertical className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">1. Abra o menu do Chrome</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Toque nos três pontos <span className="font-medium">⋮</span> no canto superior direito.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <PlusSquare className="w-5 h-5 text-[#007AFF]" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">2. Adicionar à tela inicial</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Selecione <span className="font-medium">"Adicionar à tela inicial"</span> ou{' '}
                        <span className="font-medium">"Instalar app"</span>.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">3. Confirme a instalação</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Toque em <span className="font-medium">"Instalar"</span> ou{' '}
                        <span className="font-medium">"Adicionar"</span> para confirmar.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
