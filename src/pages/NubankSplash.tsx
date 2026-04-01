import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeColor } from '../hooks/useThemeColor';

export function NubankSplash() {
  const navigate = useNavigate();
  useThemeColor('#8A05BE');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/nubank/dashboard');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-full bg-[#8A05BE] flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.333 4.148a2.535 2.535 0 0 0-1.792-.741H6.46a2.535 2.535 0 0 0-1.792.741c-.475.475-.741 1.12-.741 1.792v12.12c0 .672.266 1.317.741 1.792.475.475 1.12.741 1.792.741h11.081c.672 0 1.317-.266 1.792-.741.475-.475.741-1.12.741-1.792V5.94a2.535 2.535 0 0 0-.741-1.792zM15.4 16.5h-2.1v-5.4c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v5.4H8.4V7.5h2.1v1.3c.4-.6 1.2-1.1 2.1-1.1 1.8 0 2.8 1.2 2.8 3.2v5.6z" fill="white"/>
      </svg>
    </div>
  );
}
