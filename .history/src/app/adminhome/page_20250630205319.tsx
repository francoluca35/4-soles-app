"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminHome() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
    else if (user.rol !== "admin") router.replace("/login");
  }, [user]);

  if (!user || user.rol !== "admin") return null;

  return <div>Panel de admin: {user.email}</div>;
}
