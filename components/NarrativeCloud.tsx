
import React from 'react';
import { DEFAULT_NARRATIVE, DOOR_SELECTION_TEXTS } from '../constants.ts';

interface NarrativeCloudProps {
  lastDoor: string | null;
}

const NarrativeCloud: React.FC<NarrativeCloudProps> = ({ lastDoor }) => {
  const text = (lastDoor && DOOR_SELECTION_TEXTS[lastDoor]) || DEFAULT_NARRATIVE;

  return (
    <div className="relative w-full group">
      <div className="absolute -top-10 left-10 w-24 h-24 bg-indigo-500/40 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -top-6 right-20 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="relative z-10 animate-float bg-gradient-to-br from-indigo-500/80 to-purple-700/80 backdrop-blur-md p-8 md:p-12 rounded-[100px_80px_120px_90px] shadow-2xl border border-white/20">
        <p className="dream-font text-white text-xl md:text-3xl text-center leading-relaxed italic drop-shadow-md">
          {text}
        </p>
        
        <div className="absolute -bottom-4 left-1/4 w-8 h-8 bg-indigo-500/80 rounded-full" />
        <div className="absolute -bottom-10 left-[20%] w-5 h-5 bg-indigo-400/60 rounded-full" />
      </div>
    </div>
  );
};

export default NarrativeCloud;
