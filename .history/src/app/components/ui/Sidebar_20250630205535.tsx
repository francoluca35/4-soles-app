// src/components/ui/Sidebar.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { setUser } = useAuth();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null); // borra contexto
    router.push("/login");
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Menú</h2>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full text-left p-2 hover:bg-red-100 text-red-600 font-medium"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
