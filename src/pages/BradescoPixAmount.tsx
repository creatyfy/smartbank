import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';
import { useBradesco } from '../context/BradescoContext';

export default function BradescoPixAmount() {
  const navigate = useNavigate();
  const { balance, showNotification } = useBradesco();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useThemeColor('#ffffff');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setAmount(rawValue);
  };

  const displayAmount = amount ? (parseFloat(amount) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '';
  const isValid = amount && parseFloat(amount) > 0;

  const handleContinue = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    setIsLoading(true);
    
    const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const formattedAmount = `R$ ${displayAmount || '0,00'}`;
    const bradescoIcon = "https://www.google.com/s2/favicons?domain=bradesco.com.br&sz=256";

    setTimeout(() => {
      setIsLoading(false);
      
      const title = "Pix recebido";
      const message = `Você recebeu um Pix de ${formattedAmount} em ${data} às ${hora}.`;

      // Notificação interna do Bradesco (usando strings separadas conforme solicitado)
      showNotification(title, message);

      // Notificação nativa (OS)
      const sendNativeNotification = async () => {
        if ('Notification' in window && Notification.permission === 'granted') {
          try {
            if ('serviceWorker' in navigator) {
              const reg = await navigator.serviceWorker.ready;
              reg.showNotification(title, {
                body: message,
                icon: bradescoIcon,
                badge: bradescoIcon,
                vibrate: [200, 100, 200],
                tag: "bradesco-pix",
                requireInteraction: true
              });
            } else {
              new Notification(title, { body: message, icon: bradescoIcon });
            }
          } catch(e) {
            console.log('Erro ao enviar notificação nativa');
          }
        }
      };
      sendNativeNotification();

      navigate('/bradesco/dashboard');
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-[#cc092f] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/bradesco/pix')} className="p-2 -ml-2 text-[#cc092f]">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Valor</h1>
      </div>

      <div className="flex-1 px-5 pt-8 overflow-y-auto">
        <h2 className="text-gray-900 text-xl font-bold mb-2">Qual o valor do Pix?</h2>
        <p className="text-gray-500 text-sm mb-8">Saldo disponível: R$ {balance}</p>

        <div className="flex items-center border-b-2 border-[#cc092f] py-2 mb-8">
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

      <div className="p-4 bg-white border-t border-gray-100 pb-8">
        <button 
          disabled={!isValid}
          onClick={handleContinue}
          className={`w-full font-bold py-4 rounded-xl active:scale-95 transition-all ${
            isValid ? 'bg-[#cc092f] text-white shadow-lg' : 'bg-gray-200 text-gray-400'
          }`}
        >
          <span>CONTINUAR</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
