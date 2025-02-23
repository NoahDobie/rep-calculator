import { useState, useEffect, ChangeEvent, useRef } from 'react';
import Calculator from './components/Calculator';
import { CSSTransition } from 'react-transition-group';
import DarkModeToggleContainer from './components/DarkModeToggleContainer';
import Header from './components/Header';
import WeightInputForm from './components/WeightInputForm';
import InfoScreen from './components/InfoScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [weight, setWeight] = useState<number | ''>('');
  const [reps, setReps] = useState<number | ''>('');
  const [unit, setUnit] = useState<string>('lbs');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const calculatorRef = useRef(null);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(prefersDarkScheme.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    prefersDarkScheme.addEventListener('change', handleChange);
    return () => {
      prefersDarkScheme.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const savedWeight = localStorage.getItem('weight');
    const savedReps = localStorage.getItem('reps');
    const savedUnit = localStorage.getItem('unit');
    if (savedWeight !== null) setWeight(Number(savedWeight));
    if (savedReps !== null) setReps(Number(savedReps));
    if (savedUnit !== null) setUnit(savedUnit);
  }, []);

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    if (value === '' || value <= 9999) {
      setWeight(value);
      localStorage.setItem('weight', value.toString());
    }
  };

  const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    if (value === '' || value <= 9999) {
      setReps(value);
      localStorage.setItem('reps', value.toString());
    }
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
    localStorage.setItem('unit', e.target.value);
  };

  const handleDarkModeToggle = (mode: 'dark' | 'light') => {
    setIsDarkMode(mode === 'dark');
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
      <Header />
      <div className="w-[95%] sm:w-[75%] md:w-[50%] lg:w-[33%] xl:w-[30%] max-h-[85vh] overflow-auto">
        <WeightInputForm
          weight={weight}
          reps={reps}
          unit={unit}
          onWeightChange={handleWeightChange}
          onRepsChange={handleRepsChange}
          onUnitChange={handleUnitChange}
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
            <Calculator weight={Number(weight)} reps={Number(reps)} unit={unit} isDarkMode={isDarkMode} />
          </div>
        </CSSTransition>
      </div>
      <InfoScreen isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;