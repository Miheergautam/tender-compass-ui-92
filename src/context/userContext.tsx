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
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const setUser = (user: User) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
    setIsAuthenticated(false);
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

  useEffect(() => {
    const publicUrls = ["/", "/login"];

    // Always check authentication on mount, but don't show loading for public URLs
    const fetchUser = async () => {
      // Only show loading state for protected routes
      if (!publicUrls.includes(pathname)) {
        setIsLoading(true);
      }

      try {
        const res = await fetch("http://localhost:8000/api/auth/verify", {
          credentials: "include",
        });

        if (res.status === 401) {
          clearUser();
          // Only show session expired message on protected routes
          if (!publicUrls.includes(pathname)) {
            toast({
              title: "Session expired",
              description: "Please log in again.",
              variant: "destructive",
            });
          }
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

        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser({
            _id: data._id,
            name: data.name,
            email: data.email,
          });
        } else {
          clearUser();
        }
      } catch (err) {
        console.error("Auth verification error:", err);
        clearUser();
        // Only show error message on protected routes
        if (!publicUrls.includes(pathname)) {
          toast({
            title: "Unexpected error loading user",
            description: "Please try again later or login again.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  return (
    <UserContext.Provider
      value={{ user, setUser, clearUser, logout, isAuthenticated, isLoading }}
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
