import styled from "styled-components";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const PageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 6rem);
    padding: 2rem;
    background: radial-gradient(
            ellipse 140% 80% at 50% 100%,
            rgba(80, 80, 180, 1.8) 2%,
            rgba(95, 95, 190, 0.95) 10%,
            rgba(110, 110, 200, 0.89) 20%,
            rgba(130, 138, 210, 0.88) 30%,
            rgba(155, 155, 220, 0.83) 40%,
            rgba(180, 188, 230, 0.7) 50%,
            rgba(205, 205, 240, 0.5) 60%,
            rgba(225, 225, 248, 0.35) 70%,
            rgba(240, 240, 252, 0.2) 80%,
            transparent 96%
        ),
        #fefeff;
`;

const ContentContainer = styled.div`
    text-align: center;
    max-width: 600px;
    animation: fadeInUp 0.8s ease-out;

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ErrorNumber = styled.h1`
    font-size: 10rem;
    font-weight: 900;
    margin: 0;
    line-height: 1;
    letter-spacing: -8px;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
        font-size: 6rem;
        letter-spacing: -4px;
    }
`;

const GlassCard = styled.div`
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 2rem;
    padding: 3rem 2rem;
    margin-top: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 2px rgba(255, 255, 255, 0.5);
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: #2a2a2f;
    margin: 0 0 1rem 0;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Description = styled.p`
    font-size: 1.1rem;
    color: #5d5d62;
    line-height: 1.6;
    margin: 0 0 2rem 0;
    opacity: 0.9;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 24px rgba(61, 90, 254, 0.3),
        0 3px 12px rgba(102, 126, 234, 0.2);
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
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(61, 90, 254, 0.4),
            0 6px 16px rgba(102, 126, 234, 0.3);
    }

    &:hover::before {
        left: 100%;
    }

    &:active {
        transform: translateY(-1px);
    }
`;

const SecondaryButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    color: #4a4a4f;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06),
        inset 0 1px 2px rgba(255, 255, 255, 0.5);

    &:hover {
        background: rgba(255, 255, 255, 0.4);
        color: #2a2a2f;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.6);
    }

    &:active {
        transform: translateY(0);
    }
`;

export default function NotFoundPage() {
    return (
        <PageWrapper>
            <ContentContainer>
                <ErrorNumber>404</ErrorNumber>

                <GlassCard>
                    <Title>Page Not Found</Title>
                    <Description>
                        The page you're looking for doesn't exist or has been
                        moved. Let's get you back on track.
                    </Description>

                    <ButtonGroup>
                        <PrimaryButton to="/">
                            <Home size={18} />
                            Go Home
                        </PrimaryButton>
                        <SecondaryButton to="/dashboard">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </SecondaryButton>
                    </ButtonGroup>
                </GlassCard>
            </ContentContainer>
        </PageWrapper>
    );
}
