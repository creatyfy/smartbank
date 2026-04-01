import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeColor } from '../hooks/useThemeColor';

export function MPSplash() {
  const navigate = useNavigate();
  useThemeColor('#009EE3');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/mp/dashboard');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-full bg-[#009EE3] flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#009EE3" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
        <h1 className="text-white text-2xl font-bold tracking-tight">mercado pago</h1>
      </div>
    </div>
  );
}
