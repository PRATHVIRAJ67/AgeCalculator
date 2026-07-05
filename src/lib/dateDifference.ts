import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE, MS_PER_SECOND, MS_PER_WEEK } from './constants';

export interface DateDiff {
  days: number;
  weeks: number;
  months: number;
  years: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function calculateDateDifference(start: Date, end: Date, includeEndDate: boolean = false): DateDiff {
  const isPast = start > end;
  
  // Ensure start is always the earlier date for calculation
  let d1 = isPast ? end : start;
  let d2 = isPast ? start : end;
  
  if (includeEndDate) {
    // Adding 1 day (or MS_PER_DAY) to the end date mathematically includes it
    d2 = new Date(d2.getTime() + MS_PER_DAY);
  }

  const diffMs = d2.getTime() - d1.getTime();
  
  const days = Math.floor(diffMs / MS_PER_DAY);
  const weeks = Math.floor(days / 7);
  
  let months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
  if (d2.getDate() < d1.getDate()) {
    months--;
  }
  
  const years = Math.floor(months / 12);
  
  const hours = Math.floor(diffMs / MS_PER_HOUR);
  const minutes = Math.floor(diffMs / MS_PER_MINUTE);
  const seconds = Math.floor(diffMs / MS_PER_SECOND);
  
  return { days, weeks, months, years, hours, minutes, seconds, isPast };
}
