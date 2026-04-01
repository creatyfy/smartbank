import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeColor } from '../hooks/useThemeColor';

export function InterSplash() {
  const navigate = useNavigate();
  useThemeColor('#FF7A00');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/inter/home');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-full bg-[#FF7A00] flex items-center justify-center">
      <h1 className="text-white text-5xl font-bold tracking-tighter">inter</h1>
    </div>
  );
}
