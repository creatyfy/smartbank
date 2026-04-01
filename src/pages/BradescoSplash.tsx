import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeColor } from '../hooks/useThemeColor';

export default function BradescoSplash() {
  const navigate = useNavigate();
  useThemeColor('#cc092f');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/bradesco/dashboard');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-full bg-[#cc092f] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
          <div className="w-12 h-12 border-[6px] border-[#cc092f] rounded-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#cc092f] rounded-full"></div>
          </div>
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tighter">bradesco</h1>
      </div>
    </div>
  );
}
