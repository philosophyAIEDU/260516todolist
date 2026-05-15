export type Priority = 'high' | 'medium' | 'low';
export type EventCategory = 'work' | 'personal' | 'health' | 'other';
export interface TodoItem { id: string; text: string; dueAt?: string; priority: Priority; completedAt?: string; done: boolean; order: number; }
export interface CalendarEvent { id: string; title: string; date: string; time?: string; memo?: string; category: EventCategory; }
export interface Goal { id: string; title: string; description: string; deadline?: string; imageBase64?: string; achieved: boolean; }
export interface Affirmation { id: string; content: string; author?: string; favorite: boolean; color: string; }
export interface ChatMessage { role: 'user' | 'model'; text: string; id: string; }
