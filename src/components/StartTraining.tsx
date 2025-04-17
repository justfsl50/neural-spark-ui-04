
import React, { useState } from 'react';
import { startTraining } from '@/utils/api';
import { useTraining } from '@/context/TrainingContext';
import { Play, Cloud, Shield, AreaChart } from 'lucide-react';

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
    
    // Simulate progress
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
          Review your choices and start the distributed training process.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-medium text-neural-dark mb-4">Training Summary</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-neural-light rounded-lg">
                <div className="font-medium text-neural-dark">Selected Model</div>
                <div className="text-lg">{state.selectedModel || 'Not selected'}</div>
              </div>
              
              <div className="p-4 bg-neural-light rounded-lg">
                <div className="font-medium text-neural-dark">Dataset</div>
                <div className="text-lg">
                  {state.selectedDataset?.name || state.uploadedFile?.name || 'Not selected'}
                </div>
                {state.selectedDataset && (
                  <div className="text-sm text-gray-500 mt-1">
                    {state.selectedDataset.examples.toLocaleString()} examples
                  </div>
                )}
                {state.uploadedFile && (
                  <div className="text-sm text-gray-500 mt-1">
                    {(state.uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                )}
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
                  {state.selectedModel === 'Stable Diffusion' && (
                    <>
                      <div className="text-sm col-span-2">
                        <span className="text-gray-500">Resolution:</span> {state.config.resolution}
                      </div>
                      <div className="text-sm col-span-2">
                        <span className="text-gray-500">Seed:</span> {state.config.seed}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-medium text-neural-dark mb-4">GPU & Computation</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-neural-light rounded-lg">
                <div className="font-medium text-neural-dark">Selected GPU</div>
                <div className="text-lg">{state.selectedGPU?.name || 'Not selected'}</div>
                {state.selectedGPU && (
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{state.selectedGPU.vram} VRAM</span>
                    <span>${state.selectedGPU.cost}/hour</span>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-neural-light rounded-lg">
                <div className="font-medium text-neural-dark">Estimated Training Time</div>
                <div className="text-lg">{state.selectedGPU?.estimatedTime || 'N/A'}</div>
              </div>
              
              <div className="p-4 bg-neural-light rounded-lg">
                <div className="font-medium text-neural-dark">Cost Estimate</div>
                <div className="text-lg">
                  ${state.selectedGPU ? ((parseFloat(state.selectedGPU.estimatedTime) || 1) * state.selectedGPU.cost).toFixed(2) : '0.00'}
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                Training will be performed on decentralized computing resources. Your model will be securely distributed across multiple nodes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-neural-primary mr-2" />
            <h3 className="text-neural-dark font-medium">Security & Privacy</h3>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            <p>
              Your training data and model weights are encrypted during transmission and processing. The network uses secure federated learning techniques to ensure privacy.
            </p>
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
              <div className="mt-2 text-xs text-gray-500">
                <p>
                  {progress < 30
                    ? 'Initializing training on distributed nodes...'
                    : progress < 60
                    ? 'Training in progress. Computing gradients...'
                    : progress < 90
                    ? 'Aggregating model updates across nodes...'
                    : 'Finalizing model and preparing results...'}
                </p>
              </div>
            </div>
          )}
          
          <button
            onClick={handleStartTraining}
            disabled={isLoading || !state.selectedModel || (!state.selectedDataset && !state.uploadedFile) || !state.selectedGPU}
            className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium ${
              isLoading || !state.selectedModel || (!state.selectedDataset && !state.uploadedFile) || !state.selectedGPU
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
                Start Distributed Training
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartTraining;
