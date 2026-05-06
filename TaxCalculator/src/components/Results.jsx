import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { estimateGrossFromNet, getOptimizedScenario } from '../utils/taxEngine';

export default function Results() {
  const store = useStore();
  const { takeHomePay, location } = store;

  const annualNet = takeHomePay ? parseFloat(takeHomePay) * 12 : 0;

  const { calculation, optimization } = useMemo(() => {
    if (annualNet <= 0) return { calculation: null, optimization: null };

    let pensionOptions = { pensionMethod: 'none', pensionAmount: 0, isPercentage: false };
    if (store.hasWorkplacePension?.startsWith('Yes') && store.workplacePensionContribution) {
      pensionOptions.pensionAmount = parseFloat(store.workplacePensionContribution);
      if (store.offersSalarySacrifice === 'Yes' && store.usingSalarySacrifice === 'Yes') {
        pensionOptions.pensionMethod = 'salarySacrifice';
      } else {
        pensionOptions.pensionMethod = 'netPay';
      }
      if (pensionOptions.pensionAmount <= 100 && !store.workplacePensionContribution.includes('£')) {
        pensionOptions.isPercentage = true;
      }
    }

    const currentOptions = {
      ...pensionOptions,
      savingsInterest: parseFloat(store.savingsInterestAmount || 0),
      dividends: parseFloat(store.dividendAmount || 0),
      workExpenses: 0, 
      studentLoanPlan: store.studentLoan,
      marriageAllowanceCredit: 0
    };

    const calc = estimateGrossFromNet(annualNet, location, currentOptions);

    const storeInputs = {
      location,
      partnerStatus: store.partnerStatus,
      partnerLowIncome: store.partnerLowIncome,
      hasSavingsInterest: store.hasSavingsInterest,
      offersSalarySacrifice: store.offersSalarySacrifice,
      usingSalarySacrifice: store.usingSalarySacrifice,
      workExpenses: store.workExpenses,
      workExpensesAmount: store.workExpensesAmount,
    };

    const opt = getOptimizedScenario(storeInputs, calc);

    return { calculation: calc, optimization: opt };
  }, [annualNet, location, store]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount || 0);
  };

  if (!calculation) {
    return <div className="p-8 text-center text-textSecondary">No data available to calculate results.</div>;
  }

  const savings = optimization?.totalSavings > 0 ? optimization.totalSavings : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* Hero Result */}
      <div className="text-center mb-16">
        <div className="inline-block bg-success/10 text-success font-bold px-6 py-2 rounded-full mb-6 border border-success/20 shadow-sm">
          Optimization Complete
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-textPrimary tracking-tight mb-4">
          You could save <span className="text-success">{formatCurrency(savings)}</span> per year
        </h1>
        <p className="text-xl text-textSecondary max-w-2xl mx-auto">
          {savings > 0 
            ? "Here's exactly how, and the steps you need to take next." 
            : "You're already highly optimized! Check your exact breakdown below."}
        </p>
      </div>

      {/* Regime Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Current Path */}
        <div className="bg-white rounded-3xl shadow-sm border border-border p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-300"></div>
          <h2 className="text-xl font-bold text-textPrimary mb-6">Your Current Path</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-textSecondary font-medium mb-1">Take-Home Pay</p>
              <p className="text-3xl font-bold text-textPrimary">{formatCurrency(calculation.takeHome / 12)} <span className="text-base font-normal text-textSecondary">/mo</span></p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-sm text-textSecondary mb-1">Tax Paid</p>
                <p className="text-lg font-bold text-danger">{formatCurrency(calculation.tax.totalTax + calculation.nic.totalNIC)} <span className="text-xs font-normal">/yr</span></p>
              </div>
              <div>
                <p className="text-sm text-textSecondary mb-1">Effective Rate</p>
                <p className="text-lg font-bold text-textPrimary">{calculation.effectiveTaxRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Path */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-success p-8 relative overflow-hidden transform md:-translate-y-2">
          <div className="absolute top-0 left-0 w-full h-2 bg-success"></div>
          <div className="absolute top-4 right-4">
            <span className="bg-success text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">Recommended</span>
          </div>
          <h2 className="text-xl font-bold text-textPrimary mb-6">Optimized Path</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-success font-medium mb-1">Take-Home Pay</p>
              <p className="text-3xl font-bold text-textPrimary">{formatCurrency(optimization.optimizedCalculation.takeHome / 12)} <span className="text-base font-normal text-textSecondary">/mo</span></p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-sm text-textSecondary mb-1">Tax Paid</p>
                <p className="text-lg font-bold text-danger">
                  {formatCurrency(optimization.optimizedCalculation.tax.totalTax + optimization.optimizedCalculation.nic.totalNIC)} <span className="text-xs font-normal">/yr</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-textSecondary mb-1">Effective Rate</p>
                <p className="text-lg font-bold text-textPrimary">{optimization.optimizedCalculation.effectiveTaxRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Suggestions */}
      {optimization.suggestions.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">Your Action Plan</h2>
          <div className="space-y-4">
            {optimization.suggestions.map((sugg, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-border p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-textPrimary mb-2">{sugg.title}</h3>
                  <p className="text-textSecondary text-sm">{sugg.desc}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm text-textSecondary font-medium">Potential Saving</p>
                  <p className="text-xl font-bold text-success">+{formatCurrency(sugg.savings)}/yr</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Breakdown */}
      <div>
        <h2 className="text-2xl font-bold text-textPrimary mb-6">Tax Slab Breakdown</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-textPrimary">Band</th>
                <th className="px-6 py-4 font-semibold text-textPrimary">Tax Rate</th>
                <th className="px-6 py-4 font-semibold text-textPrimary text-right">Tax Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-6 py-4 text-textSecondary">Personal Allowance</td>
                <td className="px-6 py-4 text-textSecondary">0%</td>
                <td className="px-6 py-4 text-textPrimary font-medium text-right">£0</td>
              </tr>
              {calculation.tax.bands.map((band, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 text-textSecondary">{band.name.split(' (')[0]}</td>
                  <td className="px-6 py-4 text-textSecondary">{band.name.match(/\((.*?)\)/)[1]}</td>
                  <td className="px-6 py-4 text-danger font-medium text-right">{formatCurrency(band.amount)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50/50">
                <td colSpan="2" className="px-6 py-4 font-bold text-textPrimary">Total Income Tax</td>
                <td className="px-6 py-4 font-bold text-danger text-right">{formatCurrency(calculation.tax.totalTax)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border text-center text-sm text-textSecondary print:hidden">
        <p>These figures are estimates based on your inputs. Actual tax depends on your full circumstances.</p>
        <p className="mt-2 mb-8">This is not financial advice. Consider speaking to a financial adviser for complex situations.</p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-border hover:bg-gray-50 text-textPrimary font-semibold py-3 px-6 rounded-xl shadow-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Save as PDF / Print
          </button>

          <button 
            onClick={() => store.resetStore()}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-textPrimary font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>

    </div>
  );
}
