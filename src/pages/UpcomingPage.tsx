import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import type { CaseRecord } from "../types/Case";
import { useCases } from "../hooks/useCases";
import { useAuth } from "../hooks/useAuth";
import DateRow from "../components/upcoming/DateRow";
import HearingCard from "../components/upcoming/HearingCard";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideInDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const scaleIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const PageWrapper = styled.div`
    max-width: 1800px;
    margin: auto;
    padding: 2rem 2rem 6rem;
    animation: ${fadeIn} 0.5s ease-out;
`;

const PageHeader = styled.div`
    padding: 4rem 2rem 1rem;
    text-align: center;
    animation: ${slideInDown} 0.7s ease-out;
`;

const TitleLine1 = styled.h1`
    font-size: 3.2rem;
    font-weight: 700;
    margin: 0;
`;

const TitleLine2 = styled.h1`
    font-size: 3.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 50%, #5c7cff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
`;

const HeroDescription = styled.p`
    font-size: 1.2rem;
    color: #666;
    max-width: 800px;
    margin: 2rem auto 0.5rem;
    animation: ${fadeIn} 0.8s ease-out 0.2s backwards;
`;

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

const TimelineItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${slideInUp} 0.6s ease-out backwards;

    &:nth-child(1) {
        animation-delay: 0.3s;
    }
    &:nth-child(2) {
        animation-delay: 0.4s;
    }
    &:nth-child(3) {
        animation-delay: 0.5s;
    }
    &:nth-child(4) {
        animation-delay: 0.6s;
    }
    &:nth-child(5) {
        animation-delay: 0.7s;
    }
    &:nth-child(n + 6) {
        animation-delay: 0.75s;
    }
`;

const TimelineLine = styled.div`
    width: 1px;
    height: 3rem;
    background: #e0e0e0;
`;

const TimelineDot = styled.div`
    width: 9px;
    height: 9px;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 50%, #5c7cff 100%);
    border-radius: 50%;
    margin: 0.5rem 0;
`;

const DateRowWrapper = styled.div`
    animation: ${scaleIn} 0.5s ease-out backwards;
`;

const HearingsColumn = styled.div`
    width: 80%;
    max-width: 850px;
    margin: 1.5rem auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    & > * {
        animation: ${scaleIn} 0.5s ease-out backwards;
    }

    & > *:nth-child(1) {
        animation-delay: 0.1s;
    }
    & > *:nth-child(2) {
        animation-delay: 0.15s;
    }
    & > *:nth-child(3) {
        animation-delay: 0.2s;
    }
    & > *:nth-child(4) {
        animation-delay: 0.25s;
    }
    & > *:nth-child(5) {
        animation-delay: 0.3s;
    }
    & > *:nth-child(n + 6) {
        animation-delay: 0.35s;
    }
`;

export default function UpcomingPage() {
    const { firmCases, loadFirmCases, loading } = useCases();
    const { user } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (user?.uid) loadFirmCases(user.uid);
    }, [loadFirmCases]);

    if (loading) {
        return <PageWrapper>Loading...</PageWrapper>;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thirtyDaysFromToday = new Date(today);
    thirtyDaysFromToday.setDate(today.getDate() + 30);

    const groupedHearings: Record<
        string,
        Array<{ case: CaseRecord; hearing: any }>
    > = {};

    firmCases.forEach((caseRecord) => {
        caseRecord.hearingsChronology?.forEach((hearingEntry) => {
            const hearingDate = new Date(hearingEntry.date);
            hearingDate.setHours(0, 0, 0, 0);

            const isWithin30Days =
                hearingDate >= today && hearingDate <= thirtyDaysFromToday;

            if (isWithin30Days) {
                const dateKey = [
                    hearingDate.getFullYear(),
                    String(hearingDate.getMonth() + 1).padStart(2, "0"),
                    String(hearingDate.getDate()).padStart(2, "0"),
                ].join("-");

                if (!groupedHearings[dateKey]) {
                    groupedHearings[dateKey] = [];
                }

                groupedHearings[dateKey].push({
                    case: caseRecord,
                    hearing: hearingEntry,
                });
            }
        });
    });

    const sortedDateKeys = Object.keys(groupedHearings).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return (
        <PageWrapper>
            <PageHeader>
                <TitleLine1>Upcoming</TitleLine1>
                <TitleLine2>Schedule</TitleLine2>
                <HeroDescription>
                    Your hearings for the next 30 days.
                </HeroDescription>
            </PageHeader>

            <TimelineContainer>
                {sortedDateKeys.map((dateKey) => {
                    const date = new Date(dateKey);
                    const hearingsForDate = groupedHearings[dateKey];

                    return (
                        <TimelineItem key={dateKey}>
                            <TimelineLine />
                            <TimelineDot />

                            <DateRowWrapper>
                                <DateRow
                                    date={date}
                                    count={hearingsForDate.length}
                                />
                            </DateRowWrapper>

                            <HearingsColumn>
                                {hearingsForDate.map(
                                    ({ case: caseRecord, hearing }, i) => (
                                        <HearingCard
                                            key={i}
                                            caseRecord={caseRecord}
                                            hearing={hearing}
                                        />
                                    )
                                )}
                            </HearingsColumn>
                        </TimelineItem>
                    );
                })}
            </TimelineContainer>
        </PageWrapper>
    );
}
