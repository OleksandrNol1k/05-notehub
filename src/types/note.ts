export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAT: string;
    tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";