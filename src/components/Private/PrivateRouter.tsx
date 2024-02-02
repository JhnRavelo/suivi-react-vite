import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type PrivateRouterProps = {
    prime: string | number
}

const PrivateRoutes = ({ prime }: PrivateRouterProps) => {
  const authContext = useAuth();
  const location = useLocation();

  return authContext?.auth?.role == prime ? (
    <Outlet />
  ) : authContext?.auth?.accessToken ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
