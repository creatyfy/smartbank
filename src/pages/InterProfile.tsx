import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, LogOut } from 'lucide-react';

export function InterProfile() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/inter/home')} className="p-2 -ml-2 text-[#FF7A00]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Meu Perfil</h1>
      </div>
      <div className="flex-1 px-5 pt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Conta Inter</h2>
            <p className="text-gray-500 text-sm">Ag: 0001 Conta: 1234567-8</p>
          </div>
        </div>
        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-4 p-4 bg-red-50 rounded-xl text-red-600 font-bold cursor-pointer"
        >
          <LogOut className="w-6 h-6" />
          <span>Sair da conta</span>
        </div>
      </div>
    </div>
  );
}
