import { calculateAverageOneRepMax, calculateReps } from '../utils/calculations'

interface CalculatedRepsDisplayProps {
  weight: number;
  reps: number;
  unit: string;
  liftType: string;
}

const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

type PercentageDisplayProps = {
  percentage: number;
  oneRepMax: number;
  unit: string;
};

function PercentageDisplay({ percentage, oneRepMax, unit }: PercentageDisplayProps) {
  return (
    <div className="flex justify-between border rounded-md p-2 text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl border-light-border dark:border-dark-border hover:border-[#FFD43B] focus:border-[#FFD43B]">
      <span>{percentage}%</span>
      <span>{calculateReps(oneRepMax, percentage)} x {Math.round(oneRepMax * (percentage / 100))} {unit}</span>
    </div>
  );
}

function CalculatedRepsDisplay({ weight, reps, unit, liftType }: CalculatedRepsDisplayProps) {
  const oneRepMax = calculateAverageOneRepMax(weight, reps, liftType);

  return (
    <div className="p-4 bg-light-secondary text-light-text dark:bg-dark-secondary dark:text-dark-text">
      <div className="text-center mb-4">
        <div className="font-normal flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 mr-2" fill="#FFD43B" aria-hidden="true">
            <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
          </svg>
          <h1 className="text-4xl font-bold">{oneRepMax} {unit}</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {percentages.map((percentage) => (
          <PercentageDisplay key={percentage} percentage={percentage} oneRepMax={oneRepMax} unit={unit} />
        ))}
      </div>
    </div>
  );
}

export default CalculatedRepsDisplay;
