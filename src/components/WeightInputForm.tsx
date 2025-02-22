import { ChangeEvent } from 'react';

interface WeightInputFormProps {
  weight: number | '';
  reps: number | '';
  unit: string;
  onWeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRepsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isDarkMode: boolean;
}

function WeightInputForm({
  weight,
  reps,
  unit,
  onWeightChange,
  onRepsChange,
  onUnitChange,
  isDarkMode,
}: WeightInputFormProps) {
  return (
    <div className={`transition-colors duration-300 p-4 sm:p-6 rounded-lg shadow-md mt-6 ${isDarkMode ? 'bg-dark-secondary text-dark-text' : 'bg-light-secondary text-light-text'}`}>
      <div className="mb-4">
        <label className={`block text-lg font-medium ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>Weight</label>
        <div className="flex">
          <input
            type="number"
            value={weight}
            onChange={onWeightChange}
            max={9999}
            className={`mt-1 block w-full px-3 py-2 border transition duration-200 ${isDarkMode ? 'bg-dark-secondary border-dark-border text-dark-text' : 'bg-none border-red text-light-text'} rounded-l-md focus:outline-none focus:ring-red-900 focus:border-red-900 sm:text-lg`}
          />
          <select
            value={unit}
            onChange={onUnitChange}
            className={`z-10 mt-1 block px-3 py-2 border transition duration-200 ${isDarkMode ? 'bg-dark-secondary border-dark-border text-dark-text' : 'bg-none border-light-border text-light-text'} rounded-r-md focus:outline-none focus:ring-red-900 focus:border-red-900 sm:text-lg`}
          >
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className={`block text-lg font-medium ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>Reps</label>
        <input
          type="number"
          value={reps}
          onChange={onRepsChange}
          max={9999}
          className={`mt-1 block w-full px-3 py-2 border transition duration-200 ${isDarkMode ? 'bg-dark-secondary border-dark-border text-dark-text' : 'bg-light-secondary border-light-border text-light-text'} rounded-md focus:outline-none focus:ring-red-900 focus:border-red-900 sm:text-lg`}
        />
      </div>
    </div>
  );
}

export default WeightInputForm;