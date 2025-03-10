import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { calculateAverageOneRepMax, calculateReps } from '../utils/calculations'

interface CalculatedRepsDisplayProps {
  weight: number;
  reps: number;
  unit: string;
  liftType: string;
  isDarkMode: boolean;
}

const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

type PercentageDisplayProps = {
  percentage: number;
  oneRepMax: number;
  unit: string;
  isDarkMode: boolean;
};

function PercentageDisplay({ percentage, oneRepMax, unit, isDarkMode }: PercentageDisplayProps) {
  return (
    <div className={`flex justify-between border rounded-md p-2 text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl ${isDarkMode ? 'border-dark-border' : 'border-light-border'} hover:border-[#FFD43B] focus:border-[#FFD43B]`}>
      <span>{percentage}%</span>
      <span>{calculateReps(oneRepMax, percentage)} x {Math.round(oneRepMax * (percentage / 100))} {unit}</span>
    </div>
  );
}

function CalculatedRepsDisplay({ weight, reps, unit, liftType, isDarkMode }: CalculatedRepsDisplayProps) {
  const oneRepMax = calculateAverageOneRepMax(weight, reps, liftType);

  return (
    <div className={`p-4 rounded-lg shadow-md mt-3 ${isDarkMode ? 'bg-dark-secondary text-dark-text' : 'bg-light-secondary text-light-text'}`}>
      <div className="text-center mb-4">
        <div className="font-normal flex items-center justify-center">
          <FontAwesomeIcon icon={faCrown} className="text-2xl mr-2" style={{ color: '#FFD43B' }} />
          <h1 className="text-4xl font-bold">{oneRepMax} {unit}</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {percentages.map((percentage) => (
          <PercentageDisplay key={percentage} percentage={percentage} oneRepMax={oneRepMax} unit={unit} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
}

export default CalculatedRepsDisplay;