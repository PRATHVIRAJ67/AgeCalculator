export interface TimeInput {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeResult {
  /** True when a subtraction produced a negative result. */
  negative: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Signed total seconds. */
  totalSeconds: number;
  decimalDays: number;
  decimalHours: number;
  decimalMinutes: number;
  /** e.g. "11 days 2 hours 59 minutes 50 seconds" */
  formatted: string;
}

const SECONDS_PER_DAY = 86400;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

function toSeconds({ days, hours, minutes, seconds }: TimeInput): number {
  return days * SECONDS_PER_DAY + hours * SECONDS_PER_HOUR + minutes * SECONDS_PER_MINUTE + seconds;
}

/**
 * Adds or subtracts two time values expressed in days/hours/minutes/seconds.
 * Subtraction keeps its sign so the caller can show a negative duration.
 */
export function calculateTime(operation: 'add' | 'subtract', a: TimeInput, b: TimeInput): TimeResult {
  const total = operation === 'subtract' ? toSeconds(a) - toSeconds(b) : toSeconds(a) + toSeconds(b);
  return formatSeconds(total);
}

function formatSeconds(totalSeconds: number): TimeResult {
  const negative = totalSeconds < 0;
  const abs = Math.abs(totalSeconds);

  const days = Math.floor(abs / SECONDS_PER_DAY);
  const hours = Math.floor((abs % SECONDS_PER_DAY) / SECONDS_PER_HOUR);
  const minutes = Math.floor((abs % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = abs % SECONDS_PER_MINUTE;

  const parts: string[] = [];
  if (days) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours || days) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes || hours || days) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

  return {
    negative,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    decimalDays: totalSeconds / SECONDS_PER_DAY,
    decimalHours: totalSeconds / SECONDS_PER_HOUR,
    decimalMinutes: totalSeconds / SECONDS_PER_MINUTE,
    formatted: (negative ? '- ' : '') + parts.join(' '),
  };
}
