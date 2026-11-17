import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { BannerNotice } from '../components/BannerNotice';
import { HeroSection } from '../components/HeroSection';
import { CategoryFilters } from '../components/CategoryFilters';
import { SearchBar } from '../components/SearchBar';
import { FeaturedCard } from '../components/FeaturedCard';
import { AgendaPromoCard } from '../components/AgendaPromoCard';
import { EditorialNote } from '../components/EditorialNote';
import { BottomNavigation } from '../components/BottomNavigation';
import { PendingScreenModal } from '../components/PendingScreenModal';
import { ActivityDetailModal } from '../components/ActivityDetailModal';
import { Category, CulturalActivity, LanguageOption, AVAILABLE_LANGUAGES } from '../data/mockData';
import { culturalService } from '../services/culturalService';
import { Smartphone, Monitor } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredActivity, setFeaturedActivity] = useState<CulturalActivity | null>(null);
  const [activeTab, setActiveTab] = useState('explorar');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(AVAILABLE_LANGUAGES[1]); // Español
  const [viewMode, setViewMode] = useState<'figma' | 'responsive'>('figma');

  // Modales y estados de interacción
  const [selectedActivityForDetail, setSelectedActivityForDetail] = useState<CulturalActivity | null>(null);
  const [pendingModalInfo, setPendingModalInfo] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
  });

  const explorationRef = useRef<HTMLDivElement>(null);

  // Carga inicial de datos mediante el servicio desacoplado
  useEffect(() => {
    culturalService.getFeaturedActivity().then((activity) => {
      setFeaturedActivity(activity);
    });
  }, []);

  // Manejador de favoritos
  const handleToggleSave = async (activityId: string) => {
    const isSaved = await culturalService.toggleSaveActivity(activityId);
    if (featuredActivity && featuredActivity.id === activityId) {
      setFeaturedActivity({
        ...featuredActivity,
        isSaved,
      });
    }
    if (selectedActivityForDetail && selectedActivityForDetail.id === activityId) {
      setSelectedActivityForDetail({
        ...selectedActivityForDetail,
        isSaved,
      });
    }
  };

  // Scroll suave al hacer clic en "Descubrir planes de hoy"
  const handleDiscoverClick = () => {
    explorationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Manejo de tabs de navegación inferior
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId !== 'explorar') {
      const tabNames: Record<string, string> = {
        hoy: 'Actividades de Hoy en Valencia',
        agenda: 'Agenda cultural de los próximos días',
        mapa: 'Mapa interactivo de planes culturales',
        guardados: 'Tus planes favoritos guardados',
      };
      setPendingModalInfo({
        isOpen: true,
        title: tabNames[tabId] || 'Pantalla en desarrollo',
        description: `La pantalla «${tabNames[tabId] || tabId}» corresponde a las siguientes fases del diseño en Figma (Frames Hoy 23:2389, Agenda 23:2490, Mapa 23:2747 o Guardados 23:2854). En esta primera entrega se ha implementado el frame de entrada Escritorio/Inicio 01.`,
      });
    }
  };

  // Ver más planes
  const handleViewMore = () => {
    setPendingModalInfo({
      isOpen: true,
      title: 'Catálogo completo de planes',
      description: 'Esta acción abrirá la vista completa con los planes destacados del día conforme a la siguiente pantalla de la agenda.',
    });
  };

  // Abrir agenda desde la tarjeta promocional
  const handleOpenAgenda = () => {
    setPendingModalInfo({
      isOpen: true,
      title: 'Agenda para el fin de semana (24 y 25 oct)',
      description: 'Acceso a la programación completa de fin de semana en Valencia. Sección planificada para la fase de integración con Supabase.',
    });
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

      {/* Marco de la aplicación: Centrado y respetando el ancho exacto del diseño de Figma (390px) o fluido */}
      <div
        className={`w-full ${
          viewMode === 'figma' ? 'max-w-[390px]' : 'max-w-2xl'
        } min-h-[100vh] bg-[#fcf5ea] shadow-2xl sm:rounded-[36px] overflow-hidden flex flex-col justify-between border sm:border-[#e5dacb] relative transition-all duration-300`}
        data-node-id="23:2312"
        data-name="Inicio · Explorar Valencia"
      >
        {/* Contenido scrolleable superior */}
        <div className="flex-1 flex flex-col w-full">
          {/* Cabecera */}
          <Header
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />

          {/* Aviso superior ilustrativo */}
          <BannerNotice message="AGENDA ILUSTRATIVA · HOY, 20 OCT 2026" />

          {/* Hero / Bienvenida mediterránea */}
          <HeroSection onDiscoverClick={handleDiscoverClick} />

          {/* Contenido de exploración interactivo */}
          <div
            ref={explorationRef}
            className="flex flex-col gap-6 px-6 pt-6 w-full"
            data-name="Contenido de exploración"
          >
            {/* Filtros por categoría */}
            <CategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Buscador de planes */}
            <SearchBar
              query={searchQuery}
              onChange={setSearchQuery}
              onSearchSubmit={() => {
                if (searchQuery.trim()) {
                  setPendingModalInfo({
                    isOpen: true,
                    title: `Búsqueda: "${searchQuery}"`,
                    description: `Filtro por "${searchQuery}" aplicado sobre los planes culturales activos de Valencia.`,
                  });
                }
              }}
            />

            {/* Actividad destacada del día ("Hoy nos inspira") */}
            {featuredActivity && (
              <FeaturedCard
                activity={featuredActivity}
                onToggleSave={handleToggleSave}
                onViewMore={handleViewMore}
                onSelectActivity={(activity) => setSelectedActivityForDetail(activity)}
              />
            )}

            {/* Tarjeta de invitación a la agenda de fin de semana */}
            <AgendaPromoCard onOpenAgenda={handleOpenAgenda} />
          </div>

          {/* Nota editorial */}
          <EditorialNote />
        </div>

        {/* Barra de navegación principal fija en la parte inferior */}
        <div className="sticky bottom-0 w-full z-40 bg-[#fffcf6]">
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      {/* Modales informativos de interacción */}
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
