import styled from "styled-components";
import { Calendar, Plus, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type Hearing = {
    date: string;
    time: string;
};

type ImportantDatesCardProps = {
    initiationDate: string;
    setInitiationDate: (value: string) => void;
    hearings: Hearing[];
    setHearings: Dispatch<SetStateAction<Hearing[]>>;
};

export default function ImportantDatesCard({
    initiationDate,
    setInitiationDate,
    hearings,
    setHearings,
}: ImportantDatesCardProps) {
    function handleAddHearing() {
        setHearings((prev) => [...prev, { date: "", time: "" }]);
    }

    function handleRemoveHearing(index: number) {
        setHearings((prev) => prev.filter((_, i) => i !== index));
    }

    function handleHearingChange(
        index: number,
        field: "date" | "time",
        value: string
    ) {
        setHearings((prev) =>
            prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
        );
    }

    return (
        <CardContainer>
            <CardHeader>
                <IconWrapper>
                    <Calendar size={22} strokeWidth={2.2} />
                </IconWrapper>
                <CardTitle>Important Dates</CardTitle>
            </CardHeader>

            <FormGrid>
                <FormField>
                    <Label>Initiation Date *</Label>
                    <Input
                        type="date"
                        value={initiationDate}
                        onChange={(e) => setInitiationDate(e.target.value)}
                    />
                </FormField>
            </FormGrid>

            <HearingsSection>
                <SectionHeader>
                    <Label>Hearings</Label>
                    <AddButton type="button" onClick={handleAddHearing}>
                        <Plus size={18} strokeWidth={2.5} />
                        Add Hearing
                    </AddButton>
                </SectionHeader>

                {hearings.map((hearing, index) => (
                    <HearingRow key={index}>
                        <HearingNumber>#{index + 1}</HearingNumber>
                        <FormGrid>
                            <FormField>
                                <Label>Hearing Date</Label>
                                <Input
                                    type="date"
                                    value={hearing.date}
                                    onChange={(e) =>
                                        handleHearingChange(
                                            index,
                                            "date",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>
                            <FormField>
                                <Label>Hearing Time</Label>
                                <Input
                                    type="time"
                                    value={hearing.time}
                                    onChange={(e) =>
                                        handleHearingChange(
                                            index,
                                            "time",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>
                        </FormGrid>
                        <RemoveButton
                            type="button"
                            onClick={() => handleRemoveHearing(index)}
                        >
                            <X size={18} />
                        </RemoveButton>
                    </HearingRow>
                ))}
            </HearingsSection>
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
`;

const Input = styled.input`
    font-family: inherit;
    padding: 0.9rem 1.1rem;
    border-radius: 0.7rem;
    border: 1px solid #e2e8f0;
    background: #f9fafb;
    font-size: 0.95rem;
    color: #0f172a;
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

const HearingsSection = styled.div`
    margin-top: 2rem;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const AddButton = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    display: inline-flex;
    align-items: center;
    width: 180px;
    gap: 0.5rem;
    margin-right: 9rem;

    background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
    color: white;

    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;

    font-size: 0.9rem;
    font-weight: 500;

    box-shadow: 0 8px 24px rgba(37, 99, 255, 0.35);
    transition: 0.25s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 15px rgba(37, 99, 255, 0.35);
    }

    &:active {
        transform: translateY(-1px);
    }

    @media (max-width: 1024px) {
        width: 150px;
        margin-right: 2rem;
        font-size: 0.7rem;
    }
`;

const HearingRow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid #eef2f6;

    &:last-child {
        border-bottom: none;
    }
`;

const HearingNumber = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: #3d70fe;
    min-width: 35px;
    padding-top: 0.5rem;
`;

const RemoveButton = styled.button`
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    background: transparent;
    color: #94a3b8;
    border: 1px solid #e2e8f0;
    border-radius: 0.6rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 1.8rem;

    &:hover {
        background: #fef2f2;
        color: #ef4444;
        border-color: #fecaca;
    }

    &:active {
        transform: scale(0.95);
    }
`;
