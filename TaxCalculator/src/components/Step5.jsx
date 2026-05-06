import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Step5() {
  const { 
    workExpenses, workExpensesAmount,
    makesGiftAidDonations, giftAidAmount,
    studentLoan, otherDeductions,
    updateField, nextStep 
  } = useStore();
  
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!makesGiftAidDonations || !studentLoan) {
      setError('Please answer all required questions.');
      return;
    }
    setError('');
    nextStep();
  };

  const handleExpenseToggle = (expense) => {
    if (workExpenses.includes(expense)) {
      updateField('workExpenses', workExpenses.filter(e => e !== expense));
    } else {
      updateField('workExpenses', [...workExpenses, expense]);
    }
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

  const expenseOptions = [
    'Professional subscriptions',
    'Work from home (required)',
    'Mileage for work travel',
    'Uniform or specialist clothing',
    'Other tools/equipment'
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300 pb-10">
      <h2 className="text-2xl font-bold text-textPrimary mb-8">Deductions & Expenses</h2>

      <div className="space-y-6">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-textPrimary mb-3">
            Do you pay for anything work-related that your employer doesn't cover?
          </label>
          <div className="space-y-3">
            {expenseOptions.map(expense => (
              <label key={expense} className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={workExpenses.includes(expense)}
                  onChange={() => handleExpenseToggle(expense)}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm font-medium text-textPrimary">{expense}</span>
              </label>
            ))}
          </div>
        </div>

        {workExpenses.length > 0 && (
          <div className="mb-6 animate-in slide-in-from-top-2">
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Roughly how much per year in total?
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-textSecondary">£</span>
              </div>
              <input
                type="number"
                min="0"
                value={workExpensesAmount}
                onChange={(e) => updateField('workExpensesAmount', e.target.value)}
                className="w-full pl-8 p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        <RadioGroup
          label="Do you make charitable donations through Gift Aid?"
          value={makesGiftAidDonations}
          options={['Yes', 'No']}
          onChange={(val) => updateField('makesGiftAidDonations', val)}
        />

        {makesGiftAidDonations === 'Yes' && (
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
                value={giftAidAmount}
                onChange={(e) => updateField('giftAidAmount', e.target.value)}
                className="w-full pl-8 p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-textPrimary mb-2">Do you have a student loan?</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {['Plan 1', 'Plan 2', 'Plan 4 (Scotland)', 'Postgraduate', 'No'].map((opt) => (
              <button
                key={opt}
                onClick={() => updateField('studentLoan', opt)}
                className={`p-3 border rounded-xl text-sm font-medium transition-all ${
                  studentLoan === opt
                    ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary'
                    : 'border-border text-textSecondary hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-textPrimary mb-2">
            Any other monthly deductions from your pay?
          </label>
          <textarea
            value={otherDeductions}
            onChange={(e) => updateField('otherDeductions', e.target.value)}
            className="w-full p-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm min-h-[80px]"
            placeholder="e.g., cycle to work scheme, childcare vouchers, private medical insurance..."
          />
        </div>
      </div>

      {error && <p className="text-danger text-sm mt-6 font-medium">{error}</p>}

      <button
        onClick={handleContinue}
        className="mt-8 w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-md transition-colors"
      >
        Calculate My Tax Savings
      </button>

      {/* FAQ Accordion */}
      <div className="mt-8 pt-6 border-t border-border">
        <details className="group">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-textSecondary hover:text-textPrimary">
            <span>Can I claim tax relief on work expenses?</span>
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <p className="text-textSecondary mt-3 group-open:animate-fadeIn text-sm">
            Yes, for things you MUST buy for work and use yourself. Not for commuting or everyday clothes.
          </p>
        </details>
      </div>
    </div>
  );
}
