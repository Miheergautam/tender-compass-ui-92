import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/userContext";
import { toast } from "@/components/ui/use-toast";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, verifyUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await verifyUser();
      setLoading(false);
    };
    checkAuth();
  }, [verifyUser]);

  if (loading) return null;

  if (!user) {
    toast({
      title: "Access Denied",
      description: "You must be logged in to view this page.",
    });
    navigate("/login");
    return null;
  }

  return children;
};
