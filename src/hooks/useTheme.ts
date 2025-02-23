import { useState, useEffect } from 'react';

function useTheme(): [boolean, (mode: 'dark' | 'light') => void] {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkScheme.matches;
  });

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    prefersDarkScheme.addEventListener('change', handleChange);
    return () => {
      prefersDarkScheme.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = (mode: 'dark' | 'light') => {
    setIsDarkMode(mode === 'dark');
  };

  return [isDarkMode, toggleTheme];
}

export default useTheme;