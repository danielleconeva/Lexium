import styled from "styled-components";
import StatsBadges from "../components/dashboard/StatsBadges";
import TaskProgressCard from "../components/dashboard/TaskProgressCard";
import RecentCasesCard from "../components/dashboard/RecentCasesCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import RecentTasksCard from "../components/dashboard/RecentTasksCard";
import { useTasks } from "../hooks/useTasks";
import { useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCases } from "../hooks/useCases";

export default function DashboardPage() {
    const { user } = useAuth();

    const { firmCases, loadFirmCases } = useCases();
    const { firmTasks, loadFirmTasks } = useTasks();

    useEffect(() => {
        if (!user?.uid) return;
        loadFirmCases(user.uid);
    }, [user?.uid, loadFirmCases]);

    useEffect(() => {
        if (!user?.uid) return;
        loadFirmTasks(user.uid);
    }, [user?.uid, loadFirmTasks]);

    const stats = useMemo(() => {
        const totalCases = firmCases.length;

        const totalTasks = firmTasks.length;
        const doneTasks = firmTasks.filter(
            (t) => t.status.toLowerCase() === "done"
        ).length;

        const pendingTasks = firmTasks.filter(
            (t) =>
                t.status.toLowerCase() === "to do" ||
                t.status.toLowerCase() === "in progress"
        ).length;

        return {
            openCases: firmCases.filter(
                (c) => c.status.toLowerCase() === "open"
            ).length,

            pendingTasks,
            totalCases,

            completionRate:
                totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0,
        };
    }, [firmCases, firmTasks]);

    const latestTasks = useMemo(
        () =>
            [...firmTasks]
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(0, 4),
        [firmTasks]
    );

    const latestCases = useMemo(
        () =>
            [...firmCases]
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(0, 10),
        [firmCases]
    );

    const caseMap = useMemo(() => {
        const map: Record<string, { caseNumber: string; caseYear: string }> =
            {};

        for (const caseRecord of firmCases) {
            map[caseRecord.id] = {
                caseNumber: caseRecord.caseNumber,
                caseYear: caseRecord.caseYear,
            };
        }

        return map;
    }, [firmCases]);

    return (
        <PageWrapper>
            <WelcomeSection>
                <Left>
                    <HeroTitle>
                        <TitleLine1>Welcome</TitleLine1>
                        <TitleLine2>back</TitleLine2>
                    </HeroTitle>
                    <HeroDescription>
                        Your legal practice at a glance. Track cases, manage
                        tasks, and stay ahead.
                    </HeroDescription>
                </Left>

                <Right>
                    <PrimaryBtn to="/cases/create">
                        <Plus size={18} strokeWidth={2.3} />
                        New Case
                    </PrimaryBtn>

                    <SecondaryBtn to="/cases">View Cases</SecondaryBtn>
                </Right>
            </WelcomeSection>

            <StatsBadges stats={stats} />

            <Grid>
                <RecentCasesWrapper>
                    <RecentCasesCard cases={latestCases} />
                </RecentCasesWrapper>

                <TaskProgressWrapper>
                    <TaskProgressCard
                        totalTasks={firmTasks.length}
                        pendingTasks={stats.pendingTasks}
                        completionRate={stats.completionRate}
                    />
                </TaskProgressWrapper>

                <PendingTasksWrapper>
                    <RecentTasksCard tasks={latestTasks} caseMap={caseMap} />
                </PendingTasksWrapper>
            </Grid>
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 4rem 5rem 4rem;
`;

const WelcomeSection = styled.section`
    background: white;
    padding: 3rem 0;
    border-radius: 2rem;
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div`
    max-width: 60%;
`;

const HeroTitle = styled.div`
    margin-bottom: 2rem;
`;

const TitleLine1 = styled.h1`
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.1;
    color: #0a0a0a;
    margin: 0;
    letter-spacing: -0.02em;
`;

const TitleLine2 = styled.h1`
    font-size: 3.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 50%, #5c7cff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    letter-spacing: -0.02em;
`;

const HeroDescription = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
`;

const Right = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const PrimaryBtn = styled(Link)`
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: white;
    margin: 0 auto;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 8px 24px rgba(61, 90, 254, 0.3),
        0 3px 12px rgba(102, 126, 234, 0.2), inset 0 -2px 8px rgba(0, 0, 0, 0.1),
        inset 0 2px 8px rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
        );
        transition: left 0.5s;
    }

    &:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 16px 40px rgba(61, 90, 254, 0.5),
            0 8px 20px rgba(102, 126, 234, 0.4),
            inset 0 -2px 8px rgba(0, 0, 0, 0.1),
            inset 0 2px 8px rgba(255, 255, 255, 0.3);
    }

    &:hover::before {
        left: 100%;
    }

    &:active {
        transform: translateY(-1px) scale(1.01);
    }
`;

const SecondaryBtn = styled(Link)`
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: #4a4a4f;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    cursor: pointer;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04),
        inset 0 1px 2px rgba(255, 255, 255, 0.5),
        inset 0 -1px 2px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
        );
        transition: left 0.5s;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        color: #2a2a2f;
        transform: translateY(-3px);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
            0 6px 20px rgba(0, 0, 0, 0.06),
            inset 0 1px 3px rgba(255, 255, 255, 0.6),
            inset 0 -1px 2px rgba(0, 0, 0, 0.05);
    }

    &:hover::before {
        left: 100%;
    }

    &:active {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.2);
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        "left top"
        "left bottom";
    gap: 2rem;
`;

const RecentCasesWrapper = styled.div`
    grid-area: left;
`;

const TaskProgressWrapper = styled.div`
    grid-area: top;
`;

const PendingTasksWrapper = styled.div`
    grid-area: bottom;
`;
