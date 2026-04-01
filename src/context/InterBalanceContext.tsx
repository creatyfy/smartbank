import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BalanceContextType { 
  balance: string; 
  setBalance: (value: string) => void; 
  notifTitle: string; 
  setNotifTitle: (value: string) => void; 
  notifMessage: string; 
  setNotifMessage: (value: string) => void; 
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const InterBalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState("13,87");
  const [notifTitle, setNotifTitle] = useState("Inter");
  const [notifMessage, setNotifMessage] = useState("Você recebeu um Pix de R$ {valor} em {data} às {hora}.");
  
  return (
    <BalanceContext.Provider value={{ balance, setBalance, notifTitle, setNotifTitle, notifMessage, setNotifMessage }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useInterBalance = () => { 
  const context = useContext(BalanceContext); 
  if (!context) throw new Error('useInterBalance must be used within InterBalanceProvider'); 
  return context; 
};
