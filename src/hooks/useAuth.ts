import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
    loginUser,
    registerUser,
    logoutUser,
    setUser,
} from "../features/auth/authSlice";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();

    const { user, loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    async function login(email: string, password: string) {
        return await dispatch(loginUser({ email, password })).unwrap();
    }

    async function register(
        email: string,
        password: string,
        firmName: string
    ) {
        return await dispatch(
            registerUser({ email, password, firmName })
        ).unwrap();
    }

    async function logout() {
        return await dispatch(logoutUser()).unwrap();
    }

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        setUser: (firmUser: any) => dispatch(setUser(firmUser)),
    };
}
