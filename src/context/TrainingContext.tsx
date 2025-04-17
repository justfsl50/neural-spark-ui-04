
import React, { createContext, useContext, useReducer } from 'react';
import { AIModel, Dataset, GPU, TrainingConfig, TrainingResults, TrainingState } from '@/types';

// Initial state
const initialState: TrainingState = {
  selectedModel: null,
  selectedDataset: null,
  uploadedFile: null,
  config: {
    batchSize: 16,
    learningRate: 0.001,
    epochs: 10,
    validationSplit: 0.2,
  },
  selectedGPU: null,
  trainingStatus: 'idle',
  trainingResults: null,
};

// Action types
type Action =
  | { type: 'SET_MODEL', payload: AIModel }
  | { type: 'SET_DATASET', payload: Dataset }
  | { type: 'SET_UPLOADED_FILE', payload: File }
  | { type: 'UPDATE_CONFIG', payload: Partial<TrainingConfig> }
  | { type: 'SET_GPU', payload: GPU }
  | { type: 'SET_TRAINING_STATUS', payload: 'idle' | 'training' | 'complete' | 'error' }
  | { type: 'SET_TRAINING_RESULTS', payload: TrainingResults }
  | { type: 'RESET' };

// Reducer
const trainingReducer = (state: TrainingState, action: Action): TrainingState => {
  switch (action.type) {
    case 'SET_MODEL':
      return { ...state, selectedModel: action.payload };
    case 'SET_DATASET':
      return { ...state, selectedDataset: action.payload };
    case 'SET_UPLOADED_FILE':
      return { ...state, uploadedFile: action.payload };
    case 'UPDATE_CONFIG':
      return { ...state, config: { ...state.config, ...action.payload } };
    case 'SET_GPU':
      return { ...state, selectedGPU: action.payload };
    case 'SET_TRAINING_STATUS':
      return { ...state, trainingStatus: action.payload };
    case 'SET_TRAINING_RESULTS':
      return { ...state, trainingResults: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// Context
type TrainingContextType = {
  state: TrainingState;
  dispatch: React.Dispatch<Action>;
};

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

// Provider
export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(trainingReducer, initialState);

  return (
    <TrainingContext.Provider value={{ state, dispatch }}>
      {children}
    </TrainingContext.Provider>
  );
};

// Hook
export const useTraining = (): TrainingContextType => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};
