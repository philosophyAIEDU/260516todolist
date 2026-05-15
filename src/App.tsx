import { useEffect, useState } from 'react';
import { AffirmationBoard } from './components/affirmations/AffirmationBoard';
import { YearCalendar } from './components/calendar/YearCalendar';
import { ChatWindow } from './components/chat/ChatWindow';
import { GoalBoard } from './components/goals/GoalBoard';
import { Header } from './components/layout/Header';
import { ApiKeyModal } from './components/settings/ApiKeyModal';
import { TodoList } from './components/todo/TodoList';
import { useSettingsStore } from './stores/settingsStore';

export default function App() {
  const { apiKey, modelName, setApiKey, setModelName, clearKey } = useSettingsStore();
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!apiKey) setOpen(true); }, [apiKey]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#312e81,#0f172a_40%)] p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <Header onSettings={() => setOpen(true)} />
        <ApiKeyModal open={open} apiKey={apiKey} modelName={modelName} onSave={(key, model) => { setApiKey(key); setModelName(model); setOpen(false); }} onDelete={() => { clearKey(); setOpen(true); }} />
        <div className="grid gap-4 md:grid-cols-2">
          <TodoList />
          <YearCalendar />
          <GoalBoard />
          <AffirmationBoard />
        </div>
        <div className="mt-4"><ChatWindow /></div>
      </div>
    </main>
  );
}
