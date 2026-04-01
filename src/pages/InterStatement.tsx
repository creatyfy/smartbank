import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function InterStatement() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Extrato</h1>
      </div>
      <div className="flex-1 px-5 pt-6">
        <p className="text-gray-500 text-center mt-10">Nenhuma transação recente.</p>
      </div>
    </div>
  );
}
