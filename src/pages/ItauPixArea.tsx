import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Landmark, Copy, QrCode, MessageCircle, Settings } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export default function ItauPixArea() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');

  return (
    <div className="w-full h-full bg-[#F4F5F7] flex flex-col font-sans relative">
      <div className="bg-white px-4 pt-6 pb-4 flex items-center border-b border-gray-200 shadow-sm">
        <button onClick={() => navigate('/itau/dashboard')} className="p-2 -ml-2 text-[#EC7000]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Pix</h1>
      </div>

      <div className="flex-1 px-4 pt-6 overflow-y-auto">
        <h2 className="text-gray-900 font-bold text-lg mb-4">Enviar Pix</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div 
            onClick={() => navigate('/itau/pix/transfer')}
            className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center gap-3 cursor-pointer active:scale-95 transition-transform"
          >
            <Landmark className="w-7 h-7 text-[#EC7000]" />
            <span className="text-sm font-medium text-gray-800">Transferir</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center gap-3 cursor-pointer">
            <Copy className="w-7 h-7 text-[#EC7000]" />
            <span className="text-sm font-medium text-gray-800 text-center leading-tight">Copia e<br/>Cola</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center gap-3 cursor-pointer">
            <QrCode className="w-7 h-7 text-[#EC7000]" />
            <span className="text-sm font-medium text-gray-800 text-center leading-tight">Ler QR<br/>Code</span>
          </div>
        </div>

        <h2 className="text-gray-900 font-bold text-lg mb-4">Gerenciar</h2>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 cursor-pointer">
            <Settings className="w-6 h-6 text-[#004990]" />
            <span className="font-medium text-gray-800">Minhas chaves Pix</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 cursor-pointer">
            <MessageCircle className="w-6 h-6 text-[#004990]" />
            <span className="font-medium text-gray-800">Meus limites</span>
          </div>
        </div>
      </div>
    </div>
  );
}
