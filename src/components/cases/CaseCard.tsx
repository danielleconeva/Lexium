import styled from "styled-components";
import { Scale, Calendar, ArrowRight, User, Star } from "lucide-react";
import type { CaseRecord } from "../../types/Case";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled.div`
    background: white;
    border-radius: 1.5rem;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1),
            0 10px 30px rgba(59, 130, 246, 0.08);
        transform: translateY(-2px);
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const TypeBadge = styled.span<{ $type: string }>`
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.875rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    width: fit-content;
    background: ${(props) => {
        const type = props.$type.toLowerCase();
        if (type === "civil") return "#eff6ff";
        if (type === "commercial") return "#f0f9ff";
        if (type === "administrative") return "#fef3c7";
        if (type === "criminal") return "#fef2f2";
        if (type === "administrative-criminal") return "#fdf4ff";
        return "#f8fafc";
    }};
    color: ${(props) => {
        const type = props.$type.toLowerCase();
        if (type === "civil") return "#3b82f6";
        if (type === "commercial") return "#0ea5e9";
        if (type === "administrative") return "#d97706";
        if (type === "criminal") return "#dc2626";
        if (type === "administrative-criminal") return "#c026d3";
        return "#64748b";
    }};
    border: 1px solid
        ${(props) => {
            const type = props.$type.toLowerCase();
            if (type === "civil") return "#dbeafe";
            if (type === "commercial") return "#e0f2fe";
            if (type === "administrative") return "#fde68a";
            if (type === "criminal") return "#fee2e2";
            if (type === "administrative-criminal") return "#fae8ff";
            return "#e2e8f0";
        }};
`;

const CaseNumber = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
    color: #494949;
    margin: 1rem 0 0 1rem;
    letter-spacing: 0.05rem;
    transition: color 0.3s ease;

    ${CardWrapper}:hover & {
        color: #3b82f6;
    }
`;
const CaseNumberRow = styled.div`
    display: flex;
    align-items: center;
`;

const StarIcon = styled(Star)<{ $isStarred: boolean }>`
    width: 1.4rem;
    height: 1.4rem;
    margin-left: 0.8rem;
    margin-top: 0.92rem;
    cursor: pointer;
    transition: transform 0.18s ease, opacity 0.18s ease;

    ${({ $isStarred }) =>
        $isStarred
            ? `
                fill: #3b82f6;
                stroke: none;
            `
            : `
                color: #3b82f6;
            `}

    &:hover {
        transform: scale(1.25);
        opacity: 0.95;
    }

    &:active {
        transform: scale(0.9);
        opacity: 0.85;
    }
`;

const StatusBadge = styled.span<{ $status: string }>`
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    background: ${(props) => {
        if (props.$status.toLowerCase() === "open") return "#ecfdf5";
        if (props.$status.toLowerCase() === "archived") return "#f1f5f9";
        return "#fef3c7";
    }};
    color: ${(props) => {
        if (props.$status.toLowerCase() === "open") return "#059669";
        if (props.$status.toLowerCase() === "archived") return "#64748b";
        return "#d97706";
    }};
    border: 1px solid
        ${(props) => {
            if (props.$status.toLowerCase() === "open") return "#d1fae5";
            if (props.$status.toLowerCase() === "archived") return "#e2e8f0";
            return "#fde68a";
        }};
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 0.75rem;
    transition: background 0.3s ease;

    ${CardWrapper}:hover & {
        background: #eff6ff;
    }
`;

const InfoIcon = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
        width: 1rem;
        height: 1rem;
        color: #3b82f6;
    }
`;

const InfoText = styled.span`
    font-size: 0.95rem;
    color: #475569;
    flex: 1;
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 0.75rem;
    border-top: 1px solid #f1f5f9;
`;

const ViewButton = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #3b82f6;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        gap: 0.75rem;
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`;

type CaseCardProps = {
    caseData: CaseRecord;
    onStarToggle: (id: string, currentValue: boolean) => void;
};

export default function CaseCard({ caseData, onStarToggle }: CaseCardProps) {
    const navigate = useNavigate();

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onStarToggle(caseData.id, caseData.isStarred);
    };

    const handleViewCase = () => {
        navigate(`/cases/${caseData.id}`);
    };

    return (
        <CardWrapper>
            <CardHeader>
                <HeaderLeft>
                    <TypeBadge $type={caseData.type}>{caseData.type}</TypeBadge>
                    <CaseNumberRow>
                        <CaseNumber>
                            {caseData.caseNumber}/{caseData.caseYear}
                        </CaseNumber>
                        <StarIcon
                            $isStarred={caseData.isStarred}
                            onClick={handleStarClick}
                        />
                    </CaseNumberRow>
                </HeaderLeft>
                <StatusBadge $status={caseData.status}>
                    {caseData.status}
                </StatusBadge>
            </CardHeader>

            <InfoSection>
                {caseData.clientName && (
                    <InfoRow>
                        <InfoIcon>
                            <User />
                        </InfoIcon>
                        <InfoText>{caseData.clientName}</InfoText>
                    </InfoRow>
                )}
                <InfoRow>
                    <InfoIcon>
                        <Scale />
                    </InfoIcon>
                    <InfoText>{caseData.court}</InfoText>
                </InfoRow>
                {caseData.nextHearingDate && (
                    <InfoRow>
                        <InfoIcon>
                            <Calendar />
                        </InfoIcon>
                        <InfoText>
                            {new Date(
                                caseData.nextHearingDate
                            ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </InfoText>
                    </InfoRow>
                )}
            </InfoSection>

            <CardFooter>
                <ViewButton onClick={handleViewCase}>
                    View Details
                    <ArrowRight />
                </ViewButton>
            </CardFooter>
        </CardWrapper>
    );
}
