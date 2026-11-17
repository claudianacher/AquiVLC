import React from 'react';

interface HeroSectionProps {
  onDiscoverClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDiscoverClick }) => {
  return (
    <section
      className="relative flex flex-col items-center h-[520px] pt-[26px] px-6 overflow-hidden w-full shrink-0"
      data-name="Bienvenida mediterránea"
    >
      {/* Ilustración artística valenciana con posicionamiento idéntico a Figma (-324px en eje Y) */}
      <div
        className="absolute left-0 top-[-324px] w-[390px] h-[844px] pointer-events-none z-0"
        data-name="Ilustración valenciana"
      >
        <img
          src="/assets/ilustracion-valenciana.png"
          alt="Ilustración artística de la Ciudad de las Artes y las Ciencias, Miguelete y naranjos de Valencia"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Lema */}
      <span
        className="relative z-10 font-sans font-semibold text-[#d9571d] text-[10px] tracking-widest uppercase mb-3 select-none"
        data-name="Lema"
      >
        LA CIUDAD, A TU RITMO
      </span>

      {/* Titular */}
      <h1
        className="relative z-10 font-serif text-[#302d27] text-[44px] leading-[1.04] text-center max-w-[342px] mb-3 select-none"
        data-name="Titular"
      >
        Descubre el alma<br />de Valencia
      </h1>

      {/* Descripción */}
      <p
        className="relative z-10 font-sans font-normal text-[#777064] text-[14px] leading-[1.5] text-center max-w-[300px] mb-6"
        data-name="Descripción"
      >
        Planes de hoy y de los días que vienen. Sal, descubre y hazla tuya.
      </p>

      {/* Acción principal (Botón CTA) */}
      <button
        type="button"
        onClick={onDiscoverClick}
        className="relative z-10 group inline-flex items-center justify-center gap-2.5 h-[48px] px-[22px] rounded-[100px] bg-[#d9571d] hover:bg-[#c24b16] active:scale-95 text-white font-sans font-semibold text-[14px] shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
        data-name="Acción principal"
      >
        <span>Descubrir planes de hoy</span>
        <div className="w-[18px] h-[18px] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
          <img
            src="/assets/arrow-right.svg"
            alt=""
            className="w-full h-full block"
          />
        </div>
      </button>
    </section>
  );
};
