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

interface TasksState {
    caseTasks: TaskRecord[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    caseTasks: [],
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

        return snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        })) as TaskRecord[];
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
        return { id: createdDocument.id, ...taskData };
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateTask = createAsyncThunk<
    { taskId: string; updatedData: Partial<TaskRecord> },
    { taskId: string; updatedData: Partial<TaskRecord> },
    { rejectValue: string }
>("tasks/updateTask", async (payload, thunkAPI) => {
    try {
        const taskRef = doc(firestore, "tasks", payload.taskId);
        await updateDoc(taskRef, payload.updatedData);

        return payload;
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
                state.error = action.payload || "Failed to load tasks.";
            })

            .addCase(createTask.fulfilled, (state, action) => {
                state.caseTasks.push(action.payload);
            })

            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.caseTasks.findIndex(
                    (task) => task.id === action.payload.taskId
                );
                if (index !== -1) {
                    state.caseTasks[index] = {
                        ...state.caseTasks[index],
                        ...action.payload.updatedData,
                    };
                }
            })

            .addCase(deleteTask.fulfilled, (state, action) => {
                state.caseTasks = state.caseTasks.filter(
                    (task) => task.id !== action.payload
                );
            });
    },
});

export default tasksSlice.reducer;
