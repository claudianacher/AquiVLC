import React from 'react';

export const EditorialNote: React.FC = () => {
  return (
    <footer
      className="px-6 py-[22px] w-full text-center sm:text-left select-none"
      data-name="Nota editorial"
    >
      <p
        className="font-sans font-normal text-[#777064] text-[11px] leading-[1.5]"
        data-name="Origen de los datos"
      >
        Eventos y precios de ejemplo, no verificados. No se muestra disponibilidad ni venta real de entradas.
      </p>
    </footer>
  );
};
