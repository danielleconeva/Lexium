import { useDispatch, useSelector } from "react-redux";
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

    return {
        firmCases,
        publicCases,
        loading,
        error,

        loadFirmCases: (firmId: string) =>
            dispatch(fetchFirmCases(firmId)),

        loadPublicCases: () => dispatch(fetchPublicCases()),

        createCase: (caseData: any) => dispatch(createCase(caseData)),

        updateCase: (caseId: string, updatedData: any) =>
            dispatch(updateCase({ caseId, updatedData })),

        deleteCase: (caseId: string) =>
            dispatch(deleteCase(caseId)),
    };
}
