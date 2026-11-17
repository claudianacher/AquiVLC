import {
  CulturalActivity,
  FEATURED_ACTIVITY,
  MOCK_ACTIVITIES,
  Category,
} from '../data/mockData';

/**
 * CulturalService
 * 
 * Capa de servicio preparada para desacoplar los componentes visuales
 * de la persistencia de datos. Actualmente opera sobre datos mock en memoria
 * y está preparada arquitectónicamente para integrar el cliente de Supabase
 * en fases posteriores sin alterar los componentes.
 */
class CulturalService {
  private activities: CulturalActivity[] = [...MOCK_ACTIVITIES];
  private savedActivityIds: Set<string> = new Set(['activity-1']);

  /**
   * Obtiene la actividad destacada de la portada ("Hoy nos inspira")
   */
  async getFeaturedActivity(): Promise<CulturalActivity> {
    // Simula latencia de red leve para comportamiento asíncrono realista
    await new Promise((resolve) => setTimeout(resolve, 50));
    const featured = this.activities.find((a) => a.featured) || FEATURED_ACTIVITY;
    return {
      ...featured,
      isSaved: this.savedActivityIds.has(featured.id),
    };
  }

  /**
   * Obtiene todas las actividades filtradas opcionalmente por categoría
   */
  async getActivities(category?: Category): Promise<CulturalActivity[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    let list = this.activities;
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
    await new Promise((resolve) => setTimeout(resolve, 30));
    const normalized = query.toLowerCase().trim();
    if (!normalized) return this.getActivities();

    return this.activities
      .filter(
        (a) =>
          a.title.toLowerCase().includes(normalized) ||
          a.venue.toLowerCase().includes(normalized) ||
          a.neighborhood.toLowerCase().includes(normalized) ||
          a.category.toLowerCase().includes(normalized)
      )
      .map((a) => ({
        ...a,
        isSaved: this.savedActivityIds.has(a.id),
      }));
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
