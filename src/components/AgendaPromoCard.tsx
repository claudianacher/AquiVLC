import React from 'react';

interface AgendaPromoCardProps {
  onOpenAgenda?: () => void;
}

export const AgendaPromoCard: React.FC<AgendaPromoCardProps> = ({ onOpenAgenda }) => {
  return (
    <aside
      onClick={onOpenAgenda}
      className="bg-[#f5e3d1] rounded-[18px] p-5 flex items-center justify-between gap-3.5 w-full cursor-pointer hover:brightness-98 transition-all group"
      data-name="Invitación a la agenda"
    >
      <div className="flex flex-col gap-1.5 flex-1 min-w-0" data-name="Próximos planes">
        <span
          className="font-sans font-semibold text-[#d9571d] text-[9px] tracking-wider uppercase select-none"
          data-name="Antetítulo"
        >
          VE HACIENDO HUECO
        </span>

        <h3
          className="font-serif text-[27px] leading-tight text-[#302d27] group-hover:text-[#d9571d] transition-colors"
          data-name="Título"
        >
          El finde también promete.
        </h3>

        <span
          className="font-sans font-semibold text-[#d9571d] text-[12px] group-hover:underline inline-flex items-center gap-1 select-none pt-1"
          data-name="Acción"
        >
          Abrir agenda · 24 y 25 oct →
        </span>
      </div>

      {/* Motivo solar ornamental característico valenciano */}
      <div
        className="font-serif text-[#d9571d] text-[48px] select-none leading-none shrink-0 group-hover:rotate-45 transition-transform duration-300"
        data-name="Motivo solar"
        aria-hidden="true"
      >
        ☼
      </div>
    </aside>
  );
};
