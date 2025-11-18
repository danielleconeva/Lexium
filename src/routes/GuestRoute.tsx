import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface GuestRouteProps {
    children: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    return user ? <Navigate to="/dashboard" replace /> : children;
}
