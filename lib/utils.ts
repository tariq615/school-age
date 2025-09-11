import { Country, Province, CalculationResult } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSchoolYears(
  birthDate: Date,
  country: Country,
  province?: Province
): CalculationResult[] {
  const results: CalculationResult[] = [];
  const birthYear = birthDate.getFullYear();

  // ✅ cutoffDate is always an object { month, day }
  const cutoff = getCutoffDate(province?.cutoffDate || country.cutoffDate);

  // Determine start year
  let startYear = birthYear + country.startingAge;
  if (birthDate > new Date(birthYear, cutoff.month - 1, cutoff.day)) {
    startYear += 1;
  }

  // Preschool years
  if (country.educationSystem.preschool.duration > 0) {
    for (let i = 0; i < country.educationSystem.preschool.duration; i++) {
      const grade = i === 0 ? 'Preschool' : `Pre-K ${i + 1}`;
      results.push({
        stage: 'Preschool',
        grade,
        age: country.educationSystem.preschool.startingAge + i,
        entryYear:
          startYear -
          country.startingAge +
          country.educationSystem.preschool.startingAge +
          i,
        graduationYear:
          startYear -
          country.startingAge +
          country.educationSystem.preschool.startingAge +
          i +
          1,
      });
    }
  }

  // Primary years
  for (let i = 0; i < country.educationSystem.primary.duration; i++) {
    results.push({
      stage: 'Primary',
      grade: `Grade ${i + 1}`,
      age: country.educationSystem.primary.startingAge + i,
      entryYear: startYear + i,
      graduationYear: startYear + i + 1,
    });
  }

  // Secondary years
  for (let i = 0; i < country.educationSystem.secondary.duration; i++) {
    results.push({
      stage: 'Secondary',
      grade: `Grade ${country.educationSystem.primary.duration + i + 1}`,
      age: country.educationSystem.secondary.startingAge + i,
      entryYear: startYear + country.educationSystem.primary.duration + i,
      graduationYear:
        startYear + country.educationSystem.primary.duration + i + 1,
    });
  }

  return results;
}

/**
 * ✅ Convert cutoff object {month, day} into a usable structure
 */
function getCutoffDate(cutoffDate: { month: number; day: number }) {
  return {
    month: cutoffDate.month,
    day: cutoffDate.day,
  };
}

export function getCurrentAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
