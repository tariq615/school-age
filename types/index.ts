export interface Country {
  id: string;
  name: string;
  cutoffDate: { month: number; day: number }; // changed
  startingAge: number;
  educationSystem: {
    preschool: EducationStage;
    primary: EducationStage;
    secondary: EducationStage;
  };
  provinces: Province[];
}

export interface Province {
  id: string;
  name: string;
  cutoffDate: { month: number; day: number }; // changed
  startingAge?: number;
}

export interface EducationStage {
  startingAge: number;
  duration: number;
  mandatory: boolean;
  notes?: string;
}

export interface CalculationResult {
  stage: string;
  grade: string;
  age: number;
  entryYear: number;
  graduationYear: number;
}