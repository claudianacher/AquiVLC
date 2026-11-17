import React from 'react';
import { Category } from '../data/mockData';

interface CategoryFiltersProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const row1: Category[] = ['Todo', 'Cultura', 'Aire libre'];
  const row2: Category[] = ['Gastronomía', 'Deporte'];

  const renderChip = (cat: Category) => {
    const isActive = selectedCategory === cat;
    return (
      <button
        key={cat}
        type="button"
        onClick={() => onSelectCategory(cat)}
        className={`h-[34px] px-[14px] rounded-[100px] text-[12px] font-sans font-medium transition-all duration-150 flex items-center justify-center cursor-pointer select-none active:scale-95 shrink-0 ${
          isActive
            ? 'bg-[#d9571d] text-white border border-[#d9571d] shadow-xs'
            : 'bg-[#fffcf6] text-[#302d27] border border-[#e5dacb] hover:border-[#d9571d]/60 hover:bg-[#fff9ef]'
        }`}
        data-name="Filtro"
      >
        {cat}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-[14px] w-full" data-name="Explorar por interés">
      {/* Título de sección */}
      <div className="flex items-center justify-between" data-name="Título de sección">
        <h2 className="font-serif text-[30px] leading-tight text-[#302d27]" data-name="Título">
          ¿Qué te apetece?
        </h2>
      </div>

      {/* Filtros de categoría estructurados en 2 filas exactas de Figma */}
      <div className="flex flex-col gap-2 w-full" data-name="Filtros de categoría">
        {/* Fila 1: Todo, Cultura, Aire libre */}
        <div className="flex items-center gap-[7px]" data-name="Categorías">
          {row1.map(renderChip)}
        </div>

        {/* Fila 2: Gastronomía, Deporte */}
        <div className="flex items-center gap-[7px]" data-name="Categorías">
          {row2.map(renderChip)}
        </div>
      </div>
    </div>
  );
};
