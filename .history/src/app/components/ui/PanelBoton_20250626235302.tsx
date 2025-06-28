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
        rounded-full text-center text-black font-semibold
        bg-gradient-to-b from-neutral-100 to-neutral-300 shadow-lg
        ${grande ? 'w-40 h-40 text-sm text-center' : 'w-28 h-28 text-sm'}
        hover:scale-105 transition-transform cursor-pointer
      `}
    >
      {texto}
    </div>
  );
}
