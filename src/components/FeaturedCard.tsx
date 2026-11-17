import React from 'react';
import { CulturalActivity } from '../data/mockData';

interface FeaturedCardProps {
  activity: CulturalActivity;
  onToggleSave: (id: string) => void;
  onViewMore?: () => void;
  onSelectActivity?: (activity: CulturalActivity) => void;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  activity,
  onToggleSave,
  onViewMore,
  onSelectActivity,
}) => {
  return (
    <div className="flex flex-col gap-3.5 w-full" data-name="Selección del día">
      {/* Título de la sección con enlace para ver más planes */}
      <div
        className="flex items-center justify-between w-full"
        data-name="Título de sección"
      >
        <h2 className="font-serif text-[30px] leading-tight text-[#302d27]" data-name="Título">
          Hoy nos inspira
        </h2>
        <button
          type="button"
          onClick={onViewMore}
          className="font-sans font-semibold text-[11px] text-[#d9571d] hover:underline cursor-pointer select-none"
          data-name="Ver más"
        >
          Ver los 4 planes →
        </button>
      </div>

      {/* Tarjeta de actividad destacada */}
      <article
        onClick={() => onSelectActivity && onSelectActivity(activity)}
        className="bg-[#fffcf6] border border-[#e5dacb] rounded-[18px] p-3 flex flex-col gap-3.5 transition-shadow hover:shadow-md cursor-pointer group"
        data-name="Actividad destacada"
      >
        {/* Fotografía de la actividad */}
        <div
          className="h-[168px] w-full rounded-[10px] overflow-hidden relative shrink-0"
          data-name="Fotografía de la actividad"
        >
          <img
            src={activity.imageUrl || '/assets/fotografia-actividad.png'}
            alt={activity.title}
            className="w-full h-full object-cover rounded-[10px] group-hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Bloque de información */}
        <div className="flex flex-col gap-1.5 w-full" data-name="Información">
          {/* Categoría y Guardar */}
          <div
            className="flex items-center justify-between w-full"
            data-name="Categoría y guardar"
          >
            <span
              className="font-sans font-semibold text-[#d9571d] text-[9px] tracking-wider uppercase"
              data-name="Categoría"
            >
              {activity.category}
            </span>

            {/* Botón interactivo de guardado */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(activity.id);
              }}
              title={activity.isSaved ? 'Guardado en favoritos' : 'Guardar en favoritos'}
              aria-label={activity.isSaved ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
              className="relative w-[17px] h-[17px] cursor-pointer active:scale-90 transition-transform flex items-center justify-center"
              data-name="bookmark-check"
            >
              <img
                src="/assets/bookmark-check.svg"
                alt="Guardar"
                className={`w-full h-full block transition-opacity ${
                  activity.isSaved ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                }`}
              />
            </button>
          </div>

          {/* Nombre de la actividad */}
          <h3
            className="font-serif text-[28px] leading-[1.05] text-[#302d27] group-hover:text-[#d9571d] transition-colors"
            data-name="Actividad"
          >
            {activity.title}
          </h3>

          {/* Lugar y barrio */}
          <p
            className="font-sans font-normal text-[11px] leading-[1.4] text-[#777064]"
            data-name="Lugar"
          >
            {activity.venue} · {activity.neighborhood}
          </p>

          {/* Fecha, hora y precio */}
          <p
            className="font-sans font-medium text-[11px] text-[#302d27]"
            data-name="Fecha hora y precio"
          >
            {activity.date} · {activity.time} &nbsp;&nbsp;/&nbsp;&nbsp; {activity.price}
          </p>
        </div>
      </article>
    </div>
  );
};
