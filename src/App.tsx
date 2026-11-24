import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HoyPage } from './pages/HoyPage';
import { AgendaPage } from './pages/AgendaPage';
import { MapaPage } from './pages/MapaPage';
import { GuardadosPage } from './pages/GuardadosPage';
import { SavedActivitiesProvider } from './context/SavedActivitiesContext';

export const App: React.FC = () => {
  return (
    <SavedActivitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hoy" element={<HoyPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route path="/guardados" element={<GuardadosPage />} />
        </Routes>
      </BrowserRouter>
    </SavedActivitiesProvider>
  );
};

export default App;
