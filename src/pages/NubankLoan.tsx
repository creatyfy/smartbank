import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankLoan() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-5 pt-8 pb-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate('/nubank/dashboard')} className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 px-5 pt-6 text-center">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Empréstimos</h1>
        <p className="text-gray-500">Você tem R$ 10.000,00 pré-aprovados.</p>
        <button className="mt-8 bg-[#8A05BE] text-white font-medium py-3 px-6 rounded-full w-full">
          Simular empréstimo
        </button>
      </div>
    </div>
  );
}
