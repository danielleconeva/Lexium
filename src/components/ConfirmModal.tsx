import styled from "styled-components";
import ReactDOM from "react-dom";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 1rem;
    animation: fadeInOverlay 0.3s ease;

    @keyframes fadeInOverlay {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalBox = styled.div`
    font-family: ${({ theme }) => theme.fonts.main};
    background: white;
    padding: 2rem;
    border-radius: 17px;
    width: 400px;
    max-width: 100%;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    animation: fadeInModal 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes fadeInModal {
        from {
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @media (max-width: 640px) {
        padding: 1.5rem;
        width: 90%;
    }
`;

const Title = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 1.3rem;
    color: #373333;
    font-weight: 600;
`;

const Message = styled.p`
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: "cancel" | "confirm" }>`
    font-family: ${({ theme }) => theme.fonts.main};
    padding: 0.7rem 1.4rem;
    border-radius: 18px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.95rem;

    ${({ $variant }) =>
        $variant === "confirm"
            ? `
        background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
        color: #ffffff;
        box-shadow: 0 8px 18px rgba(61, 112, 254, 0.28);

        &:hover {
            filter: brightness(0.96);
            transform: translateY(-1px);
            box-shadow: 0 10px 24px rgba(61, 112, 254, 0.32);
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 4px 12px rgba(61, 112, 254, 0.2);
        }
    `
            : `
        background: #f3f4f6;
        color: #111827;
        border: 1px solid #e5e7eb;

        &:hover {
            background: #e5e7eb;
        }

        &:active {
            background: #d1d5db;
        }
    `}
`;

export type ConfirmModalProps = {
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

function ConfirmModalContent({
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <Overlay>
            <ModalBox>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <Buttons>
                    <Button $variant="cancel" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    <Button $variant="confirm" onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                </Buttons>
            </ModalBox>
        </Overlay>
    );
}

export default function ConfirmModal(props: ConfirmModalProps) {
    return ReactDOM.createPortal(
        <ConfirmModalContent {...props} />,
        document.body
    );
}
