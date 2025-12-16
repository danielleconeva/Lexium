import { Folder } from "lucide-react";
import styled from "styled-components";
import type { CaseRecord } from "../../types/Case";
import { Link } from "react-router-dom";

type RecentCasesCardProps = {
    cases: CaseRecord[];
};

export default function RecentCasesCard({ cases }: RecentCasesCardProps) {
    function formatDate(value?: string | null) {
        if (!value) return "–";
        try {
            return new Date(value)
                .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                .replace(/ /g, " ");
        } catch {
            return value;
        }
    }
    return (
        <Card>
            <HeaderRow>
                <HeaderLeft>
                    <IconWrapper>
                        <Folder size={20} strokeWidth={2.2} />
                    </IconWrapper>
                    <TitleWrapper>
                        <Title>Recent Cases</Title>
                        <Subtitle>Latest activity</Subtitle>
                    </TitleWrapper>
                </HeaderLeft>
                <ViewAllBtn to="/cases">View All</ViewAllBtn>
            </HeaderRow>

            <Divider />

            <CasesList>
                {cases.map((recentCase, index) => (
                    <CaseItem key={recentCase.id}>
                        <IndexCircle>{index + 1}</IndexCircle>
                        <CaseContent>
                            <CaseNumber>
                                {recentCase.caseNumber}/{recentCase.caseYear}
                            </CaseNumber>
                            <CaseClient>{recentCase.clientName}</CaseClient>
                        </CaseContent>
                        <Tag>{recentCase.type.toLowerCase()}</Tag>
                        <DateText>
                            {formatDate(recentCase.initiationDate)}
                        </DateText>
                    </CaseItem>
                ))}
            </CasesList>
        </Card>
    );
}

const Card = styled.div`
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06);
    border: 1px solid #eef2f6;
    min-height: 640px;
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

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;

const IconWrapper = styled.div`
    background: #5897fc;
    opacity: 0.6;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: white;
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
`;

const ViewAllBtn = styled(Link)`
    background: none;
    text-decoration: none;
    border: none;
    color: #909090;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    font-family: ${({ theme }) => theme.fonts.main};

    &::after {
        content: "->";
        padding-left: 0.5rem;
    }
`;

const Subtitle = styled.div`
    color: #6b7280;
    font-size: 0.9rem;
`;

const CasesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
`;

const CaseItem = styled.div`
    display: grid;
    grid-template-columns: 45px 1fr auto auto;
    gap: 1rem;
    align-items: center;
    margin: 0.5rem 0;
`;

const IndexCircle = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f1f5f9;
    display: grid;
    place-items: center;
    font-weight: 600;
    color: #475569;
`;

const CaseContent = styled.div``;

const CaseNumber = styled.div`
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.3rem;
`;

const CaseClient = styled.div`
    font-size: 0.85rem;
    color: #64748b;
`;

const Tag = styled.div`
    background: #e2f3ff;
    padding: 0.25rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    color: #0ea5e9;
`;

const DateText = styled.div`
    font-size: 0.8rem;
    color: #64748b;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0;
`;
