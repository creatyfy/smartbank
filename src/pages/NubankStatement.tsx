import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankStatement() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-5 pt-8 pb-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={() => navigate('/nubank/dashboard')} className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-full">
          <Search className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 px-5 pt-6">
        <h1 className="text-3xl font-medium text-gray-900 mb-8">Histórico</h1>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Transferência enviada</p>
              <p className="text-sm text-gray-500">João Silva</p>
            </div>
            <p className="font-medium text-gray-900">- R$ 150,00</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Transferência recebida</p>
              <p className="text-sm text-gray-500">Maria Oliveira</p>
            </div>
            <p className="font-medium text-[#6D9E35]">R$ 300,00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
