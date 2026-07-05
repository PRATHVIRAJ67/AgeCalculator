import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE, MS_PER_SECOND } from './constants';
import { calculateExactAge } from './age';

export interface DateDiff {
  isPast: boolean;
  /** Calendar breakdown */
  years: number;
  months: number;
  monthsRemainderDays: number;
  totalMonths: number;
  totalWeeks: number;
  weeksRemainderDays: number;
  totalDays: number;
  /** Fine-grained totals from the full timestamp difference */
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateDateDifference(start: Date, end: Date, includeEndDate: boolean = false): DateDiff {
  const isPast = start > end;

  // Ensure d1 is always the earlier date for calculation
  let d1 = isPast ? end : start;
  let d2 = isPast ? start : end;

  if (includeEndDate) {
    // Adding 1 day to the end date mathematically includes it
    d2 = new Date(d2.getTime() + MS_PER_DAY);
  }

  const diffMs = d2.getTime() - d1.getTime();
  const totalDays = Math.floor(diffMs / MS_PER_DAY);

  // Calendar-accurate years/months/days (same clamping logic as age)
  const exact = calculateExactAge(d1, d2);

  return {
    isPast,
    years: exact.years,
    months: exact.months,
    monthsRemainderDays: exact.days,
    totalMonths: exact.years * 12 + exact.months,
    totalWeeks: Math.floor(totalDays / 7),
    weeksRemainderDays: totalDays % 7,
    totalDays,
    hours: Math.floor(diffMs / MS_PER_HOUR),
    minutes: Math.floor(diffMs / MS_PER_MINUTE),
    seconds: Math.floor(diffMs / MS_PER_SECOND),
  };
}
