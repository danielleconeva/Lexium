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
        const casesQuery = query(
            collection(firestore, "cases"),
            where("firmId", "==", firmId)
        );

        const snapshot = await getDocs(casesQuery);

        return snapshot.docs.map(mapDocumentToCaseRecord);
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchPublicCases = createAsyncThunk<
    CaseRecord[],
    void,
    { rejectValue: string }
>("cases/fetchPublicCases", async (_, thunkAPI) => {
    try {
        const casesQuery = query(
            collection(firestore, "cases"),
            where("isPublic", "==", true)
        );

        const snapshot = await getDocs(casesQuery);

        return snapshot.docs.map(mapDocumentToCaseRecord);
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return thunkAPI.rejectWithValue(message);
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
    try {
        const now = Date.now();

        const caseToSave: Omit<CaseRecord, "id"> = {
            ...caseData,
            firmId: firmUser.uid,
            firmName: firmUser.firmName,
            createdAt: caseData.createdAt ?? now,
            updatedAt: caseData.updatedAt ?? now,
        };

        const createdDocument = await addDoc(
            collection(firestore, "cases"),
            caseToSave
        );

        return {
            id: createdDocument.id,
            ...caseToSave,
        };
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateCase = createAsyncThunk<
    { caseId: string; updatedData: Partial<CaseRecord> },
    { caseId: string; updatedData: Partial<CaseRecord> },
    { rejectValue: string }
>("cases/updateCase", async (payload, thunkAPI) => {
    try {
        const caseRef = doc(firestore, "cases", payload.caseId);
        await updateDoc(caseRef, payload.updatedData);

        return payload;
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return thunkAPI.rejectWithValue(message);
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
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return thunkAPI.rejectWithValue(message);
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
            })

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
            })

            .addCase(createCase.fulfilled, (state, action) => {
                state.firmCases.push(action.payload);
            })

            .addCase(updateCase.fulfilled, (state, action) => {
                const index = state.firmCases.findIndex(
                    (item) => item.id === action.payload.caseId
                );

                if (index !== -1) {
                    state.firmCases[index] = {
                        ...state.firmCases[index],
                        ...action.payload.updatedData,
                    };
                }
            })

            .addCase(deleteCase.fulfilled, (state, action) => {
                state.firmCases = state.firmCases.filter(
                    (record) => record.id !== action.payload
                );
            });
    },
});

export default casesSlice.reducer;
