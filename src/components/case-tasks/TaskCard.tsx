import styled from "styled-components";
import { Pencil, Trash2, Calendar } from "lucide-react";
import type { TaskRecord } from "../../types/Task";
import { useTasks } from "../../hooks/useTasks";

type Props = {
    task: TaskRecord;
    onEdit: () => void;
};

export default function TaskCard({ task, onEdit }: Props) {
    const { deleteTask } = useTasks();

    return (
        <Card>
            <TopSection>
                <Title>{task.title}</Title>
            </TopSection>

            <BottomSection>
                {task.dueDate && (
                    <DateTag>
                        <Calendar size={13} strokeWidth={2.5} />
                        <DateText>{task.dueDate}</DateText>
                    </DateTag>
                )}
                <ActionButtons>
                    <ActionBtn onClick={onEdit} variant="edit">
                        <Pencil size={14} strokeWidth={2.5} />
                    </ActionBtn>
                    <ActionBtn
                        onClick={() => deleteTask(task.id)}
                        variant="delete"
                    >
                        <Trash2 size={14} strokeWidth={2.5} />
                    </ActionBtn>
                </ActionButtons>
            </BottomSection>
        </Card>
    );
}

const Card = styled.div`
    background: #ffffff;
    border-radius: 10px;
    padding: 1.25rem;
    border: 1px solid #e8ecef;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
        transform: translateY(-4px);
        border-color: rgba(61, 112, 254, 0.2);
        box-shadow: 0 12px 24px rgba(61, 112, 254, 0.18);
    }
`;

const TopSection = styled.div`
    margin-bottom: 0.875rem;
`;

const Title = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: #414143;
    margin: 0;
    line-height: 1.5;
    letter-spacing: -0.02em;
`;

const BottomSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
`;

const DateTag = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    background: #f8fafc;
    border-radius: 6px;
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
`;

const DateText = styled.span`
    line-height: 1;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.3rem;
    margin-left: auto;
`;

const ActionBtn = styled.button<{ variant: "edit" | "delete" }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: #94a3b8;
    transition: all 0.2s ease;

    &:hover {
        background: ${(props) =>
            props.variant === "edit" ? "#f1f5f9" : "#fef2f2"};
        color: ${(props) => (props.variant === "edit" ? "#3d70fe" : "#ef4444")};
    }

    &:active {
        transform: scale(0.95);
    }
`;
