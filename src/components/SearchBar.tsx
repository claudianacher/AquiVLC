import React from 'react';
import { X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
  onSearchSubmit?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChange,
  onSearchSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative"
      data-name="Buscar planes"
    >
      <div className="bg-[#fffcf6] border border-[#e5dacb] h-[46px] rounded-[100px] flex items-center justify-between px-4 transition-all focus-within:border-[#d9571d] focus-within:ring-1 focus-within:ring-[#d9571d]/20 shadow-xs">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Busca un plan, un barrio, un lugar…"
          className="w-full bg-transparent outline-none font-sans text-[13px] text-[#302d27] placeholder:text-[#777064] pr-2"
          aria-label="Buscar planes culturales"
        />

        {query ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="w-[18px] h-[18px] flex items-center justify-center text-[#777064] hover:text-[#302d27] cursor-pointer"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="relative shrink-0 w-[18px] h-[18px] select-none pointer-events-none" data-name="search">
            <img
              src="/assets/search.svg"
              alt="Buscar"
              className="w-full h-full block"
            />
          </div>
        )}
      </div>
    </form>
  );
};
