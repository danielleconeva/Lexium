import { useState, useMemo } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import type { TaskRecord } from "../../types/Task";
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { showNotification } from "../../features/notifications/notificationsSlice";
import type { AppDispatch } from "../../store/store";

type Props = {
    mode: "create" | "edit";
    task?: TaskRecord;
    caseId: string;
    onClose: () => void;
};

export default function TaskModal({ mode, task, caseId, onClose }: Props) {
    const { user } = useAuth();
    const { createTask, updateTask } = useTasks();
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState(task?.title ?? "");
    const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
    const [status, setStatus] = useState<TaskRecord["status"]>(
        task?.status ?? "To Do"
    );

    const isValid = useMemo(() => {
        return title.trim() !== "" && dueDate.trim() !== "";
    }, [title, dueDate]);

    async function handleSubmit() {
        if (!isValid) return;

        try {
            if (mode === "create") {
                await createTask({
                    title,
                    status,
                    dueDate,
                    caseId,
                    firmId: user?.uid || "",
                    notes: undefined,
                });

                dispatch(
                    showNotification({
                        type: "success",
                        message: "Task created successfully!",
                    })
                );
            } else {
                await updateTask(task!.id, {
                    title,
                    status,
                    dueDate,
                });

                dispatch(
                    showNotification({
                        type: "success",
                        message: "Task updated successfully!",
                    })
                );
            }

            onClose();
        } catch (err: any) {
            dispatch(
                showNotification({
                    type: "error",
                    message:
                        err?.message ||
                        (mode === "create"
                            ? "Failed to create task."
                            : "Failed to update task."),
                })
            );
        }
    }

    return (
        <Overlay onClick={onClose}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Heading>
                        {mode === "create" ? "New Task" : "Edit Task"}
                    </Heading>
                    <CloseButton onClick={onClose}>
                        <X size={20} strokeWidth={2} />
                    </CloseButton>
                </Header>

                <FormSection>
                    <FormGroup>
                        <Label>Title *</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title..."
                            autoFocus
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Due Date *</Label>
                        <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Status</Label>
                        <PillsWrapper>
                            <Pill
                                $active={status === "To Do"}
                                onClick={() => setStatus("To Do")}
                            >
                                To Do
                            </Pill>
                            <Pill
                                $active={status === "In Progress"}
                                onClick={() => setStatus("In Progress")}
                            >
                                In Progress
                            </Pill>
                            <Pill
                                $active={status === "Done"}
                                onClick={() => setStatus("Done")}
                            >
                                Done
                            </Pill>
                        </PillsWrapper>
                    </FormGroup>
                </FormSection>

                <Actions>
                    <CancelBtn onClick={onClose}>Cancel</CancelBtn>
                    <SaveBtn
                        disabled={!isValid}
                        $disabled={!isValid}
                        onClick={handleSubmit}
                    >
                        {mode === "create" ? "Create Task" : "Save Changes"}
                    </SaveBtn>
                </Actions>
            </ModalCard>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    backdrop-filter: blur(8px);
    background: rgba(15, 23, 42, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalCard = styled.div`
    width: 480px;
    background: white;
    padding: 0;
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.75rem 2rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
`;

const Heading = styled.h3`
    font-size: 1.375rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
`;

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: #94a3b8;
    transition: all 0.2s ease;

    &:hover {
        background: #f1f5f9;
        color: #475569;
    }
`;

const FormSection = styled.div`
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: #475569;
    letter-spacing: -0.01em;
`;

const Input = styled.input`
    font-family: ${({ theme }) => theme.fonts.main};
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.9375rem;
    color: #0f172a;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #3d70fe;
        box-shadow: 0 0 0 3px rgba(61, 112, 254, 0.1);
    }

    &::placeholder {
        color: #cbd5e1;
    }
`;

const PillsWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const Pill = styled.button<{ $active: boolean }>`
    padding: 0.6rem 1.3rem;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid ${({ $active }) => ($active ? "#3d70fe" : "#e2e8f0")};
    background: ${({ $active }) =>
        $active
            ? "linear-gradient(135deg, #3d70fe 0%, #667eea 100%)"
            : "white"};
    color: ${({ $active }) => ($active ? "white" : "#64748b")};
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
        border-color: #3d70fe;
        background: ${({ $active }) =>
            $active
                ? "linear-gradient(135deg, #3d70fe 0%, #667eea 100%)"
                : "#f8fafc"};
        color: ${({ $active }) => ($active ? "white" : "#3d70fe")};
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1.25rem 2rem 1.75rem;
    border-top: 1px solid #f1f5f9;
`;

const CancelBtn = styled.button`
    background: transparent;
    border: 1px solid #e2e8f0;
    padding: 0.8rem 1.6rem;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
    transition: all 0.2s ease;

    &:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
        color: #475569;
    }
`;

const SaveBtn = styled.button<{ $disabled: boolean }>`
    background: ${({ $disabled }) =>
        $disabled
            ? "linear-gradient(135deg, #b5c0f7 0%, #ccd3ff 100%)"
            : "linear-gradient(135deg, #3d70fe 0%, #667eea 100%)"};

    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
    pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

    color: white;
    border: none;
    padding: 0.8rem 1.6rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
`;
