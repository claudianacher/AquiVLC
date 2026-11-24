import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerNotice } from '../components/BannerNotice';
import { EditorialNote } from '../components/EditorialNote';
import { BottomNavigation } from '../components/BottomNavigation';
import { ActivityDetailModal } from '../components/ActivityDetailModal';
import { CulturalActivity } from '../data/mockData';
import { useSavedActivities } from '../context/SavedActivitiesContext';
import { Smartphone, Monitor, Heart, Compass } from 'lucide-react';

export const GuardadosPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    savedActivities,
    toggleSave,
    totalSavedCount,
    hoySavedCount,
    proximosSavedCount,
  } = useSavedActivities();

  const [activeFilter, setActiveFilter] = useState<'todos' | 'hoy' | 'proximos'>('todos');
  const [selectedActivityForDetail, setSelectedActivityForDetail] = useState<CulturalActivity | null>(null);
  const [viewMode, setViewMode] = useState<'figma' | 'responsive'>('figma');

  // Clasificación de actividades guardadas
  const hoyActivities = savedActivities.filter(
    (act) => act.date.includes('20 oct') || act.id.startsWith('hoy') || act.id === 'activity-1'
  );
  const proximosActivities = savedActivities.filter(
    (act) => !(act.date.includes('20 oct') || act.id.startsWith('hoy') || act.id === 'activity-1')
  );

  const handleToggleSave = async (activityId: string) => {
    await toggleSave(activityId);
    if (selectedActivityForDetail && selectedActivityForDetail.id === activityId) {
      setSelectedActivityForDetail({
        ...selectedActivityForDetail,
        isSaved: !selectedActivityForDetail.isSaved,
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
      navigate('/mapa');
    } else if (tabId === 'guardados') {
      // Ya estamos en guardados
    }
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
          <span>Adaptable / Pantalla completa</span>
        </button>
      </div>

      {/* Contenedor principal de la aplicación */}
      <div
        className={`w-full bg-[#fcf5ea] min-h-screen flex flex-col justify-between transition-all duration-300 ${
          viewMode === 'figma'
            ? 'max-w-[390px] shadow-2xl rounded-none sm:rounded-[36px] overflow-hidden border-x sm:border border-[#e5dacb]'
            : 'max-w-4xl shadow-md rounded-none sm:rounded-2xl border border-[#e5dacb]'
        }`}
        data-name="Guardados · Tus planes favoritos"
      >
        <div className="flex flex-col w-full">
          {/* Cabecera idéntica al diseño en Figma */}
          <header className="flex items-center justify-between h-[78px] px-6 pt-3 relative w-full" data-name="Cabecera">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-[7px] select-none cursor-pointer text-left"
              data-name="Marca"
            >
              <div className="relative shrink-0 w-[27px] h-[27px]" data-name="sun">
                <img src="/assets/sun-logo.svg" alt="Sol de Valencia" className="w-full h-full block" />
              </div>
              <span className="font-serif text-[29px] leading-none text-[#302d27] tracking-tight">
                aquí Valencia
              </span>
            </button>

            <div className="flex items-center gap-1 text-[#302d27] select-none cursor-default" data-name="Localidad">
              <div className="relative shrink-0 w-[14px] h-[14px]" data-name="map-pin">
                <img src="/assets/map-pin.svg" alt="Ubicación" className="w-full h-full block" />
              </div>
              <span className="font-sans font-semibold text-[11px] leading-none">
                Valencia
              </span>
            </div>
          </header>

          {/* Aviso de ejemplo */}
          <BannerNotice message="AGENDA ILUSTRATIVA · HOY, 20 OCT 2026" />

          {/* Colección de planes */}
          <main className="flex flex-col gap-6 px-6 pt-7 w-full" data-name="Colección de planes">
            {/* Introducción */}
            <section className="flex flex-col gap-2 w-full" data-name="Introducción">
              <span
                className="font-sans font-semibold text-[10px] text-[#d9571d] tracking-wider uppercase"
                data-name="Antetítulo"
              >
                TU PEQUEÑA LISTA DE DESEOS
              </span>
              <h1
                className="font-serif text-[42px] leading-[1.05] text-[#302d27]"
                data-name="Titular"
              >
                Para vivir después.
              </h1>
              <p
                className="font-sans font-normal text-[14px] leading-[1.5] text-[#777064]"
                data-name="Subtítulo"
              >
                Ese taller, ese atardecer, ese rato para ti. Tus ideas favoritas, juntas.
              </p>
            </section>

            {/* Resumen de guardados */}
            <section
              className="bg-[#f5e3d1] rounded-[18px] p-[18px] flex items-center gap-3.5 w-full shadow-2xs"
              data-name="Resumen de guardados"
            >
              <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
                <img
                  src="/assets/bookmark-big.svg"
                  alt=""
                  className="w-full h-full block"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0" data-name="Resumen">
                <p className="font-serif text-[28px] leading-tight text-[#302d27] truncate">
                  {totalSavedCount === 0
                    ? 'Sin planes guardados'
                    : `${totalSavedCount} ${totalSavedCount === 1 ? 'plan por disfrutar' : 'planes por disfrutar'}`}
                </p>
                <p className="font-sans font-normal text-[11px] text-[#777064]">
                  {totalSavedCount === 0
                    ? 'Guarda planes con el icono de favoritos para verlos aquí'
                    : 'Selección de ejemplo · hoy y próximos días'}
                </p>
              </div>
            </section>

            {/* Filtros de guardados */}
            <div className="flex gap-[7px] items-center w-full overflow-x-auto no-scrollbar py-0.5" data-name="Filtros de guardados">
              <button
                type="button"
                onClick={() => setActiveFilter('todos')}
                className={`h-[36px] px-[13px] rounded-full text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                  activeFilter === 'todos'
                    ? 'bg-[#d9571d] border border-[#d9571d] text-white shadow-xs'
                    : 'bg-[#fffcf6] border border-[#e5dacb] text-[#302d27] hover:bg-[#f5e3d1]/50'
                }`}
                data-name="Filtro"
              >
                Todos · {totalSavedCount}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('hoy')}
                className={`h-[36px] px-[13px] rounded-full text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                  activeFilter === 'hoy'
                    ? 'bg-[#d9571d] border border-[#d9571d] text-white shadow-xs'
                    : 'bg-[#fffcf6] border border-[#e5dacb] text-[#302d27] hover:bg-[#f5e3d1]/50'
                }`}
                data-name="Filtro"
              >
                Hoy · {hoySavedCount}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('proximos')}
                className={`h-[36px] px-[13px] rounded-full text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                  activeFilter === 'proximos'
                    ? 'bg-[#d9571d] border border-[#d9571d] text-white shadow-xs'
                    : 'bg-[#fffcf6] border border-[#e5dacb] text-[#302d27] hover:bg-[#f5e3d1]/50'
                }`}
                data-name="Filtro"
              >
                Próximos · {proximosSavedCount}
              </button>
            </div>

            {/* Sección: Guardados de hoy */}
            {(activeFilter === 'todos' || activeFilter === 'hoy') && hoyActivities.length > 0 && (
              <section className="flex flex-col gap-3.5 w-full" data-name="Guardados de hoy">
                <div className="flex items-center justify-between w-full" data-name="Título de sección">
                  <h2 className="font-serif text-[30px] leading-tight text-[#302d27]">
                    Hoy, 20 de octubre
                  </h2>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  {hoyActivities.map((activity) => (
                    <article
                      key={activity.id}
                      onClick={() => setSelectedActivityForDetail(activity)}
                      className="bg-[#fffcf6] border border-[#e5dacb] rounded-[18px] p-3 flex gap-3 items-center w-full transition-all hover:shadow-md cursor-pointer group"
                      data-name="Actividad"
                    >
                      {/* Fotografía de la actividad */}
                      <div className="w-[88px] h-[112px] rounded-[10px] overflow-hidden relative shrink-0" data-name="Imagen">
                        <img
                          src={activity.imageUrl}
                          alt={activity.title}
                          className="w-full h-full object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Información */}
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0" data-name="Información">
                        <div className="flex items-center justify-between w-full" data-name="Categoría y guardar">
                          <span className="font-sans font-semibold text-[#d9571d] text-[9px] tracking-wider uppercase">
                            {activity.category}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSave(activity.id);
                            }}
                            title="Guardado en favoritos"
                            aria-label="Quitar de favoritos"
                            className="relative w-[17px] h-[17px] cursor-pointer active:scale-90 transition-transform flex items-center justify-center"
                            data-name="bookmark-check"
                          >
                            <img
                              src="/assets/bookmark-check.svg"
                              alt="Guardado"
                              className="w-full h-full block"
                            />
                          </button>
                        </div>

                        <h3 className="font-serif text-[24px] leading-[1.05] text-[#302d27] group-hover:text-[#d9571d] transition-colors truncate">
                          {activity.title}
                        </h3>

                        <p className="font-sans font-normal text-[11px] leading-[1.4] text-[#777064] truncate">
                          {activity.venue}
                        </p>

                        <p className="font-sans font-medium text-[11px] text-[#302d27]">
                          {activity.date} · {activity.time} &nbsp;&nbsp;/&nbsp;&nbsp; {activity.price}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Sección: Guardados futuros / próximos días */}
            {(activeFilter === 'todos' || activeFilter === 'proximos') && proximosActivities.length > 0 && (
              <section className="flex flex-col gap-3.5 w-full" data-name="Guardados futuros">
                <div className="flex items-center justify-between w-full" data-name="Título de sección">
                  <h2 className="font-serif text-[30px] leading-tight text-[#302d27]">
                    Sábado, 24 de octubre
                  </h2>
                </div>

                <div className="flex flex-col gap-3.5 w-full">
                  {proximosActivities.map((activity) => (
                    <article
                      key={activity.id}
                      onClick={() => setSelectedActivityForDetail(activity)}
                      className="bg-[#fffcf6] border border-[#e5dacb] rounded-[18px] p-3 flex flex-col gap-3.5 w-full transition-all hover:shadow-md cursor-pointer group"
                      data-name="Actividad destacada"
                    >
                      {/* Fotografía de la actividad */}
                      <div className="h-[168px] w-full rounded-[10px] overflow-hidden relative shrink-0" data-name="Fotografía de la actividad">
                        <img
                          src={activity.imageUrl}
                          alt={activity.title}
                          className="w-full h-full object-cover rounded-[10px] group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>

                      {/* Información */}
                      <div className="flex flex-col gap-1.5 w-full" data-name="Información">
                        <div className="flex items-center justify-between w-full" data-name="Categoría y guardar">
                          <span className="font-sans font-semibold text-[#d9571d] text-[9px] tracking-wider uppercase">
                            {activity.category}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSave(activity.id);
                            }}
                            title="Guardado en favoritos"
                            aria-label="Quitar de favoritos"
                            className="relative w-[17px] h-[17px] cursor-pointer active:scale-90 transition-transform flex items-center justify-center"
                            data-name="bookmark-check"
                          >
                            <img
                              src="/assets/bookmark-check.svg"
                              alt="Guardado"
                              className="w-full h-full block"
                            />
                          </button>
                        </div>

                        <h3 className="font-serif text-[28px] leading-[1.05] text-[#302d27] group-hover:text-[#d9571d] transition-colors">
                          {activity.title}
                        </h3>

                        <p className="font-sans font-normal text-[11px] leading-[1.4] text-[#777064]">
                          {activity.venue}
                        </p>

                        <p className="font-sans font-medium text-[11px] text-[#302d27]">
                          {activity.date} · {activity.time} &nbsp;&nbsp;/&nbsp;&nbsp; {activity.price}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Estado vacío cuando no hay planes según el filtro seleccionado */}
            {((activeFilter === 'todos' && totalSavedCount === 0) ||
              (activeFilter === 'hoy' && hoyActivities.length === 0) ||
              (activeFilter === 'proximos' && proximosActivities.length === 0)) && (
              <div className="bg-[#fffcf6] border border-[#e5dacb] rounded-[18px] p-6 flex flex-col items-center text-center gap-3 w-full">
                <div className="w-12 h-12 rounded-full bg-[#f5e3d1] flex items-center justify-center text-[#d9571d]">
                  <Heart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-[24px] text-[#302d27] leading-snug">
                  {activeFilter === 'todos'
                    ? 'Tu lista de guardados está vacía'
                    : activeFilter === 'hoy'
                    ? 'No tienes planes guardados para hoy'
                    : 'No tienes planes guardados para los próximos días'}
                </h3>
                <p className="font-sans text-xs text-[#777064] max-w-xs leading-relaxed">
                  Pulsa el icono de marcador en cualquier actividad de la agenda, de hoy o del mapa para guardarla y consultarla aquí.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="mt-2 inline-flex items-center gap-2 bg-[#d9571d] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#b84513] transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explorar planes de Valencia</span>
                </button>
              </div>
            )}

            {/* Seguir descubriendo */}
            <section className="flex flex-col gap-3 items-center w-full pt-2" data-name="Seguir descubriendo">
              <h2 className="font-serif text-[26px] leading-tight text-[#302d27] text-center w-full">
                Siempre queda algo por descubrir.
              </h2>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-[#fffcf6] border border-[#e5dacb] rounded-full h-[48px] px-[18px] flex items-center justify-center gap-2.5 text-[14px] font-semibold text-[#302d27] hover:border-[#d9571d] hover:text-[#d9571d] transition-colors w-full cursor-pointer shadow-2xs group"
                data-name="Action"
              >
                <span>Explorar más planes</span>
                <img
                  src="/assets/arrow-right.svg"
                  alt=""
                  className="w-[18px] h-[18px] block group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </section>
          </main>

          {/* Nota editorial */}
          <EditorialNote />
        </div>

        {/* Navegación principal */}
        <BottomNavigation activeTab="guardados" onTabChange={handleTabChange} />
      </div>

      {/* Modal de detalle completo de la actividad */}
      <ActivityDetailModal
        activity={selectedActivityForDetail}
        isOpen={!!selectedActivityForDetail}
        onClose={() => setSelectedActivityForDetail(null)}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
};

export default GuardadosPage;
