import styled from "styled-components";
import type { CaseRecord } from "../../types/Case";
import { FileText } from "lucide-react";

const CardContainer = styled.div`
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    margin-top: 2rem;
    max-width: 580px;
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

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
`;

const Label = styled.span`
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: #94a3b8;
`;

const Value = styled.span`
    font-size: 0.95rem;
    color: #475569;
    font-weight: 400;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0;
`;

const DescriptionSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const DescriptionText = styled.p`
    font-size: 0.95rem;
    color: #475569;
    line-height: 1;
`;

type CaseInformationCardProps = {
    caseData: CaseRecord;
};

export default function CaseInformationCard({
    caseData,
}: CaseInformationCardProps) {
    const getInitials = (fullName: string): string =>
        fullName
            .trim()
            .split(/\s+/)
            .map((word) => word[0].toUpperCase() + ".")
            .join(" ");

    return (
        <CardContainer>
            <CardHeader>
                <HeaderIcon>
                    <FileText />
                </HeaderIcon>
                <HeaderTitle>Case Information</HeaderTitle>
            </CardHeader>
            <Divider />
            <InfoGrid>
                <InfoItem>
                    <Label>COURT</Label>
                    <Value>{caseData.court}</Value>
                </InfoItem>

                <InfoItem>
                    <Label>FORMATION</Label>
                    <Value>{caseData.formation || "—"}</Value>
                </InfoItem>

                <InfoItem>
                    <Label>CLIENT</Label>
                    <Value>{getInitials(caseData.clientName) || "—"}</Value>
                </InfoItem>
            </InfoGrid>

            <Divider />

            <DescriptionSection>
                <Label>DESCRIPTION</Label>
                <DescriptionText>
                    {caseData.publicDescription || "No description available."}
                </DescriptionText>
            </DescriptionSection>
        </CardContainer>
    );
}
