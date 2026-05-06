import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Step1() {
  const { location, age, employmentStatus, updateField, nextStep } = useStore();
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!location) {
      setError('Please select where you live.');
      return;
    }
    if (!age || age < 16 || age > 100) {
      setError('Please enter a valid age between 16 and 100.');
      return;
    }
    if (!employmentStatus) {
      setError('Please select your employment status.');
      return;
    }
    setError('');
    nextStep();
  };

  const locationOptions = ['England', 'Wales', 'Scotland', 'Northern Ireland'];
  const employmentOptions = ['Full-time employed', 'Part-time employed', 'Multiple jobs'];

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
      <h2 className="text-2xl font-bold text-textPrimary mb-8">Let's start with the basics</h2>

      <div className="space-y-8">
        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-textPrimary mb-3">
            Where in the UK do you live?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {locationOptions.map((loc) => (
              <button
                key={loc}
                onClick={() => updateField('location', loc)}
                className={`p-3 border rounded-xl text-sm font-medium transition-all ${
                  location === loc 
                    ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary' 
                    : 'border-border text-textSecondary hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
          <p className="text-xs text-textSecondary mt-2">Scotland has different income tax rates.</p>
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-semibold text-textPrimary mb-2">
            How old are you?
          </label>
          <input
            type="number"
            id="age"
            min="16"
            max="100"
            value={age}
            onChange={(e) => updateField('age', e.target.value)}
            className="w-full max-w-[120px] p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary"
            placeholder="e.g. 30"
          />
        </div>

        {/* Employment Status */}
        <div>
          <label className="block text-sm font-semibold text-textPrimary mb-3">
            What's your employment status?
          </label>
          <div className="flex flex-col gap-3">
            {employmentOptions.map((status) => (
              <button
                key={status}
                onClick={() => updateField('employmentStatus', status)}
                className={`p-4 border rounded-xl text-left font-medium transition-all ${
                  employmentStatus === status
                    ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary'
                    : 'border-border text-textSecondary hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-danger text-sm mt-6 font-medium">{error}</p>}

      <button
        onClick={handleContinue}
        className="mt-8 w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-md transition-colors"
      >
        Continue
      </button>

      {/* FAQ Accordion Placeholder */}
      <div className="mt-8 pt-6 border-t border-border">
        <details className="group">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-textSecondary hover:text-textPrimary">
            <span>Why do you need this information?</span>
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <p className="text-textSecondary mt-3 group-open:animate-fadeIn text-sm">
            Tax rates vary between Scotland and the rest of the UK. Your age determines State Pension relevance, and your employment status helps us understand your National Insurance obligations.
          </p>
        </details>
      </div>
    </div>
  );
}
