import styled, { keyframes } from "styled-components";
import GeneralInfoCard from "../components/public-cases-details/GeneralInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import { useCases } from "../hooks/useCases";
import { useEffect } from "react";
import CaseInformationCard from "../components/public-cases-details/CaseInformationCard";
import PartiesCard from "../components/public-cases-details/PartiesCard";
import HearingsCard from "../components/public-cases-details/HearingsCard";

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

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 3rem 2rem 4rem 2rem;

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

    & > *:nth-child(5) {
        animation: ${fadeInUp} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.55s;
    }
`;

const Heading = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    color: #0a0a0a;
    margin: 1rem 0 0.5rem 6.5rem;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(
            90deg,
            ${({ theme }) => theme.colors.primaryBlue},
            transparent
        );
        animation: ${keyframes`
            to {
                width: 100px;
            }
        `} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        animation-delay: 0.4s;
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

    &::before {
        content: "<-";
        padding-right: 0.5rem;
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        display: inline-block;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 1rem;
        left: 2rem;
        width: 0;
        height: 2px;
        background: ${({ theme }) => theme.colors.primaryBlue};
        transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

const MiddleRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;

    & > * {
        opacity: 0;
    }

    & > *:nth-child(1) {
        animation: ${slideInLeft} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.5s;
    }

    & > *:nth-child(2) {
        animation: ${slideInRight} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.6s;
    }
`;

export default function PublicCasesDetailsPage() {
    const { id: caseIdFromParams } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { publicCases, loading, error, loadPublicCases, getPublicCaseById } =
        useCases();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
