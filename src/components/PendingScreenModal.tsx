import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface PendingScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export const PendingScreenModal: React.FC<PendingScreenModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#fffcf6] border border-[#e5dacb] rounded-[24px] max-w-sm w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#777064] hover:text-[#302d27] p-1 rounded-full cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-[#f5e3d1] flex items-center justify-center text-[#d9571d] mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-2xl text-[#302d27] mb-2">{title}</h3>

        <p className="font-sans text-xs text-[#777064] leading-relaxed mb-6">
          {description}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-[100px] bg-[#d9571d] hover:bg-[#c24b16] text-white font-sans font-semibold text-xs transition-colors cursor-pointer"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
