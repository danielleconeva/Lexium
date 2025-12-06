import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useCases } from "../hooks/useCases";
import { useTasks } from "../hooks/useTasks";

import TaskColumn from "../components/case-tasks/TaskColumn";
import TaskModal from "../components/case-tasks/TaskModal";
import type { TaskRecord } from "../types/Task";
import { useAuth } from "../hooks/useAuth";

export default function CaseTasksPage() {
    const navigate = useNavigate();
    const { id: caseId } = useParams<{ id: string }>();

    const { user } = useAuth();
    const { getFirmCaseById, loadFirmCases } = useCases();
    const caseData = getFirmCaseById(caseId!);

    useEffect(() => {
        console.log("CaseTasksPage mounted");

        if (caseId) {
            loadCaseTasks(caseId);
        }
    }, []);

    useEffect(() => {
        if (user?.uid && !caseData) {
            loadFirmCases(user.uid);
        }
    }, [user, caseData, loadFirmCases]);

    const { caseTasks, loadCaseTasks } = useTasks();

    const [openModal, setOpenModal] = useState<null | {
        mode: "create" | "edit";
        task?: TaskRecord;
    }>(null);

    useEffect(() => {
        if (caseId) loadCaseTasks(caseId);
    }, [caseId, loadCaseTasks]);

    function handleBackNavigation() {
        navigate(-1);
    }

    if (!caseData) return null;

    const todo = caseTasks.filter((t) => t.status === "To Do");
    const inprogress = caseTasks.filter((t) => t.status === "In Progress");
    const done = caseTasks.filter((t) => t.status === "Done");

    return (
        <PageWrapper>
            <BackButton onClick={handleBackNavigation}>
                Back to Cases
            </BackButton>

            <Heading>Tasks</Heading>
            <HeroDescription>
                {caseData.caseNumber}/{caseData.caseYear} –{" "}
                {caseData.clientName}
            </HeroDescription>

            <TopActions>
                <NewTaskButton onClick={() => setOpenModal({ mode: "create" })}>
                    + New Task
                </NewTaskButton>
            </TopActions>

            <MainContentWrapper>
                <TaskColumn
                    title="To Do"
                    tasks={todo}
                    onEdit={(task) => setOpenModal({ mode: "edit", task })}
                />

                <TaskColumn
                    title="In Progress"
                    tasks={inprogress}
                    onEdit={(task) => setOpenModal({ mode: "edit", task })}
                />

                <TaskColumn
                    title="Done"
                    tasks={done}
                    onEdit={(task) => setOpenModal({ mode: "edit", task })}
                />
            </MainContentWrapper>

            {openModal && (
                <TaskModal
                    mode={openModal.mode}
                    task={openModal.task}
                    caseId={caseId!}
                    onClose={() => setOpenModal(null)}
                />
            )}
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 3rem 2rem 4rem 2rem;
`;

const Heading = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    color: #0a0a0a;
    margin: 1rem 0 0.5rem 6.5rem;
`;

const BackButton = styled.a`
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    padding: 2rem;
    padding-bottom: 1rem;
    margin-left: 4.2rem;
    cursor: pointer;
    max-width: 180px;

    &::before {
        content: "<-";
        padding-right: 0.5rem;
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primaryBlue};
    }
`;

const HeroDescription = styled.p`
    font-size: 1.2rem;
    color: #666;
    max-width: 800px;
    margin-left: 6.5rem;
    margin-bottom: -3rem;
`;

const TopActions = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-right: 6rem;
    margin-top: 0.5rem;
`;

const NewTaskButton = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: white;
    margin-right: 8rem;

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

const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 3rem 5.3rem;
    justify-content: center;
`;
