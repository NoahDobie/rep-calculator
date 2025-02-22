import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

interface DarkModeToggleContainerProps {
  isDarkMode: boolean;
  onToggle: (mode: 'dark' | 'light') => void;
}

function DarkModeToggleContainer({ isDarkMode, onToggle }: DarkModeToggleContainerProps) {
  return (
    <div className="absolute sm:top-1 sm-right-1 top-1 right-2 scale-50">
      <DarkModeToggle
        mode={isDarkMode ? 'dark' : 'light'}
        size="sm"
        inactiveTrackColor="#F8F9FA"
        inactiveTrackColorOnHover="#FFFFFF"
        inactiveTrackColorOnActive="#DEE2E6"
        activeTrackColor="#1A1A1A"
        activeTrackColorOnHover="#2A2A2A"
        activeTrackColorOnActive="#343A40"
        inactiveThumbColor="#1A1A1A"
        activeThumbColor="#F8F9FA"
        onChange={onToggle}
      />
    </div>
  );
}

export default DarkModeToggleContainer;