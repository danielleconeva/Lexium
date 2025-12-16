import styled from "styled-components";
import type { TaskRecord } from "../../types/Task";

type RecentTasksCardProps = {
    tasks: TaskRecord[];
    caseMap: Record<string, { caseNumber: string; caseYear: string }>;
};

export default function RecentTasksCard({
    tasks,
    caseMap,
}: RecentTasksCardProps) {
    function formatDate(value?: string | null) {
        if (!value) return "–";
        try {
            return new Date(value)
                .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                .replace(/ /g, " ");
        } catch {
            return value;
        }
    }
    return (
        <Card>
            <HeaderRow>
                <HeaderLeft>
                    <IconWrapper>🧾</IconWrapper>
                    <TitleWrapper>
                        <Title>Recent Tasks</Title>
                        <Subtitle>Latest activity</Subtitle>
                    </TitleWrapper>
                </HeaderLeft>
            </HeaderRow>
            <Divider />

            <TaskList>
                {tasks.map((task) => {
                    const caseData = caseMap[task.caseId];

                    return (
                        <TaskItem key={task.id}>
                            <TaskInfo>
                                <TaskTitle>{task.title}</TaskTitle>

                                <TaskMeta>
                                    {caseData
                                        ? `${caseData.caseNumber}/${caseData.caseYear}`
                                        : "Unknown Case"}{" "}
                                    • Due {formatDate(task.dueDate)}
                                </TaskMeta>
                            </TaskInfo>

                            <Status $status={task.status}>{task.status}</Status>
                        </TaskItem>
                    );
                })}
            </TaskList>
        </Card>
    );
}

const Card = styled.div`
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06);
    border: 1px solid #eef2f6;
    height: fit-content;
    min-height: 392px;

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
    background: #fff7e5;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 10px;
`;

const Subtitle = styled.div`
    color: #6b7280;
    font-size: 0.9rem;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;
const Title = styled.h3`
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
`;

const TaskList = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
`;

const TaskItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const TaskInfo = styled.div``;

const TaskTitle = styled.div`
    font-weight: 600;
    font-size: 1rem;
    color: #0f172a;
    margin-bottom: 0.5rem;
`;

const TaskMeta = styled.div`
    color: #64748b;
    font-size: 0.88rem;
    margin-top: 0.2rem;
    margin-bottom: 0.9rem;
`;

const Status = styled.div<{ $status: TaskRecord["status"] }>`
    ${({ $status }) => {
        switch ($status) {
            case "To Do":
                return `
                    background: #2563eb15;
                    color: #2563eb;
                `;
            case "In Progress":
                return `
                    background: #f59e0b15;
                    color: #f59e0b;
                `;
            case "Done":
                return `
                    background: #16a34a15;
                    color: #16a34a;
                `;
            default:
                return `
                    background: #6b728015;
                    color: #6b7280;
                `;
        }
    }}

    padding: 0.3rem 0.9rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0;
    margin-bottom: 2rem;
`;
