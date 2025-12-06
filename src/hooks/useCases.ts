import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../store/store";

import {
    fetchFirmCases,
    fetchPublicCases,
    createCase as createCaseThunk,
    updateCase,
    deleteCase,
} from "../features/cases/casesSlice";

import type { CaseRecord } from "../types/Case";

export function useCases() {
    const dispatch = useDispatch<AppDispatch>();

    const { firmCases, publicCases, loading, error } = useSelector(
        (state: RootState) => state.cases
    );

    const loadFirmCases = useCallback(
        (firmId: string) => dispatch(fetchFirmCases(firmId)),
        [dispatch]
    );

    const loadPublicCases = useCallback(
        () => dispatch(fetchPublicCases()),
        [dispatch]
    );

    const createCaseHandler = useCallback(
        (caseData: any) => {
            console.log("📌 createCaseHandler received:", caseData);
            return dispatch(createCaseThunk(caseData));
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
        (caseId: string) => dispatch(deleteCase(caseId)),
        [dispatch]
    );

    const getPublicCaseById = useCallback(
        (caseId: string): CaseRecord | null => {
            return publicCases.find((c) => c.id === caseId) ?? null;
        },
        [publicCases]
    );

    const getFirmCaseById = useCallback(
        (caseId: string): CaseRecord | null => {
            return firmCases.find((c) => c.id === caseId) ?? null;
        },
        [firmCases]
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

        getPublicCaseById,
        getFirmCaseById,
    };
}
