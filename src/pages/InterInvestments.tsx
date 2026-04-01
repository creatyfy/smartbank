import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, TrendingUp } from 'lucide-react';
import { InterBottomNav } from '../components/InterBottomNav';

export function InterInvestments() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-[#F5F6FA] flex flex-col font-sans relative">
      <div className="bg-white px-4 pt-6 pb-4 flex items-center shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Inter Invest</h1>
      </div>
      <div className="flex-1 px-5 pt-8 flex flex-col items-center text-center">
        <TrendingUp className="w-16 h-16 text-[#FF7A00] mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Seu portfólio</h2>
        <p className="text-gray-500">Comece a investir no seu futuro hoje.</p>
      </div>
      <InterBottomNav />
    </div>
  );
}
