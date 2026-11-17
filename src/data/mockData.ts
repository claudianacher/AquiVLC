export interface CulturalActivity {
  id: string;
  title: string;
  category: 'Cultura' | 'Aire libre' | 'Gastronomía' | 'Deporte';
  venue: string;
  neighborhood: string;
  date: string;
  time: string;
  price: string;
  imageUrl: string;
  isSaved?: boolean;
  featured?: boolean;
  description?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  iconSrc: string;
  path: string;
  active?: boolean;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'val', name: 'Valencià', nativeName: 'Valencià' },
  { code: 'es', name: 'Español', nativeName: 'Español' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'Français', nativeName: 'Français' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano' },
];

export const CATEGORIES = [
  'Todo',
  'Cultura',
  'Aire libre',
  'Gastronomía',
  'Deporte',
] as const;

export type Category = typeof CATEGORIES[number];

export const FEATURED_ACTIVITY: CulturalActivity = {
  id: 'activity-1',
  title: 'Barro, manos y tradición',
  category: 'Cultura',
  venue: 'Taller del Carmen',
  neighborhood: 'Ciutat Vella',
  date: '20 oct',
  time: '17:00',
  price: '28 €',
  imageUrl: '/assets/fotografia-actividad.png',
  isSaved: true,
  featured: true,
  description: 'Taller artesanal de cerámica valenciana tradicional en el corazón del histórico barrio del Carmen.',
};

export const MOCK_ACTIVITIES: CulturalActivity[] = [
  FEATURED_ACTIVITY,
  {
    id: 'activity-2',
    title: 'Ruta de la Seda y la Lonja gótica',
    category: 'Cultura',
    venue: 'Lonja de la Seda',
    neighborhood: 'El Mercat',
    date: '20 oct',
    time: '18:30',
    price: '12 €',
    imageUrl: '/assets/fotografia-actividad.png',
    isSaved: false,
    description: 'Recorrido guiado por el esplendor del siglo de oro valenciano.',
  },
  {
    id: 'activity-3',
    title: 'Atardecer en barca por La Albufera',
    category: 'Aire libre',
    venue: 'Embarcadero del Palmar',
    neighborhood: 'Albufera',
    date: '20 oct',
    time: '19:15',
    price: '6 €',
    imageUrl: '/assets/fotografia-actividad.png',
    isSaved: false,
    description: 'Paseo en barca tradicional con la luz dorada del atardecer mediterráneo.',
  },
  {
    id: 'activity-4',
    title: 'Cata de vinos y quesos valencianos',
    category: 'Gastronomía',
    venue: 'Mercado Central',
    neighborhood: 'Ciutat Vella',
    date: '20 oct',
    time: '20:00',
    price: '22 €',
    imageUrl: '/assets/fotografia-actividad.png',
    isSaved: false,
    description: 'Degustación de productos locales con denominación de origen.',
  },
  {
    id: 'activity-5',
    title: 'Paseo ciclista por el Antiguo Cauce del Turia',
    category: 'Deporte',
    venue: 'Puente de las Flores',
    neighborhood: 'Jardines del Turia',
    date: '20 oct',
    time: '10:00',
    price: 'Gratis',
    imageUrl: '/assets/fotografia-actividad.png',
    isSaved: false,
    description: 'Ruta en bicicleta recorriendo el pulmón verde de la ciudad.',
  },
];

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'explorar', label: 'Explorar', iconSrc: '/assets/compass.svg', path: '/', active: true },
  { id: 'hoy', label: 'Hoy', iconSrc: '/assets/sun-nav.svg', path: '/hoy' },
  { id: 'agenda', label: 'Agenda', iconSrc: '/assets/calendar-days.svg', path: '/agenda' },
  { id: 'mapa', label: 'Mapa', iconSrc: '/assets/map-nav.svg', path: '/mapa' },
  { id: 'guardados', label: 'Guardados', iconSrc: '/assets/heart.svg', path: '/guardados' },
];
