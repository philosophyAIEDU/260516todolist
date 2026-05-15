export const safeSetItem = (key: string, value: string): boolean => {
  try { localStorage.setItem(key, value); return true; } catch { alert('저장 공간이 부족합니다. 이미지를 줄이거나 데이터를 삭제해주세요.'); return false; }
};
