import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface SettingsState { apiKey: string; modelName: string; setApiKey: (key: string) => void; setModelName: (model: string) => void; clearKey: () => void; }
export const useSettingsStore = create<SettingsState>()(persist((set) => ({ apiKey: '', modelName: 'gemini-2.0-flash-lite', setApiKey: (apiKey) => set({ apiKey }), setModelName: (modelName) => set({ modelName }), clearKey: () => set({ apiKey: '' }) }), { name: 'settings-store' }));
