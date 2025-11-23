import styled, { keyframes } from "styled-components";
import { Zap, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
    {
        number: "01",
        icon: Briefcase,
        title: "Create Your Cases",
        description:
            "Set up structured caseboards with all essential details — case number, court, parties, notes, visibility settings, and next hearing dates. Keep every case organized from day one.",
    },
    {
        number: "02",
        icon: Calendar,
        title: "Track Hearings & Tasks",
        description:
            "Manage hearings, deadlines and case-related tasks in one place. Your agenda shows all upcoming dates across cases, helping your firm stay ahead and never miss a hearing.",
    },
    {
        number: "03",
        icon: CheckCircle2,
        title: "Keep Your Practice Aligned",
        description:
            "Control what stays internal and what becomes a public summary, while keeping all case information organized in a clean, firm-specific workspace.",
    },
];

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeroSection = styled.section`
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0rem 2rem;
    margin-top: -1rem;
    position: relative;

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

const HeroTitle = styled.div`
    text-align: center;
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
    line-height: 1.1;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 50%, #5c7cff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    letter-spacing: -0.02em;
`;

const HeroDescription = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
    text-align: center;
    margin: 0 auto 2.5rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1rem;
`;

const PrimaryButton = styled(Link)`
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: white;
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

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(61, 90, 254, 0.4),
            0 6px 16px rgba(102, 126, 234, 0.3),
            inset 0 -2px 8px rgba(0, 0, 0, 0.1),
            inset 0 2px 8px rgba(255, 255, 255, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
`;

const SecondaryButton = styled(Link)`
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.05rem;
    font-weight: 400;
    color: #717070;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(61, 90, 254, 0.2);
    border-radius: 50px;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    text-decoration: none;

    &:hover {
        background: rgba(255, 255, 255, 1);
        border-color: rgba(61, 90, 254, 0.1);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(37, 37, 37, 0.06);
    }

    &:active {
        transform: translateY(0);
    }
`;

const BrandName = styled.h2`
    font-size: 16rem;
    font-weight: 600;
    color: #2b2b2b;
    letter-spacing: 1rem;
    margin-top: 3rem;
    margin-bottom: -5rem;
    line-height: 0.8;
    transform: scale(1.08, 0.9);
    transform-origin: center;

    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.03),
        0 16px 48px rgba(0, 0, 0, 0.02);
`;

const Section = styled.section`
    padding: 5rem 2rem 4rem 2rem;
    background: #fefeff;
`;

const TimelineOuter = styled.section`
    position: relative;
    padding: 6rem 2rem 0;
`;

const TimelineInner = styled.div`
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
`;

const CenterLine = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(73, 99, 245, 0.4),
        rgba(61, 90, 254, 0.2),
        transparent
    );
    border-radius: 999px;

    display: none;

    @media (min-width: 1024px) {
        display: block;
    }
`;

const StepsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StepRow = styled.div<{ delay: number; reverseOnDesktop?: boolean }>`
    display: flex;
    align-items: center;
    gap: 3rem;
    flex-direction: column;
    opacity: 0;
    animation: ${fadeInUp} 0.6s ease-out forwards;
    animation-delay: ${({ delay }) => `${delay}s`};

    @media (min-width: 1024px) {
        flex-direction: ${({ reverseOnDesktop }) =>
            reverseOnDesktop ? "row-reverse" : "row"};
    }
`;

const StepContent = styled.div<{ alignRightOnDesktop?: boolean }>`
    flex: 1;
    text-align: left;

    @media (min-width: 1024px) {
        text-align: ${({ alignRightOnDesktop }) =>
            alignRightOnDesktop ? "right" : "left"};
        display: flex;
        flex-direction: column;
        align-items: ${({ alignRightOnDesktop }) =>
            alignRightOnDesktop ? "flex-end" : "flex-start"};
    }
`;

const StepNumber = styled.span`
    display: inline-block;
    margin-bottom: 0.5rem;
    font-size: 4.5rem;
    font-weight: 700;
    color: rgba(61, 90, 254, 0.2);
    letter-spacing: 0.05em;
`;

const StepTitle = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem;
    color: #0f172a;
`;

const StepDescription = styled.p`
    font-size: 1.05rem;
    line-height: 1.6;
    color: #6b7280;
    max-width: 32rem;
    margin: 0;
`;

