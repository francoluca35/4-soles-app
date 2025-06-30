'use client';
import React from 'react';

interface Props {
  texto: string;
  grande?: boolean;
  full?: boolean;
}

export default function PanelBoton({ texto, grande, full }: Props) {
  return (
    <div
      className={`
        flex items-center justify-center
        text-center text-black font-semibold
        bg-gradient-to-b from-neutral-100 to-neutral-300 shadow-lg
        ${full ? 'w-full h-20' : grande ? 'w-32 h-32' : 'w-24 h-24'}
        hover:scale-105 transition-transform cursor-pointer
        rounded-xl text-sm
      `}
    >
      {texto}
    </div>
  );
}
