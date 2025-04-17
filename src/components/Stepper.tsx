
import React from 'react';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between relative">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 h-1 bg-neural-light w-full -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-neural-primary transition-all duration-300 -translate-y-1/2 z-0"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center relative z-10"
            onClick={() => onStepClick && onStepClick(index)}
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-all",
                index <= currentStep 
                  ? "border-neural-primary bg-neural-primary text-white" 
                  : "border-gray-300 bg-white text-gray-400",
                onStepClick && "cursor-pointer hover:shadow-md"
              )}
            >
              {index + 1}
            </div>
            <div 
              className={cn(
                "text-sm font-medium transition-all",
                index <= currentStep ? "text-neural-dark" : "text-gray-400"
              )}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
