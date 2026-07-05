import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE, MS_PER_SECOND } from './constants';

export interface ExactAge {
  years: number;
  months: number;
  days: number;
}

export interface AgeBreakdown {
  totalYears: number;
  totalMonths: number;
  monthsRemainderDays: number;
  totalWeeks: number;
  weeksRemainderDays: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

/** Number of days in a given month (monthIndex is 0-based). */
function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/**
 * Adds `n` calendar months to a date, clamping the day-of-month so that, for
 * example, Jan 31 + 1 month = Feb 28 (not an overflow into March).
 */
function addMonthsClamped(date: Date, n: number): Date {
  const totalMonthIndex = date.getMonth() + n;
  const targetYear = date.getFullYear() + Math.floor(totalMonthIndex / 12);
  const targetMonth = ((totalMonthIndex % 12) + 12) % 12;
  const clampedDay = Math.min(date.getDate(), daysInMonth(targetYear, targetMonth));
  return new Date(targetYear, targetMonth, clampedDay);
}

/**
 * Calculates exact age in years, months, and days.
 *
 * Uses a "count whole months, then remaining days" approach that clamps
 * month-end dates correctly, so it never produces negative day counts
 * (e.g. Jan 31 -> Mar 1 correctly yields 1 month, 1 day).
 */
export function calculateExactAge(birthDate: Date, targetDate: Date = new Date()): ExactAge {
  // Work on date-only values so a time-of-day component can't skew the result.
  const b = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const t = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

  let totalMonths = (t.getFullYear() - b.getFullYear()) * 12 + (t.getMonth() - b.getMonth());
  // Step back a month if adding `totalMonths` overshoots the target date.
  if (addMonthsClamped(b, totalMonths).getTime() > t.getTime()) {
    totalMonths--;
  }

  const anchor = addMonthsClamped(b, totalMonths);
  const days = Math.round((t.getTime() - anchor.getTime()) / MS_PER_DAY);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths - years * 12;

  return { years, months, days };
}

/**
 * Calculates the total breakdown of time lived across every unit, including
 * the remainder days used for the "X months Y days" / "X weeks Y days" lines.
 */
export function calculateAgeBreakdown(birthDate: Date, targetDate: Date = new Date()): AgeBreakdown {
  const diffMs = targetDate.getTime() - birthDate.getTime();
  const exact = calculateExactAge(birthDate, targetDate);

  const totalDays = Math.floor(diffMs / MS_PER_DAY);
  const totalMonths = exact.years * 12 + exact.months;

  return {
    totalYears: exact.years,
    totalMonths,
    monthsRemainderDays: exact.days,
    totalWeeks: Math.floor(totalDays / 7),
    weeksRemainderDays: totalDays % 7,
    totalDays,
    totalHours: Math.floor(diffMs / MS_PER_HOUR),
    totalMinutes: Math.floor(diffMs / MS_PER_MINUTE),
    totalSeconds: Math.floor(diffMs / MS_PER_SECOND),
  };
}

/**
 * Calculates the next birthday relative to the target date.
 */
export function calculateNextBirthday(birthDate: Date, targetDate: Date = new Date()): Date {
  const nextBirthday = new Date(birthDate.getTime());
  nextBirthday.setFullYear(targetDate.getFullYear());

  if (nextBirthday.getTime() < targetDate.getTime()) {
    nextBirthday.setFullYear(targetDate.getFullYear() + 1);
  }

  return nextBirthday;
}
