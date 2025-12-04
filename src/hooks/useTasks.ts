import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../store/store";

import {
    fetchCaseTasks,
    fetchFirmTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../features/tasks/tasksSlice";

export function useTasks() {
    const dispatch = useDispatch<AppDispatch>();

    const { caseTasks, firmTasks, loading, error } = useSelector(
        (state: RootState) => state.tasks
    );

    const loadCaseTasks = useCallback(
        (caseId: string) => dispatch(fetchCaseTasks(caseId)),
        [dispatch]
    );

    const loadFirmTasks = useCallback(
        (firmId: string) => dispatch(fetchFirmTasks(firmId)),
        [dispatch]
    );

    const createTaskHandler = useCallback(
        (taskData: any) => dispatch(createTask(taskData)),
        [dispatch]
    );

    const updateTaskHandler = useCallback(
        (taskId: string, updatedData: any) =>
            dispatch(updateTask({ taskId, updatedData })),
        [dispatch]
    );

    const deleteTaskHandler = useCallback(
        (taskId: string) => dispatch(deleteTask(taskId)),
        [dispatch]
    );

    return {
        caseTasks,
        firmTasks,
        loading,
        error,
        loadCaseTasks,
        loadFirmTasks,
        createTask: createTaskHandler,
        updateTask: updateTaskHandler,
        deleteTask: deleteTaskHandler,
    };
}
