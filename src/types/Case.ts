export interface CaseRecord {
    id: string;
    firmId: string;
    firmName?: string;

    caseNumber: string;
    caseYear: string;
    type: string;
    court: string;
    formation: string;
    status: string;

    clientName: string;
    notes?: string;
    nextHearingDate?: string;

    isPublic: boolean;

    publicDescription?: string;
    partiesInitials?: string[];
    initiationDate?: string;
    hearingsChronology?: Array<{
        date: string;
        time: string;
    }>;


    archiveNumber?: string;

    createdAt: number;
    updatedAt: number;
}
