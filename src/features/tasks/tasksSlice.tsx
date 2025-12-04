import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../lib/firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import type { TaskRecord } from "../../types/Task";
import { mapDocumentToTaskRecord } from "./tasksMapper";

interface TasksState {
    caseTasks: TaskRecord[];
    firmTasks: TaskRecord[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    caseTasks: [],
    firmTasks: [],
    loading: false,
    error: null,
};

export const fetchCaseTasks = createAsyncThunk<
    TaskRecord[],
    string,
    { rejectValue: string }
>("tasks/fetchCaseTasks", async (caseId, thunkAPI) => {
    try {
        const tasksQuery = query(
            collection(firestore, "tasks"),
            where("caseId", "==", caseId)
        );

        const snapshot = await getDocs(tasksQuery);

        return snapshot.docs.map(mapDocumentToTaskRecord);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchFirmTasks = createAsyncThunk<
    TaskRecord[],
    string,
    { rejectValue: string }
>("tasks/fetchFirmTasks", async (firmId, thunkAPI) => {
    try {
        const tasksQuery = query(
            collection(firestore, "tasks"),
            where("firmId", "==", firmId)
        );

        const snapshot = await getDocs(tasksQuery);

        return snapshot.docs.map(mapDocumentToTaskRecord);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createTask = createAsyncThunk<
    TaskRecord,
    Omit<TaskRecord, "id">,
    { rejectValue: string }
>("tasks/createTask", async (taskData, thunkAPI) => {
    try {
        const createdDocument = await addDoc(
            collection(firestore, "tasks"),
            taskData
        );

        return {
            ...taskData,
            id: createdDocument.id,
        };
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateTask = createAsyncThunk<
    { taskId: string; updatedData: Partial<TaskRecord> },
    { taskId: string; updatedData: Partial<TaskRecord> },
    { rejectValue: string }
>("tasks/updateTask", async ({ taskId, updatedData }, thunkAPI) => {
    try {
        const taskRef = doc(firestore, "tasks", taskId);
        await updateDoc(taskRef, updatedData);
        return { taskId, updatedData };
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteTask = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("tasks/deleteTask", async (taskId, thunkAPI) => {
    try {
        await deleteDoc(doc(firestore, "tasks", taskId));
        return taskId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCaseTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCaseTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.caseTasks = action.payload;
            })
            .addCase(fetchCaseTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load case tasks.";
            })

            .addCase(fetchFirmTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFirmTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.firmTasks = action.payload;
            })
            .addCase(fetchFirmTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load firm tasks.";
            })

            .addCase(createTask.fulfilled, (state, action) => {
                state.firmTasks.push(action.payload);

                if (
                    state.caseTasks.length > 0 &&
                    state.caseTasks[0]?.caseId === action.payload.caseId
                ) {
                    state.caseTasks.push(action.payload);
                }
            })

            .addCase(updateTask.fulfilled, (state, action) => {
                const { taskId, updatedData } = action.payload;

                const idx1 = state.caseTasks.findIndex((t) => t.id === taskId);
                if (idx1 !== -1) {
                    state.caseTasks[idx1] = {
                        ...state.caseTasks[idx1],
                        ...updatedData,
                    };
                }

                const idx2 = state.firmTasks.findIndex((t) => t.id === taskId);
                if (idx2 !== -1) {
                    state.firmTasks[idx2] = {
                        ...state.firmTasks[idx2],
                        ...updatedData,
                    };
                }
            })

            .addCase(deleteTask.fulfilled, (state, action) => {
                state.caseTasks = state.caseTasks.filter(
                    (task) => task.id !== action.payload
                );
                state.firmTasks = state.firmTasks.filter(
                    (task) => task.id !== action.payload
                );
            });
    },
});

export default tasksSlice.reducer;
