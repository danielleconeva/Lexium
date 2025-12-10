import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../lib/firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDoc,
} from "firebase/firestore";

import type { CaseRecord } from "../../types/Case";
import type { FirmUser } from "../../types/User";
import { mapDocumentToCaseRecord } from "./casesMappers";

interface CasesState {
    firmCases: CaseRecord[];
    publicCases: CaseRecord[];
    loading: boolean;
    error: string | null;
}

const initialState: CasesState = {
    firmCases: [],
    publicCases: [],
    loading: false,
    error: null,
};

export const fetchFirmCases = createAsyncThunk<
    CaseRecord[],
    string,
    { rejectValue: string }
>("cases/fetchFirmCases", async (firmId, thunkAPI) => {
    try {
        const q = query(
            collection(firestore, "cases"),
            where("firmId", "==", firmId)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(mapDocumentToCaseRecord);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        return thunkAPI.rejectWithValue(msg);
    }
});

export const fetchPublicCases = createAsyncThunk<
    CaseRecord[],
    void,
    { rejectValue: string }
>("cases/fetchPublicCases", async (_, thunkAPI) => {
    try {
        const q = query(
            collection(firestore, "cases"),
            where("isPublic", "==", true)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(mapDocumentToCaseRecord);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        return thunkAPI.rejectWithValue(msg);
    }
});

export const createCase = createAsyncThunk<
    CaseRecord,
    {
        caseData: Omit<CaseRecord, "id" | "firmId" | "firmName">;
        firmUser: FirmUser;
    },
    { rejectValue: string }
>("cases/createCase", async ({ caseData, firmUser }, thunkAPI) => {
    console.log("[THUNK START] createCase called with:", {
        caseData,
        firmUser,
    });

    try {
        const now = Date.now();

        const caseToSave: Omit<CaseRecord, "id"> = {
            ...caseData,
            firmId: firmUser.uid,
            firmName: firmUser.firmName,
            createdAt: now,
            updatedAt: now,

            nextHearingDate: caseData.nextHearingDate || null,
            archiveNumber: caseData.archiveNumber || null,
        };

        const ref = collection(firestore, "cases");

        const createdSnap = await addDoc(ref, caseToSave);

        return {
            id: createdSnap.id,
            ...caseToSave,
        };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        return thunkAPI.rejectWithValue(msg);
    }
});

export const updateCase = createAsyncThunk<
    CaseRecord,
    { caseId: string; updatedData: Partial<CaseRecord> },
    { rejectValue: string }
>("cases/updateCase", async ({ caseId, updatedData }, thunkAPI) => {
    try {
        const ref = doc(firestore, "cases", caseId);

        const safeUpdate: any = {
            ...updatedData,
            updatedAt: Date.now(),
            nextHearingDate:
                updatedData.nextHearingDate !== undefined
                    ? updatedData.nextHearingDate
                    : null,
            archiveNumber:
                updatedData.archiveNumber !== undefined
                    ? updatedData.archiveNumber
                    : null,
        };

        await updateDoc(ref, safeUpdate);

        const snap = await getDoc(ref);
        if (!snap.exists()) throw new Error("Case not found after update");

        return mapDocumentToCaseRecord(snap);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        return thunkAPI.rejectWithValue(msg);
    }
});

export const deleteCase = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("cases/deleteCase", async (caseId, thunkAPI) => {
    try {
        await deleteDoc(doc(firestore, "cases", caseId));
        return caseId;
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        return thunkAPI.rejectWithValue(msg);
    }
});

const casesSlice = createSlice({
    name: "cases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFirmCases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFirmCases.fulfilled, (state, action) => {
                state.loading = false;
                state.firmCases = action.payload;
            })
            .addCase(fetchFirmCases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load firm cases.";
            });

        builder
            .addCase(fetchPublicCases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPublicCases.fulfilled, (state, action) => {
                state.loading = false;
                state.publicCases = action.payload;
            })
            .addCase(fetchPublicCases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load public cases.";
            });

        builder.addCase(createCase.fulfilled, (state, action) => {
            state.firmCases.push(action.payload);
        });

        builder.addCase(updateCase.fulfilled, (state, action) => {
            const updated = action.payload;
            const index = state.firmCases.findIndex((c) => c.id === updated.id);

            if (index !== -1) {
                state.firmCases[index] = updated;
            }
        });

        builder.addCase(deleteCase.fulfilled, (state, action) => {
            state.firmCases = state.firmCases.filter(
                (c) => c.id !== action.payload
            );
        });
    },
});

export default casesSlice.reducer;
