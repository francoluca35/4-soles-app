'use client';
import { useState } from 'react';

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
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <input className="w-full p-2 border mb-2" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="w-full p-2 border mb-2" type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-green-600 text-white p-2" onClick={handleRegister}>Registrarse</button>
      <p className='text-center text-blue-500'>¿Ya tenes cuenta?, <a href='/login' className='text-red-600 hover:text-red-400'>Inicia Sesión</a></p>
    </div>
  );
}