const IconCircleDesktop = styled.div`
    position: relative;
    display: none;

    @media (min-width: 1024px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const IconCircleInner = styled.div`
    width: 96px;
    height: 96px;
    border-radius: 999px;
    background: linear-gradient(135deg, #3d70fe, #5c7cff);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 26px rgba(61, 90, 254, 0.4);
    position: relative;
    z-index: 1;

    .icon {
        width: 40px;
        height: 40px;
        color: #ffffff;
    }
`;

const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.6);
    opacity: 0;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

const IconCirclePulse = styled.div`
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: rgba(61, 90, 254, 0.25);
    animation: ${ping} 1.6s ease-out infinite;
`;

const MobileCardWrapper = styled.div`
    flex: 1;

    @media (min-width: 1024px) {
        display: none;
    }
`;

const MobileCard = styled.div`
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(61, 90, 254, 0.25);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    padding: 1.5rem;
    backdrop-filter: blur(12px);
`;

const MobileIconBox = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 20px;
    background: linear-gradient(135deg, #3d5afe, #5c7cff);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
    box-shadow: 0 0 25px rgba(61, 90, 254, 0.55);

    .icon {
        width: 32px;
        height: 32px;
        color: #ffffff;
    }
`;

const SectionTitle = styled.h2`
    color: ${({ theme }) => theme.colors.text};
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    text-align: center;
    letter-spacing: -0.02em;
`;

const SectionDescription = styled.p`
    font-size: 1.2rem;
    line-height: 1.2;
    color: #666;
    max-width: 800px;
    text-align: center;
    margin: 0 auto 1rem;
`;

const CTASection = styled.section`
    padding: 6rem 2rem 8rem;
    display: flex;
    justify-content: center;
    text-align: center;
    background: #fefeff;
`;

const CTAContainer = styled.div`
    max-width: 850px;
    padding: 4rem 3rem;
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(16px);
    box-shadow: 0 12px 40px rgba(61, 90, 254, 0.12),
        0 4px 12px rgba(61, 90, 254, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
`;

const CTATitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
`;

const CTASubtitle = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 2.5rem;
`;

const CTAButton = styled(Link)`
    display: inline-block;
    padding: 1rem 2.7rem;
    font-size: 1.1rem;
    font-weight: 400;
    color: white;
    background: linear-gradient(135deg, #3d70fe 0%, #5c7cff 100%);
    border-radius: 50px;
    border: none;
    cursor: pointer;
    box-shadow: 0 12px 28px rgba(61, 90, 254, 0.35);
    transition: 0.3s ease;
    text-decoration: none;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 34px rgba(61, 90, 254, 0.45);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

export default function HomePage() {
    return (
        <PageWrapper>
            <HeroSection>
                <HeroTitle>
                    <TitleLine1>Legal Case</TitleLine1>
                    <TitleLine2>Management Platform</TitleLine2>
                </HeroTitle>

                <HeroDescription>
                    Streamline your legal practice with structured caseboards,
                    connected tasks and a clear agenda of upcoming hearings —
                    all in one secure workspace
                </HeroDescription>

                <ButtonGroup>
                    <PrimaryButton to="/login">
                        Log In
                        <Zap size={18} />
                    </PrimaryButton>
                    <SecondaryButton to="public-cases">
                        View Public Cases
                    </SecondaryButton>
                </ButtonGroup>

                <BrandName>Lexium</BrandName>
            </HeroSection>

            <Section>
                <SectionTitle>Three Steps to Excellence</SectionTitle>
                <SectionDescription>
                    Transform your legal practice with our streamlined workflow
                </SectionDescription>

                <TimelineOuter>
                    <TimelineInner>
                        <CenterLine />

                        <StepsWrapper>
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isEven = index % 2 === 0;

                                return (
                                    <StepRow
                                        key={step.number}
                                        delay={index * 0.2}
                                        reverseOnDesktop={!isEven}
                                    >
                                        <StepContent
                                            alignRightOnDesktop={isEven}
                                        >
                                            <StepNumber>
                                                {step.number}
                                            </StepNumber>
                                            <StepTitle>{step.title}</StepTitle>
                                            <StepDescription>
                                                {step.description}
                                            </StepDescription>
                                        </StepContent>

                                        <IconCircleDesktop>
                                            <IconCircleInner>
                                                <Icon className="icon" />
                                            </IconCircleInner>
                                            <IconCirclePulse />
                                        </IconCircleDesktop>

                                        <MobileCardWrapper>
                                            <MobileCard>
                                                <MobileIconBox>
                                                    <Icon className="icon" />
                                                </MobileIconBox>
                                            </MobileCard>
                                        </MobileCardWrapper>
                                    </StepRow>
                                );
                            })}
                        </StepsWrapper>
                    </TimelineInner>
                </TimelineOuter>
            </Section>

            <CTASection>
                <CTAContainer>
                    <CTATitle>Ready to Transform Your Practice?</CTATitle>
                    <CTASubtitle>
                        Join thousands of legal professionals who trust Lexium
                        for modern case management.
                    </CTASubtitle>
                    <CTAButton to="/register">Sign Up</CTAButton>
                </CTAContainer>
            </CTASection>
        </PageWrapper>
    );
}
