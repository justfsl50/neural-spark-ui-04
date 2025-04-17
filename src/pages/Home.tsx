
import React, { useState } from 'react';
import { TrainingProvider, useTraining } from '@/context/TrainingContext';
import Stepper from '@/components/Stepper';
import ModelSelection from '@/components/ModelSelection';
import DatasetSelection from '@/components/DatasetSelection';
import ConfigForm from '@/components/ConfigForm';
import GPUSelection from '@/components/GPUSelection';
import StartTraining from '@/components/StartTraining';
import OutputScreen from '@/components/OutputScreen';
import { AIModel, Dataset, GPU } from '@/types';

const steps = [
  'Select Model',
  'Choose Dataset',
  'Configure Training',
  'Select GPU',
  'Start Training',
  'View Results',
];

const HomeContent: React.FC = () => {
  const { state, dispatch } = useTraining();
  const [currentStep, setCurrentStep] = useState(0);

  const isGenerativeModel = state.selectedModel === 'Stable Diffusion' || state.selectedModel === 'GPT-2';

  const handleSelectModel = (model: AIModel) => {
    dispatch({ type: 'SET_MODEL', payload: model });
    goToNextStep();
  };

  const handleSelectDataset = (dataset: Dataset) => {
    dispatch({ type: 'SET_DATASET', payload: dataset });
    goToNextStep();
  };

  const handleUploadFile = (file: File) => {
    dispatch({ type: 'SET_UPLOADED_FILE', payload: file });
    goToNextStep();
  };

  const handleUpdateConfig = (config: Partial<typeof state.config>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  };

  const handleSelectGPU = (gpu: GPU) => {
    dispatch({ type: 'SET_GPU', payload: gpu });
    goToNextStep();
  };

  const handleTrainingComplete = () => {
    goToNextStep();
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on steps that we've already visited or the next step
    if (stepIndex <= currentStep + 1 && stepIndex <= getMaxAllowedStep()) {
      setCurrentStep(stepIndex);
    }
  };

  const getMaxAllowedStep = () => {
    if (!state.selectedModel) return 0;
    if (!state.selectedDataset && !state.uploadedFile) return 1;
    if (!state.selectedGPU) return 3;
    if (state.trainingStatus !== 'complete') return 4;
    return 5;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ModelSelection onSelect={handleSelectModel} selectedModel={state.selectedModel} />;
      case 1:
        return (
          <DatasetSelection
            onSelect={handleSelectDataset}
            onUpload={handleUploadFile}
            selectedDataset={state.selectedDataset}
            uploadedFile={state.uploadedFile}
          />
        );
      case 2:
        return (
          <ConfigForm
            config={state.config}
            onChange={handleUpdateConfig}
            isGenerative={isGenerativeModel}
          />
        );
      case 3:
        return <GPUSelection onSelect={handleSelectGPU} selectedGPU={state.selectedGPU} />;
      case 4:
        return <StartTraining onTrainingComplete={handleTrainingComplete} />;
      case 5:
        return <OutputScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-center text-neural-dark mb-2">
            Neural<span className="text-neural-primary">Spark</span>
          </h1>
          <p className="text-center text-gray-500">Decentralized AI Model Training Platform</p>
        </div>

        <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

        <div className="mt-8">{renderStepContent()}</div>

        {currentStep > 0 && currentStep < 5 && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={goToPreviousStep}
              className="py-2 px-4 bg-white border border-gray-300 rounded-lg text-neural-dark hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={goToNextStep}
              className={`py-2 px-4 rounded-lg text-white ${
                currentStep === 4
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-neural-primary hover:bg-neural-secondary'
              }`}
              disabled={currentStep === 4}
            >
              {currentStep === 4 ? 'Training in Progress' : 'Next Step'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <TrainingProvider>
      <HomeContent />
    </TrainingProvider>
  );
};

export default Home;
