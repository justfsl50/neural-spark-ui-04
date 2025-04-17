
import React from 'react';
import { useTraining } from '@/context/TrainingContext';
import { CheckCircle, Download, AreaChart, RefreshCcw, Share2, Server } from 'lucide-react';

const OutputScreen: React.FC = () => {
  const { state, dispatch } = useTraining();
  const results = state.trainingResults;

  if (!results) return null;

  const handleTrainAgain = () => {
    dispatch({ type: 'RESET' });
  };

  // Mock data for charts
  const epochData = results.epochStats;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-neural-dark mb-3">Training Complete!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your {results.modelName} model has been successfully trained on the {results.datasetName} dataset.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">MODEL</h3>
          <p className="text-xl font-medium">{results.modelName}</p>
          <div className="flex items-center mt-4 text-gray-500 text-sm">
            <Server className="w-4 h-4 mr-1" />
            <span>{results.datasetName}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">PERFORMANCE</h3>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-gray-500 text-xs">Accuracy</p>
              <p className="text-xl font-medium">{(results.accuracy * 100).toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Loss</p>
              <p className="text-xl font-medium">{results.loss.toFixed(4)}</p>
            </div>
          </div>
          <div className="flex items-center mt-4 text-gray-500 text-sm">
            <AreaChart className="w-4 h-4 mr-1" />
            <span>{results.epochStats.length} epochs</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">REWARD EARNED</h3>
          <p className="text-xl font-medium">{results.rewardEarned} ETH</p>
          <div className="flex items-center mt-4 text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>Training time: {results.trainingTime}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
        <h2 className="text-xl font-medium text-neural-dark mb-6">Training Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">LOSS VS EPOCH</h3>
            <div className="bg-neural-light h-64 rounded-lg p-4 flex items-end justify-between">
              {epochData.map((data, index) => (
                <div key={index} className="h-full flex flex-col justify-end items-center">
                  <div
                    className="w-6 bg-neural-primary rounded-t"
                    style={{ height: `${(1 - data.loss / 4) * 100}%` }}
                  ></div>
                  <div className="text-xs mt-1">{data.epoch}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">ACCURACY VS EPOCH</h3>
            <div className="bg-neural-light h-64 rounded-lg p-4 flex items-end justify-between">
              {epochData.map((data, index) => (
                <div key={index} className="h-full flex flex-col justify-end items-center">
                  <div
                    className="w-6 bg-neural-accent rounded-t"
                    style={{ height: `${data.accuracy * 100}%` }}
                  ></div>
                  <div className="text-xs mt-1">{data.epoch}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {state.selectedModel === 'Stable Diffusion' && results.outputSamples && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <h2 className="text-xl font-medium text-neural-dark mb-6">Generated Samples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.outputSamples.map((url, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={`${url}?w=500&h=500&fit=crop`}
                  alt={`Generated sample ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              Generated with prompt: "{state.config.prompt || 'Default prompt'}" at {state.config.resolution || '512x512'} resolution
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleTrainAgain}
          className="flex items-center py-2 px-4 bg-neural-primary text-white rounded-lg hover:bg-neural-secondary transition-colors"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Train Again
        </button>
        
        <a
          href={results.modelUrl}
          download
          className="flex items-center py-2 px-4 bg-white border border-gray-300 text-neural-dark rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Model
        </a>
        
        <button className="flex items-center py-2 px-4 bg-white border border-gray-300 text-neural-dark rounded-lg hover:bg-gray-50 transition-colors">
          <AreaChart className="h-4 w-4 mr-2" />
          View Detailed Logs
        </button>
        
        <button className="flex items-center py-2 px-4 bg-white border border-gray-300 text-neural-dark rounded-lg hover:bg-gray-50 transition-colors">
          <Share2 className="h-4 w-4 mr-2" />
          Share Results
        </button>
      </div>
    </div>
  );
};

// Add missing icon import
const Clock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default OutputScreen;
