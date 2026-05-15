import { describe, it, expect, vi } from 'vitest';
import { safeSetItem } from '../storage';
describe('safeSetItem',()=>{it('returns false when quota error',()=>{vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('QuotaExceededError');});vi.spyOn(window,'alert').mockImplementation(()=>{});expect(safeSetItem('a','b')).toBe(false);});});
