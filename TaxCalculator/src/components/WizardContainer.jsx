import React from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft } from 'lucide-react';

export default function WizardContainer({ children }) {
  const { currentStep, totalSteps, prevStep } = useStore();

  return (
    <div className="min-h-full bg-background flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header & Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {currentStep > 1 ? (
              <button 
                onClick={prevStep}
                className="flex items-center text-textSecondary hover:text-primary transition-colors text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </button>
            ) : (
              <div /> // Spacer
            )}
            <span className="text-sm font-medium text-textSecondary">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {children}
        </div>

      </div>
    </div>
  );
}
