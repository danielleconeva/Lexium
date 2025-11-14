export interface TaskRecord {
    id: string;
    caseId: string;
    firmId: string;

    title: string;
    dueDate?: string;
    status: "To Do" | "In Progress" | "Done";
    notes?: string;

    createdAt: number;
    updatedAt: number;
}
