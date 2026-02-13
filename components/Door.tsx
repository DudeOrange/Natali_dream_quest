
import React from 'react';

interface DoorProps {
  id: string;
  isVisited: boolean;
  isDisabled: boolean;
  onClick: (id: string) => void;
  isFinal?: boolean;
}

const Door: React.FC<DoorProps> = ({ id, isVisited, isDisabled, onClick, isFinal }) => {
  // Logic based on user request:
  // 1. Initial/Active Doors (1, 2, 3, 4) = Green
  // 2. Visited Doors = Red
  // 3. Locked Door 14 = Red
  // 4. Unlocked Door 14 = Green
  
  const baseClasses = "relative w-32 h-48 md:w-40 md:h-60 rounded-lg border-x-[6px] border-t-[3px] border-b-[8px] transition-all duration-300 transform group active:scale-95 flex items-center justify-center";
  
  let stateClasses = "";
  if (isVisited) {
    // Visited: Red and dimmed
    stateClasses = "bg-gradient-to-br from-red-900 to-red-950 border-red-950 opacity-60 cursor-not-allowed";
  } else if (isDisabled) {
    // Disabled (Locked Door 14): Red, full opacity
    stateClasses = "bg-gradient-to-br from-red-900 to-red-950 border-red-950 opacity-100 cursor-not-allowed";
  } else {
    // Available (Unvisited active doors): Green and interactive
    stateClasses = "bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 border-emerald-950 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] cursor-pointer";
  }

  const handleAction = () => {
    if (!isDisabled && !isVisited) {
      onClick(id);
    }
  };

  return (
    <button 
      disabled={isDisabled || isVisited}
      onClick={handleAction}
      className={`${baseClasses} ${stateClasses}`}
    >
      {/* Door Internal Panels */}
      <div className="absolute inset-2 border border-white/5 rounded pointer-events-none" />
      
      {/* Door Number */}
      <span className={`text-4xl md:text-6xl font-bold transition-all duration-300 ${
        isVisited ? 'text-red-400/50' : 'text-amber-500 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]'
      }`}>
        {id}
      </span>

      {/* Door Handle */}
      <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-amber-900 bg-amber-600 shadow-inner ${isDisabled || isVisited ? 'opacity-40' : 'opacity-100'}`}>
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-5 bg-amber-700 rounded-sm" />
      </div>
    </button>
  );
};

export default Door;
