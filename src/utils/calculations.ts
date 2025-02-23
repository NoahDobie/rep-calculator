export const calculateBrzycki = (weight: number, reps: number): number => {
  return Math.round(weight / (1.0278 - 0.0278 * reps));
};

export const calculateEpley = (weight: number, reps: number): number => {
  return Math.round(weight * (1 + reps / 30));
};

export const calculateLander = (weight: number, reps: number): number => {
  return Math.round((100 * weight) / (101.3 - 2.67123 * reps));
};

export const calculateLombardi = (weight: number, reps: number): number => {
  return Math.round(weight * Math.pow(reps, 0.10));
};

export const calculateMayhew = (weight: number, reps: number): number => {
  return Math.round((100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps)));
};

export const calculateOConner = (weight: number, reps: number): number => {
  return Math.round(weight * (1 + 0.025 * reps));
};

export const calculateWathan = (weight: number, reps: number): number => {
  return Math.round((100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps)));
};

export const calculateAverageOneRepMax = (weight: number, reps: number): number => {
  if (reps === 1) {
    return weight;
  }

  const brzycki = calculateBrzycki(weight, reps);
  const epley = calculateEpley(weight, reps);
  const lander = calculateLander(weight, reps);
  const lombardi = calculateLombardi(weight, reps);
  const mayhew = calculateMayhew(weight, reps);
  const oConner = calculateOConner(weight, reps);
  const wathan = calculateWathan(weight, reps);

  const average = (brzycki + epley + lander + lombardi + mayhew + oConner + wathan) / 7;
  return Math.round(average);
};

export const calculateReps = (oneRepMax: number, percentage: number): number => {
  const weightAtPercentage = oneRepMax * (percentage / 100);
  if (weightAtPercentage === 0) return 0;
  return Math.round(30 * (oneRepMax / weightAtPercentage - 1));
};