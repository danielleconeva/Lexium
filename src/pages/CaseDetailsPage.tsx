import { useNavigate, useParams } from "react-router-dom";
import { useCases } from "../hooks/useCases";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import IntroductionCard from "../components/case-details/IntroductionCard";
import styled, { keyframes } from "styled-components";
import InformationCard from "../components/case-details/InformationCard";
import TasksCard from "../components/case-details/TasksCard";
import NextHearingCard from "../components/case-details/NextHearingCard";
import QuickActionsCard from "../components/case-details/QuickActionsCard";
import { useTasks } from "../hooks/useTasks";
import ConfirmModal from "../components/ConfirmModal";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (caseIdFromParams) {
            loadCaseTasks(caseIdFromParams);
        }
    }, []);

    useEffect(() => {
        const hasNoFirmCasesLoaded = !firmCases || firmCases.length === 0;
        if (!user) return;

        if (hasNoFirmCasesLoaded) {
            loadFirmCases(user.uid);
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
        const newIsPublic = caseItem?.isPublic ? false : true;
        updateCase(id, { isPublic: newIsPublic });
    }

    function handleToggleStar(id: string) {
        const caseItem = getFirmCaseById(id);
        const newIsStarred = caseItem?.isStarred ? false : true;
        updateCase(id, { isStarred: newIsStarred });
    }

    function handleDelete(_id: string) {
        setShowDeleteModal(true);
    }

    async function handleConfirmDelete() {
        if (!caseIdFromParams) return;
        await deleteCase(caseIdFromParams);
        setShowDeleteModal(false);
        navigate("/cases");
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

            {showDeleteModal && (
                <ConfirmModal
                    title="Delete case"
                    message="Are you sure you want to delete this case?"
                    confirmLabel="Delete"
                    cancelLabel="Cancel"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 3rem 2rem 4rem 2rem;

    @media (max-width: 640px) {
        padding: 2rem 1.25rem 3rem;
    }

    & > * {
        opacity: 0;
        animation: ${fadeInUp} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
    }

    & > *:nth-child(1) {
        animation-delay: 0.05s;
    }

    & > *:nth-child(2) {
        animation: ${slideInLeft} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.15s;
    }

    & > *:nth-child(3) {
        animation: ${scaleIn} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        animation-delay: 0.25s;
    }

    & > *:nth-child(4) {
        animation-delay: 0.4s;
    }
`;

const Heading = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    color: #0a0a0a;
    margin: 1rem 0 0.5rem 6.5rem;
    position: relative;

    @media (max-width: 1024px) {
        margin-left: 0;
        text-align: center;
    }
`;

const BackButton = styled.a`
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    padding: 2rem;
    padding-bottom: 1rem;
    margin-left: 4.2rem;
    cursor: pointer;
    max-width: 180px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(0);
    position: relative;
    overflow: hidden;

    @media (max-width: 1024px) {
        margin-left: 0;
        padding-left: 0;
    }

    &::before {
        content: "<-";
        padding-right: 0.5rem;
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        display: inline-block;
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primaryBlue};
        transform: translateX(-8px);

        &::before {
            transform: translateX(-4px);
        }

        &::after {
            width: calc(100% - 4rem);
        }
    }
`;

const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 3rem 5.3rem;
    justify-content: center;

    @media (max-width: 1024px) {
        flex-direction: column;
        padding: 2.5rem 0;
    }
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 3rem;

    @media (max-width: 1024px) {
        width: 100%;
        max-width: 1100px;
        align-items: center;
        margin: 0 auto;
    }

    & > * {
        opacity: 0;
    }

    & > *:nth-child(1) {
        animation: ${slideInLeft} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.5s;
    }

    & > *:nth-child(2) {
        animation: ${slideInLeft} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.65s;
    }
`;

const RightColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 641px) and (max-width: 1024px) {
        width: 100%;
        flex-direction: row;
        max-width: 1100px;
        align-items: center;
        margin: 0 auto;
        justify-content: center;
    }

    @media (max-width: 640px) {
        width: 100%;
    }

    & > * {
        opacity: 0;
    }

    & > *:nth-child(1) {
        animation: ${slideInRight} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.6s;
    }

    & > *:nth-child(2) {
        animation: ${slideInRight} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.75s;
    }
`;
