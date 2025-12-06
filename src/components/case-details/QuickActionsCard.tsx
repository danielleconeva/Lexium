import { Globe, Lock, Star, StarOff, Zap } from "lucide-react";
import styled from "styled-components";

type QuickActionsCardProps = {
    isPublic: boolean;
    isStarred: boolean;
    caseId: string;
    togglePrivate: (id: string) => void;
    toggleStar: (id: string) => void;
};

export default function QuickActionsCard({
    isPublic,
    isStarred,
    caseId,
    togglePrivate,
    toggleStar,
}: QuickActionsCardProps) {
    return (
        <Card>
            <HeaderRow>
                <HeaderLeft>
                    <IconWrapper>
                        <Zap size={20} strokeWidth={2.2} />
                    </IconWrapper>
                    <Title>Quick Actions</Title>
                </HeaderLeft>
            </HeaderRow>
            <Divider />
            <BtnWrapper>
                <VisibilityBtn onClick={() => togglePrivate(caseId)}>
                    {isPublic === true ? (
                        <Lock size={18} />
                    ) : (
                        <Globe size={18} />
                    )}

                    {isPublic === true ? "Set to Internal" : "Make Public"}
                </VisibilityBtn>

                <StarBtn onClick={() => toggleStar(caseId)}>
                    {isStarred === true ? (
                        <StarOff size={18} />
                    ) : (
                        <Star size={18} />
                    )}

                    {isStarred === true ? "Unstar Case" : "Star Case"}
                </StarBtn>
            </BtnWrapper>
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
    margin-bottom: 1.5rem;
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
    font-size: 1.2rem;
    font-weight: 600;
    color: #0a0a0a;
    margin: 0;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #e9ecee;
    margin: 1.5rem 0;
    margin-bottom: 2rem;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
`;

const VisibilityBtn = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    display: inline-flex;
    align-items: center;
    width: 190px;
    gap: 0.5rem;

    background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
    color: white;

    padding: 0.85rem 1.9rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;

    font-size: 0.9rem;
    font-weight: 500;

    box-shadow: 0 8px 24px rgba(37, 99, 255, 0.35);
    transition: 0.25s ease;

    svg {
        width: 1.1rem;
        height: 1.1rem;
        stroke-width: 2.2;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 15px rgba(37, 99, 255, 0.35);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

const StarBtn = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    display: inline-flex;
    align-items: center;
    width: 190px;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 0.6rem;

    background: white;
    color: #1e293b;

    padding: 0.85rem 1.9rem;
    border-radius: 999px;
    border: 1px solid #d8e2ff;
    cursor: pointer;

    font-size: 0.9rem;
    font-weight: 500;

    transition: 0.25s ease;

    svg {
        width: 1.1rem;
        height: 1.1rem;
        color: #475569;
    }

    &:hover {
        transform: translateY(-2px);
        background: #fbfcff;
    }

    &:active {
        transform: translateY(-1px);
    }
`;
