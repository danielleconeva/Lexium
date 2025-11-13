import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import type { User, UserCredential } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    register: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const login = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const value: AuthContextType = { user, loading, register, login, logout };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
