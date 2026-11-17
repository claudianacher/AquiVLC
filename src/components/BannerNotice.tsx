import React from 'react';

interface BannerNoticeProps {
  message?: string;
}

export const BannerNotice: React.FC<BannerNoticeProps> = ({
  message = 'AGENDA ILUSTRATIVA · HOY, 20 OCT 2026',
}) => {
  return (
    <div
      className="bg-[#f5e3d1] flex h-[30px] items-center justify-center relative shrink-0 w-full overflow-hidden"
      data-name="Aviso de ejemplo"
    >
      <p className="font-sans font-normal text-[#302d27] text-[10px] tracking-wider uppercase select-none">
        {message}
      </p>
    </div>
  );
};
