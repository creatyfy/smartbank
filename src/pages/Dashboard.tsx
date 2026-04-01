import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assets } from '../data/assets';
import { useBankManifest } from '../hooks/useBankManifest';

export function Dashboard() {
  const navigate = useNavigate();
  useBankManifest('smartbank');

  const handleBankClick = (bankName: string) => {
    if (bankName === 'Santander') {
      navigate('/santander');
    } else if (bankName === 'Nubank') {
      navigate('/nubank');
    } else if (bankName === 'Inter') {
      navigate('/inter');
    } else if (bankName === 'Mercado Pago') {
      navigate('/mp');
    } else if (bankName === 'Itaú') {
      navigate('/itau');
    } else if (bankName === 'Bradesco') {
      navigate('/bradesco');
    } else {
      alert(`A interface do ${bankName} ainda está em desenvolvimento. Por favor, acesse o Santander, Nubank, Inter, Mercado Pago, Itaú ou Bradesco para testar o fluxo.`);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col items-center pt-[15%] px-6">
      {/* Aumentado de 240px para 300px para ocupar a maior parte da largura mobile */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[300px] h-[300px] mb-10 shadow-xl rounded-2xl overflow-hidden shrink-0 bg-white border border-gray-100 p-6 flex items-center justify-center"
      >
        <img 
          src={assets.profile} 
          alt="Smartbank Logo" 
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = 'https://ui-avatars.com/api/?name=SB&background=f3f4f6&color=a1a1aa&size=300';
          }}
        />
      </motion.div>

      <div className="grid grid-cols-3 gap-x-8 gap-y-8 w-full max-w-[320px] justify-items-center">
        {assets.banks.map((bank, index) => (
          <motion.div
            key={bank.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBankClick(bank.name)}
            className="flex flex-col items-center gap-2 cursor-pointer w-full"
          >
            <div className="w-[60px] h-[60px] rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 flex items-center justify-center p-1.5">
              <img 
                src={bank.url} 
                alt={bank.name} 
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${bank.name}&background=random&color=fff&size=100`;
                }}
              />
            </div>
            <span className="text-[12px] text-gray-600 font-medium text-center leading-tight">
              {bank.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
