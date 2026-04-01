import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Grid } from 'lucide-react';
import { InterBottomNav } from '../components/InterBottomNav';

export function InterAllServices() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Todos os serviços</h1>
      </div>
      <div className="flex-1 px-5 pt-8 flex flex-col items-center text-center">
        <Grid className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500">Explore todos os serviços do Inter.</p>
      </div>
      <InterBottomNav />
    </div>
  );
}
