import { ChangeEvent } from 'react';
import Header from './Header';

interface WeightInputFormProps {
  weight: number | '';
  reps: number | '';
  unit: string;
  liftType: string;
  onWeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRepsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (unit: string) => void;
  onLiftTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function WeightInputForm({
  weight,
  reps,
  unit,
  liftType,
  onWeightChange,
  onRepsChange,
  onUnitChange,
  onLiftTypeChange,
}: WeightInputFormProps) {

  const handleUnitToggle = () => {
    const newUnit = unit === 'lbs' ? 'kg' : 'lbs';
    onUnitChange(newUnit);
  };

  const inputClasses =
    'h-[46px] mt-1 block w-full px-3 py-2 border bg-light-secondary border-light-border text-light-text dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text rounded-md focus:outline-none focus:ring-[#FFD43B] focus:border-[#FFD43B] sm:text-lg hover:border-[#FFD43B]';

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-md bg-light-secondary text-light-text dark:bg-dark-secondary dark:text-dark-text">
      <Header />
      <div className="w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/3 2xl:w-2/3 justify-self-center">
        <div className="mb-4">
          <label className="block text-md font-medium text-light-text dark:text-dark-text">Weight</label>
          <div className="flex">
            <input
              type="number"
              value={weight}
              onChange={onWeightChange}
              min={0}
              max={9999}
              className={`${inputClasses} rounded-l-md rounded-r-none focus:z-20 hover:z-20`}
            />
            <button
              onClick={(e) => {
                handleUnitToggle();
                e.currentTarget.blur();
              }}
              className="z-10 w-20 -ml-[1px] mt-1 block px-3 py-2 border bg-light-secondary border-light-border text-light-text dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text rounded-r-md focus:outline-none focus:ring-[#FFD43B] focus:border-[#FFD43B] sm:text-lg hover:border-[#FFD43B]"
            >
              {unit}
            </button>
          </div>
        </div>
        <div className="h-fit mb-4 flex">
          <div className="w-1/2 pr-1">
            <label className="block text-md font-medium text-light-text dark:text-dark-text">Reps</label>
            <input
              type="number"
              value={reps}
              onChange={onRepsChange}
              min={0}
              max={9999}
              className={inputClasses}
            />
          </div>
          <div className="w-1/2 pl-1">
            <label className="block text-md font-medium text-light-text dark:text-dark-text">Lift Type</label>
            <select
              value={liftType}
              onChange={onLiftTypeChange}
              className={inputClasses}
            >
              <option value="Squat">Squat</option>
              <option value="Bench">Bench</option>
              <option value="Deadlift">Deadlift</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeightInputForm;
