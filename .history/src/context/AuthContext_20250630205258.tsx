"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type UserType = {
  _id: string;
  email: string;
  rol: string;
};

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        if (pathname === "/login") {
          router.replace("/" + data.user.rol + "home");
        }
      } else {
        if (pathname !== "/login") router.replace("/login");
      }
    } catch (error) {
      if (pathname !== "/login") router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
