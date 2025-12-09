import styled, { keyframes } from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";

const slideInRight = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInLeft = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInScale = keyframes`
  to {
    opacity: 1;
    transform: scaleX(1);
  }
`;

const fadeInUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
    display: flex;
    min-height: calc(100vh - 6rem);
    justify-content: center;
    padding: 2rem 4rem 1rem 4rem;
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

const FormSection = styled.div`
    z-index: 2;
    max-width: 700px;
    flex: 1;

    opacity: 0;
    transform: translateX(-50px);
    animation: ${slideInRight} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        forwards;
    animation-delay: 0.2s;
`;

const Divider = styled.div`
    width: 2px;
    height: 380px;

    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(92, 93, 95, 0.6) 40%,
        rgba(92, 93, 95, 0.6) 60%,
        rgba(0, 0, 0, 0) 100%
    );

    border-radius: 20px;
    margin: 0 3rem;

    display: none;

    @media (min-width: 1024px) {
        display: block;
    }

    opacity: 0;
    transform: scaleX(0);
    transform-origin: center;
    animation: ${fadeInScale} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.4s;
`;

const TextSection = styled.div`
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 2;
    flex: 1;

    @media (max-width: 1024px) {
        display: none;
    }

    & > * {
        opacity: 0;
        transform: translateY(30px);
        animation: ${fadeInUp} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
    }

    & > *:nth-child(1) {
        animation-delay: 0.1s;
    }
    & > *:nth-child(2) {
        animation-delay: 0.3s;
    }
    & > *:nth-child(3) {
        animation-delay: 0.5s;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    max-width: 1600px;
    width: 100%;

    & > *:nth-child(3) {
        opacity: 0;
        transform: translateX(50px);
        animation: ${slideInLeft} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        animation-delay: 0.3s;
    }
`;

const BigTitle = styled.h1`
    font-size: 3.8rem;
    font-weight: 700;
    color: #3a3a3e;
    margin: 0;
    margin-top: -2rem;
    line-height: 0.8;
    letter-spacing: 2px;
`;

const SubTitle = styled.h2`
    font-size: 3.7rem;
    font-weight: 400;
    color: #5d5e62;
    margin: 0;
    line-height: 1.2;
    margin-top: -0.4rem;
    margin-bottom: 1rem;
`;

const RightSubtitle = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
    margin: 0;
    max-width: 500px;
`;

export default function RegisterPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user]);

    return (
        <PageWrapper>
            <ContentContainer>
                <FormSection>
                    <SignupForm />
                </FormSection>

                <Divider />

                <TextSection>
                    <BigTitle>Set Up </BigTitle>
                    <SubTitle>Your Account</SubTitle>

                    <RightSubtitle>
                        Unlock a secure, unified environment designed for
                        structured work, reliable data management and seamless
                        cross-device access.
                    </RightSubtitle>
                </TextSection>
            </ContentContainer>
        </PageWrapper>
    );
}
