"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  LogOut,
  UserCog,
  Lock,
  User,
  ChartColumn,
  PersonStanding,
} from "lucide-react";

export default function UserDropdown() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);

  const [open, setOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return "CH";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(user?.nombreCompleto);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative z-50">
      {/* Botón visible con hover */}
      <div
        ref={triggerRef}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition text-white font-semibold cursor-pointer"
      >
        {user?.foto ? (
          <Image
            src={user.foto}
            alt="Foto de perfil"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Menú lateral que se mantiene abierto mientras el mouse está encima */}
      <div
        ref={sidebarRef}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`fixed top-0 right-0 h-full w-64 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white shadow-2xl transition-transform duration-300 ease-in-out p-6 z-50 rounded-l-xl flex flex-col`}
      >
        <ul className="space-y-4 text-sm flex-1">
          {/* Resto del menú igual */}
          {pathname === "/perfil" ? (
            <li
              onClick={() => router.push("/screenhome")}
              className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
            >
              <User size={18} /> Inicio
            </li>
          ) : (
            <li
              onClick={() => router.push("/perfil")}
              className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
            >
              <UserCog size={18} /> Cambiar datos
            </li>
          )}

          {pathname === "/cambiarpassword" ? (
            <li
              onClick={() => router.push("/screenhome")}
              className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
            >
              <User size={18} /> Inicio
            </li>
          ) : (
            <li
              onClick={() => router.push("/cambiarpassword")}
              className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
            >
              <Lock size={18} /> Cambiar contraseña
            </li>
          )}

          {user.rol === "admin" && (
            <>
              {pathname === "/usuarios" ? (
                <li
                  onClick={() => router.push("/screenhome")}
                  className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
                >
                  <User size={18} /> Inicio
                </li>
              ) : (
                <li
                  onClick={() => router.push("/usuarios")}
                  className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
                >
                  <PersonStanding size={18} /> Usuarios
                </li>
              )}

              {pathname === "/reportes" ? (
                <li
                  onClick={() => router.push("/screenhome")}
                  className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
                >
                  <User size={18} /> Inicio
                </li>
              ) : (
                <li
                  onClick={() => router.push("/reportes")}
                  className="cursor-pointer hover:text-orange-400 flex items-center gap-2"
                >
                  <ChartColumn size={18} /> Planillas Clientes
                </li>
              )}
            </>
          )}
        </ul>

        <div
          onClick={() => {
            logout();
            setOpen(false);
            router.push("/login");
          }}
          className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-600 cursor-pointer transition"
        >
          <LogOut size={18} />
          Cerrar sesión
        </div>
      </div>
    </div>
  );
}
