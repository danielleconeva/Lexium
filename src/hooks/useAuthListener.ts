import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../features/auth/authSlice";

export function useAuthListener() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                dispatch(setUser(null));
                return;
            }

            const firmRef = doc(firestore, "firms", firebaseUser.uid);
            const firmSnap = await getDoc(firmRef);

            const firmData = firmSnap.exists() ? firmSnap.data() : {};

            dispatch(
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    firmName: firmData.firmName || "",
                    createdAt: firmData.createdAt || Date.now(),
                })
            );
        });

        return () => unsubscribe();
    }, [dispatch]);
}
