export interface CaseRecord {
    id: string;

    firmId: string;
    firmName: string | null;

    caseNumber: string;
    caseYear: string;
    type: string;
    court: string;
    formation: string;
    status: string;
    isStarred: boolean;

    clientName: string;
    opposingParty: string;

    notes: string | null;

    nextHearingDate: string | null;

    isPublic: boolean;

    publicDescription: string | null;

    partiesInitials: string[];
    initiationDate: string | null;

    hearingsChronology: Array<{
        date: string;
        time: string;
    }>;

    archiveNumber: string | null;

    createdAt: number;
    updatedAt: number;
}
