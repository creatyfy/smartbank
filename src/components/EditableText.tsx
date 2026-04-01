import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/cn';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  isCurrency?: boolean;
}

export function EditableText({ value, onChange, className, inputClassName, isCurrency }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.width = `${Math.max(tempValue.length, 1)}ch`;
    }
  }, [isEditing, tempValue]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(tempValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onChange(tempValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
    e.target.style.width = `${Math.max(e.target.value.length, 1)}ch`;
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={tempValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn("outline-none bg-transparent border-b border-gray-300 min-w-[20px] px-0", inputClassName)}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <span 
      onClick={(e) => { e.stopPropagation(); setIsEditing(true); setTempValue(value); }}
      className={cn("cursor-pointer hover:opacity-70 transition-opacity", className)}
    >
      {value}
    </span>
  );
}
