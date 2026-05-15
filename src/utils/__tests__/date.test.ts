import { describe, it, expect } from 'vitest';
import { getMonthDays } from '../date';
describe('getMonthDays',()=>{it('creates all days',()=>{expect(getMonthDays(2026,1).length).toBe(28);});});
