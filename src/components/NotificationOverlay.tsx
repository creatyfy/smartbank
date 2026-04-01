import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';

export function NotificationOverlay() {
  const { notification, isVisible, handleNotificationClick } = useNotification();

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-4 left-3 right-3 z-[100]"
        >
          {/* Estilo Light Mode limpo (padrão iOS/Android moderno) */}
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/50 cursor-pointer active:scale-95 transition-transform"
            onClick={handleNotificationClick}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {/* Ícone do App */}
                <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shadow-sm">
                   {notification.iconUrl ? (
                     <img src={notification.iconUrl} alt="App Icon" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full bg-[#EC0000] flex items-center justify-center">
                        <span className="text-white text-[12px] font-bold">S</span>
                     </div>
                   )}
                </div>
              </div>
              <span className="text-[12px] text-gray-500 font-medium">agora</span>
            </div>
            
            <div className="pl-1">
              <h4 className="text-[15px] font-semibold text-gray-900 mb-1">{notification.title}</h4>
              <p className="text-[14px] text-gray-600 leading-snug">
                {notification.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
