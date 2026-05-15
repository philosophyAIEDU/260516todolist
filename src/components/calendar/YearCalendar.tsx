import { format } from 'date-fns';
export const YearCalendar = () => <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><h2 className="text-xl font-bold text-white">연간 캘린더</h2><p className="mt-2 text-slate-300">현재 연도: {format(new Date(), 'yyyy')}</p></section>;
