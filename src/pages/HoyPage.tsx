import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BannerNotice } from '../components/BannerNotice';
import { CategoryFilters } from '../components/CategoryFilters';
import { HorizontalActivityCard } from '../components/HorizontalActivityCard';
import { EditorialNote } from '../components/EditorialNote';
import { BottomNavigation } from '../components/BottomNavigation';
import { ActivityDetailModal } from '../components/ActivityDetailModal';
import { PendingScreenModal } from '../components/PendingScreenModal';
import { Category, CulturalActivity } from '../data/mockData';
import { culturalService } from '../services/culturalService';
import { useSavedActivities } from '../context/SavedActivitiesContext';
import { Smartphone, Monitor } from 'lucide-react';

export const HoyPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSavedActivities();
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todo');
  const [activities, setActivities] = useState<CulturalActivity[]>([]);
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

  // Carga de actividades de Hoy
  useEffect(() => {
    culturalService.getHoyActivities(selectedCategory).then(setActivities);
  }, [selectedCategory]);

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
    } else if (tabId === 'agenda') {
      navigate('/agenda');
    } else if (tabId === 'hoy') {
      // Ya estamos en hoy
    } else if (tabId === 'mapa') {
      navigate('/mapa');
    } else if (tabId === 'guardados') {
      navigate('/guardados');
    }
  };

  const handleOpenMap = () => {
    navigate('/mapa');
  };

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

      {/* Marco de la aplicación (Frame Figma 23:2389) */}
      <div
        className={`w-full ${
          viewMode === 'figma' ? 'max-w-[390px]' : 'max-w-2xl'
        } min-h-[100vh] bg-[#fcf5ea] shadow-2xl sm:rounded-[36px] overflow-hidden flex flex-col justify-between border sm:border-[#e5dacb] relative transition-all duration-300`}
        data-node-id="23:2389"
        data-name="Hoy · Actividades en Valencia"
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

          {/* Contenido principal de la Agenda de hoy */}
          <div className="flex flex-col gap-[22px] px-6 pt-[28px] w-full" data-name="Agenda de hoy">
            {/* Introducción */}
            <div className="flex flex-col gap-2 items-start w-full" data-name="Introducción">
              <span className="font-sans font-semibold text-[#d9571d] text-[10px] tracking-wider uppercase select-none">
                MARTES, 20 DE OCTUBRE
              </span>
              <h1 className="font-serif text-[42px] leading-[1.05] text-[#302d27] select-none">
                Hoy se vive fuera.
              </h1>
              <p className="font-sans font-normal text-[14px] leading-[1.5] text-[#777064]">
                De la primera tapa al último paseo. Cuatro ideas para disfrutar la ciudad.
              </p>
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

            {/* Resultados y acceso al mapa */}
            <div className="flex items-center justify-between w-full" data-name="Resultados y vista">
              <p className="font-sans font-semibold text-[12px] text-[#302d27]">
                {activities.length} planes · por hora
              </p>
              <button
                type="button"
                onClick={handleOpenMap}
                className="flex items-center gap-[5px] text-[#d9571d] font-sans font-semibold text-[12px] hover:underline cursor-pointer"
                data-name="Ver en mapa"
              >
                <div className="relative shrink-0 w-[15px] h-[15px]" data-name="map">
                  <img src="/assets/map-ver.svg" alt="" className="w-full h-full block" />
                </div>
                <span>Ver mapa</span>
              </button>
            </div>

            {/* Lista de actividades por hora */}
            <div className="flex flex-col gap-3.5 w-full" data-name="Actividades por hora">
              {activities.map((activity) => (
                <HorizontalActivityCard
                  key={activity.id}
                  activity={{ ...activity, isSaved: isSaved(activity.id) }}
                  onToggleSave={handleToggleSave}
                  onSelectActivity={(act) => setSelectedActivityForDetail({ ...act, isSaved: isSaved(act.id) })}
                />
              ))}
            </div>

            {/* Consejo local */}
            <div className="bg-[#f5e3d1] rounded-[10px] p-4 flex items-center gap-3 w-full select-none" data-name="Consejo local">
              <div className="relative shrink-0 w-6 h-6" data-name="footprints">
                <img src="/assets/footprints.svg" alt="" className="w-full h-full block" />
              </div>
              <p className="font-sans font-normal text-[12px] leading-[1.5] text-[#302d27] flex-1">
                A tu ritmo: combina el taller del Carmen con un paseo por el Turia.
              </p>
            </div>
          </div>

          {/* Nota editorial */}
          <EditorialNote />
        </div>

        {/* Barra de navegación inferior fija (con pestaña Hoy activa) */}
        <div className="sticky bottom-0 w-full z-40 bg-[#fffcf6]">
          <BottomNavigation
            activeTab="hoy"
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
