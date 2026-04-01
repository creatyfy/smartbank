import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Barcode, QrCode } from 'lucide-react';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankPayment() {
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
        <h1 className="text-3xl font-medium text-gray-900 mb-8">Pagar</h1>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200">
            <Barcode className="w-6 h-6 text-gray-900" />
            <span className="font-medium text-gray-900">Pagar boleto</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200">
            <QrCode className="w-6 h-6 text-gray-900" />
            <span className="font-medium text-gray-900">Ler QR code</span>
          </div>
        </div>
      </div>
    </div>
  );
}
