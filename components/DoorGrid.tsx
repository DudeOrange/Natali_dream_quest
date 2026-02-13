
import React from 'react';
import Door from './Door';
import { MAIN_DOORS, FINAL_DOOR_ID } from '../constants';

interface DoorGridProps {
  visitedDoors: string[];
  isFinalUnlocked: boolean;
  onDoorClick: (id: string) => void;
}

const DoorGrid: React.FC<DoorGridProps> = ({ visitedDoors, isFinalUnlocked, onDoorClick }) => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-6 md:gap-10">
      {MAIN_DOORS.map((door) => (
        <Door 
          key={door.id} 
          id={door.id} 
          isVisited={visitedDoors.includes(door.id)}
          isDisabled={false} // Main doors always selectable unless visited
          onClick={onDoorClick}
        />
      ))}
      <Door 
        id={FINAL_DOOR_ID} 
        isVisited={visitedDoors.includes(FINAL_DOOR_ID)}
        isDisabled={!isFinalUnlocked}
        isFinal={true}
        onClick={onDoorClick}
      />
    </div>
  );
};

export default DoorGrid;
