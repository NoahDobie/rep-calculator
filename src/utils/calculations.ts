// Calculation formulas
export const calculateBrzycki = (weight: number, reps: number): number => {
  return Math.round(weight * (36 / (37 - reps)));
};

export const calculateEpley = (weight: number, reps: number): number => {
  return Math.round(weight * (1 + 0.0333 * reps));
};

export const calculateMayhew = (weight: number, reps: number): number => {
  return Math.round((100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps)));
};

export const calculateWathan = (weight: number, reps: number): number => {
  return Math.round((100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps)));
};

export const calculateLombardi = (weight: number, reps: number): number => {
  return Math.round(weight * Math.pow(reps, 0.10));
};

export const calculateOConner = (weight: number, reps: number): number => {
  return Math.round(weight * (1 + 0.025 * reps));
};

// Calculate average one-rep max based on lift type
export const calculateAverageOneRepMax = (weight: number, reps: number, liftType: string): number => {
  if (reps === 1) {
    return weight;
  }

  let calculatedMax: number;

  switch (liftType) {
    case 'Squat':
      calculatedMax = calculateEpley(weight, reps);
      break;
    case 'Bench':
      calculatedMax = calculateAverage([calculateWathan(weight, reps), calculateMayhew(weight, reps)]);
      break;
    case 'Deadlift':
      calculatedMax = calculateAverage([calculateBrzycki(weight, reps), calculateEpley(weight, reps)]);
      break;
    case 'Other':
    default:
      calculatedMax = calculateAverage([calculateLombardi(weight, reps), calculateOConner(weight, reps)]);
      break;
  }

  return Math.round(calculatedMax);
};

// Helper function to calculate the average of an array of numbers
const calculateAverage = (values: number[]): number => 
  values.reduce((acc, val) => acc + val, 0) / values.length;

// Calculate the number of reps at a given percentage of one-rep max
export const calculateReps = (oneRepMax: number, percentage: number): number => {
  const weightAtPercentage = oneRepMax * (percentage / 100);
  if (weightAtPercentage === 0) return 0;
  return Math.round(30 * (oneRepMax / weightAtPercentage - 1));
};