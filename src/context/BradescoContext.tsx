import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BradescoContextType {
  balance: string;
  setBalance: (v: string) => void;
  userName: string;
  setUserName: (v: string) => void;
  isBalanceVisible: boolean;
  setIsBalanceVisible: (v: boolean) => void;
  notificationVisible: boolean;
  notificationMessage: string;
  showNotification: (title: string, message: string) => void;
  hideNotification: () => void;
}

const BradescoContext = createContext<BradescoContextType | undefined>(undefined);

export const BradescoProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState('1.450,80');
  const [userName, setUserName] = useState('Hiago');
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = (_title: string, message: string) => {
    setNotificationMessage(message);
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 5000);
  };

  const hideNotification = () => setNotificationVisible(false);

  return (
    <BradescoContext.Provider value={{ 
      balance, setBalance, userName, setUserName, isBalanceVisible, setIsBalanceVisible,
      notificationVisible, notificationMessage, showNotification, hideNotification
    }}>
      {children}
    </BradescoContext.Provider>
  );
};

export const useBradesco = () => {
  const context = useContext(BradescoContext);
  if (!context) throw new Error('useBradesco must be used within BradescoProvider');
  return context;
};
