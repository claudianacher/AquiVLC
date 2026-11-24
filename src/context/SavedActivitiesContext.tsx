import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CulturalActivity, MOCK_ACTIVITIES } from '../data/mockData';
import { culturalService } from '../services/culturalService';

interface SavedActivitiesContextType {
  savedIds: Set<string>;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => Promise<boolean>;
  savedActivities: CulturalActivity[];
  totalSavedCount: number;
  hoySavedCount: number;
  proximosSavedCount: number;
}

const SavedActivitiesContext = createContext<SavedActivitiesContextType | undefined>(undefined);

// Los 3 planes guardados iniciales mostrados en el diseño Figma Guardados (Frame 23:2854):
// 1. Barro, manos y tradición (hoy-2)
// 2. Kilómetros junto al mar (hoy-4)
// 3. La Albufera, sin prisa (agenda-1)
const INITIAL_SAVED_IDS = ['hoy-2', 'hoy-4', 'agenda-1'];

export const SavedActivitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('aquivlc_saved_ids');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return new Set(parsed);
      }
    } catch {
      // fallback
    }
    return new Set(INITIAL_SAVED_IDS);
  });

  const isSaved = (id: string) => {
    if (id === 'activity-1' && savedIds.has('hoy-2')) return true;
    if (id === 'hoy-2' && savedIds.has('activity-1')) return true;
    return savedIds.has(id);
  };

  const toggleSave = async (id: string): Promise<boolean> => {
    const isNowSaved = await culturalService.toggleSaveActivity(id);
    setSavedIds((prev) => {
      const next = new Set(prev);
      const isCurrentlySaved =
        prev.has(id) ||
        (id === 'activity-1' && prev.has('hoy-2')) ||
        (id === 'hoy-2' && prev.has('activity-1'));

      if (!isCurrentlySaved) {
        next.add(id);
        if (id === 'activity-1') next.add('hoy-2');
        if (id === 'hoy-2') next.add('activity-1');
      } else {
        next.delete(id);
        if (id === 'activity-1') next.delete('hoy-2');
        if (id === 'hoy-2') next.delete('activity-1');
      }
      try {
        localStorage.setItem('aquivlc_saved_ids', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
    return isNowSaved;
  };

  // Sincronizar con culturalService al cargar
  useEffect(() => {
    savedIds.forEach((id) => {
      if (!culturalService.isActivitySaved(id)) {
        culturalService.toggleSaveActivity(id);
      }
    });
  }, [savedIds]);

  // Obtener actividades guardadas sin duplicar planes que compartan título
  const seenTitles = new Set<string>();
  const savedActivities: CulturalActivity[] = [];

  for (const act of MOCK_ACTIVITIES) {
    const saved = isSaved(act.id);
    if (saved && !seenTitles.has(act.title)) {
      seenTitles.add(act.title);
      savedActivities.push({
        ...act,
        isSaved: true,
      });
    }
  }

  const totalSavedCount = savedActivities.length;
  const hoySavedCount = savedActivities.filter(
    (act) => act.date.includes('20 oct') || act.id.startsWith('hoy') || act.id === 'activity-1'
  ).length;
  const proximosSavedCount = totalSavedCount - hoySavedCount;

  return (
    <SavedActivitiesContext.Provider
      value={{
        savedIds,
        isSaved,
        toggleSave,
        savedActivities,
        totalSavedCount,
        hoySavedCount,
        proximosSavedCount,
      }}
    >
      {children}
    </SavedActivitiesContext.Provider>
  );
};

export const useSavedActivities = () => {
  const context = useContext(SavedActivitiesContext);
  if (!context) {
    throw new Error('useSavedActivities debe ser usado dentro de un SavedActivitiesProvider');
  }
  return context;
};
