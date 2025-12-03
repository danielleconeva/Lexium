import styled from "styled-components";
import GeneralInfoCard from "../components/public-cases-details/GeneralInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import { useCases } from "../hooks/useCases";
import { useEffect } from "react";
import CaseInformationCard from "../components/public-cases-details/CaseInformationCard";
import PartiesCard from "../components/public-cases-details/PartiesCard";
import HearingsCard from "../components/public-cases-details/HearingsCard";

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

const MiddleRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
`;

export default function PublicCasesDetailsPage() {
    const { id: caseIdFromParams } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { publicCases, loading, error, loadPublicCases, getPublicCaseById } =
        useCases();

    useEffect(() => {
        const hasNoPublicCasesLoaded = !publicCases || publicCases.length === 0;
        if (hasNoPublicCasesLoaded) {
            loadPublicCases();
        }
    }, [publicCases, loadPublicCases]);

    function handleBackNavigation() {
        navigate(-1);
    }

    if (!caseIdFromParams) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Public Cases
                </BackButton>
                <p>Invalid case identifier.</p>
            </PageWrapper>
        );
    }

    const caseData = getPublicCaseById(caseIdFromParams);

    if (loading && !caseData) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Public Cases
                </BackButton>
                <p>Loading case...</p>
            </PageWrapper>
        );
    }

    if (error && !caseData) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Public Cases
                </BackButton>
                <p>Something went wrong while loading this case.</p>
            </PageWrapper>
        );
    }

    if (!caseData) {
        return (
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Public Cases
                </BackButton>
                <p>Case not found.</p>
            </PageWrapper>
        );
    }

    return (
        <>
            <PageWrapper>
                <BackButton onClick={handleBackNavigation}>
                    Back to Public Cases
                </BackButton>
                <Heading>Public Case Details</Heading>
                <GeneralInfoCard caseData={caseData} />
                <MiddleRow>
                    <CaseInformationCard caseData={caseData} />
                    <PartiesCard caseData={caseData} />
                </MiddleRow>
                <HearingsCard caseData={caseData} />
            </PageWrapper>
        </>
    );
}
