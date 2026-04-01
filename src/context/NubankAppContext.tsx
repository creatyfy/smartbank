import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isBalanceVisible: boolean;
  toggleBalance: () => void;
  balance: string;
  setBalance: (val: string) => void;
  userName: string;
  setUserName: (val: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [balance, setBalance] = useState("1.250,00");
  const [userName, setUserName] = useState("Hiago");

  const toggleBalance = () => setIsBalanceVisible(!isBalanceVisible);

  return (
    <AppContext.Provider value={{ 
      isBalanceVisible, 
      toggleBalance, 
      balance, 
      setBalance,
      userName,
      setUserName
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useNubankApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useNubankApp must be used within an AppProvider');
  }
  return context;
}
