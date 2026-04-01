import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Landmark, Copy, QrCode, ArrowRight } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';
import { useNotification } from '../context/NotificationContext';

export function InterPixFlow() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');
  const { showNotification } = useNotification();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setAmount(rawValue);
  };

  const displayAmount = amount ? (parseFloat(amount) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '';
  const isValid = amount && parseFloat(amount) > 0;

  const handleTransfer = async () => {
    // Pede permissão para notificação antes de processar
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    setIsLoading(true);
    const formattedAmount = `R$ ${displayAmount}`;
    const interIconUrl = "https://www.google.com/s2/favicons?domain=bancointer.com.br&sz=256";
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const title = "Pix Recebido ✓";
    const message = `Você recebeu um Pix de ${formattedAmount} em ${formattedDate} às ${formattedTime}.`;

    setTimeout(() => {
      setIsLoading(false);
      
      showNotification({
        title: title,
        message: message,
        iconUrl: interIconUrl,
        targetUrl: '/inter/extrato'
      });

      // Disparo da notificação nativa garantido
      if ('Notification' in window && Notification.permission === 'granted') {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, {
              body: message,
              icon: interIconUrl,
              badge: interIconUrl,
              vibrate: [200, 100, 200],
              tag: 'pix-received-inter',
              requireInteraction: true
            });
          }).catch(e => console.warn('Erro SW:', e));
        } else {
          new Notification(title, { body: message, icon: interIconUrl });
        }
      }

      navigate('/inter/home');
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Pix</h1>
      </div>

      <div className="flex-1 px-5 pt-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-gray-600 text-sm font-medium mb-2">Qual valor você quer transferir?</h2>
          <div className="flex items-center border-b-2 border-[#FF7A00] py-2">
            <span className="text-3xl font-bold text-gray-900 mr-2">R$</span>
            <input 
              type="text"
              inputMode="numeric"
              value={displayAmount}
              onChange={handleAmountChange}
              placeholder="0,00"
              className="w-full text-3xl font-bold text-gray-900 outline-none bg-transparent"
            />
          </div>
        </div>

        <button 
          disabled={!isValid}
          onClick={handleTransfer}
          className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-between px-6 transition-colors mb-8 ${
            isValid ? 'bg-[#FF7A00] hover:bg-[#e66e00]' : 'bg-gray-300'
          }`}
        >
          <span>Continuar</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <h3 className="font-bold text-gray-900 mb-4">Outras opções</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <Copy className="w-6 h-6 text-[#FF7A00]" />
            <span className="font-medium text-gray-900">Pix Copia e Cola</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <QrCode className="w-6 h-6 text-[#FF7A00]" />
            <span className="font-medium text-gray-900">Ler QR Code</span>
          </div>
        </div>
      </div>
    </div>
  );
}
