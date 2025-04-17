
import React, { useState, useEffect } from 'react';
import { Dataset } from '@/types';
import { fetchDatasets } from '@/utils/api';
import { FileUp, Database } from 'lucide-react';

interface DatasetSelectionProps {
  onSelect: (dataset: Dataset) => void;
  onUpload: (file: File) => void;
  selectedDataset: Dataset | null;
  uploadedFile: File | null;
}

const DatasetSelection: React.FC<DatasetSelectionProps> = ({
  onSelect,
  onUpload,
  selectedDataset,
  uploadedFile,
}) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'huggingface' | 'upload'>('huggingface');

  useEffect(() => {
    const loadDatasets = async () => {
      try {
        const data = await fetchDatasets();
        setDatasets(data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDatasets();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-neural-dark mb-3">Select a Dataset</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a dataset from Hugging Face or upload your own dataset for training.
        </p>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium text-sm mr-4 ${
            activeTab === 'huggingface'
              ? 'text-neural-primary border-b-2 border-neural-primary'
              : 'text-gray-500 hover:text-neural-primary'
          }`}
          onClick={() => setActiveTab('huggingface')}
        >
          <Database className="inline-block mr-2 h-4 w-4" /> Hugging Face Datasets
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'upload'
              ? 'text-neural-primary border-b-2 border-neural-primary'
              : 'text-gray-500 hover:text-neural-primary'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          <FileUp className="inline-block mr-2 h-4 w-4" /> Upload Dataset
        </button>
      </div>

      {activeTab === 'huggingface' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neural-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {datasets.map((dataset) => (
                <div
                  key={dataset.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:bg-neural-light ${
                    selectedDataset?.id === dataset.id
                      ? 'border-neural-primary bg-neural-light'
                      : 'border-gray-200'
                  }`}
                  onClick={() => onSelect(dataset)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-neural-dark">{dataset.name}</h3>
                      <p className="text-sm text-gray-500">{dataset.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {dataset.type}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {dataset.size} • {dataset.examples.toLocaleString()} examples
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              uploadedFile ? 'border-neural-primary bg-neural-light' : 'border-gray-300'
            }`}
          >
            {uploadedFile ? (
              <div>
                <div className="mb-4 text-neural-primary">
                  <FileUp className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="font-medium text-neural-dark mb-1">{uploadedFile.name}</h3>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  className="mt-4 text-sm text-white bg-neural-primary hover:bg-neural-secondary rounded-lg px-4 py-2"
                  onClick={() => onUpload(uploadedFile)}
                >
                  Change File
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4 text-gray-400">
                  <FileUp className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="font-medium text-neural-dark mb-2">Upload your dataset</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Drag and drop your CSV, JSON, or folder of images here
                </p>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-neural-primary hover:bg-neural-secondary text-white py-2 px-4 rounded-lg"
                >
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv,.json,.zip"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Supported formats: CSV, JSON, ZIP (for image folders)</p>
            <p>Maximum file size: 10GB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetSelection;
