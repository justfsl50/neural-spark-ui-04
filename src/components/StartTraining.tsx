
import React, { useState } from 'react';
import { startTraining } from '@/utils/api';
import { useTraining } from '@/context/TrainingContext';
import { Play, Shield } from 'lucide-react';

interface StartTrainingProps {
  onTrainingComplete: () => void;
}

const StartTraining: React.FC<StartTrainingProps> = ({ onTrainingComplete }) => {
  const { state, dispatch } = useTraining();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStartTraining = async () => {
    setIsLoading(true);
    dispatch({ type: 'SET_TRAINING_STATUS', payload: 'training' });
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 250);
    
    try {
      const results = await startTraining(state);
      dispatch({ type: 'SET_TRAINING_RESULTS', payload: results });
      dispatch({ type: 'SET_TRAINING_STATUS', payload: 'complete' });
      setProgress(100);
      onTrainingComplete();
    } catch (error) {
      console.error('Error during training:', error);
      dispatch({ type: 'SET_TRAINING_STATUS', payload: 'error' });
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-neural-dark mb-3">Ready to Start Training</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Review your choices and start the training process.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-neural-light rounded-lg">
            <div className="font-medium text-neural-dark">Selected Model</div>
            <div className="text-lg">{state.selectedModel || 'Not selected'}</div>
          </div>
          
          <div className="p-4 bg-neural-light rounded-lg">
            <div className="font-medium text-neural-dark">Dataset</div>
            <div className="text-lg">
              {state.selectedDataset?.name || state.uploadedFile?.name || 'Not selected'}
            </div>
          </div>
          
          <div className="p-4 bg-neural-light rounded-lg">
            <div className="font-medium text-neural-dark">Configuration</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="text-gray-500">Batch Size:</span> {state.config.batchSize}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Learning Rate:</span> {state.config.learningRate}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Epochs:</span> {state.config.epochs}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Validation:</span> {state.config.validationSplit * 100}%
              </div>
            </div>
          </div>
        </div>
        
        {isLoading && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Training Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-neural-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <button
          onClick={handleStartTraining}
          disabled={isLoading || !state.selectedModel || (!state.selectedDataset && !state.uploadedFile)}
          className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium ${
            isLoading || !state.selectedModel || (!state.selectedDataset && !state.uploadedFile)
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-neural-primary hover:bg-neural-secondary'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
              Training in Progress...
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              Start Training
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StartTraining;
