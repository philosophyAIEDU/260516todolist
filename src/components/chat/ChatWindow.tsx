import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useGemini } from '../../hooks/useGemini';
import { useSettingsStore } from '../../stores/settingsStore';

type Bubble = { role: 'user' | 'model'; text: string };

export const ChatWindow = () => {
  const { apiKey, modelName } = useSettingsStore();
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [text, setText] = useState('');
  const { loading, error, sendMessage } = useGemini(apiKey, modelName);

  if (!apiKey) return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-amber-200">먼저 설정에서 Gemini API 키를 입력해주세요.</section>;

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Gemini AI 코치</h2>
        <button className="rounded-lg border border-white/20 px-3 py-1 text-slate-200" onClick={() => setMessages([])}><RotateCcw size={14} className="inline" /> 초기화</button>
      </div>
      <div className="mb-3 max-h-72 space-y-2 overflow-y-auto rounded-xl bg-slate-800/50 p-3">
        {messages.map((m, i) => <div key={`${i}-${m.role}`} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-cyan-500 text-slate-950' : 'bg-violet-500/30 text-slate-100'}`}>{m.text}</div>)}
        {loading && <p className="text-slate-300">···</p>}
      </div>
      <div className="flex gap-2">
        <input disabled={loading} className="w-full rounded-lg bg-slate-800 p-2 text-white" value={text} onChange={(e) => setText(e.target.value)} placeholder="메시지를 입력하세요" />
        <button disabled={loading || !text.trim()} className="rounded-lg bg-violet-500 px-4 font-semibold text-white disabled:opacity-50" onClick={async () => {
          const userText = text;
          setText('');
          setMessages((s) => [...s, { role: 'user', text: userText }, { role: 'model', text: '' }]);
          let acc = '';
          await sendMessage([], userText, (chunk) => {
            acc += chunk;
            setMessages((s) => [...s.slice(0, -1), { role: 'model', text: acc }]);
          });
        }}>전송</button>
      </div>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </section>
  );
};
