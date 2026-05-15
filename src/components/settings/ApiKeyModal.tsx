import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props { open: boolean; apiKey: string; modelName: string; onSave: (key: string, model: string) => void; onDelete: () => void; }

export const ApiKeyModal = ({ open, apiKey, modelName, onSave, onDelete }: Props) => {
  const [key, setKey] = useState(apiKey);
  const [model, setModel] = useState(modelName);
  const [show, setShow] = useState(false);
  useEffect(() => { setKey(apiKey); setModel(modelName); }, [apiKey, modelName, open]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-violet-400/30 bg-slate-900 p-6 shadow-2xl">
        <h2 className="mb-4 text-xl font-bold text-white">Gemini API 설정</h2>
        <label className="mb-2 block text-sm text-slate-300">API Key</label>
        <div className="mb-4 flex rounded-xl border border-white/10 bg-slate-800">
          <input className="w-full bg-transparent p-3 text-white outline-none" type={show ? 'text' : 'password'} value={key} onChange={(e) => setKey(e.target.value)} />
          <button className="px-3 text-slate-300" onClick={() => setShow((v) => !v)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
        <label className="mb-2 block text-sm text-slate-300">모델명</label>
        <input className="mb-4 w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-white" value={model} onChange={(e) => setModel(e.target.value)} />
        <p className="mb-4 rounded-lg bg-amber-300/15 p-3 text-sm text-amber-200">API 키는 이 기기의 브라우저에만 저장됩니다. 공용 PC에서는 사용 후 반드시 키를 삭제해주세요.</p>
        <div className="flex gap-2">
          <button className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950" onClick={() => onSave(key, model)}>저장</button>
          <button className="rounded-lg border border-red-400/60 px-4 py-2 text-red-300" onClick={onDelete}>키 삭제</button>
        </div>
      </div>
    </div>
  );
};
