import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export function InterCards() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Cartões</h1>
      </div>
      <div className="flex-1 px-5 pt-6 flex flex-col items-center justify-center text-center">
        <CreditCard className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Seus cartões Inter</h2>
        <p className="text-gray-500">Gerencie seus cartões físicos e virtuais por aqui.</p>
      </div>
    </div>
  );
}
