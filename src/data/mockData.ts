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

export const HOY_ACTIVITIES: CulturalActivity[] = [
  {
    id: 'hoy-1',
    title: 'Un bocado de Valencia',
    category: 'Gastronomía',
    venue: 'Mercado Central',
    neighborhood: 'El Mercat',
    date: '20 oct',
    time: '11:00',
    price: '18 €',
    imageUrl: '/assets/mercado-central.png',
    isSaved: false,
    description: 'Descubre los sabores más auténticos de la huerta y el mar en el impresionante edificio modernista del Mercado Central.',
  },
  {
    id: 'hoy-2',
    title: 'Barro, manos y tradición',
    category: 'Cultura',
    venue: 'Taller del Carmen · Ciutat Vella',
    neighborhood: 'El Carmen',
    date: '20 oct',
    time: '17:00',
    price: '28 €',
    imageUrl: '/assets/taller-carmen.png',
    isSaved: true,
    description: 'Taller artesanal de cerámica valenciana tradicional en el corazón del histórico barrio del Carmen.',
  },
  {
    id: 'hoy-3',
    title: 'Paseo entre puentes',
    category: 'Aire libre',
    venue: 'Jardín del Turia · Pont del Real',
    neighborhood: 'Jardines del Turia',
    date: '20 oct',
    time: '18:00',
    price: 'Gratis',
    imageUrl: '/assets/jardin-turia.png',
    isSaved: false,
    description: 'Paseo guiado al atardecer entre los puentes históricos del antiguo cauce del río Turia.',
  },
  {
    id: 'hoy-4',
    title: 'Kilómetros junto al mar',
    category: 'Deporte',
    venue: 'Paseo de la Malvarrosa',
    neighborhood: 'La Malvarrosa',
    date: '20 oct',
    time: '19:00',
    price: 'Gratis',
    imageUrl: '/assets/paseo-malvarrosa.png',
    isSaved: true,
    description: 'Sesión de running suave junto a la brisa marina recorriendo el paseo marítimo de Valencia.',
  },
];

export const AGENDA_ACTIVITIES: CulturalActivity[] = [
  {
    id: 'agenda-1',
    title: 'La Albufera, sin prisa',
    category: 'Aire libre',
    venue: 'Embarcadero de El Palmar',
    neighborhood: 'Albufera',
    date: '24 oct',
    time: '17:30',
    price: '12 €',
    imageUrl: '/assets/albufera-atardecer.png',
    isSaved: true,
    description: 'Paseo al atardecer en barca tradicional valenciana navegando por las tranquilas aguas de La Albufera con guía local.',
  },
  {
    id: 'agenda-2',
    title: 'Sabores del Cabanyal',
    category: 'Gastronomía',
    venue: 'Mercado del Cabanyal',
    neighborhood: 'El Cabanyal',
    date: '25 oct',
    time: '11:00',
    price: '22 €',
    imageUrl: '/assets/sabores-cabanyal.png',
    isSaved: false,
    description: 'Ruta gastronómica y degustación de tapas marineras tradicionales en las calles de la arquitectura modernista popular.',
  },
];

export const MOCK_ACTIVITIES: CulturalActivity[] = [
  FEATURED_ACTIVITY,
  ...HOY_ACTIVITIES,
  ...AGENDA_ACTIVITIES,
];

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'explorar', label: 'Explorar', iconSrc: '/assets/compass.svg', path: '/' },
  { id: 'hoy', label: 'Hoy', iconSrc: '/assets/sun-nav.svg', path: '/hoy' },
  { id: 'agenda', label: 'Agenda', iconSrc: '/assets/calendar-days.svg', path: '/agenda' },
  { id: 'mapa', label: 'Mapa', iconSrc: '/assets/map-nav.svg', path: '/mapa' },
  { id: 'guardados', label: 'Guardados', iconSrc: '/assets/heart.svg', path: '/guardados' },
];
