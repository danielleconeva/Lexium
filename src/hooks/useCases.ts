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
        (firmId: string) => {
            return dispatch(fetchFirmCases(firmId));
        },
        [dispatch]
    );

    const loadPublicCases = useCallback(
        () => dispatch(fetchPublicCases()),
        [dispatch]
    );


    const createCaseHandler = useCallback(
        async (caseData: any) => {
            return await dispatch(createCaseThunk(caseData)).unwrap();
        },
        [dispatch]
    );

    const updateCaseHandler = useCallback(
        async (caseId: string, updatedData: any) => {
            return await dispatch(
                updateCase({ caseId, updatedData })
            ).unwrap();
        },
        [dispatch]
    );

    const deleteCaseHandler = useCallback(
        async (caseId: string) => {
            return await dispatch(deleteCase(caseId)).unwrap();
        },
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
