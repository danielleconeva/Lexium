import styled from "styled-components";
import { MapPin, Clock } from "lucide-react";
import type { CaseRecord } from "../../types/Case";

const Card = styled.div`
    background: white;
    border: 1px solid #f5f8fb;
    border-radius: 1rem;
    padding: 1.7rem 2.2rem;
    width: 800px;
    margin: 0 auto;
    box-shadow: 0 8px 17px rgba(15, 23, 42, 0.06);
    transition: 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.12);
        transform: translateY(-2px);
    }

    @media (max-width: 1024px) {
        max-width: 550px;
        padding: 2rem 2rem;
    }

    @media (max-width: 640px) {
        max-width: 300px;
        flex-direction: column;
        gap: 1.75rem;
        padding: 1.75rem 1.7rem;
    }

    @media (min-width: 1920px) {
        width: 1200px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.2rem;
    gap: 0.75rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
`;

const CaseNumber = styled.h3`
    font-size: 1.3rem;
    font-weight: 700;
    color: #5c5c5d;

    @media (max-width: 640px) {
        font-size: 1.15rem;
    }
`;

const TypeBadge = styled.span<{ $type: string }>`
    padding: 0.375rem 0.875rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;

    background: ${({ $type }) => {
        const t = $type.toLowerCase();
        if (t === "civil") return "#eff6ff";
        if (t === "commercial") return "#f0f9ff";
        if (t === "administrative") return "#fef3c7";
        if (t === "criminal") return "#fef2f2";
        return "#f8fafc";
    }};

    color: ${({ $type }) => {
        const t = $type.toLowerCase();
        if (t === "civil") return "#3b82f6";
        if (t === "commercial") return "#0ea5e9";
        if (t === "administrative") return "#d97706";
        if (t === "criminal") return "#dc2626";
        return "#64748b";
    }};

    border: 1px solid
        ${({ $type }) => {
            const t = $type.toLowerCase();
            if (t === "civil") return "#dbeafe";
            if (t === "commercial") return "#e0f2fe";
            if (t === "administrative") return "#fde68a";
            if (t === "criminal") return "#fee2e2";
            return "#e2e8f0";
        }};
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
    color: #64748b;
    margin-bottom: 0.4rem;
    flex-wrap: wrap;

    svg {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }

    @media (max-width: 640px) {
        font-size: 0.9rem;
        gap: 0.5rem;
    }
`;

type Props = {
    caseRecord: CaseRecord;
    hearing: { date: string; time: string };
};

export default function HearingCard({ caseRecord, hearing }: Props) {
    return (
        <Card>
            <Header>
                <CaseNumber>
                    Case {caseRecord.caseNumber}/{caseRecord.caseYear}
                </CaseNumber>
                <TypeBadge $type={caseRecord.type}>{caseRecord.type}</TypeBadge>
            </Header>

            <Details>
                <Row>
                    {caseRecord.clientName}{" "}
                    <span style={{ color: "#999" }}>vs</span>{" "}
                    {caseRecord.opposingParty}
                </Row>

                <Row>
                    <MapPin />
                    {caseRecord.court}
                    <span
                        style={{
                            marginLeft: "0.75rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Clock style={{ marginRight: "0.5rem" }} />
                        {hearing.time}
                    </span>
                </Row>
            </Details>
        </Card>
    );
}
