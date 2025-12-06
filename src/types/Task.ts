export interface TaskRecord {
    id: string;
    caseId: string;
    firmId: string;

    title: string;

    dueDate: string | null;
    status: "To Do" | "In Progress" | "Done";

    notes: string | null;

    createdAt: number;
    updatedAt: number;
}
