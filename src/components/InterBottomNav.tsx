import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, TrendingUp, ShoppingBag, Menu } from 'lucide-react';
import { cn } from '../lib/cn';

export function InterBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Início', path: '/inter/home' },
    { icon: TrendingUp, label: 'Investir', path: '/inter/investimentos' },
    { icon: ShoppingBag, label: 'Shopping', path: '/inter/shopping' },
    { icon: Menu, label: 'Menu', path: '/inter/todos-os-servicos' },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-50 pb-6">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <div 
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <Icon 
              className={cn("w-6 h-6 transition-colors", isActive ? "text-[#FF7A00]" : "text-gray-400")} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-[#FF7A00]" : "text-gray-400")}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
