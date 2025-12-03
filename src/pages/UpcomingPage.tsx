import { useEffect } from "react";
import styled from "styled-components";
import type { CaseRecord } from "../types/Case";
import { useCases } from "../hooks/useCases";
import { useAuth } from "../hooks/useAuth";
import DateRow from "../components/upcoming/DateRow";
import HearingCard from "../components/upcoming/HearingCard";

const PageWrapper = styled.div`
    max-width: 1800px;
    margin: auto;
    padding: 2rem;
    padding-bottom: 6rem;
`;

const PageHeader = styled.div`
    padding: 4rem 2rem 1rem;
    text-align: center;
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
    margin: 2rem auto;
    margin-bottom: 0.5rem;
`;

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
`;

const TimelineItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
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

const HearingsColumn = styled.div`
    width: 80%;
    max-width: 850px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`;

export default function UpcomingPage() {
    const { firmCases, loadFirmCases, loading } = useCases();
    const { user } = useAuth();

    useEffect(() => {
        if (user?.uid) {
            loadFirmCases(user.uid);
        }
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
                const dateKey = hearingDate.toISOString().slice(0, 10);

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
        (dateA, dateB) => new Date(dateA).getTime() - new Date(dateB).getTime()
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

                            <DateRow
                                date={date}
                                count={hearingsForDate.length}
                            />

                            <HearingsColumn>
                                {hearingsForDate.map(
                                    (
                                        { case: caseRecord, hearing },
                                        hearingIndex
                                    ) => (
                                        <HearingCard
                                            key={hearingIndex}
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
