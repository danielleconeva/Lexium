import styled from "styled-components";
import TaskCard from "./TaskCard";
import type { TaskRecord } from "../../types/Task";

type Props = {
    title: string;
    tasks: TaskRecord[];
    onEdit: (task: TaskRecord) => void;
};

export default function TaskColumn({ title, tasks, onEdit }: Props) {
    return (
        <Wrapper>
            <ColumnHeader>
                <HeaderContent>
                    <Title>{title}</Title>
                    <CountBadge>{tasks.length}</CountBadge>
                </HeaderContent>
                <HeaderUnderline />
            </ColumnHeader>
            <ColumnBody>
                {tasks.length === 0 && <EmptyState>No tasks</EmptyState>}
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => onEdit(task)}
                    />
                ))}
            </ColumnBody>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(61, 112, 254, 0.08);
    }

    @media (max-width: 1024px) {
        max-width: 550px;
        padding: 2rem 2rem;
    }

    @media (max-width: 640px) {
        max-width: 300px;
        flex-direction: column;
        gap: 1.75rem;
        padding: 1.75rem 1.5rem;
    }

    @media (min-width: 1920px) {
        width: 1200px;
    }
`;

const ColumnHeader = styled.div`
    position: relative;
    padding-bottom: 1rem;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
`;

const Title = styled.h4`
    font-size: 1.125rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
`;

const CountBadge = styled.span`
    position: relative;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
    color: white;
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(61, 112, 254, 0.35),
        0 0 0 3px rgba(61, 112, 254, 0.1);
    min-width: 32px;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 6px 16px rgba(61, 112, 254, 0.45),
            0 0 0 4px rgba(61, 112, 254, 0.15);
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 14px;
        padding: 1px;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
    }
`;

const HeaderUnderline = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3d70fe 0%, transparent 100%);
    border-radius: 2px;
`;

const ColumnBody = styled.div`
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
`;

const EmptyState = styled.div`
    padding: 2rem 0;
    border: 2px dashed #e4e7eb;
    border-radius: 1rem;
    text-align: center;
    color: #999;
`;
