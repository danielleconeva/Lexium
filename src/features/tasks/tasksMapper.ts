import type {
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import type { TaskRecord } from "../../types/Task";

function normalizeTaskDateString(raw: unknown): string | undefined {
    if (!raw) return undefined;

    if (typeof raw === "string") {
        return raw.length > 10 ? raw.slice(0, 10) : raw;
    }

    if (typeof raw === "object") {
        const obj = raw as any;

        if (typeof obj.toDate === "function") {
            return obj.toDate().toISOString().slice(0, 10);
        }

        if (typeof obj.timestampValue === "string") {
            return obj.timestampValue.slice(0, 10);
        }
    }

    return undefined;
}

function normalizeTaskTimestampNumber(raw: unknown): number {
    if (!raw) return Date.now();

    if (typeof raw === "number") return raw;

    if (typeof raw === "object") {
        const obj = raw as any;

        if (typeof obj.toMillis === "function") {
            return obj.toMillis();
        }

        if (typeof obj.timestampValue === "string") {
            const t = new Date(obj.timestampValue).getTime();
            return Number.isNaN(t) ? Date.now() : t;
        }
    }

    return Date.now();
}

export function mapDocumentToTaskRecord(
    document: QueryDocumentSnapshot<DocumentData>
): TaskRecord {
    const data = document.data();

    return {
        id: document.id,
        caseId: String(data.caseId),
        firmId: String(data.firmId),

        title: String(data.title),
        status: data.status as TaskRecord["status"],

        notes: typeof data.notes === "string" ? data.notes : null,

        dueDate: normalizeTaskDateString(data.dueDate) ?? null,

        createdAt: normalizeTaskTimestampNumber(data.createdAt),
        updatedAt: normalizeTaskTimestampNumber(data.updatedAt),
    };
}
