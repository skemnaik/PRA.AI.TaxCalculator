import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Step2() {
  const { takeHomePay, payVaries, updateField, nextStep } = useStore();
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!takeHomePay || takeHomePay <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    // For Phase 2, we just go to a "Done for now" state or Step 3 if it existed.
    // We will just call nextStep()
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
      <h2 className="text-2xl font-bold text-textPrimary mb-8">Your Monthly Take-Home Pay</h2>

      <div className="space-y-8">
        {/* Take Home Pay Input */}
        <div>
          <label htmlFor="takeHomePay" className="block text-sm font-semibold text-textPrimary mb-2">
            {payVaries 
              ? "What's your average monthly take-home over the last 3 months?" 
              : "How much lands in your bank account each month after all deductions?"}
          </label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-textSecondary font-medium text-lg">£</span>
            </div>
            <input
              type="number"
              id="takeHomePay"
              min="0"
              value={takeHomePay}
              onChange={(e) => updateField('takeHomePay', e.target.value)}
              className="w-full pl-8 p-4 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary font-semibold"
              placeholder="e.g., 2400"
            />
          </div>
          <p className="text-sm text-textSecondary mt-3">
            This is your net pay — after tax, National Insurance, and pension. Check your payslip or bank statement.
          </p>
        </div>

        {/* Pay Variation Toggle */}
        <div>
          <label className="block text-sm font-semibold text-textPrimary mb-3">
            Is this the same every month or does it vary?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => updateField('payVaries', false)}
              className={`flex-1 p-3 border rounded-xl text-sm font-medium transition-all ${
                !payVaries
                  ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary'
                  : 'border-border text-textSecondary hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Same every month
            </button>
            <button
              onClick={() => updateField('payVaries', true)}
              className={`flex-1 p-3 border rounded-xl text-sm font-medium transition-all ${
                payVaries
                  ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary'
                  : 'border-border text-textSecondary hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Varies
            </button>
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

      {/* FAQ Accordion */}
      <div className="mt-8 pt-6 border-t border-border">
        <details className="group">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-textSecondary hover:text-textPrimary">
            <span>I don't know my gross salary. Is that okay?</span>
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <p className="text-textSecondary mt-3 group-open:animate-fadeIn text-sm">
            Absolutely. Most people know their take-home pay better than their gross salary. We'll work backwards from what you know.
          </p>
        </details>
      </div>
    </div>
  );
}
