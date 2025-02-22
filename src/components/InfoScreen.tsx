import React from 'react';

interface InfoScreenProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

function InfoScreen({ isOpen, onClose, isDarkMode }: InfoScreenProps) {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-center bg-black bg-opacity-60 z-50" onClick={handleBackgroundClick}>
      <div className={`relative ${isDarkMode ? 'bg-dark-background text-dark-text' : 'bg-light-background text-light-text'} p-6 rounded-lg shadow-lg max-w-md w-[95%]`}>
        <button
          onClick={onClose}
          className="absolute top-1 right-3 transition duration-300 text-gray-800 hover:text-red-900 dark:text-gray-300"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">How does this john work?</h2>
        <p className="w-full mb-4">
          We use the <a href="https://www.vcalc.com/wiki/epley-formula-1-rep-max" className="transition duration-300 hover:text-red-900 focus:text-red-900">Epley formula</a> to calculate your 1 rep max:
          <br />
          <strong>1RM = weight * (1 + reps / 30)</strong>
        </p>
        <p className="mb-4">
          This formula provides a good estimate of your 1 rep max, but it may not be perfectly accurate for everyone. It always give me the confidence of around what my 1RM will be. Only one way to find out for sure, though!
        </p>
        <p className="mt-4">
          <a
            href="https://github.com/NoahDobie/"
            className="transition duration-300 hover:text-red-900"
            target="_blank"
            rel="noopener noreferrer"
          >
          Support / Check me out on Github!
          </a>
        </p>
      </div>
    </div>
  );
}

export default InfoScreen;