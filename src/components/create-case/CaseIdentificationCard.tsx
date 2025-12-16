import styled from "styled-components";
import { FileText } from "lucide-react";

type Props = {
    caseNumber: string;
    caseYear: string;
    setCaseNumber: (v: string) => void;
    setCaseYear: (v: string) => void;
};

export default function CaseIdentificationCard({
    caseNumber,
    caseYear,
    setCaseNumber,
    setCaseYear,
}: Props) {
    return (
        <CardContainer>
            {" "}
            <CardHeader>
                {" "}
                <IconWrapper>
                    {" "}
                    <FileText size={22} strokeWidth={2.2} />{" "}
                </IconWrapper>{" "}
                <CardTitle>Case Identification</CardTitle>{" "}
            </CardHeader>
            <FormGrid>
                <FormField>
                    <Label>Case Number *</Label>
                    <Input
                        value={caseNumber}
                        onChange={(e) => setCaseNumber(e.target.value)}
                        placeholder="34124"
                    />
                </FormField>

                <FormField>
                    <Label>Year *</Label>
                    <Input
                        value={caseYear}
                        onChange={(e) => setCaseYear(e.target.value)}
                        placeholder="2024"
                    />
                </FormField>
            </FormGrid>
        </CardContainer>
    );
}
const CardContainer = styled.div`
    background: #ffffff;
    border-radius: 1.2rem;
    padding: 2rem 0 2rem 3rem;
    margin-top: 1.5rem;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    border: 1px solid #eef2f6;
    width: 925px;
    margin: 0 auto;
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

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.8rem;
`;

const IconWrapper = styled.div`
    background: #eef4ff;
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: #3b82f6;

    @media (max-width: 640px) {
        width: 44px;
        height: 44px;
    }
`;

const CardTitle = styled.h3`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #0f172a;

    @media (max-width: 640px) {
        font-size: 1.1rem;
    }
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: #4c4e4e;

    @media (max-width: 640px) {
        font-size: 0.95rem;
    }
`;

const Input = styled.input`
    font-family: ${({ theme }) => theme.fonts.main};
    padding: 0.9rem 1.1rem;
    border-radius: 0.7rem;
    border: 1px solid #e2e8f0;
    background: #f9fafb;
    font-size: 0.95rem;
    color: #0f172a;
    width: 100%;
    max-width: 340px;

    &:focus {
        outline: none;
        border-color: #93c5fd;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.25);
    }

    @media (max-width: 1024px) {
        width: 80%;
    }

    @media (max-width: 640px) {
        font-size: 0.95rem;
        padding: 0.85rem 1rem;
    }
`;
