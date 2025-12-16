import styled from "styled-components";
import { Briefcase, Calendar } from "lucide-react";
import type { CaseRecord } from "../../types/Case";

const CardWrapper = styled.div`
    width: 1100px;
    align-self: center;
    margin-top: 1.5rem;

    background: white;
    border-radius: 1.5rem;
    padding: 2.3rem 2.8rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-shadow: 0 8px 17px rgba(15, 23, 42, 0.06);

    @media (max-width: 1024px) {
        max-width: 550px;
        padding: 2rem 2rem;
    }

    @media (max-width: 640px) {
        max-width: 300px;
        flex-direction: column;
        gap: 1.75rem;
        padding: 1.75rem 1.5rem;
    }

    @media (min-width: 1920px) {
        width: 1200px;
    }
`;

const CardLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    flex: 1;

    @media (max-width: 640px) {
        width: 100%;
    }
`;

const CardRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.35rem;

    @media (max-width: 640px) {
        align-items: flex-start;
    }
`;

const BadgeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    @media (max-width: 640px) {
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`;

const StatusBadge = styled.span<{ $status: string }>`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    background: ${(props) => {
        if (props.$status.toLowerCase() === "open") return "#ecfdf5";
        if (props.$status.toLowerCase() === "archived") return "#f1f5f9";
        if (props.$status.toLowerCase() === "closed") return "#fef3c7";
        return "#fef3c7";
    }};
    color: ${(props) => {
        if (props.$status.toLowerCase() === "open") return "#059669";
        if (props.$status.toLowerCase() === "archived") return "#64748b";
        if (props.$status.toLowerCase() === "closed") return "#d97706";
        return "#d97706";
    }};
    border: 1px solid
        ${(props) => {
            if (props.$status.toLowerCase() === "open") return "#d1fae5";
            if (props.$status.toLowerCase() === "archived") return "#e2e8f0";
            if (props.$status.toLowerCase() === "closed") return "#fde68a";
            return "#fde68a";
        }};

    &::before {
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${(props) => {
            if (props.$status.toLowerCase() === "open") return "#059669";
            if (props.$status.toLowerCase() === "archived") return "#64748b";
            return "#d97706";
        }};
    }
`;

const TypeText = styled.span<{ $type: string }>`
    font-size: 0.9rem;
    font-weight: 500;
    color: #64748b;

    @media (max-width: 640px) {
        font-size: 0.85rem;
    }
`;

const CaseNumberAndYear = styled.h3`
    font-size: 2rem;
    font-weight: 600;
    color: #414143;
    margin: 0.25rem 0;
    letter-spacing: -0.03rem;
    line-height: 1.2;

    @media (max-width: 640px) {
        font-size: 1.6rem;
    }
`;

const FirmInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.25rem;
`;

const FirmIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #64748b;
    }
`;

const FirmName = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: #475569;

    @media (max-width: 640px) {
        font-size: 0.95rem;
    }
`;

const InitiatedLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 0.5rem;

    svg {
        width: 1rem;
        height: 1rem;
    }
`;

const InitiatedDate = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #4b4b4c;

    @media (max-width: 640px) {
        font-size: 1.3rem;
    }
`;

type GeneralInfoCardProps = {
    caseData: CaseRecord;
};

export default function GeneralInfoCard({ caseData }: GeneralInfoCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <CardWrapper>
            <CardLeft>
                <BadgeRow>
                    <StatusBadge $status={caseData.status}>
                        {caseData.status}
                    </StatusBadge>
                    <TypeText $type={caseData.type}>{caseData.type}</TypeText>
                </BadgeRow>
                <CaseNumberAndYear>
                    {caseData.caseNumber}/{caseData.caseYear}
                </CaseNumberAndYear>
                {caseData.firmName && (
                    <FirmInfo>
                        <FirmIcon>
                            <Briefcase />
                        </FirmIcon>
                        <FirmName>{caseData.firmName}</FirmName>
                    </FirmInfo>
                )}
            </CardLeft>
            <CardRight>
                <InitiatedLabel>
                    <Calendar />
                    Initiated
                </InitiatedLabel>
                <InitiatedDate>
                    {caseData.initiationDate &&
                        formatDate(caseData.initiationDate)}
                </InitiatedDate>
            </CardRight>
        </CardWrapper>
    );
}
