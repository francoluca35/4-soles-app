'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/Assets/4-soles-logo.jpg';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="min-h-screen bg-[#852123] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center text-white relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <Image src={logo} alt="Logo 4 Soles" width={480} height={480} className="object-contain" />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-light mb-6">CREAR CUENTA</h1>
          <input
            type="email"
            placeholder="USUARIO"
            className="bg-transparent border-b border-orange-400 placeholder-white w-full mb-4 p-2 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="CONTRASEÑA"
            className="bg-transparent border-b border-orange-400 placeholder-white w-full mb-4 p-2 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="bg-gradient-to-r cursor-pointer from-orange-500 to-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full w-full mt-2"
          >
            REGISTRARSE
          </button>
          <p className="text-sm text-white mt-4">
            ¿YA TENÉS CUENTA?,{' '}
            <Link href="/login" className="font-bold italic text-orange-200 hover:underline">
              INICIAR SESIÓN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}