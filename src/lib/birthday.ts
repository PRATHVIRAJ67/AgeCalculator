import { MS_PER_DAY } from './constants';

export interface BirthdayInfo {
  daysUntil: number;
  nextDate: Date;
  turningAge: number;
  isToday: boolean;
}

export function calculateBirthdayInfo(birthDate: Date, targetDate: Date = new Date()): BirthdayInfo {
  const currentYear = targetDate.getFullYear();
  let nextDate = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  nextDate.setFullYear(currentYear);
  
  // Set times to midnight for accurate day comparison
  const tDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const bDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());
  
  const isToday = tDate.getTime() === bDate.getTime();
  
  if (bDate.getTime() < tDate.getTime()) {
    // Birthday has passed this year
    bDate.setFullYear(currentYear + 1);
  }
  
  const diffMs = bDate.getTime() - tDate.getTime();
  const daysUntil = Math.ceil(diffMs / MS_PER_DAY);
  const turningAge = bDate.getFullYear() - birthDate.getFullYear();
  
  return { daysUntil, nextDate: bDate, turningAge, isToday };
}
