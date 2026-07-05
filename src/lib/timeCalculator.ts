export interface TimeResult {
  totalSeconds: number;
  formatted: string;
}

export function addTime(h1: number, m1: number, s1: number, h2: number, m2: number, s2: number): TimeResult {
  const t1 = h1 * 3600 + m1 * 60 + s1;
  const t2 = h2 * 3600 + m2 * 60 + s2;
  const total = t1 + t2;
  return formatSeconds(total);
}

export function subtractTime(h1: number, m1: number, s1: number, h2: number, m2: number, s2: number): TimeResult {
  const t1 = h1 * 3600 + m1 * 60 + s1;
  const t2 = h2 * 3600 + m2 * 60 + s2;
  let total = t1 - t2;
  // If negative, we just return the absolute difference but could handle signs if needed.
  if (total < 0) total = Math.abs(total);
  return formatSeconds(total);
}

function formatSeconds(totalSeconds: number): TimeResult {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  
  let formatted = '';
  if (h > 0) formatted += `${h} hr `;
  if (m > 0 || h > 0) formatted += `${m} min `;
  formatted += `${s} sec`;
  
  return { totalSeconds, formatted: formatted.trim() };
}
