"use client";
import { useEffect } from "react";
import Image from "next/image";
import logo from "../../public/Assets/4-soles-logo.jpg";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = jwt.decode(token) as { userId: string; rol?: string };

        // 🔁 Redirige según el rol si ya tiene sesión
        switch (decoded?.rol) {
          case "admin":
            router.push("/adminhome");
            break;
          case "caja":
            router.push("/cajahome");
            break;
          case "repartidor":
            router.push("/repartidorhome");
            break;
          default:
            router.push("/login");
        }
        return;
      } catch (err) {
        // Token corrupto o inválido
        console.error("Token inválido:", err);
      }
    }

    // ⏱ Si no hay token o es inválido, espera 2.5s y va al login
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#852123]">
      <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
        <Image src={logo} alt="Logo 4 Soles" fill className="object-contain" />
      </div>
    </div>
  );
}
