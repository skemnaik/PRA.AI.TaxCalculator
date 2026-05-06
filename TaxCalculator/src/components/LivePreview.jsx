import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { estimateGrossFromNet } from '../utils/taxEngine';

export default function LivePreview() {
  const { 
    takeHomePay, location, currentStep,
    hasWorkplacePension, workplacePensionContribution,
    offersSalarySacrifice, usingSalarySacrifice 
  } = useStore();

  const annualNet = takeHomePay ? parseFloat(takeHomePay) * 12 : 0;

  const calculation = useMemo(() => {
    if (annualNet > 0) {
      let pensionOptions = { pensionMethod: 'none', pensionAmount: 0, isPercentage: false };

      if (hasWorkplacePension && hasWorkplacePension.startsWith('Yes') && workplacePensionContribution) {
        pensionOptions.pensionAmount = parseFloat(workplacePensionContribution);
        // Determine method
        if (offersSalarySacrifice === 'Yes' && usingSalarySacrifice === 'Yes') {
          pensionOptions.pensionMethod = 'salarySacrifice';
        } else {
          // Assume Net Pay for auto-enrolment for simplicity in preview, though could be relief at source
          pensionOptions.pensionMethod = 'netPay';
        }
        
        // Simple heuristic for percentage vs absolute (if under 100, likely percentage unless very small)
        if (pensionOptions.pensionAmount <= 100 && !workplacePensionContribution.includes('£')) {
           pensionOptions.isPercentage = true;
        }
      }

      return estimateGrossFromNet(annualNet, location, pensionOptions);
    }
    return null;
  }, [annualNet, location, hasWorkplacePension, workplacePensionContribution, offersSalarySacrifice, usingSalarySacrifice]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (!calculation && currentStep < 2) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-background border-l border-border">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-textPrimary mb-2">Live Tax Preview</h3>
        <p className="text-textSecondary">
          Enter your monthly take-home pay in the next step to see your personalized tax breakdown and estimated gross salary.
        </p>
      </div>
    );
  }

  if (!calculation) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-background border-l border-border p-8 text-center">
         <p className="text-textSecondary">Enter your take-home pay to see the calculation.</p>
      </div>
    );
  }

  const { gross, tax, nic, effectiveTaxRate, annualPension } = calculation;

  return (
    <div className="h-full bg-background border-l border-border p-6 lg:p-8 overflow-y-auto animate-in fade-in duration-500">
      <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-2">Estimated Gross Salary</h3>
      <div className="text-4xl font-bold text-textPrimary mb-2">
        {formatCurrency(gross)} <span className="text-lg text-textSecondary font-medium">/year</span>
      </div>
      <p className="text-sm text-textSecondary mb-8 bg-blue-50 p-3 rounded-lg border border-blue-100">
        Based on your {formatCurrency(annualNet/12)}/month take-home, we estimate your gross salary is approximately {formatCurrency(gross)}/year.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden mb-6">
        <div className="px-4 py-3 bg-gray-50 border-b border-border">
          <h4 className="font-semibold text-textPrimary text-sm">Tax Breakdown</h4>
        </div>
        <div className="divide-y divide-border text-sm">
          <div className="flex justify-between px-4 py-3">
            <span className="text-textSecondary">Gross Salary</span>
            <span className="font-medium">{formatCurrency(gross)}</span>
          </div>
          
          {annualPension > 0 && (
            <div className="flex justify-between px-4 py-3 bg-blue-50/30">
              <span className="text-textSecondary">Pension Contribution</span>
              <span className="font-medium text-success">-{formatCurrency(annualPension)}</span>
            </div>
          )}

          <div className="flex justify-between px-4 py-3">
            <span className="text-textSecondary">Personal Allowance</span>
            <span className="font-medium text-success">-{formatCurrency(tax.personalAllowance)}</span>
          </div>
          <div className="flex justify-between px-4 py-3 bg-gray-50/50">
            <span className="text-textPrimary font-medium">Taxable Income</span>
            <span className="font-medium">{formatCurrency(tax.taxableIncome)}</span>
          </div>
          
          {tax.bands.map((band, idx) => (
            <div key={idx} className="flex justify-between px-4 py-3">
              <span className="text-textSecondary">{band.name}</span>
              <span className="font-medium text-danger">{formatCurrency(band.amount)}</span>
            </div>
          ))}
          
          <div className="flex justify-between px-4 py-3 bg-gray-50/50">
            <span className="text-textPrimary font-medium">Total Income Tax</span>
            <span className="font-bold text-danger">{formatCurrency(tax.totalTax)}</span>
          </div>

          <div className="flex justify-between px-4 py-3">
            <span className="text-textSecondary">National Insurance</span>
            <span className="font-medium text-danger">{formatCurrency(nic.totalNIC)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-border p-4">
          <p className="text-xs text-textSecondary font-medium mb-1">Total Tax + NIC</p>
          <p className="text-xl font-bold text-danger">{formatCurrency(tax.totalTax + nic.totalNIC)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-border p-4">
          <p className="text-xs text-textSecondary font-medium mb-1">Effective Tax Rate</p>
          <p className="text-xl font-bold text-textPrimary">{effectiveTaxRate.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
