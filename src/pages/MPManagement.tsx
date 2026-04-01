import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, PieChart } from 'lucide-react';
import { MPBottomNav } from '../components/MPBottomNav';
import { useThemeColor } from '../hooks/useThemeColor';

export function MPManagement() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col font-sans relative">
      <div className="bg-white px-4 pt-6 pb-4 flex items-center shadow-sm">
        <button onClick={() => navigate('/mp/dashboard')} className="p-2 -ml-2 text-[#009EE3]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Gestão</h1>
      </div>
      <div className="flex-1 px-5 pt-8 flex flex-col items-center text-center">
        <PieChart className="w-16 h-16 text-[#009EE3] mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Seus gastos</h2>
        <p className="text-gray-500">Acompanhe suas finanças de perto.</p>
      </div>
      <MPBottomNav />
    </div>
  );
}
