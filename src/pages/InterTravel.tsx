import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plane } from 'lucide-react';

export function InterTravel() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Viagens</h1>
      </div>
      <div className="flex-1 px-5 pt-8 flex flex-col items-center text-center">
        <Plane className="w-16 h-16 text-[#FF7A00] mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Inter Travel</h2>
        <p className="text-gray-500">Passagens e hotéis com cashback.</p>
      </div>
    </div>
  );
}
