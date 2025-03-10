import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

function useTheme(): [boolean, (mode: 'dark' | 'light') => void] {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('isDarkMode', true); // Default to dark mode

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    prefersDarkScheme.addEventListener('change', handleChange);
    return () => {
      prefersDarkScheme.removeEventListener('change', handleChange);
    };
  }, [setIsDarkMode]);

  const toggleTheme = (mode: 'dark' | 'light') => {
    setIsDarkMode(mode === 'dark');
  };

  return [isDarkMode, toggleTheme];
}

export default useTheme;