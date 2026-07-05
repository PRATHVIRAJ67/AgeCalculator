import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE, MS_PER_SECOND, MS_PER_WEEK } from './constants';

export interface ExactAge {
  years: number;
  months: number;
  days: number;
}

export interface AgeBreakdown {
  totalYears: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

/**
 * Calculates exact age in years, months, and days
 */
export function calculateExactAge(birthDate: Date, targetDate: Date = new Date()): ExactAge {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const previousMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
    if (months < 0) {
      months += 12;
      // We don't decrement years here because it was already handled by the first condition if months < 0
    }
  }

  return { years, months, days };
}

/**
 * Calculates the total breakdown of time lived
 */
export function calculateAgeBreakdown(birthDate: Date, targetDate: Date = new Date()): AgeBreakdown {
  const diffMs = targetDate.getTime() - birthDate.getTime();
  
  const totalDays = Math.floor(diffMs / MS_PER_DAY);
  
  // Calculate total months more accurately than just division
  let totalMonths = (targetDate.getFullYear() - birthDate.getFullYear()) * 12 + (targetDate.getMonth() - birthDate.getMonth());
  if (targetDate.getDate() < birthDate.getDate()) {
    totalMonths--;
  }

  return {
    totalYears: targetDate.getFullYear() - birthDate.getFullYear() - (targetDate.getMonth() < birthDate.getMonth() || (targetDate.getMonth() === birthDate.getMonth() && targetDate.getDate() < birthDate.getDate()) ? 1 : 0),
    totalMonths,
    totalWeeks: Math.floor(diffMs / MS_PER_WEEK),
    totalDays,
    totalHours: Math.floor(diffMs / MS_PER_HOUR),
    totalMinutes: Math.floor(diffMs / MS_PER_MINUTE),
    totalSeconds: Math.floor(diffMs / MS_PER_SECOND)
  };
}

/**
 * Calculates the next birthday
 */
export function calculateNextBirthday(birthDate: Date, targetDate: Date = new Date()): Date {
  const nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(targetDate.getFullYear());
  
  if (nextBirthday.getTime() < targetDate.getTime()) {
    nextBirthday.setFullYear(targetDate.getFullYear() + 1);
  }
  
  return nextBirthday;
}
