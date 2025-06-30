'use client';
import React from 'react';

interface Props {
  texto: string;
  grande?: boolean;
}

export default function PanelBoton({ texto, grande }: Props) {
  return (
    <div
      className={`
        flex items-center justify-center
        text-center text-black font-semibold
        bg-gradient-to-b from-neutral-100 to-neutral-300 shadow-lg
        ${grande ? 'w-32 h-32 text-sm' : 'w-24 h-24 text-sm'}
        hover:scale-105 transition-transform cursor-pointer
        rounded-xl
      `}
    >
      {texto}
    </div>
  );
}
