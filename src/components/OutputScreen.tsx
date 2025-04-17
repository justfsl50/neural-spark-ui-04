
import React from 'react';
import { useTraining } from '@/context/TrainingContext';
import { Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OutputScreen: React.FC = () => {
  const { state } = useTraining();
  const results = state.trainingResults;

  if (!results) return null;

  const handleDownload = () => {
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'training-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-neural-dark mb-3">Training Complete!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your training job has been successfully completed.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2"
          variant="default"
        >
          <Download className="h-4 w-4" />
          Download Results (JSON)
        </Button>
      </div>
    </div>
  );
};

export default OutputScreen;
