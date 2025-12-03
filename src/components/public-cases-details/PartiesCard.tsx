import styled from "styled-components";
import type { CaseRecord } from "../../types/Case";
import { Users } from "lucide-react";

const CardContainer = styled.div`
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    margin-top: 2rem;
    max-width: 700px;
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
    border-radius: 0.7rem;
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

const PartiesGrid = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
`;

const PartyCard = styled.div`
    flex: 1;
    min-width: 180px;
    background: #f8fafc;
    border-radius: 2rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Avatar = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #e6edff;
    color: #3b82f6;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
`;

const PartyName = styled.div`
    font-size: 0.95rem;
    font-weight: 600;
    color: #1e293b;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0 0 0;
`;

type PartiesCardProps = {
    caseData: CaseRecord;
};

export default function PartiesCard({ caseData }: PartiesCardProps) {
    return (
        <CardContainer>
            <CardHeader>
                <HeaderIcon>
                    <Users />
                </HeaderIcon>
                <HeaderTitle>Parties Involved</HeaderTitle>
            </CardHeader>
            <Divider />

            <PartiesGrid>
                {caseData.partiesInitials?.map((initials, index) => (
                    <PartyCard key={index}>
                        <Avatar>{initials.charAt(0)}</Avatar>

                        <PartyName>{initials}</PartyName>
                    </PartyCard>
                ))}
            </PartiesGrid>
        </CardContainer>
    );
}
