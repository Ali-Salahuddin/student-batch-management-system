import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";
import api from "../api/api";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get("/auth/profile");

        const data = response.data;

        setAuthenticated(true);
        setUserRole(data.user?.role || data.role);

      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    (!userRole || !allowedRoles.includes(userRole))
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;