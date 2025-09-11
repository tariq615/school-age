import { Country } from '@/types';

export const countries: Record<string, Country> = {
  us: {
    id: "us",
    name: "United States",
    cutoffDate: { month: 9, day: 1 },
    startingAge: 6,
    educationSystem: {
      preschool: { startingAge: 3, duration: 2, mandatory: false, notes: "Varies by state" },
      primary: { startingAge: 5, duration: 6, mandatory: true },
      secondary: { startingAge: 11, duration: 6, mandatory: true }
    },
    provinces: [
      { id: "ca", name: "California", cutoffDate: { month: 9, day: 1 } },
      { id: "ny", name: "New York", cutoffDate: { month: 12, day: 31 } },
      { id: "tx", name: "Texas", cutoffDate: { month: 9, day: 1 } },
      { id: "fl", name: "Florida", cutoffDate: { month: 9, day: 1 } },
      { id: "il", name: "Illinois", cutoffDate: { month: 9, day: 1 } }
    ]
  },
  ca: {
    id: "ca",
    name: "Canada",
    cutoffDate: { month: 12, day: 31 },
    startingAge: 6,
    educationSystem: {
      preschool: { startingAge: 4, duration: 1, mandatory: false, notes: "Junior Kindergarten in Ontario" },
      primary: { startingAge: 5, duration: 7, mandatory: true },
      secondary: { startingAge: 12, duration: 5, mandatory: true }
    },
    provinces: [
      { id: "on", name: "Ontario", cutoffDate: { month: 12, day: 31 } },
      { id: "bc", name: "British Columbia", cutoffDate: { month: 12, day: 31 } },
      { id: "qc", name: "Quebec", cutoffDate: { month: 9, day: 30 } },
      { id: "ab", name: "Alberta", cutoffDate: { month: 12, day: 31 } }
    ]
  },
  au: {
    id: "au",
    name: "Australia",
    cutoffDate: { month: 7, day: 31 },
    startingAge: 6,
    educationSystem: {
      preschool: { startingAge: 3, duration: 2, mandatory: false },
      primary: { startingAge: 5, duration: 7, mandatory: true },
      secondary: { startingAge: 12, duration: 5, mandatory: true }
    },
    provinces: [
      { id: "nsw", name: "New South Wales", cutoffDate: { month: 7, day: 31 } },
      { id: "vic", name: "Victoria", cutoffDate: { month: 4, day: 30 } },
      { id: "qld", name: "Queensland", cutoffDate: { month: 6, day: 30 } }
    ]
  }
  // ... you can continue for India, Pakistan, China, UAE in same format
};

export const getCountryById = (countryId: string): Country | null => {
  return countries[countryId] || null;
};

export const getAllCountries = (): Country[] => {
  return Object.values(countries);
};
