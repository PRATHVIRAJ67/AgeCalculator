import { MS_PER_DAY } from './constants';

export const ORBITAL_PERIODS_IN_EARTH_DAYS: Record<string, number> = {
  Mercury: 87.97,
  Venus: 224.7,
  Earth: 365.25,
  Mars: 686.98,
  Jupiter: 4332.82,
  Saturn: 10755.70,
  Uranus: 30687.15,
  Neptune: 60190.03,
  Pluto: 90553 // Still a planet in our hearts
};

export function calculatePlanetAges(birthDate: Date): Record<string, number> {
  const diffMs = Date.now() - birthDate.getTime();
  const earthDaysAlive = diffMs / MS_PER_DAY;
  
  const ages: Record<string, number> = {};
  for (const [planet, orbitDays] of Object.entries(ORBITAL_PERIODS_IN_EARTH_DAYS)) {
    ages[planet] = parseFloat((earthDaysAlive / orbitDays).toFixed(2));
  }
  return ages;
}

export function getWesternZodiac(month: number, day: number): { sign: string, symbol: string, element: string } {
  // month is 0-indexed (0 = Jan)
  if ((month == 0 && day <= 19) || (month == 11 && day >= 22)) return { sign: "Capricorn", symbol: "♑", element: "Earth" };
  if ((month == 0 && day >= 20) || (month == 1 && day <= 18)) return { sign: "Aquarius", symbol: "♒", element: "Air" };
  if ((month == 1 && day >= 19) || (month == 2 && day <= 20)) return { sign: "Pisces", symbol: "♓", element: "Water" };
  if ((month == 2 && day >= 21) || (month == 3 && day <= 19)) return { sign: "Aries", symbol: "♈", element: "Fire" };
  if ((month == 3 && day >= 20) || (month == 4 && day <= 20)) return { sign: "Taurus", symbol: "♉", element: "Earth" };
  if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) return { sign: "Gemini", symbol: "♊", element: "Air" };
  if ((month == 5 && day >= 21) || (month == 6 && day <= 22)) return { sign: "Cancer", symbol: "♋", element: "Water" };
  if ((month == 6 && day >= 23) || (month == 7 && day <= 22)) return { sign: "Leo", symbol: "♌", element: "Fire" };
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return { sign: "Virgo", symbol: "♍", element: "Earth" };
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return { sign: "Libra", symbol: "♎", element: "Air" };
  if ((month == 9 && day >= 23) || (month == 10 && day <= 21)) return { sign: "Scorpio", symbol: "♏", element: "Water" };
  return { sign: "Sagittarius", symbol: "♐", element: "Fire" };
}

const CHINESE_ZODIAC_ANIMALS = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", 
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
];

export function getChineseZodiac(year: number): string {
  // 1924 was the Year of the Rat (index 0)
  const offset = (year - 1924) % 12;
  const index = offset < 0 ? offset + 12 : offset;
  return CHINESE_ZODIAC_ANIMALS[index];
}

const BIRTHSTONES = [
  { stone: "Garnet", flower: "Carnation" }, // Jan
  { stone: "Amethyst", flower: "Violet" }, // Feb
  { stone: "Aquamarine", flower: "Daffodil" }, // Mar
  { stone: "Diamond", flower: "Daisy" }, // Apr
  { stone: "Emerald", flower: "Lily of the Valley" }, // May
  { stone: "Pearl", flower: "Rose" }, // Jun
  { stone: "Ruby", flower: "Larkspur" }, // Jul
  { stone: "Peridot", flower: "Gladiolus" }, // Aug
  { stone: "Sapphire", flower: "Aster" }, // Sep
  { stone: "Opal", flower: "Marigold" }, // Oct
  { stone: "Topaz", flower: "Chrysanthemum" }, // Nov
  { stone: "Turquoise", flower: "Narcissus" }, // Dec
];

export function getBirthstone(month: number): { stone: string, flower: string } {
  return BIRTHSTONES[month];
}

export function calculatePetAge(humanYears: number, petType: 'dog' | 'cat'): number {
  if (humanYears <= 0) return 0;
  
  if (petType === 'cat') {
    if (humanYears === 1) return 15;
    if (humanYears === 2) return 24;
    return 24 + ((humanYears - 2) * 4);
  } else {
    // Dog (simplified average breed size)
    if (humanYears === 1) return 15;
    if (humanYears === 2) return 24;
    return 24 + ((humanYears - 2) * 5);
  }
}
