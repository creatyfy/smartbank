import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, Eye, EyeOff, ChevronRight, 
  LayoutGrid, Barcode, Smartphone, CreditCard, 
  Send, PlusCircle
} from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';
import { useBankManifest } from '../hooks/useBankManifest';
import { InstallBankPrompt } from '../components/InstallBankPrompt';
import { MPBottomNav } from '../components/MPBottomNav';
import { useMPBank } from '../context/MPBankContext';
import { EditableText } from '../components/EditableText';

export function MPDashboard() {
  const navigate = useNavigate();
  const { balance, setBalance, userName, setUserName } = useMPBank();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  
  useThemeColor('#009EE3');
  useBankManifest('mercadopago');

  const quickActions = [
    { icon: <LayoutGrid className="w-6 h-6" />, label: "Pix", route: "/mp/pix" },
    { icon: <Barcode className="w-6 h-6" />, label: "Pagar", route: "/mp/payments" },
    { icon: <Send className="w-6 h-6" />, label: "Transferir", route: "/mp/pix" },
    { icon: <PlusCircle className="w-6 h-6" />, label: "Cobrar", route: "/mp/more" },
    { icon: <Smartphone className="w-6 h-6" />, label: "Recarregar", route: "/mp/more" },
    { icon: <CreditCard className="w-6 h-6" />, label: "Cartões", route: "/mp/more" },
  ];

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col font-sans overflow-hidden relative">
      <InstallBankPrompt 
        bankName="Mercado Pago" 
        themeColor="#009EE3" 
        logoUrl="https://www.google.com/s2/favicons?domain=mercadopago.com.br&sz=256" 
      />

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Header Azul */}
        <div className="bg-[#009EE3] px-4 pt-6 pb-16 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">
                <p className="opacity-80">Olá,</p>
                <p className="font-bold"><EditableText value={userName} onChange={setUserName} inputClassName="text-white border-white/50" /></p>
              </div>
            </div>
            <div className="flex gap-4">
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Card Principal */}
        <div className="px-4 -mt-10 relative z-10">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm font-medium">Disponível</span>
              <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
                {isBalanceVisible ? <Eye className="w-5 h-5 text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-900 font-bold text-2xl">R$</span>
              {isBalanceVisible ? (
                <span className="text-gray-900 font-bold text-3xl">
                  <EditableText value={balance} onChange={setBalance} inputClassName="font-bold text-3xl w-32" />
                </span>
              ) : (
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-50 text-[#009EE3] font-semibold py-2.5 rounded-lg text-sm">
                Render meu dinheiro
              </button>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-3 gap-y-6 gap-x-4">
            {quickActions.map((action, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(action.route)}
                className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-[#009EE3]">
                  {action.icon}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center">
                  {action.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 mt-8 mb-6">
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#009EE3]" />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm">Cartão Mercado Pago</h3>
                <p className="text-gray-500 text-xs">Peça o seu grátis agora</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <MPBottomNav />
    </div>
  );
}
