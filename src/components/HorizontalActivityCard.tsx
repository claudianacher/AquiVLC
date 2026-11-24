import React from 'react';
import { CulturalActivity } from '../data/mockData';

interface HorizontalActivityCardProps {
  activity: CulturalActivity;
  onToggleSave: (id: string) => void;
  onSelectActivity?: (activity: CulturalActivity) => void;
}

export const HorizontalActivityCard: React.FC<HorizontalActivityCardProps> = ({
  activity,
  onToggleSave,
  onSelectActivity,
}) => {
  return (
    <article
      onClick={() => onSelectActivity && onSelectActivity(activity)}
      className="bg-[#fffcf6] border border-[#e5dacb] rounded-[18px] p-3 flex gap-3 items-center w-full transition-shadow hover:shadow-md cursor-pointer group"
      data-name="Actividad"
    >
      {/* Fotografía de la actividad (miniatura vertical de 88x112) */}
      <div
        className="w-[88px] h-[112px] rounded-[10px] overflow-hidden relative shrink-0"
        data-name="Imagen"
      >
        <img
          src={activity.imageUrl || '/assets/sabores-cabanyal.png'}
          alt={activity.title}
          className="w-full h-full object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Bloque de información */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0" data-name="Información">
        {/* Categoría y Guardar */}
        <div className="flex items-center justify-between w-full" data-name="Categoría y guardar">
          <span className="font-sans font-semibold text-[#d9571d] text-[9px] tracking-wider uppercase">
            {activity.category}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(activity.id);
            }}
            title={activity.isSaved ? 'Guardado en favoritos' : 'Guardar en favoritos'}
            aria-label={activity.isSaved ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
            className="relative w-[17px] h-[17px] cursor-pointer active:scale-90 transition-transform flex items-center justify-center"
            data-name="bookmark"
          >
            <img
              src={activity.isSaved ? '/assets/bookmark-check.svg' : '/assets/bookmark-outline.svg'}
              alt="Guardar"
              className="w-full h-full block"
            />
          </button>
        </div>

        {/* Nombre de la actividad */}
        <h4 className="font-serif text-[24px] leading-[1.05] text-[#302d27] group-hover:text-[#d9571d] transition-colors truncate">
          {activity.title}
        </h4>

        {/* Lugar y barrio */}
        <p className="font-sans font-normal text-[11px] leading-[1.4] text-[#777064] truncate">
          {activity.venue}
        </p>

        {/* Fecha, hora y precio */}
        <p className="font-sans font-medium text-[11px] text-[#302d27]">
          {activity.date} · {activity.time} &nbsp;&nbsp;/&nbsp;&nbsp; {activity.price}
        </p>
      </div>
    </article>
  );
};
