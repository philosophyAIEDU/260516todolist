import { addYears, format } from 'date-fns';
import { useMemo, useState } from 'react';
import { useCalendarStore } from '../../stores/calendarStore';

const CATS = { work: 'bg-blue-400', personal: 'bg-purple-400', health: 'bg-emerald-400', other: 'bg-slate-400' } as const;

export const YearCalendar = () => {
  const { events, addEvent, deleteEvent } = useCalendarStore();
  const [year, setYear] = useState(new Date().getFullYear());
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [category, setCategory] = useState<'work'|'personal'|'health'|'other'>('work');
  const grouped = useMemo(() => events.filter((e) => e.date.startsWith(String(year))).reduce<Record<string, number>>((acc, e) => { acc[e.date] = (acc[e.date] ?? 0) + 1; return acc; }, {}), [events, year]);

  return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><div className="mb-2 flex items-center justify-between"><h2 className="text-xl font-bold text-white">연간 캘린더</h2><div className="flex gap-2"><button className="rounded bg-slate-700 px-2" onClick={() => setYear(addYears(new Date(year,0,1), -1).getFullYear())}>◀</button><span className="text-white">{year}</span><button className="rounded bg-slate-700 px-2" onClick={() => setYear(addYears(new Date(year,0,1), 1).getFullYear())}>▶</button></div></div><div className="grid grid-cols-3 gap-2 text-xs md:grid-cols-4">{Array.from({ length: 12 }, (_, i) => <div key={i} className="rounded-lg bg-slate-800 p-2"><p className="mb-1 font-semibold text-slate-100">{i + 1}월</p><p className="text-slate-400">이벤트 {Object.keys(grouped).filter((d) => Number(d.split('-')[1]) === i + 1).length}일</p></div>)}</div><div className="mt-3 grid gap-2 md:grid-cols-4"><input className="rounded bg-slate-800 p-2 text-white" placeholder="일정 제목" value={title} onChange={(e)=>setTitle(e.target.value)} /><input className="rounded bg-slate-800 p-2 text-white" type="date" value={date} onChange={(e)=>setDate(e.target.value)} /><select className="rounded bg-slate-800 p-2 text-white" value={category} onChange={(e)=>setCategory(e.target.value as 'work'|'personal'|'health'|'other')}><option value="work">업무</option><option value="personal">개인</option><option value="health">건강</option><option value="other">기타</option></select><button className="rounded bg-cyan-500 p-2 font-semibold text-slate-950" onClick={()=>{if(title.trim()){addEvent({title,date,category});setTitle('');}}}>추가</button></div><div className="mt-3 space-y-2">{events.filter((e)=>e.date.startsWith(String(year))).slice(0,6).map((e)=><div key={e.id} className="flex items-center justify-between rounded bg-slate-800 p-2 text-sm text-slate-100"><span><span className={`mr-2 inline-block h-2 w-2 rounded-full ${CATS[e.category]}`} />{e.date} · {e.title}</span><button onClick={()=>deleteEvent(e.id)} className="text-red-300">삭제</button></div>)}</div></section>;
};
