import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const systemPrefersDark =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

function useTheme(): [boolean, (mode: 'dark' | 'light') => void] {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('isDarkMode', systemPrefersDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = (mode: 'dark' | 'light') => {
    setIsDarkMode(mode === 'dark');
  };

  return [isDarkMode, toggleTheme];
}

export default useTheme;
