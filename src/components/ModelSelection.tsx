
import React from 'react';
import { AIModel } from '@/types';
import { Square, BrainCircuit, Bot, ImageIcon, Mic, Braces } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelSelectionProps {
  onSelect: (model: AIModel) => void;
  selectedModel: AIModel | null;
}

const models: { 
  id: AIModel; 
  name: string; 
  icon: React.ComponentType<any>;
  description: string;
  color: string;
}[] = [
  {
    id: 'Llama2',
    name: 'Llama 2',
    icon: BrainCircuit,
    description: 'Meta\'s open-source large language model',
    color: 'bg-purple-500',
  },
  {
    id: 'BERT',
    name: 'BERT',
    icon: Braces,
    description: 'Bidirectional Encoder Representations from Transformers',
    color: 'bg-blue-500',
  },
  {
    id: 'GPT-2',
    name: 'GPT-2',
    icon: Bot,
    description: 'Generative Pre-trained Transformer 2',
    color: 'bg-green-500',
  },
  {
    id: 'Stable Diffusion',
    name: 'Stable Diffusion',
    icon: ImageIcon,
    description: 'Latent text-to-image diffusion model',
    color: 'bg-indigo-500',
  },
  {
    id: 'Whisper',
    name: 'Whisper',
    icon: Mic,
    description: 'Automatic speech recognition system',
    color: 'bg-red-500',
  },
  {
    id: 'RoBERTa',
    name: 'RoBERTa',
    icon: Square,
    description: 'Robustly optimized BERT approach',
    color: 'bg-amber-500',
  },
];

const ModelSelection: React.FC<ModelSelectionProps> = ({ onSelect, selectedModel }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-neural-dark mb-3">Select a Model to Train</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose an AI model to train with your data. Each model is specialized for different types of tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model.id}
            className={cn(
              "border rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1",
              selectedModel === model.id
                ? "border-neural-primary bg-neural-light shadow-md"
                : "border-gray-200 bg-white"
            )}
            onClick={() => onSelect(model.id)}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={cn("p-3 rounded-lg text-white", model.color)}>
                <model.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{model.name}</h3>
            </div>
            <p className="text-gray-600 text-sm">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelection;
