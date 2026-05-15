import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';
import type { ChatMessage } from '../types';
export const useGemini = (apiKey: string, modelName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const sendMessage = async (history: ChatMessage[], userMessage: string, onChunk: (t: string) => void): Promise<void> => {
    setLoading(true); setError('');
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName });
      const chat = model.startChat({ history: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })) });
      const result = await chat.sendMessageStream(userMessage);
      for await (const chunk of result.stream) onChunk(chunk.text());
    } catch (e) {
      const txt = String(e);
      setError(txt.includes('401') || txt.includes('403') ? 'API 키가 유효하지 않습니다. 설정에서 키를 확인해주세요.' : 'AI 응답 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally { setLoading(false); }
  };
  return { loading, error, sendMessage };
};
