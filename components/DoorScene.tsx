
import React, { useState } from 'react';
import { FINAL_CHAPTER_TEXT, FINAL_DOOR_ID, DOOR_QUESTS } from '../constants.ts';

interface DoorSceneProps {
  doorId: string;
  onReturn: () => void;
  onReset: () => void;
}

const DoorScene: React.FC<DoorSceneProps> = ({ doorId, onReturn, onReset }) => {
  const isFinal = doorId === FINAL_DOOR_ID;
  const questData = DOOR_QUESTS[doorId];
  
  const [currentStepId, setCurrentStepId] = useState<string>(questData?.initialStepId || 'start');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentStep = questData?.steps[currentStepId];
  const isSimpleDoor = !questData;

  const handleChoice = (nextId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStepId(nextId);
      setIsTransitioning(false);
    }, 300);
  };

  const getContainerStyles = () => {
    if (doorId === '1') return "bg-emerald-950/40 backdrop-blur-xl border-amber-900/30 shadow-[0_0_50px_rgba(6,78,59,0.3)]";
    if (doorId === '2') return "bg-red-900/50 backdrop-blur-2xl border-amber-900 border-[6px] shadow-[0_0_60px_rgba(153,27,27,0.4)] rounded-[40px_10px_40px_10px]";
    if (doorId === '3') return "bg-white/90 backdrop-blur-md border-amber-400 border-[4px] shadow-[0_0_40px_rgba(251,191,36,0.3)] rounded-3xl";
    if (doorId === '4') return "bg-teal-900/40 backdrop-blur-xl border-cyan-300/20 shadow-[0_0_50px_rgba(34,211,238,0.2)] rounded-[60px_20px_60px_20px]";
    return "bg-white/10 border-white/10";
  };

  const getButtonStyles = () => {
    if (doorId === '1') return "bg-amber-900/60 hover:bg-amber-800/80 border-amber-700/30 text-amber-50 shadow-md";
    if (doorId === '2') return "bg-red-800/70 hover:bg-red-700/90 border-amber-600/40 text-amber-100 shadow-[0_4px_0_rgba(120,0,0,0.6)] hover:shadow-none";
    if (doorId === '3') return "bg-indigo-900 hover:bg-indigo-800 border-amber-500/50 text-amber-100 shadow-md transform hover:scale-105";
    if (doorId === '4') return "bg-cyan-700/60 hover:bg-cyan-600/80 border-cyan-400/30 text-cyan-50 shadow-lg hover:shadow-cyan-400/20";
    return "bg-white/20 hover:bg-white/30 border-white/10 text-white";
  };

  const getTextColor = () => {
    if (doorId === '3') return "text-slate-900";
    return "text-white";
  }

  if (isFinal) {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="relative z-10 animate-float bg-gradient-to-br from-indigo-500/80 to-purple-700/80 backdrop-blur-md p-8 md:p-12 rounded-[100px_80px_120px_90px] shadow-2xl border border-white/20 max-w-2xl">
          <p className="dream-font text-white text-xl md:text-3xl text-center leading-relaxed italic drop-shadow-md">
            {FINAL_CHAPTER_TEXT}
          </p>
          <div className="absolute -bottom-4 left-1/4 w-8 h-8 bg-indigo-500/80 rounded-full" />
        </div>
        
        <button 
          onClick={onReset}
          className="px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xl transition-all shadow-xl shadow-indigo-500/40 transform hover:-translate-y-1"
        >
          Пройти квест заново
        </button>
      </div>
    );
  }

  if (!isSimpleDoor && currentStep) {
    return (
      <div className="w-full max-w-2xl flex flex-col items-center">
        <div className={`w-full border transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${getContainerStyles()} relative overflow-hidden`}>
          {doorId === '2' && (
             <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/20 pointer-events-none" />
          )}
          
          <div className="p-8 md:p-12">
            <p className={`dream-font text-2xl md:text-3xl text-center leading-relaxed mb-12 whitespace-pre-wrap ${getTextColor()}`}>
              {currentStep.text}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {currentStep.isEnd ? (
                <button 
                  onClick={onReturn}
                  className={`px-12 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg ${
                    doorId === '1' ? 'bg-gradient-to-r from-emerald-600 to-amber-800 text-white' :
                    doorId === '2' ? 'bg-gradient-to-r from-red-700 to-amber-900 text-amber-50' :
                    doorId === '3' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-indigo-950' :
                    doorId === '4' ? 'bg-gradient-to-r from-cyan-600 to-blue-800 text-white' :
                    'bg-gradient-to-r from-emerald-600 to-teal-700 text-white'
                  }`}
                >
                  Продолжить путь
                </button>
              ) : (
                currentStep.choices?.map((choice, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleChoice(choice.nextStepId)}
                    className={`w-full md:w-auto min-w-[200px] px-8 py-4 rounded-xl font-bold text-lg border transition-all transform hover:-translate-y-1 active:scale-95 backdrop-blur-sm ${getButtonStyles()}`}
                  >
                    {choice.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 flex flex-col items-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
      <h1 className="text-5xl md:text-7xl font-bold text-amber-500 drop-shadow-lg">
        Дверь {doorId}
      </h1>
      <p className="dream-font text-2xl md:text-3xl text-indigo-100 text-center max-w-md">
        Вы вошли в дверь под номером <span className="font-bold text-white">{doorId}</span>. Путь впереди скрыт туманом...
      </p>
      
      <button 
        onClick={onReturn}
        className="mt-8 px-12 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-500/30"
      >
        Вернуться назад
      </button>
    </div>
  );
};

export default DoorScene;
