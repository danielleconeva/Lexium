import styled, { keyframes } from "styled-components";
import StatBadge from "./StatBadge";
import { Folder, ClipboardList, Users, Gauge } from "lucide-react";

type StatsBadgesProps = {
    stats: {
        openCases: number;
        pendingTasks: number;
        totalCases: number;
        completionRate: number;
    };
};

export default function StatsBadges({ stats }: StatsBadgesProps) {
    return (
        <Row>
            <StatBadge
                icon={<Folder size={20} strokeWidth={2.2} />}
                number={stats.openCases}
                label="Open Cases"
                bgColor="#4d8ff8"
            />
            <StatBadge
                icon={<ClipboardList size={20} strokeWidth={2.2} />}
                number={stats.pendingTasks}
                label="Pending Tasks"
                bgColor="#fab847"
            />
            <StatBadge
                icon={<Users size={20} strokeWidth={2.2} />}
                number={stats.totalCases}
                label="Total Cases"
                bgColor="#d36af9"
            />
            <StatBadge
                icon={<Gauge size={20} strokeWidth={2.2} />}
                number={stats.completionRate}
                label="Task Completion Rate"
                bgColor="#58d863"
            />
        </Row>
    );
}

const slideInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    margin: 3rem auto;
    margin-top: 0;

    > * {
        animation: ${slideInUp} 0.6s ease-out backwards;
    }

    > *:nth-child(1) {
        animation-delay: 0.4s;
    }

    > *:nth-child(2) {
        animation-delay: 0.5s;
    }

    > *:nth-child(3) {
        animation-delay: 0.6s;
    }

    > *:nth-child(4) {
        animation-delay: 0.7s;
    }

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 1rem;
        margin: 2rem auto;
    }

    @media (min-width: 1920px) {
        max-width: 1400px;
        gap: 2rem;
    }
`;
