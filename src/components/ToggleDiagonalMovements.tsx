import React, { useState } from 'react';

interface DiagonalToggleProps {
  onToggle: (state: boolean) => void;
}

export const DiagonalToggle: React.FC<DiagonalToggleProps> = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  const toggleDotClassName = `toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 ${
    isActive ? 'right-0' : 'left-0'
  }`;

  const handleClick = () => {
    handleToggle();
  };

  return (
    <div className="absolute top-2 right-2">
      <button className="flex items-center cursor-pointer" onClick={handleClick}>
        <div className="relative">
          <div className="toggle__line w-10 h-4 bg-green-500 rounded-full shadow-inner"></div>          
          <div className={toggleDotClassName}></div>
        </div>
        <div className="ml-3 text-gray-700 font-bold">Jugadas diagonales</div>
      </button>
    </div>
  );
};