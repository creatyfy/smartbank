import React, { useState } from 'react';
import { 
  Menu, Search, EyeOff, Bell, Info, LayoutGrid, 
  HandCoins, Clover, MoreHorizontal, Home, QrCode, 
  CreditCard, MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EditableField } from '../components/EditableField';
import { useBankManifest } from '../hooks/useBankManifest';
import { InstallBankPrompt } from '../components/InstallBankPrompt';

export function SantanderHome() {
  const navigate = useNavigate();
  useBankManifest('santander'); // Transforma a identidade do site em Santander

  const [balanceLabel, setBalanceLabel] = useState("Saldo Total");
  const [balanceValue, setBalanceValue] = useState("R$ 0,39");
  const [balanceLimitInfo, setBalanceLimitInfo] = useState("Saldo + limite R$ 0,39");

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col relative overflow-hidden font-sans">
      
      {/* Banner de Instalação (Só aparece se não estiver instalado) */}
      <InstallBankPrompt 
        bankName="Santander" 
        themeColor="#EC0000" 
        logoUrl="https://www.google.com/s2/favicons?domain=santander.com.br&sz=256" 
      />

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Red Header Section */}
        <div className="bg-[#EC0000] text-white pb-6 rounded-b-[2rem] shadow-lg relative z-10">
          <div className="flex justify-between items-center px-4 pt-4 pb-2">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard')} className="p-1">
                <Menu className="w-7 h-7" />
              </button>
              <span className="font-bold text-xl tracking-tight">Santander</span>
            </div>
            <div className="flex items-center gap-5">
              <Search className="w-6 h-6" />
              <EyeOff className="w-6 h-6" />
              <Bell className="w-6 h-6" />
            </div>
          </div>

          <div className="flex px-4 mt-4 border-b border-white/20">
            <div className="flex-1 text-center pb-3 border-b-2 border-white font-medium text-base">
              Santander
            </div>
            <div className="flex-1 text-center pb-3 text-white/70 font-medium text-base">
              Outros Bancos
            </div>
          </div>

          <div className="flex flex-col items-center mt-8 mb-6">
            <div className="flex items-center gap-2 text-sm font-light mb-1">
              <EditableField value={balanceLabel} onChange={setBalanceLabel} className="hover:bg-white/10" inputClassName="border-white/50 text-white" />
              <Info className="w-4 h-4" />
            </div>
            <div className="text-4xl font-bold mb-1 flex justify-center">
              <EditableField value={balanceValue} onChange={setBalanceValue} className="min-w-[100px] hover:bg-white/10" inputClassName="border-white/50 text-white" />
            </div>
            <div className="text-sm font-light opacity-90 mb-3 flex justify-center">
              <EditableField value={balanceLimitInfo} onChange={setBalanceLimitInfo} className="hover:bg-white/10" inputClassName="border-white/50 text-white" />
            </div>
            <button className="text-sm font-medium underline decoration-1 underline-offset-2">
              Acessar extrato
            </button>
          </div>

          <div className="flex justify-between px-6 mt-8">
            <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/santander/pix')}>
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <LayoutGrid className="w-7 h-7 text-[#EC0000] rotate-45" />
              </div>
              <span className="text-xs font-medium">Pix</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <HandCoins className="w-7 h-7 text-[#EC0000]" />
              </div>
              <span className="text-xs font-medium">Empréstimos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <Clover className="w-7 h-7 text-[#EC0000]" />
              </div>
              <span className="text-xs font-medium">DinDin</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <MoreHorizontal className="w-7 h-7 text-[#EC0000]" />
              </div>
              <span className="text-[10px] font-medium text-center leading-tight max-w-[60px]">Mais ações rápidas</span>
            </div>
          </div>
        </div>

        <div className="px-5 mt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Importante para você</h2>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              Com você, o app fica cada vez melhor. Construa esse futuro com a gente!
            </p>
            <button className="text-[#EC0000] font-bold text-sm underline decoration-1 underline-offset-2">
              Responda a pesquisa
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 pb-6">
        <div className="flex flex-col items-center gap-1">
          <div className="p-1 rounded-full">
            <Home className="w-6 h-6 text-[#EC0000]" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-bold text-[#EC0000]">Início</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-60">
          <QrCode className="w-6 h-6 text-gray-600" />
          <span className="text-[10px] font-medium text-gray-600">Pagar</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-60">
          <CreditCard className="w-6 h-6 text-gray-600" />
          <span className="text-[10px] font-medium text-gray-600">Cartões</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-60">
          <MessageCircle className="w-6 h-6 text-gray-600" />
          <span className="text-[10px] font-medium text-gray-600">Chat</span>
        </div>
      </div>
    </div>
  );
}
