import styled from "styled-components";
import { Landmark } from "lucide-react";

type CaseDetailsCardProps = {
    type: string;
    setType: (value: string) => void;
    court: string;
    setCourt: (value: string) => void;
    formation: string;
    setFormation: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
};
export default function CaseDetailsCard({
    type,
    setType,
    court,
    setCourt,
    formation,
    setFormation,
    status,
    setStatus,
}: CaseDetailsCardProps) {
    return (
        <CardContainer>
            <CardHeader>
                <IconWrapper>
                    <Landmark size={22} strokeWidth={2.2} />
                </IconWrapper>
                <CardTitle>Case Details</CardTitle>
            </CardHeader>

            <FormGrid>
                <FormField>
                    <Label>Type *</Label>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Select type</option>
                        <option value="civil">Civil</option>
                        <option value="commercial">Commercial</option>
                        <option value="criminal">Criminal</option>
                        <option value="administrative">Administrative</option>
                        <option value="administrative-criminal">
                            Administrative-criminal
                        </option>
                    </Select>
                </FormField>

                <FormField>
                    <Label>Court *</Label>
                    <Input
                        placeholder="High Court of Justice"
                        value={court}
                        onChange={(e) => setCourt(e.target.value)}
                    />
                </FormField>

                <FormField>
                    <Label>Formation *</Label>
                    <Input
                        placeholder="Division 3"
                        value={formation}
                        onChange={(e) => setFormation(e.target.value)}
                    />
                </FormField>

                <FormField>
                    <Label>Status *</Label>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="open">Open</option>
                        <option value="archived">Archived</option>
                    </Select>
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
    margin-left: auto;
    margin-right: auto;
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
`;

const CardTitle = styled.h3`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #0f172a;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    column-gap: 4rem;
    row-gap: 1.5rem;

    max-width: 780px;
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
`;

const Input = styled.input`
    font-family: ${({ theme }) => theme.fonts.main};
    width: 390px;

    padding: 0.9rem 1.1rem;
    border-radius: 0.7rem;
    border: 1px solid #e2e8f0;
    background: #f9fafb;
    font-size: 0.95rem;
    color: #0f172a;
    appearance: none;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #93c5fd;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.25);
    }
`;

const Select = styled.select`
    font-family: ${({ theme }) => theme.fonts.main};
    width: 390px;
    padding: 0.9rem 1.1rem;
    border-radius: 0.7rem;
    border: 1px solid #e2e8f0;
    background: #f9fafb;
    font-size: 0.95rem;
    color: #0f172a;
    cursor: pointer;
    box-sizing: border-box;

    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 20 20' fill='none' stroke='%2364728B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='7 8 12 13 17 8'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;

    &:focus {
        outline: none;
        border-color: #93c5fd;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.25);
    }
`;
