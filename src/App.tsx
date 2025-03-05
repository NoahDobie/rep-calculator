import { useState, ChangeEvent, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    if (value === '' || value <= 9999) {
      setWeight(value);
    }
  };

  const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    if (value === '' || value <= 9999) {
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

  const shouldShowCalculator = weight !== '' && reps !== '' && weight > 0 && reps > 0;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen py-5 ${isDarkMode ? 'bg-dark-background text-dark-text' : 'bg-light-background text-light-text'}`}>
      <DarkModeToggleContainer isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
      <div className="absolute top-2 left-4">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="text-md cursor-pointer"
          onClick={() => setIsInfoOpen(true)}
        />
      </div>
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
          isDarkMode={isDarkMode}
        />
        <CSSTransition
          in={shouldShowCalculator}
          timeout={300}
          classNames="slide-down"
          unmountOnExit
          nodeRef={calculatorRef}
        >
          <div ref={calculatorRef}>
            <CalculatedRepsDisplay weight={Number(weight)} reps={Number(reps)} unit={unit} liftType={liftType} isDarkMode={isDarkMode} />
          </div>
        </CSSTransition>
      </div>
      <InfoScreen isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;