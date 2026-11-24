import React, { useState } from 'react';
import { CulturalActivity } from '../data/mockData';

interface SchematicMapProps {
  activities: CulturalActivity[];
  selectedActivityId: string;
  onSelectActivity: (activityId: string) => void;
}

export const SchematicMap: React.FC<SchematicMapProps> = ({
  activities,
  selectedActivityId,
  onSelectActivity,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mapeo de actividades a posiciones relativas en el mapa esquemático de Valencia
  const markers = [
    {
      id: 'hoy-2', // Barro, manos y tradición
      name: 'Barro, manos y tradición',
      iconSrc: '/assets/paintbrush.svg',
      left: 81,
      top: 151,
      tagPosition: { left: 30, top: 195 },
    },
    {
      id: 'hoy-1', // Un bocado de Valencia
      name: 'Un bocado de Valencia',
      iconSrc: '/assets/utensils.svg',
      left: 104,
      top: 224,
      tagPosition: { left: 45, top: 268 },
    },
    {
      id: 'hoy-3', // Paseo entre puentes
      name: 'Paseo entre puentes',
      iconSrc: '/assets/trees.svg',
      left: 173,
      top: 86,
      tagPosition: { left: 120, top: 130 },
    },
    {
      id: 'hoy-4', // Kilómetros junto al mar
      name: 'Kilómetros junto al mar',
      iconSrc: '/assets/footprints.svg',
      left: 316,
      top: 179,
      tagPosition: { left: 220, top: 223 },
    },
  ];

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.4));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.9));
  const handleResetLocation = () => setZoomLevel(1);

  const selectedMarker = markers.find((m) => m.id === selectedActivityId) || markers[0];

  return (
    <div
      className="bg-[#eee6d7] relative h-[450px] w-full overflow-hidden select-none"
      data-name="Mapa esquemático de Valencia"
    >
      {/* Capas cartográficas escalables */}
      <div
        className="w-full h-full relative transition-transform duration-300 origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Manzanas urbanas */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" data-name="Manzanas urbanas">
          <img src="/assets/manzanas-urbanas.svg" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Avenidas */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" data-name="Avenidas">
          <div className="absolute inset-[35.44%_26.1%_30.45%_28.25%]">
            <img src="/assets/avenidas.svg" alt="" className="w-full h-full block" />
          </div>
        </div>

        {/* Jardín del Turia */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" data-name="Jardín del Turia">
          <div className="absolute inset-[-4.33%_-4.87%_-1%_-1.76%]">
            <img src="/assets/jardin-turia-mapa.svg" alt="" className="w-full h-full block" />
          </div>
        </div>

        {/* Sendero del Turia */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" data-name="Sendero del Turia">
          <div className="absolute inset-[-0.22%_-0.25%_0_0]">
            <img src="/assets/sendero-turia.svg" alt="" className="w-full h-full block" />
          </div>
        </div>

        {/* Playa y Mar Mediterráneo */}
        <div className="absolute bg-[#c5ddd9] h-full right-0 top-0 w-[42px]" data-name="Mar Mediterráneo" />
        <div className="absolute bg-[#f5e3d1] h-full right-[42px] top-0 w-[11px]" data-name="Playa" />

        {/* Nombres de Barrios */}
        <span
          className="absolute font-serif text-[#777064] text-[12px] pointer-events-none"
          style={{ left: '72px', top: '132px' }}
        >
          El Carmen
        </span>

        <span
          className="absolute font-serif text-[#302d27] text-[15px] pointer-events-none"
          style={{ left: '43px', top: '278px' }}
        >
          Ciutat Vella
        </span>

        <span
          className="absolute font-serif text-[#777064] text-[15px] pointer-events-none"
          style={{ left: '139px', top: '345px' }}
        >
          Russafa
        </span>

        <span
          className="absolute font-serif text-[#777064] text-[13px] pointer-events-none"
          style={{ left: '246px', top: '119px' }}
        >
          El Cabanyal
        </span>

        {/* Etiqueta rotada Jardín del Turia */}
        <div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{ left: '141px', top: '274px', width: '64px', height: '56px' }}
        >
          <span className="rotate-40 font-sans text-[#66745b] text-[10px] whitespace-nowrap">
            Jardín del Turia
          </span>
        </div>

        {/* Marcadores interactivos de actividad */}
        {markers
          .filter((m) => activities.length === 0 || activities.some((a) => a.id === m.id))
          .map((marker) => {
          const isSelected = selectedActivityId === marker.id;
          return (
            <button
              key={marker.id}
              type="button"
              onClick={() => onSelectActivity(marker.id)}
              className="absolute flex flex-col items-center cursor-pointer group active:scale-95 transition-transform z-20"
              style={{
                left: `${marker.left}px`,
                top: `${marker.top}px`,
                width: '36px',
                height: '42px',
              }}
              aria-label={`Ver plan en ${marker.name}`}
            >
              {/* Círculo contenedor del icono */}
              <div
                className={`w-[36px] h-[36px] rounded-full flex items-center justify-center shadow-md transition-all ${
                  isSelected
                    ? 'bg-[#d9571d] border-2 border-white scale-110'
                    : 'bg-[#fffcf6] border-2 border-[#d9571d] hover:scale-105'
                }`}
              >
                <div className="w-[17px] h-[17px] flex items-center justify-center">
                  <img
                    src={marker.iconSrc}
                    alt=""
                    className={`w-full h-full block ${isSelected ? 'brightness-0 invert' : ''}`}
                  />
                </div>
              </div>

              {/* Punto de apoyo */}
              <div className="w-[5px] h-[5px] mt-[1px] relative">
                <img src="/assets/punto-ubicacion.svg" alt="" className="w-full h-full block" />
              </div>
            </button>
          );
        })}

        {/* Etiqueta flotante de la actividad seleccionada */}
        {selectedMarker && (
          <div
            className="absolute bg-[#d9571d] px-[10px] py-[6px] rounded-[100px] shadow-md z-30 transition-all pointer-events-none"
            style={{
              left: `${selectedMarker.tagPosition.left}px`,
              top: `${selectedMarker.tagPosition.top}px`,
            }}
          >
            <p className="font-sans font-semibold text-[10px] text-white whitespace-nowrap">
              {selectedMarker.name}
            </p>
          </div>
        )}
      </div>

      {/* Controles del mapa (Zoom y centrado) */}
      <div
        className="absolute flex flex-col gap-2 z-30"
        style={{ left: '328px', top: '320px', width: '42px' }}
        data-name="Controles del mapa"
      >
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-[42px] h-[38px] bg-[#fffcf6] rounded-[10px] shadow-sm flex items-center justify-center text-[#302d27] hover:bg-[#f5e3d1]/60 active:scale-95 transition-all cursor-pointer"
          aria-label="Acercar mapa"
        >
          <img src="/assets/plus.svg" alt="+" className="w-[19px] h-[19px]" />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          className="w-[42px] h-[38px] bg-[#fffcf6] rounded-[10px] shadow-sm flex items-center justify-center text-[#302d27] hover:bg-[#f5e3d1]/60 active:scale-95 transition-all cursor-pointer"
          aria-label="Alejar mapa"
        >
          <img src="/assets/minus.svg" alt="-" className="w-[19px] h-[19px]" />
        </button>

        <button
          type="button"
          onClick={handleResetLocation}
          className="w-[42px] h-[38px] bg-[#fffcf6] rounded-[10px] shadow-sm flex items-center justify-center text-[#302d27] hover:bg-[#f5e3d1]/60 active:scale-95 transition-all cursor-pointer"
          aria-label="Centrar ubicación"
        >
          <img src="/assets/locate-fixed.svg" alt="Centrar" className="w-[19px] h-[19px]" />
        </button>
      </div>

      {/* Referencia de aviso al pie del mapa */}
      <div
        className="absolute bg-[#fffcf6] px-2 py-1 rounded-[10px] shadow-xs z-30 pointer-events-none"
        style={{ left: '16px', top: '420px' }}
      >
        <p className="font-sans font-normal text-[#777064] text-[9px] whitespace-nowrap">
          Mapa esquemático · ubicaciones orientativas
        </p>
      </div>
    </div>
  );
};
