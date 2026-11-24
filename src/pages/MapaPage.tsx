import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BannerNotice } from '../components/BannerNotice';
import { CategoryFilters } from '../components/CategoryFilters';
import { SchematicMap } from '../components/SchematicMap';
import { HorizontalActivityCard } from '../components/HorizontalActivityCard';
import { EditorialNote } from '../components/EditorialNote';
import { BottomNavigation } from '../components/BottomNavigation';
import { ActivityDetailModal } from '../components/ActivityDetailModal';
import { PendingScreenModal } from '../components/PendingScreenModal';
import { Category, CulturalActivity } from '../data/mockData';
import { culturalService } from '../services/culturalService';
import { useSavedActivities } from '../context/SavedActivitiesContext';
import { Smartphone, Monitor } from 'lucide-react';

export const MapaPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSavedActivities();
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todo');
  const [activities, setActivities] = useState<CulturalActivity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string>('hoy-2');
  const [selectedActivityForDetail, setSelectedActivityForDetail] = useState<CulturalActivity | null>(null);
  const [viewMode, setViewMode] = useState<'figma' | 'responsive'>('figma');

  const [pendingModalInfo, setPendingModalInfo] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
  });

  // Carga de actividades de hoy para el mapa
  useEffect(() => {
    culturalService.getHoyActivities(selectedCategory).then((data) => {
      setActivities(data);
      // Mantener seleccionada la actividad si sigue en el filtro o seleccionar la primera disponible
      if (data.length > 0 && !data.some((a) => a.id === selectedActivityId)) {
        setSelectedActivityId(data[0].id);
      }
    });
  }, [selectedCategory, selectedActivityId]);

  const handleToggleSave = async (activityId: string) => {
    const nextSaved = await toggleSave(activityId);
    if (selectedActivityForDetail && selectedActivityForDetail.id === activityId) {
      setSelectedActivityForDetail({
        ...selectedActivityForDetail,
        isSaved: nextSaved,
      });
    }
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === 'explorar') {
      navigate('/');
    } else if (tabId === 'hoy') {
      navigate('/hoy');
    } else if (tabId === 'agenda') {
      navigate('/agenda');
    } else if (tabId === 'mapa') {
      // Ya estamos en mapa
    } else if (tabId === 'guardados') {
      navigate('/guardados');
    }
  };

  const selectedActivity =
    activities.find((a) => a.id === selectedActivityId) ||
    activities.find((a) => a.id === 'hoy-2') ||
    activities[0];

  return (
    <div className="min-h-screen bg-[#ede4d4] flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Selector de modo de visualización en pantallas desktop/tablet */}
      <div className="hidden sm:flex items-center gap-2 mb-4 bg-[#fffcf6] border border-[#e5dacb] px-3 py-1.5 rounded-full shadow-xs text-xs">
        <span className="text-[#777064] font-medium mr-1">Modo de visualización:</span>
        <button
          type="button"
          onClick={() => setViewMode('figma')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            viewMode === 'figma'
              ? 'bg-[#d9571d] text-white shadow-xs'
              : 'text-[#302d27] hover:bg-[#f5e3d1]/60'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Figma 1:1 (390px)</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('responsive')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            viewMode === 'responsive'
              ? 'bg-[#d9571d] text-white shadow-xs'
              : 'text-[#302d27] hover:bg-[#f5e3d1]/60'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Escritorio fluido</span>
        </button>
      </div>

      {/* Marco de la aplicación (Frame Figma 23:2747) */}
      <div
        className={`w-full ${
          viewMode === 'figma' ? 'max-w-[390px]' : 'max-w-2xl'
        } min-h-[100vh] bg-[#fcf5ea] shadow-2xl sm:rounded-[36px] overflow-hidden flex flex-col justify-between border sm:border-[#e5dacb] relative transition-all duration-300`}
        data-node-id="23:2747"
        data-name="Mapa · Planes por Valencia"
      >
        <div className="flex-1 flex flex-col w-full">
          {/* Cabecera idéntica al diseño en Figma */}
          <header className="flex items-center justify-between h-[78px] px-6 pt-3 relative w-full" data-name="Cabecera">
            <Link to="/" className="flex items-center gap-[7px] select-none cursor-pointer" data-name="Marca">
              <div className="relative shrink-0 w-[27px] h-[27px]" data-name="sun">
                <img src="/assets/sun-logo.svg" alt="Sol de Valencia" className="w-full h-full block" />
              </div>
              <span className="font-serif text-[29px] leading-none text-[#302d27] tracking-tight">
                aquí Valencia
              </span>
            </Link>

            <div className="flex items-center gap-1 text-[#302d27] select-none cursor-default" data-name="Localidad">
              <div className="relative shrink-0 w-[14px] h-[14px]" data-name="map-pin">
                <img src="/assets/map-pin.svg" alt="Ubicación" className="w-full h-full block" />
              </div>
              <span className="font-sans font-semibold text-[11px] leading-none">
                Valencia
              </span>
            </div>
          </header>

          {/* Aviso superior ilustrativo */}
          <BannerNotice message="AGENDA ILUSTRATIVA · HOY, 20 OCT 2026" />

          {/* Sección de introducción del mapa */}
          <div className="flex flex-col gap-5 px-6 pt-7 pb-[22px] w-full" data-name="Introducción del mapa">
            {/* Introducción */}
            <div className="flex flex-col gap-2 items-start w-full" data-name="Introducción">
              <span className="font-sans font-semibold text-[#d9571d] text-[10px] tracking-wider uppercase select-none">
                VALENCIA, BARRIO A BARRIO
              </span>
              <h1 className="font-serif text-[42px] leading-[1.05] text-[#302d27] select-none">
                Encuentra tu plan.
              </h1>
            </div>

            {/* Filtro de fecha (Pill control: Hoy activo / Próximos días inactivo) */}
            <div className="bg-[#f5e3d1] p-1 rounded-[100px] flex items-center w-full" data-name="Filtro de fecha">
              <div
                className="bg-[#fffcf6] flex-1 h-[36px] flex items-center justify-center rounded-[100px] text-[12px] font-sans font-semibold text-[#d9571d] shadow-xs select-none"
                data-name="Opción de fecha"
              >
                Hoy · 20 oct
              </div>
              <button
                type="button"
                onClick={() => navigate('/agenda')}
                className="flex-1 h-[36px] flex items-center justify-center rounded-[100px] text-[12px] font-sans font-semibold text-[#777064] hover:text-[#302d27] transition-colors cursor-pointer"
                data-name="Opción de fecha"
              >
                Próximos días
              </button>
            </div>

            {/* Filtros de categoría */}
            <CategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Resultados y enlace Ver lista */}
            <div className="flex items-center justify-between w-full" data-name="Resultados de mapa">
              <p className="font-sans font-normal text-[12px] text-[#302d27]">
                {activities.length} planes de hoy en el mapa
              </p>
              <button
                type="button"
                onClick={() => navigate('/hoy')}
                className="font-sans font-semibold text-[12px] text-[#d9571d] hover:underline cursor-pointer"
              >
                Ver lista →
              </button>
            </div>
          </div>

          {/* Mapa esquemático interactivo de Valencia */}
          <SchematicMap
            activities={activities}
            selectedActivityId={selectedActivityId}
            onSelectActivity={setSelectedActivityId}
          />

          {/* Tarjeta de actividad seleccionada y botón de acción */}
          {selectedActivity && (
            <div className="flex flex-col gap-3.5 px-6 pt-[22px] w-full" data-name="Actividad seleccionada">
              <HorizontalActivityCard
                activity={{ ...selectedActivity, isSaved: isSaved(selectedActivity.id) }}
                onToggleSave={handleToggleSave}
                onSelectActivity={(act) => setSelectedActivityForDetail({ ...act, isSaved: isSaved(act.id) })}
              />

              <button
                type="button"
                onClick={() => setSelectedActivityForDetail({ ...selectedActivity, isSaved: isSaved(selectedActivity.id) })}
                className="group bg-[#d9571d] hover:bg-[#c24b16] active:scale-98 text-white font-sans font-semibold text-[14px] h-[48px] rounded-[100px] px-[18px] flex items-center justify-center gap-2.5 w-full shadow-sm hover:shadow transition-all cursor-pointer"
                data-name="Action"
              >
                <span>Ver detalle del plan</span>
                <div className="w-[18px] h-[18px] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <img src="/assets/arrow-right.svg" alt="" className="w-full h-full block brightness-0 invert" />
                </div>
              </button>
            </div>
          )}

          {/* Nota editorial */}
          <EditorialNote />
        </div>

        {/* Barra de navegación inferior fija (con pestaña Mapa activa) */}
        <div className="sticky bottom-0 w-full z-40 bg-[#fffcf6]">
          <BottomNavigation
            activeTab="mapa"
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      {/* Modales interactivos */}
      <PendingScreenModal
        isOpen={pendingModalInfo.isOpen}
        onClose={() => setPendingModalInfo({ isOpen: false, title: '', description: '' })}
        title={pendingModalInfo.title}
        description={pendingModalInfo.description}
      />

      <ActivityDetailModal
        activity={selectedActivityForDetail}
        isOpen={Boolean(selectedActivityForDetail)}
        onClose={() => setSelectedActivityForDetail(null)}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
};
