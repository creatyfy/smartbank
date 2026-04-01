import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Search, Bell, ChevronRight, LayoutGrid, Barcode, CreditCard, HelpCircle, Menu } from 'lucide-react';
import { useItau } from '../context/ItauContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { useBankManifest } from '../hooks/useBankManifest';
import { EditableText } from '../components/EditableText';
import { InstallBankPrompt } from '../components/InstallBankPrompt';

export default function ItauDashboard() {
  const navigate = useNavigate();
  const { balance, setBalance, userName, setUserName } = useItau();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  useThemeColor('#EC7000');
  useBankManifest('itau' as any);

  const quickActions = [
    { icon: <LayoutGrid className="w-6 h-6" />, label: "Pix", route: "/itau/pix" },
    { icon: <Barcode className="w-6 h-6" />, label: "Pagar", route: "/itau/dashboard" },
    { icon: <CreditCard className="w-6 h-6" />, label: "Cartões", route: "/itau/dashboard" },
    { icon: <HelpCircle className="w-6 h-6" />, label: "Ajuda", route: "/itau/dashboard" },
  ];

  return (
    <div className="w-full h-full bg-[#F4F5F7] flex flex-col font-sans overflow-hidden relative">
      <InstallBankPrompt 
        bankName="Itaú" 
        themeColor="#EC7000" 
        logoUrl="https://images.dualite.app/d52f60de-2692-4885-8c36-cb03ccdd56d7/asset-cf457b12-f8ae-4fc5-9b06-93bc68304e05.webp" 
      />

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Header Laranja */}
        <div className="bg-[#EC7000] px-5 pt-6 pb-16 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard')} className="p-1 -ml-2 text-white">
                <Menu className="w-7 h-7" />
              </button>
              <span className="text-white font-medium text-lg">
                Olá, <EditableText value={userName} onChange={setUserName} inputClassName="text-white border-white/50" />
              </span>
            </div>
            <div className="flex gap-4">
              <Search className="w-6 h-6 text-white" />
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Card de Saldo */}
        <div className="px-4 -mt-10 relative z-10">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-sm font-medium">Saldo em conta corrente</span>
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
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 cursor-pointer">
              <span className="text-[#004990] font-medium text-sm">Ver extrato</span>
              <ChevronRight className="w-5 h-5 text-[#004990]" />
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {quickActions.map((action, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(action.route)}
                className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-[#EC7000]">
                  {action.icon}
                </div>
                <span className="text-xs text-gray-700 font-medium text-center">
                  {action.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
