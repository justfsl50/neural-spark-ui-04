
// Type definitions for our app

export type AIModel = 'Llama2' | 'BERT' | 'GPT-2' | 'Stable Diffusion' | 'Whisper' | 'RoBERTa';

export type Dataset = {
  id: string;
  name: string;
  type: string;
  description: string;
  size: string;
  examples: number;
};

export type GPU = {
  id: string;
  name: string;
  vram: string;
  cost: number;
  available: boolean;
  estimatedTime: string;
};

export type TrainingConfig = {
  batchSize: number;
  learningRate: number;
  epochs: number;
  validationSplit: number;
  prompt?: string;
  resolution?: string;
  seed?: number;
};

export type TrainingState = {
  selectedModel: AIModel | null;
  selectedDataset: Dataset | null;
  uploadedFile: File | null;
  config: TrainingConfig;
  selectedGPU: GPU | null;
  trainingStatus: 'idle' | 'training' | 'complete' | 'error';
  trainingResults: TrainingResults | null;
};

export type TrainingResults = {
  modelName: string;
  datasetName: string;
  trainingTime: string;
  accuracy: number;
  loss: number;
  epochStats: { epoch: number; loss: number; accuracy: number }[];
  outputSamples?: string[];
  modelUrl?: string;
  rewardEarned?: number;
};
