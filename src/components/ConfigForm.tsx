
import React from 'react';
import { TrainingConfig } from '@/types';
import { Sliders, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfigFormProps {
  config: TrainingConfig;
  onChange: (config: Partial<TrainingConfig>) => void;
  isGenerative: boolean;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange, isGenerative }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    onChange({ [name]: parsedValue });
  };

  const resetParameters = () => {
    onChange({
      batchSize: 0,
      learningRate: 0,
      epochs: 0,
      validationSplit: 0
    });
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-neural-dark flex items-center">
            <Sliders className="mr-2 h-5 w-5 text-neural-primary" />
            Parameters
          </h2>
          <Button
            variant="outline"
            onClick={resetParameters}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch Size
            </label>
            <input
              type="number"
              name="batchSize"
              value={config.batchSize}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
            />
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
              min="0"
              step="0.0001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
            />
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
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
            />
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
              min="0"
              max="1"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
            />
          </div>
          
          {isGenerative && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prompt
                </label>
                <input
                  type="text"
                  name="prompt"
                  value={config.prompt || ''}
                  onChange={handleChange}
                  placeholder="Enter your prompt"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neural-primary focus:border-neural-primary"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigForm;
