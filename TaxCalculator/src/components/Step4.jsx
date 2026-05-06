import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Step4() {
  const { 
    hasSavingsInterest, savingsInterestAmount,
    hasISA, isaContributionAmount,
    hasDividends, dividendAmount,
    partnerStatus, partnerLowIncome,
    childBenefitHighIncome, updateField, nextStep 
  } = useStore();
  
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!hasSavingsInterest || !hasISA || !hasDividends || !partnerStatus || !childBenefitHighIncome) {
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
      <h2 className="text-2xl font-bold text-textPrimary mb-8">Savings & Investments</h2>

      <div className="space-y-6">
        <RadioGroup
          label="Do you have money in savings earning interest?"
          value={hasSavingsInterest}
          options={['Yes', 'No']}
          onChange={(val) => updateField('hasSavingsInterest', val)}
        />

        {hasSavingsInterest === 'Yes' && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Roughly how much interest do you earn per year?
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-textSecondary">£</span>
              </div>
              <input
                type="number"
                min="0"
                value={savingsInterestAmount}
                onChange={(e) => updateField('savingsInterestAmount', e.target.value)}
                className="w-full pl-8 p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        <RadioGroup
          label="Do you have a Cash ISA or Stocks & Shares ISA?"
          value={hasISA}
          options={['Yes — Cash ISA', 'Yes — Stocks & Shares ISA', 'Yes — both', 'No']}
          onChange={(val) => updateField('hasISA', val)}
        />

        {hasISA.startsWith('Yes') && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              How much do you put in each year?
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-textSecondary">£</span>
              </div>
              <input
                type="number"
                min="0"
                value={isaContributionAmount}
                onChange={(e) => updateField('isaContributionAmount', e.target.value)}
                className="w-full pl-8 p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        <RadioGroup
          label="Do you receive dividends from shares outside an ISA?"
          value={hasDividends}
          options={['Yes', 'No']}
          onChange={(val) => updateField('hasDividends', val)}
        />

        {hasDividends === 'Yes' && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Roughly how much per year?
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-textSecondary">£</span>
              </div>
              <input
                type="number"
                min="0"
                value={dividendAmount}
                onChange={(e) => updateField('dividendAmount', e.target.value)}
                className="w-full pl-8 p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        <RadioGroup
          label="Do you have a partner?"
          value={partnerStatus}
          options={['Married/Civil partner', 'Living together', 'Single']}
          onChange={(val) => updateField('partnerStatus', val)}
        />

        {partnerStatus === 'Married/Civil partner' && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <RadioGroup
              label="Do you or your partner earn less than £12,570/year?"
              value={partnerLowIncome}
              options={['Yes', 'No']}
              onChange={(val) => updateField('partnerLowIncome', val)}
            />
          </div>
        )}

        <RadioGroup
          label="Do you receive Child Benefit and earn over £60,000?"
          value={childBenefitHighIncome}
          options={['Yes', 'No', 'Not applicable']}
          onChange={(val) => updateField('childBenefitHighIncome', val)}
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
            <span>What's the High Income Child Benefit Charge?</span>
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <p className="text-textSecondary mt-3 group-open:animate-fadeIn text-sm">
            If you earn over £60,000 and get Child Benefit, you might have to pay some or all of it back. Pension contributions can reduce your income below this threshold.
          </p>
        </details>
      </div>
    </div>
  );
}
