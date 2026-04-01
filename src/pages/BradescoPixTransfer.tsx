import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Landmark, Copy, QrCode } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export default function BradescoPixTransfer() {
  const navigate = useNavigate();
  const [pixKey, setPixKey] = useState('');
  useThemeColor('#ffffff');

  const handleContinue = () => {
    if (pixKey.length > 0) {
      navigate('/bradesco/pix/amount');
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/bradesco/dashboard')} className="p-2 -ml-2 text-[#cc092f]">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Pix</h1>
      </div>

      <div className="flex-1 px-5 pt-6 overflow-y-auto">
        <h2 className="text-gray-900 text-xl font-bold mb-2">Para quem você quer transferir?</h2>
        <p className="text-gray-500 text-sm mb-6">Use CPF/CNPJ, celular, e-mail ou chave aleatória.</p>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder="Digite a chave Pix"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 outline-none focus:border-[#cc092f] transition-all"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-[#cc092f] border border-gray-100">
              <Landmark className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-600 uppercase text-center">Agência e Conta</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-[#cc092f] border border-gray-100">
              <Copy className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-600 uppercase text-center">Copia e Cola</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-[#cc092f] border border-gray-100">
              <QrCode className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-600 uppercase text-center">Ler QR Code</span>
          </div>
        </div>

        <h3 className="text-gray-900 font-bold mb-4 uppercase text-xs tracking-wider">Contatos recentes</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 py-2 cursor-pointer" onClick={() => navigate('/bradesco/pix/amount')}>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-[#cc092f] font-bold">
              ES
            </div>
            <div>
              <p className="font-bold text-gray-900">Euler A.</p>
              <p className="text-xs text-gray-500 uppercase">Banco Bradesco S.A.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 pb-8">
        <button 
          onClick={handleContinue}
          disabled={pixKey.length === 0}
          className={`w-full font-bold py-4 rounded-xl active:scale-95 transition-all ${
            pixKey.length > 0 ? 'bg-[#cc092f] text-white shadow-lg' : 'bg-gray-200 text-gray-400'
          }`}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );
}
