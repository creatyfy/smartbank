import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { EditableField } from '../components/EditableField';

export function SantanderTransfer() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  
  // Estados para os dados do recebedor
  const [receiverName, setReceiverName] = useState("I9plex Tecnologia e Servicos Digitais Ltda");
  const [receiverCnpj, setReceiverCnpj] = useState("CNPJ: 44.*******/0001-2* - NU PAGAMENTOS - IP");
  const [receiverKey, setReceiverKey] = useState("Chave: 44.*******/0001-2*");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setAmount(rawValue);
  };

  const displayAmount = amount ? (parseFloat(amount) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00';
  const isValid = amount && parseFloat(amount) > 0;

  const handleContinue = () => {
    // Passa o valor formatado (ex: "100,00") para a próxima tela via state
    navigate('/santander/pix/payment', { 
      state: { 
        amountValue: displayAmount 
      } 
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {/* Header */}
      <div className="bg-[#EC0000] px-4 pt-2 pb-4 flex items-center justify-center relative shadow-sm z-10">
        <button 
          onClick={() => navigate('/santander/pix')} 
          className="absolute left-4 p-1"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg">Definir transferência</h1>
      </div>

      <div className="flex-1 px-6 pt-8">
        <h2 className="text-[22px] text-gray-900 font-normal mb-8">
          Quanto você vai enviar ?
        </h2>

        <div className="mb-8">
          <p className="text-gray-900 text-[15px] mb-1">
            <span className="font-normal">Para </span>
            <span className="font-bold">
              <EditableField 
                value={receiverName} 
                onChange={setReceiverName}
                className="font-bold"
                inputClassName="font-bold w-full"
              />
            </span>
          </p>
          <div className="text-gray-500 text-sm font-light leading-snug">
            <EditableField 
              value={receiverCnpj} 
              onChange={setReceiverCnpj}
              className="block"
              inputClassName="w-full text-sm"
            />
            <EditableField 
              value={receiverKey} 
              onChange={setReceiverKey}
              className="block"
              inputClassName="w-full text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-600 text-sm block mb-2">Valor</label>
          <div className="border border-gray-400 rounded-[4px] h-14 flex items-center px-4 relative">
            <span className={`text-2xl font-bold mr-2 transition-colors ${isValid ? 'text-gray-900' : 'text-gray-400'}`}>R$</span>
            <input 
              type="text"
              inputMode="numeric"
              value={displayAmount === '0,00' ? '' : displayAmount}
              onChange={handleAmountChange}
              className={`w-full h-full outline-none text-2xl font-bold bg-transparent z-10 transition-colors ${isValid ? 'text-gray-900' : 'text-gray-400'}`}
            />
            {(!amount || parseInt(amount) === 0) && (
              <span className="absolute left-12 text-2xl font-bold text-gray-400 pointer-events-none">
                0,00
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pb-8">
        <button 
          disabled={!isValid}
          onClick={handleContinue}
          className={`w-full py-3.5 rounded-[4px] text-white font-medium text-lg transition-colors ${
            isValid 
              ? 'bg-[#EC0000] hover:bg-[#d00000] shadow-md' 
              : 'bg-[#CCCCCC] cursor-not-allowed'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
