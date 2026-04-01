import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface NotificationData {
  title: string;
  message: string;
  appName?: string;
  iconUrl?: string; // Alterado para aceitar URL direta
  targetUrl?: string;
}

interface NotificationContextType {
  showNotification: (data: NotificationData) => void;
  notification: NotificationData | null;
  isVisible: boolean;
  hideNotification: () => void;
  handleNotificationClick: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const showNotification = (data: NotificationData) => {
    setNotification(data);
    setIsVisible(true);
    
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  const hideNotification = () => {
    setIsVisible(false);
  };

  const handleNotificationClick = () => {
    if (notification?.targetUrl) {
      navigate(notification.targetUrl);
      setIsVisible(false);
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notification, isVisible, hideNotification, handleNotificationClick }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
