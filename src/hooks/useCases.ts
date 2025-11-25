import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../store/store";

import {
    fetchFirmCases,
    fetchPublicCases,
    createCase,
    updateCase,
    deleteCase,
} from "../features/cases/casesSlice";

export function useCases() {
    const dispatch = useDispatch<AppDispatch>();

    const { firmCases, publicCases, loading, error } = useSelector(
        (state: RootState) => state.cases
    );

    const loadFirmCases = useCallback(
        (firmId: string) => {
            return dispatch(fetchFirmCases(firmId));
        },
        [dispatch]
    );

    const loadPublicCases = useCallback(() => {
        return dispatch(fetchPublicCases());
    }, [dispatch]);

    const createCaseHandler = useCallback(
        (caseData: any) => {
            return dispatch(createCase(caseData));
        },
        [dispatch]
    );

    const updateCaseHandler = useCallback(
        (caseId: string, updatedData: any) => {
            return dispatch(updateCase({ caseId, updatedData }));
        },
        [dispatch]
    );

    const deleteCaseHandler = useCallback(
        (caseId: string) => {
            return dispatch(deleteCase(caseId));
        },
        [dispatch]
    );

    return {
        firmCases,
        publicCases,
        loading,
        error,
        loadFirmCases,
        loadPublicCases,
        createCase: createCaseHandler,
        updateCase: updateCaseHandler,
        deleteCase: deleteCaseHandler,
    };
}
