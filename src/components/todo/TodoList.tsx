import { useMemo, useState } from 'react';
import { useTodoStore } from '../../stores/todoStore';
import type { Priority } from '../../types';

const PRI: Record<Priority, string> = { high: 'bg-red-500/30 text-red-200', medium: 'bg-amber-500/30 text-amber-200', low: 'bg-emerald-500/30 text-emerald-200' };

export const TodoList = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [text, setText] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [tab, setTab] = useState<'open'|'done'>('open');
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const rate = total === 0 ? 0 : Math.round((done / total) * 100);
  const ordered = useMemo(() => [...todos].sort((a, b) => a.order - b.order).filter((t)=>tab==='open'?!t.done:t.done), [todos, tab]);

  return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><h2 className="mb-2 text-xl font-bold text-white">Todo</h2><p className="mb-2 text-sm text-slate-300">오늘 {total}개 중 {done}개 완료</p><div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full bg-cyan-400" style={{ width: `${rate}%` }} /></div><div className="mb-2 grid gap-2 md:grid-cols-4"><input className="rounded-lg bg-slate-800 p-2 text-white" value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일" /><input className="rounded-lg bg-slate-800 p-2 text-white" type="datetime-local" value={dueAt} onChange={(e)=>setDueAt(e.target.value)} /><select className="rounded-lg bg-slate-800 p-2 text-white" value={priority} onChange={(e)=>setPriority(e.target.value as Priority)}><option value="high">높음</option><option value="medium">보통</option><option value="low">낮음</option></select><button className="rounded-lg bg-cyan-500 px-3 font-semibold text-slate-950" onClick={() => { if (text.trim()) { addTodo({ text, dueAt: dueAt || undefined, priority }); setText(''); setDueAt(''); } }}>추가</button></div><div className="mb-2 flex gap-2"><button className={`rounded px-2 py-1 ${tab==='open'?'bg-violet-500':'bg-slate-700'}`} onClick={()=>setTab('open')}>미완료</button><button className={`rounded px-2 py-1 ${tab==='done'?'bg-violet-500':'bg-slate-700'}`} onClick={()=>setTab('done')}>완료</button></div><div className="space-y-2">{ordered.map((t) => <div key={t.id} className="flex items-center justify-between rounded-lg bg-slate-800 p-2 text-slate-100"><label className="flex items-center gap-2"><input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} /><span className={t.done ? 'line-through opacity-60' : ''}>{t.text}</span>{t.dueAt && <span className="text-xs text-slate-400">{t.dueAt.replace('T',' ')}</span>}<span className={`rounded px-2 py-0.5 text-xs ${PRI[t.priority]}`}>{t.priority}</span>{t.done && t.completedAt && <span className="text-xs text-slate-500">완료 {new Date(t.completedAt).toLocaleTimeString('ko-KR')}</span>}</label><button className="text-red-300" onClick={()=>removeTodo(t.id)}>삭제</button></div>)}</div></section>;
};
