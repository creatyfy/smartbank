import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, Eye, EyeOff, ChevronRight, 
  LayoutGrid, Barcode, CreditCard, Shield, 
  Smartphone, Umbrella, Plane, MoreHorizontal, User
} from 'lucide-react';
import { useInterBalance } from '../context/InterBalanceContext';
import { EditableText } from '../components/EditableText';
import { useThemeColor } from '../hooks/useThemeColor';
import { useBankManifest } from '../hooks/useBankManifest';
import { InstallBankPrompt } from '../components/InstallBankPrompt';
import { InterBottomNav } from '../components/InterBottomNav';

export function InterDashboard() {
  const navigate = useNavigate();
  const { balance, setBalance } = useInterBalance();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  
  useThemeColor('#FF7A00');
  useBankManifest('inter' as any);

  const quickActions = [
    { icon: <LayoutGrid className="w-6 h-6" />, label: "Pix", route: "/inter/pix" },
    { icon: <Barcode className="w-6 h-6" />, label: "Pagar", route: "/inter/payment" },
    { icon: <CreditCard className="w-6 h-6" />, label: "Cartões", route: "/inter/cards" },
    { icon: <Shield className="w-6 h-6" />, label: "Seguros", route: "/inter/feature/seguros" },
    { icon: <Smartphone className="w-6 h-6" />, label: "Recarga", route: "/inter/feature/recarga" },
    { icon: <Umbrella className="w-6 h-6" />, label: "Empréstimo", route: "/inter/emprestimo/pessoal" },
    { icon: <Plane className="w-6 h-6" />, label: "Viagens", route: "/inter/viagens" },
    { icon: <MoreHorizontal className="w-6 h-6" />, label: "Ver todos", route: "/inter/todos-os-servicos" },
  ];

  return (
    <div className="w-full h-full bg-[#F5F6FA] flex flex-col font-sans overflow-hidden relative">
      <InstallBankPrompt 
        bankName="Inter" 
        themeColor="#FF7A00" 
        logoUrl="https://www.google.com/s2/favicons?domain=bancointer.com.br&sz=256" 
      />

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Header Laranja */}
        <div className="bg-[#FF7A00] px-5 pt-6 pb-20 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/inter/perfil')}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
              >
                <User className="w-6 h-6 text-white" />
              </button>
              <span className="text-white font-bold text-xl">inter</span>
            </div>
            <div className="flex gap-4">
              <Search className="w-6 h-6 text-white" />
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Card Principal (Sobreposto ao Header) */}
        <div className="px-4 -mt-14 relative z-10">
          <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold text-lg">R$</span>
                {isBalanceVisible ? (
                  <span className="text-gray-900 font-bold text-2xl">
                    <EditableText value={balance} onChange={setBalance} inputClassName="font-bold text-2xl w-24" />
                  </span>
                ) : (
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                )}
              </div>
              <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
                {isBalanceVisible ? <Eye className="w-6 h-6 text-gray-400" /> : <EyeOff className="w-6 h-6 text-gray-400" />}
              </button>
            </div>
            
            <div 
              onClick={() => navigate('/inter/extrato')}
              className="flex items-center justify-between mt-4 py-3 border-t border-gray-100 cursor-pointer"
            >
              <span className="text-[#FF7A00] font-medium text-sm">Ver extrato</span>
              <ChevronRight className="w-5 h-5 text-[#FF7A00]" />
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
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#FF7A00]">
                  {action.icon}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center leading-tight">
                  {action.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 mt-8 mb-6">
          <div className="w-full h-24 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Inter Black</h3>
              <p className="text-gray-300 text-xs">Descubra as vantagens exclusivas.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <InterBottomNav />
    </div>
  );
}
