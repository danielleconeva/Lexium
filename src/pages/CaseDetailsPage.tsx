import { useNavigate, useParams } from "react-router-dom";
import { useCases } from "../hooks/useCases";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import IntroductionCard from "../components/case-details/IntroductionCard";
import styled from "styled-components";
import InformationCard from "../components/case-details/InformationCard";
import TasksCard from "../components/case-details/TasksCard";
import NextHearingCard from "../components/case-details/NextHearingCard";
import QuickActionsCard from "../components/case-details/QuickActionsCard";
import { useTasks } from "../hooks/useTasks";

function computeNextHearing(hearings?: Array<{ date: string; time: string }>) {
    if (!hearings || hearings.length === 0) return undefined;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = hearings
        .filter((h) => h.date && h.date.trim() !== "")
        .filter((h) => {
            const d = new Date(h.date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() >= today.getTime();
        });

    if (upcoming.length === 0) return undefined;

    const sorted = [...upcoming].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sorted[0].date;
}

export default function CaseDetailsPage() {
    const { id: caseIdFromParams } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        firmCases,
        updateCase,
        deleteCase,
        loading,
        error,
        loadFirmCases,
        getFirmCaseById,
    } = useCases();
    const { caseTasks, loadCaseTasks } = useTasks();
    const { user } = useAuth();

    useEffect(() => {
        const hasNoFirmCasesLoaded = !firmCases || firmCases.length === 0;
        if (!user) return;

        if (hasNoFirmCasesLoaded) {
            loadFirmCases(user?.uid);
        }
    }, [user, firmCases, loadFirmCases]);

    useEffect(() => {
        if (!caseIdFromParams) return;
        loadCaseTasks(caseIdFromParams);
    }, [caseIdFromParams, loadCaseTasks]);

    function handleBackNavigation() {
        navigate(-1);
    }

    function handleEdit(id: string) {
        navigate(`/cases/${id}/edit`);
    }

    function handleArchive(id: string) {
        const caseItem = getFirmCaseById(id);
        const newStatus = caseItem?.status === "archived" ? "open" : "archived";

        updateCase(id, { status: newStatus });
    }

    function handleTogglePrivate(id: string) {
        const caseItem = getFirmCaseById(id);
        const newIsPublic = caseItem?.isPublic === true ? false : true;
        updateCase(id, { isPublic: newIsPublic });
    }

    function handleToggleStar(id: string) {
        const caseItem = getFirmCaseById(id);
        const newIsStarred = caseItem?.isStarred === true ? false : true;
        updateCase(id, { isStarred: newIsStarred });
    }

    function handleDelete(id: string) {
        deleteCase(id);
    }

    if (!caseIdFromParams) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Cases
                </BackButton>
                <p>Invalid case identifier.</p>
            </PageWrapper>
        );
    }

    const caseData = getFirmCaseById(caseIdFromParams);
    const nextHearingComputed = computeNextHearing(
        caseData?.hearingsChronology
    );

    if (loading && !caseData) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Cases
                </BackButton>
                <p>Loading case...</p>
            </PageWrapper>
        );
    }

    if (error && !caseData) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Cases
                </BackButton>
                <p>Something went wrong while loading this case.</p>
            </PageWrapper>
        );
    }

    if (!caseData) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Cases
                </BackButton>
                <p>Case not found.</p>
            </PageWrapper>
        );
    }

    return (
        <>
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Cases
                </BackButton>
                <Heading>Case Details</Heading>
                <IntroductionCard
                    caseData={caseData}
                    onEdit={handleEdit}
                    onArchive={handleArchive}
                    onDelete={handleDelete}
                />
                <MainContentWrapper>
                    <LeftColumn>
                        <InformationCard caseData={caseData} />
                        <TasksCard tasksData={caseTasks} caseId={caseData.id} />
                    </LeftColumn>
                    <RightColumn>
                        <NextHearingCard nextHearing={nextHearingComputed} />

                        <QuickActionsCard
                            isPublic={caseData.isPublic}
                            isStarred={caseData.isStarred}
                            caseId={caseData.id}
                            togglePrivate={handleTogglePrivate}
                            toggleStar={handleToggleStar}
                        />
                    </RightColumn>
                </MainContentWrapper>
            </PageWrapper>
        </>
    );
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 3rem 2rem 4rem 2rem;
`;

const Heading = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    color: #0a0a0a;
    margin: 1rem 0 0.5rem 6.5rem;
`;

const BackButton = styled.a`
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    padding: 2rem;
    padding-bottom: 1rem;
    margin-left: 4.2rem;
    cursor: pointer;
    max-width: 180px;

    &::before {
        content: "<-";
        padding-right: 0.5rem;
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primaryBlue};
    }
`;

const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 3rem 5.3rem;
    justify-content: center;
`;
const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 3rem;
`;

const RightColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
