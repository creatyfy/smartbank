import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Barcode } from 'lucide-react';

export function InterPayment() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Pagamentos</h1>
      </div>
      <div className="flex-1 px-5 pt-6">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <Barcode className="w-6 h-6 text-[#FF7A00]" />
          <span className="font-medium text-gray-900">Digitar código de barras</span>
        </div>
      </div>
    </div>
  );
}
