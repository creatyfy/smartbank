import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface BradescoNotificationProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

export function BradescoNotification({ isVisible, message, onClose }: BradescoNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="absolute top-0 left-4 right-4 z-[100] bg-white rounded-xl p-4 shadow-2xl border-l-4 border-[#cc092f] flex items-center gap-3"
          onClick={onClose}
        >
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-bold text-sm">Bradesco</p>
            <p className="text-gray-600 text-xs leading-tight">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
