import { useState, ChangeEvent, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import CalculatedRepsDisplay from './components/CalculatedRepsDisplay';
import DarkModeToggleContainer from './components/DarkModeToggleContainer';
import WeightInputForm from './components/WeightInputForm';
import InfoScreen from './components/InfoScreen';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import './App.css';

function App() {
  const [weight, setWeight] = useLocalStorage<number | ''>('weight', '');
  const [reps, setReps] = useLocalStorage<number | ''>('reps', '');
  const [unit, setUnit] = useLocalStorage<string>('unit', 'lbs');
  const [liftType, setLiftType] = useLocalStorage<string>('liftType', 'Squat');
  const [isDarkMode, toggleTheme] = useTheme();
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const calculatorRef = useRef(null);
  const lastValidPropsRef = useRef({ weight: 0, reps: 0, unit: 'lbs', liftType: 'Squat' });

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    if (value === '' || (value >= 0 && value <= 9999)) {
      setWeight(value);
    }
  };

  const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    if (value === '' || (value >= 0 && value <= 9999)) {
      setReps(value);
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
  };

  const handleLiftTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLiftType(e.target.value);
  };

  const handleDarkModeToggle = (mode: 'dark' | 'light') => {
    toggleTheme(mode);
  };

  const shouldShowCalculator =
    weight !== '' &&
    reps !== '' &&
    weight > 0 &&
    reps > 0 &&
    !isNaN(Number(weight)) &&
    !isNaN(Number(reps));

  if (shouldShowCalculator) {
    lastValidPropsRef.current = { weight: Number(weight), reps: Number(reps), unit, liftType };
  }
  const displayProps = lastValidPropsRef.current;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-5 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
      <DarkModeToggleContainer isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
      <button
        type="button"
        aria-label="About this calculator"
        onClick={() => setIsInfoOpen(true)}
        className="absolute top-2 left-4 focus:outline-none focus:text-[#FFD43B] hover:text-[#FFD43B]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </button>
      <div className="p-2 w-[95%] sm:w-[75%] md:w-[60%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%]">
        <WeightInputForm
          weight={weight}
          reps={reps}
          unit={unit}
          liftType={liftType}
          onWeightChange={handleWeightChange}
          onRepsChange={handleRepsChange}
          onUnitChange={handleUnitChange}
          onLiftTypeChange={handleLiftTypeChange}
        />
        <CSSTransition
          in={shouldShowCalculator}
          timeout={300}
          classNames="slide-down"
          unmountOnExit
          nodeRef={calculatorRef}
        >
          <div ref={calculatorRef} className="grid mt-3">
            <div className="overflow-hidden min-h-0 rounded-lg shadow-md">
              <CalculatedRepsDisplay {...displayProps} />
            </div>
          </div>
        </CSSTransition>
      </div>
      <InfoScreen isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}

export default App;
