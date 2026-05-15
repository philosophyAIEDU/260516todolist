import { useMemo, useState } from 'react';
import { useAffirmationStore } from '../../stores/affirmationStore';
import { dayOfYearSeed } from '../../utils/date';

const COLORS = ['bg-rose-500/20','bg-amber-500/20','bg-emerald-500/20','bg-cyan-500/20','bg-indigo-500/20','bg-fuchsia-500/20'];

export const AffirmationBoard = () => {
  const { affirmations, add, toggleFav, remove } = useAffirmationStore();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const sorted = useMemo(() => [...affirmations].sort((a, b) => Number(b.favorite) - Number(a.favorite)), [affirmations]);
  const daily = sorted.length ? sorted[dayOfYearSeed(new Date()) % sorted.length] : undefined;

  return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><h2 className="text-xl font-bold text-white">힘이 되는 말 보드</h2><div className="my-3 rounded-xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 p-4"><p className="text-xs text-slate-300">오늘의 문구</p><p className="text-white">{daily?.content ?? '문구를 추가해보세요.'}</p></div><div className="mb-3 grid gap-2 md:grid-cols-3"><input className="rounded bg-slate-800 p-2 text-white" placeholder="문구" value={content} onChange={(e)=>setContent(e.target.value)} /><input className="rounded bg-slate-800 p-2 text-white" placeholder="출처" value={author} onChange={(e)=>setAuthor(e.target.value)} /><button className="rounded bg-cyan-500 p-2 font-semibold text-slate-950" onClick={()=>{if(content.trim()){add({content,author,color:COLORS[Math.floor(Math.random()*COLORS.length)]});setContent('');setAuthor('');}}}>추가</button></div><div className="grid gap-2 md:grid-cols-2">{sorted.map((a)=><div key={a.id} className={`rounded-xl p-3 ${a.color}`}><p className="text-white">{a.content}</p><p className="text-xs text-slate-300">{a.author || '익명'}</p><div className="mt-2 flex gap-2"><button onClick={()=>toggleFav(a.id)} className="text-amber-300">{a.favorite?'★':'☆'}</button><button onClick={()=>remove(a.id)} className="text-red-300">삭제</button></div></div>)}</div></section>;
};
