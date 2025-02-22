import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

interface CalculatorProps {
  weight: number;
  reps: number;
  unit: string;
  isDarkMode: boolean;
}

const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

const calculateOneRepMax = (weight: number, reps: number): number => {
  if (weight === 0 || reps === 0) return 0;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
};

const calculateReps = (oneRepMax: number, percentage: number): number => {
  const weightAtPercentage = oneRepMax * (percentage / 100);
  if (weightAtPercentage === 0) return 0;
  return Math.round(30 * (oneRepMax / weightAtPercentage - 1));
};

type PercentageDisplayProps = {
  percentage: number;
  oneRepMax: number;
  unit: string;
  isDarkMode: boolean;
};

function PercentageDisplay({ percentage, oneRepMax, unit, isDarkMode }: PercentageDisplayProps) {
    return (
        <div className={`transition flex justify-between border rounded-md p-2 ${isDarkMode ? 'border-dark-border' : 'border-light-border'} hover:border-red-900 focus:border-red-900`} >
            <span>{percentage}%</span>
            <span>{calculateReps(oneRepMax, percentage)} x {Math.round(oneRepMax * (percentage / 100))} {unit}</span>
        </div>
    );
}

function Calculator({ weight, reps, unit, isDarkMode }: CalculatorProps) {
  const oneRepMax = calculateOneRepMax(weight, reps);

  return (
    <div className={`transition-colors duration-300 p-6 rounded-lg shadow-md mt-6 ${isDarkMode ? 'bg-dark-secondary text-dark-text' : 'bg-light-secondary text-light-text'}`}>
        <div className="text-center mb-4">
            <div className="text-2xl font-normal flex items-center justify-center">
            <FontAwesomeIcon icon={faCrown} className="text-2xl mr-2" style={{ color: '#FFD43B' }} />
            <h1 className="text-3xl font-bold">{oneRepMax} {unit}</h1>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
            {percentages.map((percentage) => (
            <PercentageDisplay key={percentage} percentage={percentage} oneRepMax={oneRepMax} unit={unit} isDarkMode={isDarkMode} />
            ))}
        </div>
    </div>
  );
}

export default Calculator;