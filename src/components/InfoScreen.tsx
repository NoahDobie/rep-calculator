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
          className="absolute top-1 right-3 text-gray-800 hover:text-[#FFD43B] dark:text-gray-300"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">How does this john work?</h2>
        <p className="w-full mb-4">
          We use a bunch of different
          <a href="https://www.vbtcoach.com/blog/5-ways-to-measure-1rm-strength-in-the-gym" className="mx-1 underline underline-offset-2 hover:text-[#FFD43B] focus:text-[#FFD43B]">formulas</a>
          to gather the average value and provide you with your 1 rep max!
          <br />
        </p>
        <p className="mb-4">
          This provides a solid estimate of your 1 rep max, but it may not be perfectly accurate for everyone. It always give me the confidence of around what my 1RM will be. Only one way to find out for sure, though!
        </p>
        <p className="mt-4">
          <a
            href="https://github.com/NoahDobie/"
            className="hover:text-[#FFD43B]"
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