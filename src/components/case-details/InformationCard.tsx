import { Folder } from "lucide-react";
import styled from "styled-components";
import type { CaseRecord } from "../../types/Case";

type InformationCardProps = {
    caseData: CaseRecord;
};

export default function InformationCard({ caseData }: InformationCardProps) {
    function formatDate(value?: string | null) {
        if (!value) return "–";
        try {
            return new Date(value).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
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
                    <Title>Case Information</Title>
                </HeaderLeft>
            </HeaderRow>

            <Divider />

            <Grid>
                <InfoBox>
                    <Label>Case Number & Year</Label>
                    <Value>
                        {caseData.caseNumber || "–"}/{caseData.caseYear || "-"}
                    </Value>
                </InfoBox>

                <InfoBox>
                    <Label>Court</Label>
                    <Value>{caseData.court || "–"}</Value>
                </InfoBox>

                <InfoBox>
                    <Label>Formation</Label>
                    <Value>{caseData.formation || "–"}</Value>
                </InfoBox>

                <InfoBox>
                    <Label>Date Initiated</Label>
                    <Value>{formatDate(caseData.initiationDate)}</Value>
                </InfoBox>

                <FullWidthBox>
                    <Label>Notes</Label>
                    <Value>{caseData.notes || "–"}</Value>
                </FullWidthBox>
            </Grid>
        </Card>
    );
}

const Card = styled.div`
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06);
    border: 1px solid #eef2f6;
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
    background: #eef4ff;
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: #3b82f6;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #0a0a0a;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0 2rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
`;

const InfoBox = styled.div`
    background: #fafbfd;
    border: 1px solid #eef2f6;
    border-radius: 0.9rem;
    padding: 1.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const FullWidthBox = styled(InfoBox)`
    grid-column: span 2;
`;

const Label = styled.div`
    font-size: 0.85rem;
    font-weight: 500;
    color: #64748b;
`;

const Value = styled.div`
    font-size: 1.05rem;
    font-weight: 500;
    color: #525254;
`;
