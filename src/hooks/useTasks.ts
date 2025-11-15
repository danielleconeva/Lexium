import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

import {
    fetchCaseTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../features/tasks/tasksSlice";

export function useTasks() {
    const dispatch = useDispatch<AppDispatch>();

    const { caseTasks, loading, error } = useSelector(
        (state: RootState) => state.tasks
    );

    return {
        caseTasks,
        loading,
        error,

        loadTasks: (caseId: string) =>
            dispatch(fetchCaseTasks(caseId)),

        createTask: (taskData: any) => dispatch(createTask(taskData)),

        updateTask: (taskId: string, updatedData: any) =>
            dispatch(updateTask({ taskId, updatedData })),

        deleteTask: (taskId: string) =>
            dispatch(deleteTask(taskId)),
    };
}
