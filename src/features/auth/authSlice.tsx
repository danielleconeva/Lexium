import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, firestore } from "../../lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import type { FirmUser } from "../../types/User";

interface AuthState {
    user: FirmUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
};

export const registerUser = createAsyncThunk<
    FirmUser,
    { email: string; password: string; firmName: string },
    { rejectValue: string }
>("auth/registerUser", async ({ email, password, firmName }, thunkAPI) => {
    try {
        const firmsRef = collection(firestore, "firms");
        const q = query(firmsRef, where("firmName", "==", firmName));

        const existingFirms = await getDocs(q);

        if (!existingFirms.empty) {
            return thunkAPI.rejectWithValue(
                "Company name is already registered."
            );
        }

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const firmUser: FirmUser = {
            uid: userCredential.user.uid,
            email,
            firmName,
            createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "firms", firmUser.uid), firmUser);

        return firmUser;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const loginUser = createAsyncThunk<
    FirmUser,
    { email: string; password: string },
    { rejectValue: string }
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const uid = userCredential.user.uid;

        const firmSnap = await getDoc(doc(firestore, "firms", uid));

        const firmData = firmSnap.exists() ? firmSnap.data() : null;

        return {
            uid,
            email,
            firmName: firmData?.firmName || "",
            createdAt: firmData?.createdAt || Date.now(),
        };
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await signOut(auth);
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.loading = false;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed.";
            });

        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed.";
            });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });
    },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
