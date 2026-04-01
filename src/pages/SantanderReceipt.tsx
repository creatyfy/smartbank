import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { EditableField } from '../components/EditableField';

export function SantanderReceipt() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Captura o valor exato que veio da notificação pela URL
  const queryParams = new URLSearchParams(location.search);
  const amountFromUrl = queryParams.get('amount') || "R$ 0,01";

  // Estados editáveis
  const [amount, setAmount] = useState(amountFromUrl);
  const [receiverName, setReceiverName] = useState("I9plex Tecnologia e Servicos Digitais Ltda");
  const [receiverCnpj, setReceiverCnpj] = useState("44.*******/0001-2*");
  const [institution, setInstitution] = useState("NU PAGAMENTOS - IP");
  const [transactionId, setTransactionId] = useState("E9040088820260206215655289221082");
  const [date, setDate] = useState("06/02/2026 - 19:00:49");
  const [authCode, setAuthCode] = useState("B9A80D7D936160858337926");

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {/* Header */}
      <div className="bg-[#EC0000] px-4 pt-2 pb-4 flex items-center justify-center relative shadow-sm z-10">
        <button 
          onClick={() => navigate('/santander')} 
          className="absolute left-4 p-1"
        >
          <X className="w-8 h-8 text-white font-light" strokeWidth={1.5} />
        </button>
        <h1 className="text-white font-bold text-lg">Comprovante</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Success Banner */}
        <div className="border-b border-gray-200 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#6D9E35] flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <p className="text-gray-800 text-[15px] leading-snug pt-1">
            Pronto! Seu pagamento foi realizado.
          </p>
        </div>

        {/* Content */}
        <div className="px-5 pt-6">
          <h2 className="text-gray-900 font-bold text-base mb-1">
            Comprovante do Pix
          </h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Você pode consultar o comprovante da sua transação em Início {'>'} Pix {'>'} Extrato Pix.
          </p>

          {/* Fields */}
          <div className="space-y-5">
            {/* Valor */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Valor pago</label>
              <div className="text-gray-900 font-bold text-lg">
                <EditableField value={amount} onChange={setAmount} />
              </div>
            </div>

            {/* Para */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Para</label>
              <div className="text-gray-900 text-[15px]">
                <EditableField value={receiverName} onChange={setReceiverName} inputClassName="w-full" />
              </div>
            </div>

            {/* CNPJ */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">CNPJ</label>
              <div className="text-gray-900 text-[15px]">
                <EditableField value={receiverCnpj} onChange={setReceiverCnpj} inputClassName="w-full" />
              </div>
            </div>

            {/* Instituição */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Instituição</label>
              <div className="text-gray-900 text-[15px]">
                <EditableField value={institution} onChange={setInstitution} inputClassName="w-full" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-5"></div>

          {/* Technical Details */}
          <div className="space-y-5">
            {/* ID Transação */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">ID/Transação</label>
              <div className="text-gray-900 text-[15px] break-all leading-tight">
                <EditableField value={transactionId} onChange={setTransactionId} inputClassName="w-full" />
              </div>
            </div>

            {/* Data e Hora */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Data e hora da transação</label>
              <div className="text-gray-900 text-[15px]">
                <EditableField value={date} onChange={setDate} inputClassName="w-full" />
              </div>
            </div>

            {/* Código Autenticação */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Código de autenticação</label>
              <div className="text-gray-900 text-[15px] break-all leading-tight">
                <EditableField value={authCode} onChange={setAuthCode} inputClassName="w-full" />
              </div>
            </div>
          </div>
          
          {/* Divider Final (Visual) */}
          <div className="h-px bg-gray-200 mt-5 mb-2"></div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button 
          className="w-full bg-[#EC0000] hover:bg-[#d00000] text-white font-medium text-lg py-3 rounded-[4px] transition-colors shadow-sm"
        >
          Salvar ou Compartilhar
        </button>
      </div>
    </div>
  );
}
