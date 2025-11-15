import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

export function useAuthListener() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                dispatch(setUser(null));
                return;
            }

            dispatch(
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    firmName: "",
                    createdAt: Date.now(),
                })
            );
        });

        return () => unsubscribe();
    }, [dispatch]);
}
