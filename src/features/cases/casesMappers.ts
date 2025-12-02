import type {
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import type { CaseRecord } from "../../types/Case";

function normalizeDateString(raw: unknown): string | undefined {
    if (!raw) return undefined;

    if (typeof raw === "string") {
        return raw.length > 10 ? raw.slice(0, 10) : raw;
    }

    if (typeof raw === "object") {
        const obj = raw as { [key: string]: unknown };

        if ("toDate" in obj && typeof obj.toDate === "function") {
            const d = obj.toDate() as Date;
            return d.toISOString().slice(0, 10);
        }

        if (
            "timestampValue" in obj &&
            typeof obj.timestampValue === "string"
        ) {
            const iso = obj.timestampValue;
            return iso.slice(0, 10);
        }
    }

    return undefined;
}

function normalizeTimestampNumber(raw: unknown): number {
    if (!raw) return Date.now();

    if (typeof raw === "number") return raw;

    if (typeof raw === "object") {
        const obj = raw as { [key: string]: unknown };

        if ("toMillis" in obj && typeof obj.toMillis === "function") {
            const millis = obj.toMillis() as number;
            return millis;
        }

        if (
            "timestampValue" in obj &&
            typeof obj.timestampValue === "string"
        ) {
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

    const {
        firmId,
        firmName,
        caseNumber,
        caseYear,
        type,
        court,
        formation,
        status,
        clientName,
        notes,
        nextHearingDate,
        isPublic,
        publicDescription,
        partiesInitials,
        initiationDate,
        hearingsChronology,
        archiveNumber,
        createdAt,
        updatedAt,
    } = data;

    return {
        id: document.id,
        firmId: String(firmId),
        firmName: typeof firmName === "string" ? firmName : undefined,

        caseNumber: String(caseNumber),
        caseYear: String(caseYear),
        type: String(type),
        court: String(court),
        formation: String(formation),
        status: String(status),

        clientName: String(clientName),
        notes: typeof notes === "string" ? notes : undefined,
        nextHearingDate: normalizeDateString(nextHearingDate),

        isPublic: Boolean(isPublic),

        publicDescription:
            typeof publicDescription === "string"
                ? publicDescription
                : undefined,
        partiesInitials: Array.isArray(partiesInitials)
            ? (partiesInitials as string[])
            : undefined,
        initiationDate: normalizeDateString(initiationDate),
        hearingsChronology: Array.isArray(hearingsChronology)
            ? (hearingsChronology as Array<{ date: string; time: string }>)
            : undefined,

        archiveNumber:
            typeof archiveNumber === "string" ? archiveNumber : undefined,

        createdAt: normalizeTimestampNumber(createdAt),
        updatedAt: normalizeTimestampNumber(updatedAt),
    };
}
