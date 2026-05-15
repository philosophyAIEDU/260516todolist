import { useState } from 'react';
import { useGoalStore } from '../../stores/goalStore';
import { fileToBase64 } from '../../utils/image';

export const GoalBoard = () => {
  const { goals, addGoal, toggle, deleteGoal } = useGoalStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const done = goals.filter((g) => g.achieved).length;
  const rate = goals.length ? Math.round((done / goals.length) * 100) : 0;

  return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><h2 className="text-xl font-bold text-white">목표 비전보드</h2><p className="text-slate-300">{goals.length}개 중 {done}개 달성 ({rate}%)</p><div className="my-2 h-2 rounded bg-slate-700"><div className="h-full rounded bg-emerald-400" style={{ width: `${rate}%` }} /></div><div className="grid gap-2 md:grid-cols-4"><input className="rounded bg-slate-800 p-2 text-white" placeholder="제목" value={title} onChange={(e)=>setTitle(e.target.value)} /><input className="rounded bg-slate-800 p-2 text-white" placeholder="설명" value={description} onChange={(e)=>setDescription(e.target.value)} /><input className="rounded bg-slate-800 p-2 text-white file:mr-2 file:rounded file:border-0 file:bg-violet-500 file:px-2 file:py-1 file:text-white" type="file" accept="image/*" onChange={async (e)=>{const file=e.target.files?.[0]; if(!file) return; if(file.size>1024*1024 && !window.confirm('이미지가 크면 저장 공간을 많이 사용합니다. 계속하시겠습니까?')) return; setImageBase64(await fileToBase64(file));}} /><button className="rounded bg-cyan-500 p-2 font-semibold text-slate-950" onClick={()=>{if(title.trim()){addGoal({title,description,imageBase64}); setTitle(''); setDescription(''); setImageBase64(undefined);}}}>추가</button></div><div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">{goals.map((g)=><div key={g.id} className={`relative rounded-xl border border-white/10 bg-slate-800 p-3 ${g.achieved?'opacity-60':''}`}>{g.imageBase64 && <img src={g.imageBase64} className="mb-2 h-28 w-full rounded object-cover" />}{g.achieved && <div className="absolute right-2 top-2 rounded bg-emerald-500 px-2 text-xs">✓</div>}<p className="font-semibold text-white">{g.title}</p><p className="text-sm text-slate-300">{g.description}</p><div className="mt-2 flex gap-2"><button className="rounded bg-emerald-500 px-2 py-1 text-xs" onClick={()=>toggle(g.id)}>{g.achieved?'취소':'달성'}</button><button className="rounded bg-red-500 px-2 py-1 text-xs" onClick={()=>deleteGoal(g.id)}>삭제</button></div></div>)}</div></section>;
};
