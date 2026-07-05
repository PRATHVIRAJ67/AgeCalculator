import { MS_PER_DAY } from './constants';

export interface WorkingDaysResult {
  totalDays: number;
  workingDays: number;
  weekends: number;
}

export function calculateWorkingDays(startDate: Date, endDate: Date): WorkingDaysResult {
  let start = new Date(startDate);
  let end = new Date(endDate);
  
  // Ensure start is before end
  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
  }

  // Set time to 0 to avoid daylight saving issues during calculation
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.round(diffMs / MS_PER_DAY) + 1; // Inclusive of both start and end dates
  
  let workingDays = 0;
  let weekends = 0;

  // Simple loop over days. (For a massive date range, math is faster, but a loop is perfectly safe and fast for normal ranges up to 100 years).
  let current = new Date(start);
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 = Sunday, 6 = Saturday
      weekends++;
    } else {
      workingDays++;
    }
    current.setDate(current.getDate() + 1);
  }

  return { totalDays, workingDays, weekends };
}
