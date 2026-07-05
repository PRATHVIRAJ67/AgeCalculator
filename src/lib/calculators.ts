export interface CalculatorMeta {
  href: string;
  label: string;
  /** Short description used on related-calculator cards */
  description: string;
  /** Emoji icon for compact visual cards */
  icon: string;
}

/**
 * The three primary calculators. These are the main tools of the site and
 * link to each other via the "Related Calculators" section.
 */
export const MAIN_CALCULATORS: CalculatorMeta[] = [
  {
    href: '/',
    label: 'Age Calculator',
    description: 'Find your exact age in years, months, days, weeks, hours, and seconds.',
    icon: '🎂',
  },
  {
    href: '/date-difference',
    label: 'Date Calculator',
    description: 'Days, weeks, and months between any two dates.',
    icon: '📅',
  },
  {
    href: '/time-calculator',
    label: 'Time Calculator',
    description: 'Add or subtract days, hours, minutes, and seconds.',
    icon: '⏱️',
  },
];

/**
 * Secondary / fun calculators. Shown below the main tools in the
 * "Other Calculators" section on each primary page.
 */
export const FUN_CALCULATORS: CalculatorMeta[] = [
  {
    href: '/birthday-countdown',
    label: 'Birthday Countdown',
    description: 'Count down the days until your next birthday.',
    icon: '🎉',
  },
  {
    href: '/birthday-calculator',
    label: 'Birthday Calculator',
    description: 'Discover the day of the week you were born.',
    icon: '🗓️',
  },
  {
    href: '/live-age',
    label: 'Live Age',
    description: 'Watch your age tick up in real time to the second.',
    icon: '⏳',
  },
  {
    href: '/working-days',
    label: 'Working Days',
    description: 'Count business days and weekends between dates.',
    icon: '💼',
  },
  {
    href: '/time-zone-converter',
    label: 'Time Zone Converter',
    description: 'Convert times across the world instantly.',
    icon: '🌍',
  },
  {
    href: '/planet-age-calculator',
    label: 'Planet Age',
    description: 'See how old you are on Mars, Jupiter, and beyond.',
    icon: '🪐',
  },
  {
    href: '/western-zodiac',
    label: 'Western Zodiac',
    description: 'Find your star sign and its element.',
    icon: '♈',
  },
  {
    href: '/chinese-zodiac',
    label: 'Chinese Zodiac',
    description: 'Discover your Chinese zodiac animal.',
    icon: '🐉',
  },
  {
    href: '/dog-age-calculator',
    label: 'Dog Age',
    description: "Convert your dog's age into human years.",
    icon: '🐶',
  },
  {
    href: '/cat-age-calculator',
    label: 'Cat Age',
    description: "Convert your cat's age into human years.",
    icon: '🐱',
  },
  {
    href: '/birthstone',
    label: 'Birthstone',
    description: 'Find your birth month gemstone and flower.',
    icon: '💎',
  },
];
