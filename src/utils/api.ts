
import { Dataset, GPU, TrainingResults, TrainingState } from '@/types';

// Mock data for datasets
const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Common Crawl',
    type: 'Text',
    description: 'Petabytes of data extracted from web crawl data.',
    size: '1.2TB',
    examples: 4500000,
  },
  {
    id: '2',
    name: 'MNIST',
    type: 'Image',
    description: 'Handwritten digits database with 70,000 examples.',
    size: '11MB',
    examples: 70000,
  },
  {
    id: '3',
    name: 'LibriSpeech',
    type: 'Audio',
    description: 'Corpus of read English speech from audiobooks.',
    size: '60GB',
    examples: 100000,
  },
  {
    id: '4',
    name: 'LAION-400M',
    type: 'Image',
    description: 'Dataset of 400 million image-text pairs.',
    size: '240GB',
    examples: 400000000,
  },
  {
    id: '5',
    name: 'Wikipedia',
    type: 'Text',
    description: 'Cleaned articles from all of Wikipedia.',
    size: '20GB',
    examples: 6000000,
  },
];

// Mock data for GPUs
const mockGPUs: GPU[] = [
  {
    id: '1',
    name: 'RTX 4090',
    vram: '24GB',
    cost: 0.35,
    available: true,
    estimatedTime: '2h 15m',
  },
  {
    id: '2',
    name: 'RTX 3080',
    vram: '10GB',
    cost: 0.25,
    available: true,
    estimatedTime: '3h 30m',
  },
  {
    id: '3',
    name: 'A100',
    vram: '80GB',
    cost: 1.2,
    available: false,
    estimatedTime: '45m',
  },
  {
    id: '4',
    name: 'V100',
    vram: '32GB',
    cost: 0.9,
    available: true,
    estimatedTime: '1h 30m',
  },
  {
    id: '5',
    name: 'H100',
    vram: '80GB',
    cost: 2.2,
    available: false,
    estimatedTime: '25m',
  },
];

// Simulated API functions
export const fetchDatasets = async (): Promise<Dataset[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatasets);
    }, 500);
  });
};

export const fetchGPUs = async (): Promise<GPU[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGPUs);
    }, 700);
  });
};

export const startTraining = async (trainingData: Partial<TrainingState>): Promise<TrainingResults> => {
  // Simulate network delay and training process
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random epoch stats
      const epochs = trainingData.config?.epochs || 10;
      const epochStats = Array.from({ length: epochs }, (_, i) => ({
        epoch: i + 1,
        loss: 4 - 3 * (1 - Math.exp(-(i + 1) / (epochs / 3))),
        accuracy: 0.5 + 0.4 * (1 - Math.exp(-(i + 1) / (epochs / 2))),
      }));

      const results: TrainingResults = {
        modelName: trainingData.selectedModel || 'Unknown',
        datasetName: trainingData.selectedDataset?.name || 'Custom Dataset',
        trainingTime: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
        accuracy: epochStats[epochs - 1].accuracy,
        loss: epochStats[epochs - 1].loss,
        epochStats,
        outputSamples: trainingData.selectedModel === 'Stable Diffusion' 
          ? [
              'https://images.unsplash.com/photo-1679678691006-0ad24fecb769',
              'https://images.unsplash.com/photo-1680169291844-4c6a394a0304',
            ] 
          : undefined,
        modelUrl: 'https://example.com/download/model.bin',
        rewardEarned: parseFloat((Math.random() * 0.01).toFixed(6)),
      };

      resolve(results);
    }, 3000);
  });
};
