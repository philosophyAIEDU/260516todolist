import { useMemo, useState } from 'react';
import { useTodoStore } from '../../stores/todoStore';

export const TodoList = () => {
  const { todos, addTodo, toggleTodo } = useTodoStore();
  const [text, setText] = useState('');
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const rate = total === 0 ? 0 : Math.round((done / total) * 100);
  const ordered = useMemo(() => [...todos].sort((a, b) => a.order - b.order), [todos]);

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      <h2 className="mb-2 text-xl font-bold text-white">Todo</h2>
      <p className="mb-2 text-sm text-slate-300">오늘 {total}개 중 {done}개 완료</p>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full bg-cyan-400" style={{ width: `${rate}%` }} /></div>
      <div className="mb-4 flex gap-2">
        <input className="w-full rounded-lg bg-slate-800 p-2 text-white" value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일을 입력하세요" />
        <button className="rounded-lg bg-cyan-500 px-3 font-semibold text-slate-950" onClick={() => { if (text.trim()) { addTodo({ text, priority: 'medium' }); setText(''); } }}>추가</button>
      </div>
      <div className="space-y-2">
        {ordered.map((t) => <label key={t.id} className="flex items-center gap-2 rounded-lg bg-slate-800 p-2 text-slate-100"><input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} /><span className={t.done ? 'line-through opacity-60' : ''}>{t.text}</span></label>)}
      </div>
    </section>
  );
};
