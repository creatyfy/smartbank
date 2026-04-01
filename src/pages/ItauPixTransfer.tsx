import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, User } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export default function ItauPixTransfer() {
  const navigate = useNavigate();
  const [pixKey, setPixKey] = useState('');
  useThemeColor('#ffffff');

  const handleContinue = () => {
    if (pixKey.length > 0) {
      navigate('/itau/pix/amount');
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-200 shadow-sm">
        <button onClick={() => navigate('/itau/pix')} className="p-2 -ml-2 text-[#EC7000]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Transferir</h1>
      </div>

      <div className="flex-1 px-5 pt-6 overflow-y-auto">
        <h2 className="text-gray-900 text-xl font-bold mb-2">Para quem você quer transferir?</h2>
        <p className="text-gray-500 text-sm mb-6">Nome, CPF/CNPJ, celular ou e-mail</p>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder="Buscar ou digitar chave"
            className="w-full bg-gray-100 rounded-xl py-4 pl-12 pr-4 text-gray-900 outline-none focus:ring-2 focus:ring-[#EC7000]/50 transition-all"
          />
        </div>

        <h3 className="text-gray-900 font-bold mb-4">Contatos recentes</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 py-2 cursor-pointer" onClick={() => navigate('/itau/pix/amount')}>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#EC7000] font-bold">
              ES
            </div>
            <div>
              <p className="font-bold text-gray-900">Euler A.</p>
              <p className="text-sm text-gray-500">Itaú Unibanco S.A.</p>
            </div>
          </div>
        </div>
      </div>

      {pixKey.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-100">
          <button 
            onClick={handleContinue}
            className="w-full bg-[#EC7000] text-white font-bold py-4 rounded-xl active:scale-95 transition-transform"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
