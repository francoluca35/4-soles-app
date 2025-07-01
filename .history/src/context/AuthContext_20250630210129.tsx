import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { createContext } from "vm";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        if (pathname === "/login") router.replace(`/${data.user.rol}home`);
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
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
