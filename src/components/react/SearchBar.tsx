import { useState, type ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Buscar productos..."
        autoComplete="off"
        className="w-full px-5 py-4 bg-white border border-void/10 text-void placeholder:text-void/30 focus:outline-none focus:border-accent-primary transition-colors font-body"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 p-1 hover:bg-void/5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) : (
        <svg className="absolute right-4 w-5 h-5 text-void/30" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      )}
    </div>
  );
}