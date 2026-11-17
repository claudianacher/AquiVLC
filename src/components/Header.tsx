import React, { useState } from 'react';
import { AVAILABLE_LANGUAGES, LanguageOption } from '../data/mockData';
import { Check } from 'lucide-react';

interface HeaderProps {
  onLanguageChange?: (lang: LanguageOption) => void;
  currentLanguage?: LanguageOption;
}

export const Header: React.FC<HeaderProps> = ({
  onLanguageChange,
  currentLanguage = AVAILABLE_LANGUAGES[1], // Default: Español
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const handleSelectLanguage = (lang: LanguageOption) => {
    if (onLanguageChange) onLanguageChange(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="relative w-full z-30" data-name="Cabecera">
      {/* Barra superior con Marca y Localidad */}
      <div className="flex items-center justify-between h-[78px] px-6 pt-3 relative w-full">
        {/* Marca / Logo */}
        <div className="flex items-center gap-[7px] select-none" data-name="Marca">
          <div className="relative shrink-0 w-[27px] h-[27px]" data-name="sun">
            <img
              src="/assets/sun-logo.svg"
              alt="Sol de Valencia"
              className="w-full h-full block"
            />
          </div>
          <span className="font-serif text-[29px] leading-none text-[#302d27] tracking-tight">
            aquí Valencia
          </span>
        </div>

        {/* Localidad */}
        <div
          className="flex items-center gap-1 text-[#302d27] select-none cursor-default"
          data-name="Localidad"
        >
          <div className="relative shrink-0 w-[14px] h-[14px]" data-name="map-pin">
            <img
              src="/assets/map-pin.svg"
              alt="Ubicación"
              className="w-full h-full block"
            />
          </div>
          <span className="font-sans font-semibold text-[11px] leading-none">
            Valencia
          </span>
        </div>
      </div>

      {/* Botón selector de idiomas */}
      <div className="px-6 pb-2 flex items-center justify-between">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLangMenuOpen((prev) => !prev)}
            aria-expanded={isLangMenuOpen}
            aria-label="Seleccionar idioma"
            className="inline-flex items-center justify-center h-[34px] px-[14px] rounded-[100px] bg-[#fffcf6] border border-[#e5dacb] text-[#302d27] font-sans font-semibold text-[11px] hover:bg-[#f5e3d1]/40 active:scale-95 transition-all cursor-pointer"
            data-node-id="30:4"
            data-name="Botón idiomas"
          >
            <span data-node-id="30:5">Idiomas</span>
          </button>

          {/* Menú desplegable accesible de idiomas */}
          {isLangMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLangMenuOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-48 bg-[#fffcf6] border border-[#e5dacb] rounded-2xl shadow-lg z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-[#777064] uppercase tracking-wider border-b border-[#e5dacb]/60">
                  Selecciona idioma
                </div>
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-xs text-[#302d27] hover:bg-[#f5e3d1]/50 transition-colors cursor-pointer"
                  >
                    <span className={lang.code === currentLanguage.code ? 'font-semibold text-[#d9571d]' : 'font-normal'}>
                      {lang.nativeName}
                    </span>
                    {lang.code === currentLanguage.code && (
                      <Check className="w-3.5 h-3.5 text-[#d9571d]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
