import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, QrCode, Copy, Landmark, LayoutGrid } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankPixFlow() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      <div className="px-5 pt-8 pb-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={() => navigate('/nubank/dashboard')} className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <LayoutGrid className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-8">
        <h1 className="text-3xl font-medium text-gray-900 mb-8">Área Pix</h1>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {/* Botão Transferir agora leva para a tela de digitar o valor */}
          <div 
            onClick={() => navigate('/nubank/pix/transfer')}
            className="flex flex-col items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <Landmark className="w-6 h-6 text-gray-900" />
            </div>
            <span className="text-sm font-medium text-gray-900">Transferir</span>
          </div>

          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <Copy className="w-6 h-6 text-gray-900" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center leading-tight">Pix Copia<br/>e Cola</span>
          </div>
          
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <QrCode className="w-6 h-6 text-gray-900" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center leading-tight">Ler QR<br/>code</span>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-5 mb-6 cursor-pointer hover:bg-gray-200 transition-colors">
          <h3 className="font-medium text-gray-900 mb-1">Minhas chaves</h3>
          <p className="text-sm text-gray-500">Gerencie suas chaves Pix</p>
        </div>

        <div className="bg-gray-100 rounded-xl p-5 cursor-pointer hover:bg-gray-200 transition-colors">
          <h3 className="font-medium text-gray-900 mb-1">Meu limite Pix</h3>
          <p className="text-sm text-gray-500">Ajuste o valor máximo de suas transferências</p>
        </div>
      </div>
    </div>
  );
}
