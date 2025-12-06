import styled from "styled-components";
import { NotepadText } from "lucide-react";

type NotesAndDescriptionCardProps = {
    notes: string;
    setNotes: (value: string) => void;
    publicDescription: string;
    setPublicDescription: (value: string) => void;
};
export default function NotesAndDescriptionCard({
    notes,
    setNotes,
    publicDescription,
    setPublicDescription,
}: NotesAndDescriptionCardProps) {
    return (
        <CardContainer>
            <CardHeader>
                <IconWrapper>
                    <NotepadText size={22} strokeWidth={2.2} />
                </IconWrapper>
                <CardTitle>Notes & Description</CardTitle>
            </CardHeader>

            <FormColumn>
                <FormField>
                    <Label>Internal Notes</Label>
                    <Textarea
                        placeholder="Internal case notes (not visible publicly)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </FormField>

                <FormField>
                    <Label>Public Description</Label>
                    <Textarea
                        placeholder="Brief description for public viewing (if case is set to public)"
                        value={publicDescription}
                        onChange={(e) => setPublicDescription(e.target.value)}
                    />
                </FormField>
            </FormColumn>
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
    margin-bottom: 2rem;
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

const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: #4c4e4e;
`;

const Textarea = styled.textarea`
    width: 800px;
    min-height: 65px;
    font-family: ${({ theme }) => theme.fonts.main};
    padding: 1rem 1.2rem;
    border-radius: 0.8rem;
    border: 1px solid #e2e8f0;
    background: #f9fafb;
    color: #0f172a;
    font-size: 0.95rem;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #93c5fd;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.25);
    }
`;
