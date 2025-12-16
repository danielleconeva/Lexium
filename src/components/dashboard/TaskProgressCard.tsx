import { Gauge } from "lucide-react";
import styled from "styled-components";

type TaskProgressCardProps = {
    totalTasks: number;
    pendingTasks: number;
    completionRate: number;
};

export default function TaskProgressCard({
    totalTasks,
    pendingTasks,
    completionRate,
}: TaskProgressCardProps) {
    return (
        <Card>
            <HeaderRow>
                <HeaderLeft>
                    <IconWrapper>
                        <Gauge size={20} strokeWidth={2.2} />
                    </IconWrapper>
                    <Title>Task Progress</Title>
                </HeaderLeft>
                <Percent>{completionRate}% completed</Percent>
            </HeaderRow>
            <Divider />
            <ProgressBarWrapper>
                <ProgressFill $completionRate={completionRate} />
            </ProgressBarWrapper>
            <FooterRow>
                <span>{totalTasks - pendingTasks} done</span>
                <span>{pendingTasks} remaining</span>
            </FooterRow>
        </Card>
    );
}

const Card = styled.div`
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06);
    border: 1px solid #eef2f6;

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
    margin-bottom: 1.5rem;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;

const IconWrapper = styled.div`
    opacity: 0.6;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: white;
    background: #58d863;
`;

const Title = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
    color: #0a0a0a;
    margin: 0;
`;

const Percent = styled.div`
    color: #4b5563;
    font-size: 0.95rem;
`;

const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 10px;
    background: #eef1f5;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1rem;
`;

const ProgressFill = styled.div<{ $completionRate: number }>`
    width: ${(props) => props.$completionRate}%;
    height: 100%;
    background: #5897fc;
    opacity: 0.6;
    transition: width 0.3s ease;
`;

const FooterRow = styled.div`
    display: flex;
    justify-content: space-between;
    color: #4b5563;
    font-size: 0.95rem;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0;
    margin-bottom: 2rem;
`;
