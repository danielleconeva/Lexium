import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login" replace />;
}
