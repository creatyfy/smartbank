import React, { useState, useEffect, useRef } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onChange, 
  className = "",
  inputClassName = "",
  placeholder = ""
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Ajusta a largura inicial
      inputRef.current.style.width = `${Math.max(tempValue.length, 1)}ch`;
    }
  }, [isEditing, tempValue]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setTempValue(value);
  };

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
    // Ajusta a largura dinamicamente
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
        placeholder={placeholder}
        className={`outline-none text-center min-w-[20px] px-0 bg-transparent border-b ${inputClassName} ${className}`}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <span 
      onClick={handleClick} 
      className={`cursor-pointer hover:opacity-70 transition-opacity border border-transparent rounded px-0.5 ${className}`}
      title="Clique para editar"
    >
      {value || <span className="opacity-50 italic">Vazio</span>}
    </span>
  );
};
