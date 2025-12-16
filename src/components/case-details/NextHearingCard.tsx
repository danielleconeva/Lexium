import { Calendar } from "lucide-react";
import styled from "styled-components";

type NextHearingCardProps = {
    nextHearing: string | undefined;
};

export default function NextHearingCard({ nextHearing }: NextHearingCardProps) {
    const date = nextHearing ? new Date(nextHearing) : null;

    const isValid = date instanceof Date && !isNaN(date.getTime());

    return (
        <Card>
            <HeaderRow>
                <HeaderLeft>
                    <IconWrapper>
                        <Calendar size={20} strokeWidth={2.2} />
                    </IconWrapper>
                    <Title>Next Hearing</Title>
                </HeaderLeft>
            </HeaderRow>

            <Divider />

            {!isValid ? (
                <DateWrapper>No upcoming hearing</DateWrapper>
            ) : (
                <DateWrapper>
                    <DayNumber>{date.getDate()}</DayNumber>

                    <DateSection>
                        <DayName>
                            {date
                                .toLocaleDateString("en-US", {
                                    weekday: "short",
                                })
                                .toUpperCase()}
                        </DayName>

                        <MonthName>
                            {date.toLocaleDateString("en-US", {
                                month: "long",
                            })}
                        </MonthName>
                    </DateSection>
                </DateWrapper>
            )}
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

const DayNumber = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 50%, #5c7cff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const DayName = styled.div`
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
`;

const MonthName = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: #475569;
`;

const DateWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    padding: 1.2rem 1.4rem;
    background: #f8faff;
    border: 1px solid #eef2f6;
    border-radius: 1rem;
    width: fit-content;
    margin: 0 auto;
`;

const DateSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.1rem;
`;
