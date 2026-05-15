import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
export const getMonthDays = (year: number, month: number): string[] => eachDayOfInterval({ start: startOfMonth(new Date(year, month, 1)), end: endOfMonth(new Date(year, month, 1)) }).map((d) => format(d, 'yyyy-MM-dd'));
export const todayKey = (): string => format(new Date(), 'yyyy-MM-dd');
export const dayOfYearSeed = (date: Date): number => Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
