import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useNubankApp } from '../context/NubankAppContext';
import { useNotification } from '../context/NotificationContext';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankTransferValue() {
  const navigate = useNavigate();
  const { balance } = useNubankApp();
  const { showNotification } = useNotification();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useThemeColor('#ffffff');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setAmount(rawValue);
  };

  const displayAmount = amount ? (parseFloat(amount) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00';
  const isValid = amount && parseFloat(amount) > 0;

  const handleNext = async () => {
    if (!isValid) return;
    
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    setIsLoading(true);

    const formattedAmount = `R$ ${displayAmount}`;
    const nubankIconUrl = "https://github.com/nubank.png";
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Título alterado para não repetir "Nubank de Nubank"
    const title = "Transferência recebida";
    const message = `Você recebeu uma transferência de ${formattedAmount} em ${formattedDate} às ${formattedTime}.`;

    setTimeout(() => {
      setIsLoading(false);
      
      showNotification({
        title: title,
        message: message,
        iconUrl: nubankIconUrl,
        targetUrl: '/nubank/statement'
      });

      if ('Notification' in window && Notification.permission === 'granted') {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, {
              body: message,
              icon: nubankIconUrl,
              badge: nubankIconUrl,
              vibrate: [200, 100, 200],
              tag: 'pix-received-nubank',
              requireInteraction: true
            });
          }).catch(err => console.warn('Erro no Service Worker:', err));
        } else {
          new Notification(title, { body: message, icon: nubankIconUrl });
        }
      }

      navigate('/nubank/dashboard');
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-[#8A05BE] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="px-5 pt-8 pb-4">
        <button onClick={() => navigate('/nubank/pix')} className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-7 h-7" />
        </button>
      </div>

      <div className="flex-1 px-6 pt-4 flex flex-col">
        <h1 className="text-[28px] font-medium text-gray-900 leading-tight mb-2">
          Qual é o valor da transferência?
        </h1>
        
        <p className="text-gray-500 text-[15px] mb-8">
          Saldo disponível em conta: R$ {balance}
        </p>

        <div className="flex items-center">
          <span className={`text-4xl font-medium mr-2 transition-colors ${isValid ? 'text-gray-900' : 'text-gray-300'}`}>
            R$
          </span>
          <div className="relative flex-1">
            <input 
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={displayAmount === '0,00' ? '' : displayAmount}
              onChange={handleAmountChange}
              className={`w-full text-4xl font-medium bg-transparent outline-none transition-colors ${isValid ? 'text-gray-900' : 'text-gray-300'}`}
              placeholder="0,00"
            />
          </div>
        </div>
      </div>

      <div className="p-6 flex justify-end">
        <button 
          onClick={handleNext}
          disabled={!isValid}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            isValid 
              ? 'bg-[#8A05BE] text-white hover:bg-[#7a04a8] active:scale-95 shadow-lg' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
