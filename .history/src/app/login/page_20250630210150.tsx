"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/Assets/4-soles-logo.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function LoginPage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!loading && (!user || user.rol !== "admin")) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading) return <div className="text-white p-4">Cargando...</div>; // 👈 mientras verifica sesión

  if (!user || user.rol !== "admin") return null;
  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.rol) {
      // Redirigir según rol
      if (data.rol === "admin") router.push("/adminhome");
      else if (data.rol === "caja") router.push("/cajahome");
      else if (data.rol === "repartidor") router.push("/repartidorhome");
      else alert("Rol no reconocido");
    } else {
      alert(data.error || "Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-[#852123] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center text-white relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <Image
            src={logo}
            alt="Logo 4 Soles"
            width={480}
            height={490}
            className="object-contain"
          />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-light mb-6">INICIAR SESIÓN</h1>
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
            onClick={handleLogin}
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold py-2 rounded-full w-full mt-2"
          >
            INICIAR SESIÓN
          </button>
          <p className="text-sm text-white mt-4">
            ¿AÚN NO TENÉS CUENTA?,{" "}
            <Link
              href="/register"
              className="font-bold italic text-orange-200 hover:underline"
            >
              REGISTRATE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
