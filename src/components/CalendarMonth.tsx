import React from 'react';

interface CalendarMonthProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  selectedDay,
  onSelectDay,
}) => {
  // Octubre 2026 empieza en jueves (índice 3 en semana L M X J V S D)
  // Días con actividades en el diseño: 20 (hoy), 24 (sábado), 25 (domingo)
  const daysWithActivities = [20, 24, 25];
  const today = 20;

  // Semanas de octubre 2026
  const weeks: (number | null)[][] = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
  ];

  const weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  return (
    <div
      className="bg-[#fffcf6] border border-[#e5dacb] rounded-[18px] p-4 flex flex-col gap-3.5 w-full select-none"
      data-name="Calendario de octubre"
    >
      {/* Cabecera del mes con navegación */}
      <div className="flex items-center justify-between w-full" data-name="Mes">
        <button
          type="button"
          className="w-[18px] h-[18px] flex items-center justify-center text-[#302d27] hover:text-[#d9571d] cursor-pointer"
          aria-label="Mes anterior"
          data-name="chevron-left"
        >
          <img src="/assets/chevron-left.svg" alt="" className="w-full h-full block" />
        </button>

        <h3 className="font-serif text-[26px] text-[#302d27] leading-none" data-name="Octubre 2026">
          Octubre 2026
        </h3>

        <button
          type="button"
          className="w-[18px] h-[18px] flex items-center justify-center text-[#302d27] hover:text-[#d9571d] cursor-pointer"
          aria-label="Mes siguiente"
          data-name="chevron-right"
        >
          <img src="/assets/chevron-right.svg" alt="" className="w-full h-full block" />
        </button>
      </div>

      {/* Días de la semana */}
      <div
        className="flex items-center justify-between w-full text-[#777064] text-[10px] font-sans font-normal text-center"
        data-name="Días de la semana"
      >
        {weekdays.map((day, idx) => (
          <span key={idx} className="flex-1 min-w-0">
            {day}
          </span>
        ))}
      </div>

      {/* Rejilla de fechas */}
      <div className="flex flex-col gap-[3px] w-full" data-name="Fechas">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex gap-[2px] items-center w-full" data-name="Semana">
            {week.map((dayNum, dayIdx) => {
              if (dayNum === null) {
                return (
                  <div
                    key={dayIdx}
                    className="flex-1 min-w-0 h-[34px] flex items-center justify-center"
                  />
                );
              }

              const isSelected = selectedDay === dayNum;
              const isToday = dayNum === today;
              const hasPlans = daysWithActivities.includes(dayNum);

              let buttonStyle = 'bg-[#fffcf6] text-[#302d27]';
              if (isSelected) {
                buttonStyle = 'bg-[#d9571d] text-white font-bold';
              } else if (isToday) {
                buttonStyle = 'bg-[#fffcf6] border border-[#d9571d] text-[#302d27] font-bold';
              }

              return (
                <button
                  key={dayIdx}
                  type="button"
                  onClick={() => onSelectDay(dayNum)}
                  className={`flex-1 min-w-0 h-[34px] rounded-[100px] flex flex-col items-center justify-center gap-[2px] text-[12px] font-sans transition-all cursor-pointer active:scale-95 ${buttonStyle}`}
                  data-name="Fecha"
                  aria-pressed={isSelected}
                  aria-label={`Día ${dayNum} de octubre`}
                >
                  <span className="leading-none">{dayNum}</span>
                  {hasPlans && (
                    <span
                      className={`w-[3px] h-[3px] rounded-full shrink-0 ${
                        isSelected ? 'bg-white' : 'bg-[#d9571d]'
                      }`}
                      data-name="Hay actividades"
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Leyenda explicativa del calendario */}
      <div className="flex items-center gap-1.5 pt-1 w-full" data-name="Leyenda">
        <span className="w-1 h-1 rounded-full bg-[#d9571d] shrink-0" data-name="Marca de actividad" />
        <p className="font-sans font-normal text-[#777064] text-[10px] whitespace-nowrap">
          Días con planes · círculo: hoy · relleno: selección
        </p>
      </div>
    </div>
  );
};
