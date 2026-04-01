import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, EyeOff, Flame } from 'lucide-react';
import { EditableField } from '../components/EditableField';
import { useNotification } from '../context/NotificationContext';
import { supabase } from '../lib/supabase';

export function SantanderPaymentMethod() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const amountValue = location.state?.amountValue || "0,01";
  const formattedAmount = `R$ ${amountValue}`;

  const [accountInfo, setAccountInfo] = useState("Conta corrente 01004002-1");
  const [balance, setBalance] = useState("Saldo: R$ 1.250,00");
  const [balanceLimit, setBalanceLimit] = useState("Saldo + Limite: R$ 2.250,00");

  const bankIconUrl = "https://www.google.com/s2/favicons?domain=santander.com.br&sz=256";

  const sendRealNotification = async (title: string, body: string) => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification(title, {
            body: body,
            icon: bankIconUrl,
            badge: bankIconUrl,
            vibrate: [200, 100, 200],
            tag: 'pix-received-santander',
            requireInteraction: true
          });
        } else {
          new Notification(title, {
            body: body,
            icon: bankIconUrl,
          });
        }
      } catch (e) {
        console.warn('Erro ao disparar notificação nativa via Service Worker:', e);
      }
    }
  };

  const handleContinue = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    setIsLoading(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Título alterado para não repetir "Santander de Santander"
    const notificationTitle = "Pix recebido";
    const notificationBody = `Você recebeu uma transferência de ${formattedAmount} em ${formattedDate} às ${formattedTime}.`;

    try {
      await supabase.from('transactions').insert({
        amount: formattedAmount,
        receiver_name: "I9plex Tecnologia",
        receiver_cnpj: "44.*******/0001-2*",
        type: "pix_received"
      }).select();
    } catch (err) {
      console.warn('Modo offline: transação não salva no banco de dados.', err);
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');

      setTimeout(() => {
        showNotification({
          title: notificationTitle,
          message: notificationBody,
          iconUrl: bankIconUrl,
          targetUrl: `/santander/receipt?amount=${encodeURIComponent(formattedAmount)}`
        });

        sendRealNotification(notificationTitle, notificationBody);
      }, 500);

    }, 2000);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-[#EC0000] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium animate-pulse">Processando pagamento...</p>
        </div>
      )}

      <div className="bg-[#EC0000] px-4 pt-2 pb-4 flex items-center justify-between relative shadow-sm z-10">
        <button 
          onClick={() => navigate('/santander/pix/transfer')} 
          className="p-1 -ml-2"
          disabled={isLoading}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg">Forma de pagamento</h1>
        <button className="p-1">
            <EyeOff className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex-1 px-5 pt-6">
        <h2 className="text-[22px] text-gray-900 font-normal mb-4 leading-tight">
          Como você quer pagar?
        </h2>
        
        <p className="text-gray-900 text-[17px] mb-4">
          Principais formas de pagamento
        </p>

        <div className="border border-gray-300 rounded-[4px] p-4 relative">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-[#EC0000] fill-[#EC0000]" />
              <span className="font-bold text-gray-900 text-base">Saldo em conta</span>
            </div>
            
            <div className="w-6 h-6 rounded-full border-[2px] border-[#EC0000] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#EC0000]"></div>
            </div>
          </div>

          <div className="pl-9 flex flex-col gap-1">
            <div className="text-gray-600 text-[15px]">
              <EditableField 
                value={accountInfo} 
                onChange={setAccountInfo}
                className="hover:bg-gray-50"
                inputClassName="w-full"
              />
            </div>
            <div className="text-gray-600 text-[15px]">
              <EditableField 
                value={balance} 
                onChange={setBalance}
                className="hover:bg-gray-50"
                inputClassName="w-full"
              />
            </div>
            <div className="text-gray-600 text-[15px]">
              <EditableField 
                value={balanceLimit} 
                onChange={setBalanceLimit}
                className="hover:bg-gray-50"
                inputClassName="w-full"
              />
            </div>
          </div>
        </div>

        <button className="mt-6 text-[#EC0000] font-medium text-[15px] underline decoration-1 underline-offset-2">
          Mais opções
        </button>
      </div>

      <div className="p-4 pb-6 bg-white">
        <button 
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full bg-[#EC0000] hover:bg-[#d00000] text-white font-medium text-lg py-3 rounded-[4px] transition-colors shadow-sm disabled:opacity-70"
        >
          Continuar para revisão
        </button>
      </div>
    </div>
  );
}
