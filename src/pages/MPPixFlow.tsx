import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Copy, QrCode } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';
import { useNotification } from '../context/NotificationContext';
import { useMPBank } from '../context/MPBankContext';

export function MPPixFlow() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');
  const { showNotification } = useNotification();
  const { notificationTitle, notificationBody, addTransaction } = useMPBank();
  
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setAmount(rawValue);
  };

  const displayAmount = amount ? (parseFloat(amount) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '';
  const isValid = amount && parseFloat(amount) > 0;

  const handleTransfer = async () => {
    // CORREÇÃO: Pede permissão para notificação antes de processar
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    setIsLoading(true);
    const formattedAmount = `R$ ${displayAmount}`;
    const mpIconUrl = "https://www.google.com/s2/favicons?domain=mercadopago.com.br&sz=256";
    
    const message = notificationBody.replace('{amount}', displayAmount);

    setTimeout(() => {
      setIsLoading(false);
      
      addTransaction({
        type: 'in',
        title: 'Transferência recebida',
        amount: formattedAmount
      });
      
      showNotification({
        title: notificationTitle,
        message: message,
        iconUrl: mpIconUrl,
        targetUrl: '/mp/dashboard'
      });

      // CORREÇÃO: Disparo da notificação nativa garantido
      if ('Notification' in window && Notification.permission === 'granted') {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(notificationTitle, {
              body: message,
              icon: mpIconUrl,
              badge: mpIconUrl,
              vibrate: [200, 100, 200],
              tag: 'pix-received-mp',
              requireInteraction: true
            });
          }).catch(e => console.warn('Erro SW:', e));
        } else {
          new Notification(notificationTitle, { body: message, icon: mpIconUrl });
        }
      }

      navigate('/mp/dashboard');
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-[#009EE3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/mp/dashboard')} className="p-2 -ml-2 text-[#009EE3]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Transferir</h1>
      </div>

      <div className="flex-1 px-5 pt-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-gray-900 text-xl font-bold mb-6">Qual valor você quer transferir?</h2>
          <div className="flex items-center border-b-2 border-[#009EE3] py-2">
            <span className="text-4xl font-bold text-gray-900 mr-2">R$</span>
            <input 
              type="text"
              inputMode="numeric"
              value={displayAmount}
              onChange={handleAmountChange}
              placeholder="0,00"
              className="w-full text-4xl font-bold text-gray-900 outline-none bg-transparent"
            />
          </div>
        </div>

        <button 
          disabled={!isValid}
          onClick={handleTransfer}
          className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center transition-colors mb-8 ${
            isValid ? 'bg-[#009EE3] hover:bg-[#0088c4]' : 'bg-gray-300'
          }`}
        >
          Continuar
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer">
            <Copy className="w-6 h-6 text-[#009EE3]" />
            <span className="font-medium text-gray-900">Pix Copia e Cola</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer">
            <QrCode className="w-6 h-6 text-[#009EE3]" />
            <span className="font-medium text-gray-900">Ler QR Code</span>
          </div>
        </div>
      </div>
    </div>
  );
}
