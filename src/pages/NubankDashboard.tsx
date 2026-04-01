import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Eye, EyeOff, HelpCircle, UserPlus, 
  ChevronRight, CreditCard, Smartphone, 
  Landmark, Receipt, HandCoins, ShoppingBag
} from 'lucide-react';
import { useNubankApp } from '../context/NubankAppContext';
import { EditableText } from '../components/EditableText';
import { useThemeColor } from '../hooks/useThemeColor';
import { useBankManifest } from '../hooks/useBankManifest';
import { InstallBankPrompt } from '../components/InstallBankPrompt';

export function NubankDashboard() {
  const navigate = useNavigate();
  const { isBalanceVisible, toggleBalance, balance, setBalance, userName, setUserName } = useNubankApp();
  
  useThemeColor('#8A05BE');
  useBankManifest('nubank'); // Transforma a identidade do site em Nubank

  const actionButtons = [
    { icon: <Landmark className="w-6 h-6" />, label: "Área Pix", route: "/nubank/pix" },
    { icon: <Receipt className="w-6 h-6" />, label: "Pagar", route: "/nubank/payment" },
    { icon: <HandCoins className="w-6 h-6" />, label: "Pegar emprestado", route: "/nubank/loan" },
    { icon: <Smartphone className="w-6 h-6" />, label: "Recarga de celular", route: "/nubank/recharge" },
    { icon: <CreditCard className="w-6 h-6" />, label: "Meus cartões", route: "/nubank/cards" },
    { icon: <ShoppingBag className="w-6 h-6" />, label: "Shopping", route: "/nubank/shopping" },
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans overflow-hidden">
      {/* Banner de Instalação (Só aparece se não estiver instalado) */}
      <InstallBankPrompt 
        bankName="Nubank" 
        themeColor="#8A05BE" 
        logoUrl="https://github.com/nubank.png" 
      />

      {/* Header Roxo */}
      <div className="bg-[#8A05BE] px-5 pt-8 pb-6 flex flex-col text-white">
        <div className="flex justify-between items-start mb-8">
          <button onClick={() => navigate('/nubank/profile')} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <User className="w-6 h-6" />
          </button>
          <div className="flex gap-4">
            <button onClick={toggleBalance} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              {isBalanceVisible ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
            </button>
            <button onClick={() => navigate('/nubank/help')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <HelpCircle className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <UserPlus className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="text-lg font-medium">
          Olá, <EditableText value={userName} onChange={setUserName} inputClassName="text-white border-white/50" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
        {/* Conta */}
        <div className="px-5 py-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/nubank/statement')}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Conta</h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-[22px] font-semibold text-gray-900">
            {isBalanceVisible ? (
              <div className="flex items-center">
                R$ <EditableText value={balance} onChange={setBalance} className="ml-1" inputClassName="text-gray-900 font-semibold" />
              </div>
            ) : (
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mt-1"></div>
            )}
          </div>
        </div>

        {/* Menu Horizontal */}
        <div className="flex gap-4 px-5 py-6 overflow-x-auto no-scrollbar border-b border-gray-100">
          {actionButtons.map((btn, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 min-w-[72px]" onClick={() => navigate(btn.route)}>
              <div className="w-[72px] h-[72px] bg-gray-100 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer">
                {btn.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 text-center leading-tight">
                {btn.label}
              </span>
            </div>
          ))}
        </div>

        {/* Meus Cartões */}
        <div className="px-5 py-6 border-b border-gray-100">
          <div 
            onClick={() => navigate('/nubank/cards')}
            className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <CreditCard className="w-6 h-6 text-gray-900" />
            <span className="text-sm font-medium text-gray-900">Meus cartões</span>
          </div>
        </div>

        {/* Cartão de Crédito */}
        <div className="px-5 py-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Cartão de crédito</h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mb-2">Fatura atual</p>
          <div className="text-[22px] font-semibold text-gray-900 mb-2">
            {isBalanceVisible ? "R$ 450,00" : <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mt-1"></div>}
          </div>
          <p className="text-sm text-gray-500">Limite disponível de R$ 4.550,00</p>
        </div>
      </div>
    </div>
  );
}
