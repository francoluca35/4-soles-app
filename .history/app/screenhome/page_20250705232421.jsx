"use client";

import { useState, useEffect, Suspense } from "react";
import PrivateRoute from "../models/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import TablaMetrica from "../components/ui/TablaMetrica";
import BotonesMenu from "../components/ui/BotonesMenu";
import UserDropdown from "../components/ui/UserDropdown";
import AbrirCaja from "../components/ui/AbrirCaja";
import { db } from "@/lib/firebase";
import { onValue, ref, remove } from "firebase/database";
import Image from "next/image";

export default function ScreenHome() {
  const { user } = useAuth();
  const fecha = new Date().toLocaleDateString("es-AR");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (user?.rol === "admin") {
      const mostrarAlIniciar = sessionStorage.getItem("mostrarCaja");

      if (mostrarAlIniciar === "true") {
        setMostrarModal(true);
        sessionStorage.removeItem("mostrarCaja");
      }

      const handleAbrirCaja = () => {
        setMostrarModal(true);
      };

      window.addEventListener("abrirCaja", handleAbrirCaja);

      return () => {
        window.removeEventListener("abrirCaja", handleAbrirCaja);
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <PrivateRoute>
      <main className="min-h-screen relative bg-[#8e1f1f] p-6 text-white flex flex-col">
        {/* Imagen centrada */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <Image
            src="/Assets/4-soles-logo.jpg"
            alt="4Soles Logo"
            width={500}
            height={500}
            className="opacity-30 rounded-full "
          />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-semibold">
              Bienvenido {user?.nombreCompleto} - {fecha}
            </h2>
            <UserDropdown onAbrirCaja={() => setMostrarModal(true)} />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 flex-grow mt-36">
            <Suspense
              fallback={<p className="text-gray-400">Cargando menú...</p>}
            >
              <BotonesMenu />
            </Suspense>
          </div>
        </div>

        <AbrirCaja
          visible={mostrarModal}
          onClose={() => setMostrarModal(false)}
        />
      </main>
    </PrivateRoute>
  );
}
