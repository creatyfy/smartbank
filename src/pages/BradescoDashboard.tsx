import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, Eye, EyeOff, ChevronRight, 
  Grid, Barcode, CreditCard, Landmark, 
  Smartphone, ShieldCheck, Menu, User
} from 'lucide-react';
import { useBradesco } from '../context/BradescoContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { useBankManifest } from '../hooks/useBankManifest';
import { EditableText } from '../components/EditableText';
import { InstallBankPrompt } from '../components/InstallBankPrompt';
import { BradescoNotification } from '../components/BradescoNotification';

export default function BradescoDashboard() {
  const navigate = useNavigate();
  const { 
    balance, setBalance, userName, setUserName, 
    isBalanceVisible, setIsBalanceVisible,
    notificationVisible, notificationMessage, hideNotification
  } = useBradesco();

  useThemeColor('#cc092f');
  useBankManifest('bradesco' as any);

  const actions = [
    { icon: <Landmark className="w-6 h-6" />, label: "Pix", route: "/bradesco/pix" },
    { icon: <Barcode className="w-6 h-6" />, label: "Pagamentos", route: "/bradesco/dashboard" },
    { icon: <CreditCard className="w-6 h-6" />, label: "Cartões", route: "/bradesco/dashboard" },
    { icon: <Smartphone className="w-6 h-6" />, label: "Recarga", route: "/bradesco/dashboard" },
    { icon: <ShieldCheck className="w-6 h-6" />, label: "Seguros", route: "/bradesco/dashboard" },
    { icon: <Grid className="w-6 h-6" />, label: "Ver mais", route: "/bradesco/dashboard" },
  ];

  return (
    <div className="w-full h-full bg-[#f4f4f4] flex flex-col font-sans overflow-hidden relative">
      <BradescoNotification 
        isVisible={notificationVisible} 
        message={notificationMessage} 
        onClose={hideNotification} 
      />

      <InstallBankPrompt 
        bankName="Bradesco" 
        themeColor="#cc092f" 
        logoUrl="https://www.google.com/s2/favicons?domain=bradesco.com.br&sz=256" 
      />

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Header Vermelho */}
        <div className="bg-[#cc092f] px-5 pt-6 pb-12 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard')} className="p-1 -ml-2 text-white">
                <Menu className="w-7 h-7" />
              </button>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <p className="text-[10px] opacity-80 uppercase font-bold tracking-wider">Olá,</p>
                <p className="font-bold text-lg">
                  <EditableText value={userName} onChange={setUserName} inputClassName="text-white border-white/50" />
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Search className="w-6 h-6 text-white" />
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Card de Saldo */}
        <div className="px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-sm font-bold uppercase tracking-tight">Saldo em conta</span>
              <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
                {isBalanceVisible ? <Eye className="w-5 h-5 text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-900 font-bold text-xl">R$</span>
              {isBalanceVisible ? (
                <span className="text-gray-900 font-bold text-3xl">
                  <EditableText value={balance} onChange={setBalance} inputClassName="font-bold text-3xl w-32" />
                </span>
              ) : (
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 cursor-pointer">
              <span className="text-[#cc092f] font-bold text-sm uppercase">Ver extrato</span>
              <ChevronRight className="w-5 h-5 text-[#cc092f]" />
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-3 gap-3">
            {actions.map((action, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(action.route)}
                className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center gap-3 cursor-pointer active:scale-95 transition-transform border border-gray-50"
              >
                <div className="text-[#cc092f]">
                  {action.icon}
                </div>
                <span className="text-[11px] text-gray-700 font-bold uppercase text-center leading-tight">
                  {action.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 mt-6 mb-6">
          <div className="bg-[#cc092f] rounded-xl p-5 text-white flex justify-between items-center shadow-md">
            <div>
              <h3 className="font-bold text-lg leading-tight">Crédito<br/>Imobiliário</h3>
              <p className="text-xs opacity-80 mt-1">Realize o sonho da casa própria.</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bradesco Style */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 pb-8">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-[#cc092f] rounded-full flex items-center justify-center shadow-lg -mt-8 border-4 border-white">
            <Grid className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold text-[#cc092f] uppercase">Menu</span>
        </div>
      </div>
    </div>
  );
}
