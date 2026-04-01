import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Landmark, 
  Copy, 
  QrCode, 
  ArrowDownToLine,
  UserSquare2,
  X
} from 'lucide-react';
import { EditableField } from '../components/EditableField';

export function SantanderPix() {
  const navigate = useNavigate();
  const [pixKey, setPixKey] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Estado para os contatos editáveis
  const [contacts, setContacts] = useState([
    { id: 1, initials: 'ES', name: 'Euler A.', type: 'Aleatória' },
    { id: 2, initials: 'BC', name: 'Bianca G.', type: 'E-mail' },
    { id: 3, initials: 'IL', name: 'I9plex T.', type: 'CNPJ' },
  ]);

  const updateContact = (id: number, field: 'name' | 'type' | 'initials', value: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      {/* Header */}
      <div className="bg-[#EC0000] px-4 pt-2 pb-4 flex items-center justify-center relative shadow-sm z-10">
        <button 
          onClick={() => navigate('/santander')} 
          className="absolute left-4 p-1"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg">Pix</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Section 1: Input Style Santander */}
        <div className="px-5 pt-8 pb-6">
          <h2 className="text-[22px] text-gray-800 mb-5 leading-tight font-normal">
            Para quem você vai transferir?
          </h2>
          
          <div className="relative mt-2">
            <input 
              type="text" 
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full border rounded-[4px] pt-6 pb-2 px-4 text-lg text-gray-900 outline-none transition-colors ${
                isFocused || pixKey.length > 0 ? 'border-[#2596be]' : 'border-gray-400'
              }`}
            />
            
            {/* Floating Label */}
            <label 
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                isFocused || pixKey.length > 0
                  ? 'top-1.5 text-xs text-gray-600'
                  : 'top-4 text-lg text-gray-500'
              }`}
            >
              Nome, Chave ou Pix copia e cola
            </label>

            {/* Clear Button (X) */}
            {pixKey.length > 0 && (
              <button 
                onClick={() => setPixKey('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6 font-light" strokeWidth={1.5} />
              </button>
            )}
          </div>

          <p className="text-gray-500 text-sm mt-2 font-light">
            Celular, CPF/CNPJ, e-mail, chave-aleatória...
          </p>
        </div>

        {/* Section 2: Recent Transfers */}
        <div className="bg-[#EBF4F8] px-5 py-6 mb-6">
          <h3 className="text-gray-400 text-lg mb-5 font-normal">Transfira novamente</h3>
          
          <div className="flex gap-5 mb-6 overflow-x-auto no-scrollbar pb-2">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex flex-col items-center w-16 shrink-0">
                {/* Iniciais Editáveis */}
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#94B8C3] text-lg font-medium mb-1 overflow-hidden border border-white shadow-sm">
                  <EditableField
                    value={contact.initials}
                    onChange={(val) => updateContact(contact.id, 'initials', val)}
                    inputClassName="text-[#94B8C3] border-gray-300 w-8"
                    className="hover:bg-gray-50 px-1"
                  />
                </div>
                
                {/* Nome Editável */}
                <div className="text-[11px] text-gray-500 text-center leading-tight w-full flex justify-center mt-1">
                   <EditableField
                    value={contact.name}
                    onChange={(val) => updateContact(contact.id, 'name', val)}
                    inputClassName="text-gray-500 border-gray-400 text-[11px]"
                    className="hover:bg-gray-200 px-1 truncate max-w-full"
                  />
                </div>

                {/* Tipo Editável */}
                <div className="text-[10px] text-gray-400 text-center w-full flex justify-center mt-0.5">
                  <EditableField
                    value={contact.type}
                    onChange={(val) => updateContact(contact.id, 'type', val)}
                    inputClassName="text-gray-400 border-gray-300 text-[10px]"
                    className="hover:bg-gray-200 px-1 truncate max-w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 text-[#EC0000] font-medium text-[15px]">
            <UserSquare2 className="w-6 h-6 stroke-[1.5]" />
            Acessar todos os contatos
          </button>
        </div>

        {/* Section 3: Options Grid */}
        <div className="px-5 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Você também pode usar</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Card 1 */}
            <div className="bg-white p-3 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col items-center justify-center h-28 text-center gap-2 active:bg-gray-50 transition-colors">
              <Landmark className="w-7 h-7 text-[#b51c1c]" strokeWidth={1.5} />
              <span className="text-sm text-gray-700 leading-tight">Agência<br/>e conta</span>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-3 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col items-center justify-center h-28 text-center gap-2 active:bg-gray-50 transition-colors">
              <Copy className="w-7 h-7 text-[#b51c1c]" strokeWidth={1.5} />
              <span className="text-sm text-gray-700 leading-tight">Pix copia<br/>e cola</span>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-3 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col items-center justify-center h-28 text-center gap-2 active:bg-gray-50 transition-colors">
              <QrCode className="w-7 h-7 text-[#b51c1c]" strokeWidth={1.5} />
              <span className="text-sm text-gray-700 leading-tight">Código<br/>QR</span>
            </div>
          </div>
        </div>

        {/* Section 4: Other Transfers */}
        <div className="px-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Outras transferências</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                 <ArrowDownToLine className="w-4 h-4 text-[#b51c1c]" />
              </div>
              <span className="text-lg font-bold text-black">Trazer Dinheiro</span>
            </div>
            <span className="bg-[#5BB6C7] text-white text-xs font-bold px-2 py-1 rounded-[4px]">
              Novo
            </span>
          </div>
        </div>
      </div>

      {/* Botão Continuar (Condicional) */}
      {pixKey.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <button 
            onClick={() => navigate('/santander/pix/transfer')}
            className="w-full bg-[#EC0000] hover:bg-[#d00000] text-white font-medium text-lg py-3 rounded-[4px] transition-colors shadow-sm"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
