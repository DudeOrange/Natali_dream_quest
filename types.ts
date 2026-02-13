
export type ViewState = 'selection' | 'door-detail';

export interface QuestState {
  visitedDoors: string[];
  lastVisitedDoor: string | null;
}

export interface DoorConfig {
  id: string;
  label: string;
  isFinal?: boolean;
}

export interface Choice {
  label: string;
  nextStepId: string;
}

export interface QuestStep {
  text: string;
  choices?: Choice[];
  isEnd?: boolean;
}

export interface DoorQuestData {
  steps: Record<string, QuestStep>;
  initialStepId: string;
}
