import styled from "styled-components";
import {
    Archive,
    ArchiveRestore,
    Eye,
    Lock,
    Pencil,
    Star,
    Trash2,
    User,
} from "lucide-react";
import type { CaseRecord } from "../../types/Case";

const CardWrapper = styled.div`
    width: 1100px;
    align-self: center;
    margin-top: 1.5rem;

    background: white;
    border-radius: 1.5rem;
    padding: 2.3rem 2.8rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-shadow: 0 8px 17px rgba(15, 23, 42, 0.06);
    @media (max-width: 1024px) {
        width: 100%;
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

const CardLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    flex: 1;
`;

const CardRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    @media (min-width: 641px) and (max-width: 1024px) {
        flex-wrap: wrap;
        justify-content: flex-end;
        row-gap: 0.75rem;
        flex-direction: column;
    }

    @media (max-width: 640px) {
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 0.75rem;
    }
`;

const BadgeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

const StatusBadge = styled.span<{ $status: string }>`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    background: ${(props) => {
        if (props.$status.toLowerCase() === "open") return "#ecfdf5";
        if (props.$status.toLowerCase() === "archived") return "#f1f5f9";
        if (props.$status.toLowerCase() === "closed") return "#fef3c7";
        return "#fef3c7";
    }};
    color: ${(props) => {
        if (props.$status.toLowerCase() === "open") return "#059669";
        if (props.$status.toLowerCase() === "archived") return "#64748b";
        if (props.$status.toLowerCase() === "closed") return "#d97706";
        return "#d97706";
    }};
    border: 1px solid
        ${(props) => {
            if (props.$status.toLowerCase() === "open") return "#d1fae5";
            if (props.$status.toLowerCase() === "archived") return "#e2e8f0";
            if (props.$status.toLowerCase() === "closed") return "#fde68a";
            return "#fde68a";
        }};

    &::before {
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${(props) => {
            if (props.$status.toLowerCase() === "open") return "#059669";
            if (props.$status.toLowerCase() === "archived") return "#64748b";
            return "#d97706";
        }};
    }
`;

const TypeBadge = styled.span<{ $type: string }>`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    background: ${(props) => {
        const type = props.$type.toLowerCase();
        if (type === "civil") return "#eff6ff";
        if (type === "commercial") return "#f0f9ff";
        if (type === "administrative") return "#fef3c7";
        if (type === "criminal") return "#fef2f2";
        if (type === "administrative-criminal") return "#fdf4ff";
        return "#f8fafc";
    }};
    color: ${(props) => {
        const type = props.$type.toLowerCase();
        if (type === "civil") return "#3b82f6";
        if (type === "commercial") return "#0ea5e9";
        if (type === "administrative") return "#d97706";
        if (type === "criminal") return "#dc2626";
        if (type === "administrative-criminal") return "#c026d3";
        return "#64748b";
    }};
    border: 1px solid
        ${(props) => {
            const type = props.$type.toLowerCase();
            if (type === "civil") return "#dbeafe";
            if (type === "commercial") return "#e0f2fe";
            if (type === "administrative") return "#fde68a";
            if (type === "criminal") return "#fee2e2";
            if (type === "administrative-criminal") return "#fae8ff";
            return "#e2e8f0";
        }};
`;

const VisibilityBadge = styled.span<{ $visibility: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;

    ${({ $visibility }) =>
        $visibility
            ? `
                background: #f2f0fb;
                color: #736bca;
                border: 1px solid #d7ccee;
            `
            : `
                background: #fffbeb;
                color: #ca956c;
                border: 1px solid #ece3be;
            `}
`;

const CaseNumberRow = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const CaseNumberAndYear = styled.h3`
    font-size: 2rem;
    font-weight: 600;
    color: #414143;
    margin: 0.25rem 0 0.4rem 0;
    letter-spacing: -0.03rem;
    line-height: 1.2;

    @media (max-width: 640px) {
        font-size: 1.7rem;
    }
`;

const StarIcon = styled(Star)<{ $isStarred: boolean }>`
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 0.8rem;
    margin-bottom: 0.15rem;

    ${({ $isStarred }) =>
        $isStarred
            ? `
                fill: #3b82f6;
                stroke: none;
            `
            : `
                color: #3b82f6;
            `}
`;

const ClientInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.6rem;
`;

const ClientIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #64748b;
    }
`;

const ClientName = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: #475569;
`;

const EditBtn = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    display: inline-flex;
    align-items: center;
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
        box-shadow: 0 12px 30px rgba(37, 99, 255, 0.45);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

const ArchiveBtn = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
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

const DeleteBtn = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    border: 1px solid #eae9fa;
    cursor: pointer;
    transition: 0.25s ease;

    svg {
        width: 1.1rem;
        height: 1.1rem;
        color: #5c5959;
    }

    &:hover {
        background: #fff5f5;
        transform: translateY(-2px);
    }
`;

type GeneralInfoCardProps = {
    caseData: CaseRecord;
    onEdit: (id: string) => void;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function IntroductionCard({
    caseData,
    onEdit,
    onArchive,
    onDelete,
}: GeneralInfoCardProps) {
    function formatType(type: string) {
        return type
            .split("-")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join("-");
    }

    return (
        <CardWrapper>
            <CardLeft>
                <CaseNumberRow>
                    <CaseNumberAndYear>
                        {caseData.caseNumber}/{caseData.caseYear}
                    </CaseNumberAndYear>
                    <StarIcon $isStarred={caseData.isStarred} />
                </CaseNumberRow>

                <BadgeRow>
                    <StatusBadge $status={caseData.status}>
                        {formatType(caseData.status)}
                    </StatusBadge>

                    <TypeBadge $type={caseData.type}>
                        {formatType(caseData.type)}
                    </TypeBadge>

                    <VisibilityBadge $visibility={caseData.isPublic}>
                        {caseData.isPublic ? (
                            <Eye size={16} />
                        ) : (
                            <Lock size={16} />
                        )}
                        {caseData.isPublic ? "Public" : "Private"}
                    </VisibilityBadge>
                </BadgeRow>

                {caseData.clientName && (
                    <ClientInfo>
                        <ClientIcon>
                            <User />
                        </ClientIcon>
                        <ClientName>Client: {caseData.clientName}</ClientName>
                    </ClientInfo>
                )}
            </CardLeft>

            <CardRight>
                <EditBtn onClick={() => onEdit(caseData.id)}>
                    <Pencil /> Edit Case
                </EditBtn>

                <ArchiveBtn onClick={() => onArchive(caseData.id)}>
                    {caseData.status === "archived" ? (
                        <ArchiveRestore />
                    ) : (
                        <Archive />
                    )}
                    {caseData.status === "archived" ? "Reopen" : "Archive"}
                </ArchiveBtn>

                <DeleteBtn onClick={() => onDelete(caseData.id)}>
                    <Trash2 />
                </DeleteBtn>
            </CardRight>
        </CardWrapper>
    );
}
