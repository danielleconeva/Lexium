import { ClipboardList } from "lucide-react";
import styled from "styled-components";
import type { TaskRecord } from "../../types/Task";
import { Link } from "react-router-dom";

type TasksCardProps = {
    tasksData: TaskRecord[];
    caseId: string;
};

export default function TasksCard({ tasksData, caseId }: TasksCardProps) {
    function formatDate(value?: string | null) {
        if (!value) return "–";
        try {
            return new Date(value).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
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
                        <ClipboardList size={20} strokeWidth={2.2} />
                    </IconWrapper>
                    <Title>Related Tasks</Title>
                </HeaderLeft>

                <ViewAllBtn to={`/case/${caseId}/tasks`}>View All</ViewAllBtn>
            </HeaderRow>

            <Divider />

            <TasksList>
                {[...tasksData]
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 5)
                    .map((task) => (
                        <TaskItem
                            key={task.id}
                            $isActive={task.status === "In Progress"}
                        >
                            <TopRow>
                                <TaskTitle>{task.title}</TaskTitle>
                                <StatusPill $status={task.status}>
                                    {task.status}
                                </StatusPill>
                            </TopRow>

                            <TaskMeta>
                                <DueText>
                                    Due: {formatDate(task.dueDate)}
                                </DueText>
                            </TaskMeta>
                        </TaskItem>
                    ))}
            </TasksList>
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
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0 2rem;
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

const TasksList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const TaskItem = styled.div<{ $isActive: boolean }>`
    background: #ffffff;
    border: 1px solid ${({ $isActive }) => ($isActive ? "#b8d1ff" : "#eef2f6")};
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 3px 11px rgba(15, 23, 42, 0.06);
    transition: 0.25s ease;
`;

const TaskTitle = styled.div`
    font-size: 1.04rem;
    font-weight: 600;
    color: #525254;
    margin-bottom: 0.3rem;
    max-width: 550px;
`;

const TaskMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DueText = styled.div`
    font-size: 0.9rem;
    color: #6b7280;
`;

const StatusPill = styled.div<{ $status: string }>`
    padding: 0.4rem 1rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;

    ${({ $status }) => {
        switch ($status) {
            case "Done":
                return `
                    background: #dcfce7;
                    color: #166534;
                `;
            case "In Progress":
                return `
                    background: #f3e8ff;
                    color: #7e22ce;
                `;
            case "To Do":
            default:
                return `
                    background: #fee2e2;
                    color: #b91c1c;
                `;
        }
    }}
`;

const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.35rem;
`;
