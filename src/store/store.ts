import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import casesReducer from "../features/cases/casesSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cases: casesReducer,
        tasks: tasksReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;