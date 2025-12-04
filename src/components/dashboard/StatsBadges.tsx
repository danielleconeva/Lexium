import styled from "styled-components";
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

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    margin: 3rem auto;
    margin-top: 0;
`;
