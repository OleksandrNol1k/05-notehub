import axios from "axios"
import type { Note, NoteTag } from "../types/note"

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface fetchNotesResp {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (query: string, page: number): Promise<fetchNotesResp> => {
    
  const params: Record<string, string | number> = {
    perPage: 12,
    page,
  };

  if (query.trim() !== "") {
    params.search = query;
  }

  const response = await axios.get<fetchNotesResp>("/notes", {
    params,
    headers: { Authorization: `Bearer ${myKey}`, },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
    
  const response = await axios.post<Note>("/notes", newNote, {
    headers: { Authorization: `Bearer ${myKey}`, },
  });
  return response.data;
};

export const deleteNote = async (noteId: number) => {
    
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${myKey}`, },
  });
  return response.data;
};
