import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Settings, LogOut } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankProfile() {
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
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-900">Meu Perfil</h1>
            <p className="text-gray-500 text-sm">Ag: 0001 Conta: 1234567-8</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200">
            <Settings className="w-6 h-6 text-gray-900" />
            <span className="font-medium text-gray-900">Configurações</span>
          </div>
          <div onClick={() => navigate('/dashboard')} className="flex items-center gap-4 p-4 bg-red-50 rounded-xl cursor-pointer hover:bg-red-100 text-red-600">
            <LogOut className="w-6 h-6" />
            <span className="font-medium">Sair do aplicativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
