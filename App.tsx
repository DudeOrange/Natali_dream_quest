
import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, QuestState } from './types.ts';
import { MAIN_DOORS, FINAL_DOOR_ID } from './constants.ts';
import NarrativeCloud from './components/NarrativeCloud.tsx';
import DoorGrid from './components/DoorGrid.tsx';
import DoorScene from './components/DoorScene.tsx';

const STORAGE_KEY = 'natalie_quest_progress';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('selection');
  const [activeDoor, setActiveDoor] = useState<string | null>(null);
  const [questState, setQuestState] = useState<QuestState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { visitedDoors: [], lastVisitedDoor: null };
  });

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questState));
  }, [questState]);

  const handleDoorClick = useCallback((doorId: string) => {
    setActiveDoor(doorId);
    setView('door-detail');
    
    setQuestState(prev => {
      const alreadyVisited = prev.visitedDoors.includes(doorId);
      return {
        visitedDoors: alreadyVisited ? prev.visitedDoors : [...prev.visitedDoors, doorId],
        lastVisitedDoor: doorId
      };
    });
  }, []);

  const handleReturn = useCallback(() => {
    setView('selection');
    setActiveDoor(null);
  }, []);

  const resetQuest = useCallback(() => {
    const newState = { visitedDoors: [], lastVisitedDoor: null };
    setQuestState(newState);
    setView('selection');
    setActiveDoor(null);
  }, []);

  const isFinalUnlocked = MAIN_DOORS.every(d => questState.visitedDoors.includes(d.id));

  // Determine background based on state
  const getBackgroundStyles = () => {
    if (activeDoor === '1') {
      return "bg-gradient-to-b from-green-950 via-emerald-900 to-amber-950";
    }
    if (activeDoor === '2') {
      return "bg-gradient-to-b from-red-950 via-red-900 to-amber-950";
    }
    if (activeDoor === '3') {
      return "bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900";
    }
    if (activeDoor === '4') {
      return "bg-gradient-to-b from-cyan-900 via-teal-800 to-blue-950";
    }
    return "bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900";
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-start py-10 px-4 transition-colors duration-700 ${getBackgroundStyles()}`}>
      <div className="max-w-4xl w-full flex flex-col items-center space-y-12">
        {view === 'selection' ? (
          <>
            <NarrativeCloud lastDoor={questState.lastVisitedDoor} />
            
            <DoorGrid 
              visitedDoors={questState.visitedDoors} 
              onDoorClick={handleDoorClick}
              isFinalUnlocked={isFinalUnlocked}
            />

            <button 
              onClick={resetQuest}
              className="mt-12 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1 active:translate-y-0"
            >
              Пройти квест заново
            </button>
          </>
        ) : (
          <DoorScene 
            doorId={activeDoor || ''} 
            onReturn={handleReturn} 
            onReset={resetQuest}
          />
        )}
      </div>
    </div>
  );
};

export default App;
