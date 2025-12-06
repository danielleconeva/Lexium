import type {
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import type { CaseRecord } from "../../types/Case";

function normalizeDateString(raw: unknown): string | null {
    if (!raw) return null;

    if (typeof raw === "string") {
        return raw.length > 10 ? raw.slice(0, 10) : raw;
    }

    if (typeof raw === "object") {
        const obj = raw as { [key: string]: unknown };

        if ("toDate" in obj && typeof obj.toDate === "function") {
            const d = obj.toDate() as Date;
            return d.toISOString().slice(0, 10);
        }

        if ("timestampValue" in obj && typeof obj.timestampValue === "string") {
            const iso = obj.timestampValue;
            return iso.slice(0, 10);
        }
    }

    return null;
}

function normalizeTimestampNumber(raw: unknown): number {
    if (!raw) return Date.now();

    if (typeof raw === "number") return raw;

    if (typeof raw === "object") {
        const obj = raw as { [key: string]: unknown };

        if ("toMillis" in obj && typeof obj.toMillis === "function") {
            return obj.toMillis() as number;
        }

        if ("timestampValue" in obj && typeof obj.timestampValue === "string") {
            const iso = obj.timestampValue;
            const t = new Date(iso).getTime();
            return Number.isNaN(t) ? Date.now() : t;
        }
    }

    return Date.now();
}

export function mapDocumentToCaseRecord(
    document: QueryDocumentSnapshot<DocumentData>
): CaseRecord {
    const data = document.data();

    return {
        id: document.id,
        firmId: String(data.firmId),
        firmName: typeof data.firmName === "string" ? data.firmName : null,

        caseNumber: String(data.caseNumber),
        caseYear: String(data.caseYear),
        type: String(data.type),
        court: String(data.court),
        formation: String(data.formation),
        status: String(data.status),
        isStarred: Boolean(data.isStarred),

        clientName: String(data.clientName),
        opposingParty: String(data.opposingParty),

        notes: typeof data.notes === "string" ? data.notes : null,

        nextHearingDate: normalizeDateString(data.nextHearingDate),

        isPublic: Boolean(data.isPublic),

        publicDescription:
            typeof data.publicDescription === "string"
                ? data.publicDescription
                : null,

        partiesInitials: Array.isArray(data.partiesInitials)
            ? (data.partiesInitials as string[])
            : [],

        initiationDate: normalizeDateString(data.initiationDate),

        hearingsChronology: Array.isArray(data.hearingsChronology)
            ? (data.hearingsChronology as Array<{ date: string; time: string }>)
            : [],

        archiveNumber:
            typeof data.archiveNumber === "string" ? data.archiveNumber : null,

        createdAt: normalizeTimestampNumber(data.createdAt),
        updatedAt: normalizeTimestampNumber(data.updatedAt),
    };
}
