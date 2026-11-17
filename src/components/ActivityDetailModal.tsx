import React from 'react';
import { CulturalActivity } from '../data/mockData';
import { X, MapPin, Calendar, Clock, Euro, Bookmark } from 'lucide-react';

interface ActivityDetailModalProps {
  activity: CulturalActivity | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
  onToggleSave,
}) => {
  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#fffcf6] border border-[#e5dacb] rounded-[24px] max-w-md w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-xs cursor-pointer transition-colors"
          aria-label="Cerrar detalle"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="h-52 w-full relative">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-3 left-4 bg-[#fffcf6]/90 backdrop-blur-xs px-2.5 py-1 rounded-[100px] text-[10px] font-semibold text-[#d9571d] uppercase tracking-wider">
            {activity.category}
          </span>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <h3 className="font-serif text-[28px] leading-tight text-[#302d27] mb-1">
              {activity.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#777064]">
              <MapPin className="w-3.5 h-3.5 text-[#d9571d]" />
              <span>{activity.venue} · {activity.neighborhood}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-[#f5e3d1]/50 border border-[#e5dacb] rounded-xl text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#777064] uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#d9571d]" /> Fecha
              </span>
              <span className="text-xs font-semibold text-[#302d27] mt-0.5">{activity.date}</span>
            </div>
            <div className="flex flex-col items-center border-x border-[#e5dacb]">
              <span className="text-[10px] text-[#777064] uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#d9571d]" /> Hora
              </span>
              <span className="text-xs font-semibold text-[#302d27] mt-0.5">{activity.time}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#777064] uppercase flex items-center gap-1">
                <Euro className="w-3 h-3 text-[#d9571d]" /> Precio
              </span>
              <span className="text-xs font-semibold text-[#302d27] mt-0.5">{activity.price}</span>
            </div>
          </div>

          {activity.description && (
            <p className="font-sans text-xs text-[#777064] leading-relaxed">
              {activity.description}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onToggleSave(activity.id)}
              className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-[100px] border text-xs font-semibold transition-all cursor-pointer ${
                activity.isSaved
                  ? 'bg-[#f5e3d1] border-[#d9571d] text-[#d9571d]'
                  : 'bg-[#fffcf6] border-[#e5dacb] text-[#302d27] hover:border-[#d9571d]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${activity.isSaved ? 'fill-[#d9571d]' : ''}`} />
              <span>{activity.isSaved ? 'Guardado en favoritos' : 'Guardar en favoritos'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 rounded-[100px] bg-[#d9571d] hover:bg-[#c24b16] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
