
import React, { useState, useEffect } from 'react';
import { GPU } from '@/types';
import { fetchGPUs } from '@/utils/api';
import { Server, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';

interface GPUSelectionProps {
  onSelect: (gpu: GPU) => void;
  selectedGPU: GPU | null;
}

const GPUSelection: React.FC<GPUSelectionProps> = ({ onSelect, selectedGPU }) => {
  const [gpus, setGPUs] = useState<GPU[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGPUs = async () => {
      try {
        const data = await fetchGPUs();
        setGPUs(data);
      } catch (error) {
        console.error('Error fetching GPUs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGPUs();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-neural-dark mb-3">Select a GPU</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a GPU to train your model. More powerful GPUs will train faster but cost more.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neural-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gpus.map((gpu) => (
            <div
              key={gpu.id}
              className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all ${
                selectedGPU?.id === gpu.id
                  ? 'border-neural-primary'
                  : 'border-transparent'
              } ${!gpu.available ? 'opacity-60' : 'cursor-pointer hover:shadow-md'}`}
              onClick={() => gpu.available && onSelect(gpu)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium text-neural-dark">{gpu.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{gpu.vram} VRAM</p>
                </div>
                <div className="flex items-center">
                  {gpu.available ? (
                    <span className="text-green-500 flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Available
                    </span>
                  ) : (
                    <span className="text-neural-red flex items-center text-sm">
                      <XCircle className="h-4 w-4 mr-1" />
                      Unavailable
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{gpu.estimatedTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="text-sm">${gpu.cost.toFixed(2)}/hour</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Estimated Cost:</span>
                  <span className="font-medium text-neural-dark">
                    ${((parseFloat(gpu.estimatedTime) || 1) * gpu.cost).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GPUSelection;
