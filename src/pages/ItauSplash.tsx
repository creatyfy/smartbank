import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeColor } from '../hooks/useThemeColor';

export default function ItauSplash() {
  const navigate = useNavigate();
  useThemeColor('#EC7000');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/itau/dashboard');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-full bg-[#EC7000] flex items-center justify-center">
      <h1 className="text-white text-5xl font-bold tracking-tighter">Itaú</h1>
    </div>
  );
}
