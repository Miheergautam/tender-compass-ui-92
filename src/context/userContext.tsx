import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
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
  verifyUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

      if (!res.ok) {
        throw new Error("Logout failed");
      }
      clearUser();
      toast({
        title: "Logout Successful",
        description: "You have been logged out successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging you out.",
        variant: "destructive",
      });
    }
  };

  const verifyUser = async () => {
    const publicUrls = ["/", "/login"];
    if (publicUrls.includes(pathname)) return;

    try {
      const res = await fetch("http://localhost:8000/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Error verifying user");
      }
      const data = await res.json();
      if (!data.authenticated) {
        clearUser();
        toast({
          title: "Authentication required",
          description: "Please log in to continue.",
        });
        navigate("/login");
        return;
      }
    } catch (err) {
      toast({
        title: "Error verifying user",
        description: "Please try again later.",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    const publicUrls = ["/", "/login"];
    if (publicUrls.includes(pathname)) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/verify", {
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
  }, [pathname]);

  return (
    <UserContext.Provider
      value={{ user, setUser, clearUser, logout, verifyUser }}
    >
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
