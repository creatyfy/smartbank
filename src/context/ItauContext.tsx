import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ItauContextType {
  balance: string;
  setBalance: (v: string) => void;
  userName: string;
  setUserName: (v: string) => void;
}

const ItauContext = createContext<ItauContextType | undefined>(undefined);

export const ItauProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState('1.250,00');
  const [userName, setUserName] = useState('Hiago');

  return (
    <ItauContext.Provider value={{ balance, setBalance, userName, setUserName }}>
      {children}
    </ItauContext.Provider>
  );
};

export const useItau = () => {
  const context = useContext(ItauContext);
  if (!context) throw new Error('useItau must be used within ItauProvider');
  return context;
};
