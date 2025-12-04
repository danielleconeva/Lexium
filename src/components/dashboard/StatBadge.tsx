import type { ReactNode } from "react";
import styled from "styled-components";

type StatBadgeProps = {
    icon: ReactNode;
    bgColor: string;
    number: number;
    label: string;
};

export default function StatBadge({
    icon,
    bgColor,
    number,
    label,
}: StatBadgeProps) {
    return (
        <Card>
            <IconWrapper $bgColor={bgColor}>{icon}</IconWrapper>
            <Info>
                <Number>
                    {number}
                    {label === "Task Completion Rate" ? "%" : ""}
                </Number>
                <Label>{label}</Label>
            </Info>
        </Card>
    );
}

const Card = styled.div`
    background: #ffffff;
    padding: 1.6rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 8px 16px rgba(17, 24, 39, 0.06);
    border: 1px solid #eef2f6;
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const IconWrapper = styled.div<{ $bgColor: string }>`
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    font-size: 1.4rem;
    color: white;
    background: ${({ $bgColor }) => $bgColor};
    opacity: 0.6;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

const Number = styled.div`
    font-size: 1.8rem;
    font-weight: 600;
    color: #545456;
`;

const Label = styled.div`
    font-size: 0.9rem;
    color: #6b7280;
`;
