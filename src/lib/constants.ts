export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = MS_PER_SECOND * 60;
export const MS_PER_HOUR = MS_PER_MINUTE * 60;
export const MS_PER_DAY = MS_PER_HOUR * 24;
export const MS_PER_WEEK = MS_PER_DAY * 7;
// Approximate months and years for simple estimates (use exact math for precise calculations)
export const MS_PER_MONTH = MS_PER_DAY * 30.436875; 
export const MS_PER_YEAR = MS_PER_DAY * 365.2425;

export const AVG_HEARTBEATS_PER_MIN = 80;
export const AVG_BREATHS_PER_MIN = 16;
export const AVG_SLEEP_HOURS_PER_DAY = 8;
export const AVG_MEALS_PER_DAY = 3;

export const SITE_TITLE = "Date Age Calculator";
export const SITE_DOMAIN = "dateagecalculator.com";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const CONTACT_EMAIL = "microtoolswebsite@gmail.com";
export const CURRENT_YEAR = new Date().getFullYear();
