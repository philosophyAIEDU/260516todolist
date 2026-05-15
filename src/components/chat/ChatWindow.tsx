import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useGemini } from '../../hooks/useGemini';
import { useCalendarStore } from '../../stores/calendarStore';
import { useGoalStore } from '../../stores/goalStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useTodoStore } from '../../stores/todoStore';

type Bubble = { role: 'user' | 'model'; text: string };

export const ChatWindow = () => {
  const { apiKey, modelName } = useSettingsStore();
  const { todos } = useTodoStore();
  const { events } = useCalendarStore();
  const { goals } = useGoalStore();
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [text, setText] = useState('');
  const { loading, error, sendMessage } = useGemini(apiKey, modelName);
  const today = new Date().toISOString().slice(0, 10);
  const context = useMemo(() => `당신은 사용자의 개인 생산성 코치입니다.\n오늘 날짜: ${today}\n미완료 Todo: ${todos.filter((t)=>!t.done).map((t)=>t.text).join(', ') || '없음'}\n오늘 일정: ${events.filter((e)=>e.date===today).map((e)=>e.title).join(', ') || '없음'}\n현재 목표: ${goals.map((g)=>g.title).join(', ') || '없음'}\n사용자의 일정과 목표를 바탕으로 실용적인 조언과 동기부여를 제공하세요. 한국어로 대화하세요.`, [today, todos, events, goals]);

  if (!apiKey) return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-amber-200">먼저 설정에서 Gemini API 키를 입력해주세요.</section>;

  return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-bold text-white">Gemini AI 코치</h2><button className="rounded-lg border border-white/20 px-3 py-1 text-slate-200" onClick={() => setMessages([])}><RotateCcw size={14} className="inline" /> 초기화</button></div><div className="mb-3 max-h-72 space-y-2 overflow-y-auto rounded-xl bg-slate-800/50 p-3">{messages.map((m, i) => <div key={`${i}-${m.role}`} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-cyan-500 text-slate-950' : 'bg-violet-500/30 text-slate-100'}`}>{m.text}</div>)}{loading && <p className="text-slate-300">···</p>}</div><div className="flex gap-2"><input disabled={loading} className="w-full rounded-lg bg-slate-800 p-2 text-white" value={text} onChange={(e) => setText(e.target.value)} placeholder="메시지를 입력하세요" /><button disabled={loading || !text.trim()} className="rounded-lg bg-violet-500 px-4 font-semibold text-white disabled:opacity-50" onClick={async () => { const userText = text; setText(''); setMessages((s) => [...s, { role: 'user', text: userText }, { role: 'model', text: '' }]); let acc = ''; await sendMessage(messages.map((m, i) => ({ id: String(i), role: m.role, text: m.text })), `${context}\n\n사용자 질문: ${userText}`, (chunk) => { acc += chunk; setMessages((s) => [...s.slice(0, -1), { role: 'model', text: acc }]); }); }}>전송</button></div>{error && <p className="mt-2 text-sm text-red-300">{error}</p>}</section>;
};
