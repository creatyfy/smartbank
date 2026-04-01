import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MPTransaction { 
  id: string; 
  type: 'in' | 'out'; 
  title: string; 
  amount: string; 
  date: string; 
  description?: string; 
}

interface MPBankContextType { 
  balance: string; 
  setBalance: (balance: string) => void; 
  transactions: MPTransaction[]; 
  addTransaction: (transaction: Omit<MPTransaction, 'id' | 'date'>) => void; 
  userName: string; 
  setUserName: (name: string) => void; 
  notificationTitle: string; 
  setNotificationTitle: (title: string) => void; 
  notificationBody: string; 
  setNotificationBody: (body: string) => void; 
}

const MPBankContext = createContext<MPBankContextType | undefined>(undefined);

export const MPBankProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState('0,00');
  const [userName, setUserName] = useState('Desenvolvedor');
  const [notificationTitle, setNotificationTitle] = useState('Você recebeu um Pix');
  const [notificationBody, setNotificationBody] = useState('Você recebeu uma transferência de R$ {amount}');
  const [transactions, setTransactions] = useState<MPTransaction[]>([]);
  
  const addTransaction = (t: Omit<MPTransaction, 'id' | 'date'>) => {
    const newTransaction: MPTransaction = { 
      ...t, 
      id: Math.random().toString(36).substr(2, 9), 
      date: new Date().toISOString() 
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  return (
    <MPBankContext.Provider value={{ 
      balance, setBalance, transactions, addTransaction, 
      userName, setUserName, notificationTitle, setNotificationTitle, 
      notificationBody, setNotificationBody 
    }}>
      {children}
    </MPBankContext.Provider>
  );
};

export const useMPBank = () => { 
  const context = useContext(MPBankContext); 
  if (!context) throw new Error('useMPBank must be used within MPBankProvider'); 
  return context; 
};
