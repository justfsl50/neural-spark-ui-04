
import React from 'react';
import { TrainingConfig } from '@/types';
import { Sliders, Hash, Play, Image, Lightbulb } from 'lucide-react';

interface ConfigFormProps {
  config: TrainingConfig;
  onChange: (config: Partial<TrainingConfig>) => void;
  isGenerative: boolean;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange, isGenerative }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    // Convert to number if it's a number input
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    
    onChange({ [name]: parsedValue });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-neural-dark mb-3">Training Configuration</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Configure the hyperparameters for your training job.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-neural-dark flex items-center">
              <Sliders className="mr-2 h-5 w-5 text-neural-primary" />
              General Parameters
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Size
                </label>
                <input
                  type="number"
                  name="batchSize"
                  value={config.batchSize}
                  onChange={handleChange}
                  min="1"
                  max="512"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Number of samples processed before model update
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learning Rate
                </label>
                <input
                  type="number"
                  name="learningRate"
                  value={config.learningRate}
                  onChange={handleChange}
                  min="0.00001"
                  max="1"
                  step="0.0001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Step size for gradient descent (0.001 is a good default)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Epochs
                </label>
                <input
                  type="number"
                  name="epochs"
                  value={config.epochs}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Number of complete passes through the dataset
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Validation Split
                </label>
                <input
                  type="number"
                  name="validationSplit"
                  value={config.validationSplit}
                  onChange={handleChange}
                  min="0.1"
                  max="0.5"
                  step="0.05"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Percentage of data used for validation (0.2 = 20%)
                </p>
              </div>
            </div>
          </div>
          
          {isGenerative && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-neural-dark flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-neural-primary" />
                Generation Parameters
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prompt
                  </label>
                  <input
                    type="text"
                    name="prompt"
                    value={config.prompt || ''}
                    onChange={handleChange}
                    placeholder="A photo of a cat in space"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Example prompt for generation testing
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Output Resolution
                  </label>
                  <select
                    name="resolution"
                    value={config.resolution || '512x512'}
                    onChange={(e) => onChange({ resolution: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                  >
                    <option value="256x256">256x256</option>
                    <option value="512x512">512x512</option>
                    <option value="768x768">768x768</option>
                    <option value="1024x1024">1024x1024</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Size of generated images
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Random Seed
                  </label>
                  <input
                    type="number"
                    name="seed"
                    value={config.seed || 42}
                    onChange={handleChange}
                    min="1"
                    max="99999"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Seed for reproducible outputs
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Advanced Settings</h3>
          <div className="text-xs text-gray-500">
            <p>More advanced options will be available in the future, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Custom optimizer selection</li>
              <li>Gradient accumulation steps</li>
              <li>Mixed precision training</li>
              <li>Custom loss functions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigForm;
