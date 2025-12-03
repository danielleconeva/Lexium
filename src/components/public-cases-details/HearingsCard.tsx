import styled from "styled-components";
import type { CaseRecord } from "../../types/Case";
import { Clock } from "lucide-react";

const CardContainer = styled.div`
    width: 1120px;
    background: #ffffff;
    align-self: center;
    border-radius: 1rem;
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: 2px 8px 17px rgba(15, 23, 42, 0.06);
    border: 1px solid #eef2f6;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
`;

const HeaderIcon = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 0.5rem;
    background: #eef4ff;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        width: 18px;
        height: 18px;
        color: #3b82f6;
    }
`;

const HeaderTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
`;

const HearingsGrid = styled.div`
    display: flex;
    gap: 1.7rem;
    flex-wrap: wrap;
`;

const HearingCard = styled.div`
    background: #f8fafc;
    border-radius: 2rem;
    padding: 1.2rem;
    min-width: 220px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Line1 = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

const Dot = styled.div<{ active?: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(p) => (p.active ? "#3b82f6" : "#94a3b8")};
`;

const HearingNumber = styled.span`
    font-size: 0.9rem;
    font-weight: 500;
    color: #64748b;
`;

const TimeBadge = styled.div`
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
    background: #ffffff;
    border-radius: 0.8rem;
    border: 1px solid #e2e8f0;
    font-weight: 500;
    color: #475569;
    margin-left: auto;
`;

const DateText = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: #404245;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0 0 0;
`;

type HearingsCardProps = {
    caseData: CaseRecord;
};

export default function HearingsCard({ caseData }: HearingsCardProps) {
    return (
        <CardContainer>
            <CardHeader>
                <HeaderIcon>
                    <Clock />
                </HeaderIcon>
                <HeaderTitle>Hearings Timeline</HeaderTitle>
            </CardHeader>
            <HearingsGrid>
                {caseData.hearingsChronology?.map((hearing, index) => {
                    const dateObj = new Date(hearing.date);
                    const formattedDate = dateObj.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    });
                    return (
                        <HearingCard key={index}>
                            <Line1>
                                <Dot active={index === 0} />
                                <HearingNumber>
                                    Hearing {index + 1}
                                </HearingNumber>
                                <TimeBadge>{hearing.time}</TimeBadge>
                            </Line1>
                            <DateText>{formattedDate}</DateText>
                        </HearingCard>
                    );
                })}
            </HearingsGrid>
            <Divider />
        </CardContainer>
    );
}
