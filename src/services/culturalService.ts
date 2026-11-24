import {
  CulturalActivity,
  FEATURED_ACTIVITY,
  HOY_ACTIVITIES,
  AGENDA_ACTIVITIES,
  MOCK_ACTIVITIES,
  Category,
} from '../data/mockData';
import { supabase, isSupabaseConfigured } from './supabaseClient';

/**
 * Normaliza una fila obtenida desde la tabla de Supabase al tipo CulturalActivity de la aplicación
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSupabaseRowToActivity(row: any): CulturalActivity {
  return {
    id: String(row.id || ''),
    title: row.title || row.titulo || 'Plan sin título',
    category: (row.category || row.categoria || 'Cultura') as CulturalActivity['category'],
    venue: row.venue || row.lugar || 'Valencia',
    neighborhood: row.neighborhood || row.barrio || 'Valencia',
    date: row.date || row.fecha || '',
    time: row.time || row.hora || '',
    price: row.price || row.precio || 'Gratis',
    imageUrl: row.image_url || row.imageUrl || row.imagen_url || '/assets/fotografia-actividad.png',
    featured: Boolean(row.featured ?? row.destacado ?? false),
    description: row.description || row.descripcion || '',
  };
}

/**
 * CulturalService
 * 
 * Capa de servicio preparada para desacoplar los componentes visuales
 * de la persistencia de datos. Conectada a Supabase
 * (https://bbklsalwduwxifdnprvt.supabase.co) con fallback automático
 * a los datos locales para garantizar alta disponibilidad y cero regresiones.
 */
class CulturalService {
  private fallbackActivities: CulturalActivity[] = [...MOCK_ACTIVITIES];
  private savedActivityIds: Set<string> = new Set(['activity-1', 'hoy-2', 'hoy-4', 'agenda-1']);

  /**
   * Indica si el cliente de Supabase está configurado con credenciales activas
   */
  public isConnectedToSupabase(): boolean {
    return isSupabaseConfigured;
  }

  /**
   * Consulta remota a Supabase con control de errores y filtros
   */
  private async fetchFromSupabase(filter?: {
    category?: Category;
    scope?: 'hoy' | 'agenda';
    featured?: boolean;
  }): Promise<CulturalActivity[] | null> {
    if (!supabase) return null;

    try {
      let query = supabase.from('activities').select('*');

      if (filter?.category && filter.category !== 'Todo') {
        query = query.eq('category', filter.category);
      }
      if (filter?.featured !== undefined) {
        query = query.eq('featured', filter.featured);
      }
      if (filter?.scope) {
        query = query.or(`scope.eq.${filter.scope},scope.eq.ambos`);
      }

      const { data, error } = await query;
      if (error) {
        console.warn('[CulturalService] Aviso al consultar Supabase:', error.message);
        return null;
      }

      if (data && data.length > 0) {
        return data.map(mapSupabaseRowToActivity);
      }
      return null;
    } catch (err) {
      console.warn('[CulturalService] Error de red o conexión con Supabase:', err);
      return null;
    }
  }

  /**
   * Obtiene la actividad destacada de la portada ("Hoy nos inspira")
   */
  async getFeaturedActivity(): Promise<CulturalActivity> {
    // Intentar consultar actividad destacada desde Supabase
    const remote = await this.fetchFromSupabase({ featured: true });
    const featured =
      remote && remote.length > 0
        ? remote[0]
        : this.fallbackActivities.find((a) => a.featured) || FEATURED_ACTIVITY;

    return {
      ...featured,
      isSaved: this.savedActivityIds.has(featured.id),
    };
  }

  /**
   * Obtiene las actividades para la vista de Hoy
   */
  async getHoyActivities(category?: Category): Promise<CulturalActivity[]> {
    const remote = await this.fetchFromSupabase({ scope: 'hoy', category });
    if (remote && remote.length > 0) {
      return remote.map((a) => ({
        ...a,
        isSaved: this.savedActivityIds.has(a.id),
      }));
    }

    // Fallback a datos mock locales
    let list = [...HOY_ACTIVITIES];
    if (category && category !== 'Todo') {
      list = list.filter((a) => a.category === category);
    }
    return list.map((a) => ({
      ...a,
      isSaved: this.savedActivityIds.has(a.id),
    }));
  }

  /**
   * Obtiene las actividades para la vista de Agenda
   */
  async getAgendaActivities(category?: Category): Promise<CulturalActivity[]> {
    const remote = await this.fetchFromSupabase({ scope: 'agenda', category });
    if (remote && remote.length > 0) {
      return remote.map((a) => ({
        ...a,
        isSaved: this.savedActivityIds.has(a.id),
      }));
    }

    // Fallback a datos mock locales
    let list = [...AGENDA_ACTIVITIES];
    if (category && category !== 'Todo') {
      list = list.filter((a) => a.category === category);
    }
    return list.map((a) => ({
      ...a,
      isSaved: this.savedActivityIds.has(a.id),
    }));
  }

  /**
   * Obtiene todas las actividades filtradas opcionalmente por categoría
   */
  async getActivities(category?: Category): Promise<CulturalActivity[]> {
    const remote = await this.fetchFromSupabase({ category });
    if (remote && remote.length > 0) {
      return remote.map((a) => ({
        ...a,
        isSaved: this.savedActivityIds.has(a.id),
      }));
    }

    let list = this.fallbackActivities;
    if (category && category !== 'Todo') {
      list = list.filter((a) => a.category === category);
    }
    return list.map((a) => ({
      ...a,
      isSaved: this.savedActivityIds.has(a.id),
    }));
  }

  /**
   * Busca actividades por término en título, barrio o lugar
   */
  async searchActivities(query: string): Promise<CulturalActivity[]> {
    const normalized = query.toLowerCase().trim();
    const all = await this.getActivities();
    if (!normalized) return all;

    return all.filter(
      (a) =>
        a.title.toLowerCase().includes(normalized) ||
        a.venue.toLowerCase().includes(normalized) ||
        a.neighborhood.toLowerCase().includes(normalized) ||
        a.category.toLowerCase().includes(normalized)
    );
  }

  /**
   * Alterna el estado de guardado/favorito de una actividad
   */
  async toggleSaveActivity(activityId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    if (this.savedActivityIds.has(activityId)) {
      this.savedActivityIds.delete(activityId);
      return false;
    } else {
      this.savedActivityIds.add(activityId);
      return true;
    }
  }

  /**
   * Verifica si una actividad está guardada
   */
  isActivitySaved(activityId: string): boolean {
    return this.savedActivityIds.has(activityId);
  }
}

export const culturalService = new CulturalService();
