import { Sparkles } from 'lucide-react';

export const Header = ({ onSettings }: { onSettings: () => void }) => (
  <header className="sticky top-0 z-20 mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur">
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Personal OS</p>
      <h1 className="text-2xl font-bold text-white">생산성 대시보드</h1>
    </div>
    <div className="flex items-center gap-3">
      <Sparkles className="text-violet-300" size={18} />
      <button className="rounded-xl bg-violet-500 px-4 py-2 font-semibold text-white hover:bg-violet-400" onClick={onSettings}>
        ⚙️ 설정
      </button>
    </div>
  </header>
);
