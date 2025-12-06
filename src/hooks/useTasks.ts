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
        async (taskData: any) => {
            return await dispatch(createTask(taskData)).unwrap();
        },
        [dispatch]
    );

    const updateTaskHandler = useCallback(
        async (taskId: string, updatedData: any) => {
            return await dispatch(
                updateTask({ taskId, updatedData })
            ).unwrap();
        },
        [dispatch]
    );

    const deleteTaskHandler = useCallback(
        async (taskId: string) => {
            return await dispatch(deleteTask(taskId)).unwrap();
        },
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
