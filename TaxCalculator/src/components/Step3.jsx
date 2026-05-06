import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Step3() {
  const { 
    hasWorkplacePension, workplacePensionContribution,
    hasPersonalPension, personalPensionContribution,
    offersSalarySacrifice, usingSalarySacrifice,
    accessedPensionFlexibly, updateField, nextStep 
  } = useStore();
  
  const [error, setError] = useState('');

  const handleContinue = () => {
    // Basic validation
    if (!hasWorkplacePension || !hasPersonalPension || !offersSalarySacrifice || !accessedPensionFlexibly) {
      setError('Please answer all required questions.');
      return;
    }
    setError('');
    nextStep();
  };

  const RadioGroup = ({ label, value, options, onChange, helper }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-textPrimary mb-2">{label}</label>
      {helper && <p className="text-xs text-textSecondary mb-3">{helper}</p>}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 p-3 border rounded-xl text-sm font-medium transition-all ${
              value === opt
                ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary'
                : 'border-border text-textSecondary hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300 pb-10">
      <h2 className="text-2xl font-bold text-textPrimary mb-8">Pension & Salary Sacrifice</h2>

      <div className="space-y-6">
        <RadioGroup
          label="Does your employer deduct pension from your pay?"
          value={hasWorkplacePension}
          options={['Yes — auto-enrolment', 'Yes — I opted in extra', 'No', 'Not sure']}
          onChange={(val) => updateField('hasWorkplacePension', val)}
        />

        {hasWorkplacePension.startsWith('Yes') && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              How much goes into your pension each month?
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-textSecondary">£</span>
              </div>
              <input
                type="number"
                min="0"
                value={workplacePensionContribution}
                onChange={(e) => updateField('workplacePensionContribution', e.target.value)}
                className="w-full pl-8 p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Amount or %"
              />
            </div>
            <p className="text-xs text-textSecondary mt-2">Check your payslip — look for 'Pension' or 'AE'</p>
          </div>
        )}

        <RadioGroup
          label="Do you contribute to a personal pension or SIPP outside work?"
          value={hasPersonalPension}
          options={['Yes', 'No']}
          onChange={(val) => updateField('hasPersonalPension', val)}
        />

        {hasPersonalPension === 'Yes' && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              How much do you put in each month?
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-textSecondary">£</span>
              </div>
              <input
                type="number"
                min="0"
                value={personalPensionContribution}
                onChange={(e) => updateField('personalPensionContribution', e.target.value)}
                className="w-full pl-8 p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        <RadioGroup
          label="Does your employer offer salary sacrifice for pension?"
          value={offersSalarySacrifice}
          options={['Yes', 'No', 'Not sure']}
          onChange={(val) => updateField('offersSalarySacrifice', val)}
        />

        {offersSalarySacrifice === 'Yes' && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <RadioGroup
              label="Are you using it?"
              value={usingSalarySacrifice}
              options={['Yes', 'No']}
              onChange={(val) => updateField('usingSalarySacrifice', val)}
            />
          </div>
        )}

        <RadioGroup
          label="Have you ever taken money out of a pension flexibly?"
          helper="This applies if you've accessed your pension pot after age 55."
          value={accessedPensionFlexibly}
          options={['Yes', 'No']}
          onChange={(val) => updateField('accessedPensionFlexibly', val)}
        />
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
            <span>What's salary sacrifice?</span>
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <p className="text-textSecondary mt-3 group-open:animate-fadeIn text-sm">
            You agree to a slightly lower salary, and your employer puts the difference straight into your pension. You save on National Insurance — it's like free money.
          </p>
        </details>
      </div>
    </div>
  );
}
