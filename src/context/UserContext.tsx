import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast"; // adjust path if needed

type User = {
  _id: string;
  name: string;
  email: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const navigate = useNavigate();

  const setUser = (user: User) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
  };

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Logout failed: ${res.status}`);

      clearUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast({
        title: "Logout failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          credentials: "include",
        });

        if (res.status === 401) {
          clearUser();
          toast({
            title: "Session expired",
            description: "Please log in again.",
            variant: "destructive",
          });
          return;
        }

        if (!res.ok) {
          toast({
            title: "Unexpected error",
            description: `Error: ${res.status}`,
            variant: "destructive",
          });
          return;
        }

        const data = await res.json();

        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
        });
      } catch (err) {
        toast({
          title: "Unexpected error loading user",
          description: "Please try again later or login again.",
          variant: "destructive",
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
