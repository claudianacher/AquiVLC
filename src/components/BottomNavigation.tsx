import React from 'react';
import { NAVIGATION_ITEMS } from '../data/mockData';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav
      className="bg-[#fffcf6] border-t border-[#e5dacb] h-[86px] pt-3 pb-5 px-3 flex items-start justify-around w-full shrink-0 select-none z-30"
      data-name="Navegación principal"
      aria-label="Navegación principal"
    >
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center gap-1.5 flex-1 min-w-0 cursor-pointer group active:scale-95 transition-transform"
            data-name="Destino"
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="relative w-[21px] h-[21px] flex items-center justify-center">
              <img
                src={item.iconSrc}
                alt=""
                className={`w-full h-full block transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'
                }`}
                style={{
                  filter: isActive
                    ? 'invert(37%) sepia(87%) saturate(1637%) hue-rotate(349deg) brightness(90%) contrast(92%)' // Matches terracotta #d9571d
                    : undefined,
                }}
              />
            </div>
            <span
              className={`font-sans text-[10px] leading-none transition-colors ${
                isActive
                  ? 'font-bold text-[#d9571d]'
                  : 'font-normal text-[#777064] group-hover:text-[#302d27]'
              }`}
              data-name="Etiqueta"
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
