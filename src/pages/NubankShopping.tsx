import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankShopping() {
  const navigate = useNavigate();
  useThemeColor('#ffffff');

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-5 pt-8 pb-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate('/nubank/dashboard')} className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 px-5 pt-6">
        <h1 className="text-3xl font-medium text-gray-900 mb-8">Shopping</h1>
        <div className="bg-gray-100 rounded-xl p-5 flex items-center gap-4 cursor-pointer">
          <ShoppingBag className="w-6 h-6 text-gray-900" />
          <span className="font-medium text-gray-900">Ver ofertas</span>
        </div>
      </div>
    </div>
  );
}
