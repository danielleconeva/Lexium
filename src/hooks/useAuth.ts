import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { loginUser, registerUser, logoutUser, setUser } from "../features/auth/authSlice";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();

    const { user, loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    return {
        user,
        loading,
        error,

        login: (email: string, password: string) =>
            dispatch(loginUser({ email, password })),

        register: (email: string, password: string, firmName: string) =>
            dispatch(registerUser({ email, password, firmName })),

        logout: () => dispatch(logoutUser()),

        setUser: (firmUser: any) => dispatch(setUser(firmUser)),
    };
}
