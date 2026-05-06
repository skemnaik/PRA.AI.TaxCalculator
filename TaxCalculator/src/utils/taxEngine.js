// UK Tax Rates and Thresholds for 2025-26

export const UK_BANDS = {
  personalAllowance: 12570,
  basicRateLimit: 50270,
  higherRateLimit: 125140,
  taperThreshold: 100000,
};

export const SCOTTISH_BANDS = {
  starterLimit: 15397,
  basicLimit: 27491,
  intermediateLimit: 43662,
  higherLimit: 75000,
  advancedLimit: 125140,
};

export const NIC_BANDS = {
  primaryThreshold: 12570,
  upperEarningsLimit: 50270,
};

export function calculateIncomeTax(gross, location = 'England', marriageAllowanceCredit = 0) {
  let personalAllowance = UK_BANDS.personalAllowance;
  if (gross > UK_BANDS.taperThreshold) {
    const excess = gross - UK_BANDS.taperThreshold;
    const reduction = Math.floor(excess / 2);
    personalAllowance = Math.max(0, UK_BANDS.personalAllowance - reduction);
  }

  const taxableIncome = Math.max(0, gross - personalAllowance);
  let taxBreakdown = {
    personalAllowance,
    taxableIncome,
    totalTax: 0,
    bands: []
  };

  if (location === 'Scotland') {
    const starterMax = 15397 - 12570; 
    const basicMax = 27491 - 12570; 
    const intMax = 43662 - 12570; 
    const higherMax = 75000 - 12570; 
    const advancedMax = 125140 - personalAllowance;

    let remaining = taxableIncome;

    if (remaining > 0) {
      const slice = Math.min(remaining, starterMax);
      taxBreakdown.bands.push({ name: 'Starter Rate (19%)', amount: slice * 0.19 });
      taxBreakdown.totalTax += slice * 0.19;
      remaining -= slice;
    }
    if (remaining > 0) {
      const slice = Math.min(remaining, basicMax - starterMax);
      taxBreakdown.bands.push({ name: 'Basic Rate (20%)', amount: slice * 0.20 });
      taxBreakdown.totalTax += slice * 0.20;
      remaining -= slice;
    }
    if (remaining > 0) {
      const slice = Math.min(remaining, intMax - basicMax);
      taxBreakdown.bands.push({ name: 'Intermediate Rate (21%)', amount: slice * 0.21 });
      taxBreakdown.totalTax += slice * 0.21;
      remaining -= slice;
    }
    if (remaining > 0) {
      const slice = Math.min(remaining, higherMax - intMax);
      taxBreakdown.bands.push({ name: 'Higher Rate (42%)', amount: slice * 0.42 });
      taxBreakdown.totalTax += slice * 0.42;
      remaining -= slice;
    }
    if (remaining > 0) {
      const advancedUpper = Math.max(0, advancedMax - higherMax);
      const slice = Math.min(remaining, advancedUpper);
      taxBreakdown.bands.push({ name: 'Advanced Rate (45%)', amount: slice * 0.45 });
      taxBreakdown.totalTax += slice * 0.45;
      remaining -= slice;
    }
    if (remaining > 0) {
      taxBreakdown.bands.push({ name: 'Top Rate (48%)', amount: remaining * 0.48 });
      taxBreakdown.totalTax += remaining * 0.48;
    }
  } else {
    const basicMax = 37700;
    const higherMax = 125140 - personalAllowance;

    let remaining = taxableIncome;

    if (remaining > 0) {
      const slice = Math.min(remaining, basicMax);
      taxBreakdown.bands.push({ name: 'Basic Rate (20%)', amount: slice * 0.20 });
      taxBreakdown.totalTax += slice * 0.20;
      remaining -= slice;
    }
    if (remaining > 0) {
      const higherUpper = Math.max(0, higherMax - basicMax);
      const slice = Math.min(remaining, higherUpper);
      taxBreakdown.bands.push({ name: 'Higher Rate (40%)', amount: slice * 0.40 });
      taxBreakdown.totalTax += slice * 0.40;
      remaining -= slice;
    }
    if (remaining > 0) {
      taxBreakdown.bands.push({ name: 'Additional Rate (45%)', amount: remaining * 0.45 });
      taxBreakdown.totalTax += remaining * 0.45;
    }
  }

  if (marriageAllowanceCredit > 0) {
    taxBreakdown.totalTax = Math.max(0, taxBreakdown.totalTax - marriageAllowanceCredit);
  }

  return taxBreakdown;
}

export function calculateNIC(gross) {
  let mainRateNIC = 0;
  let upperRateNIC = 0;

  if (gross > NIC_BANDS.primaryThreshold) {
    const mainTaxable = Math.min(gross - NIC_BANDS.primaryThreshold, NIC_BANDS.upperEarningsLimit - NIC_BANDS.primaryThreshold);
    mainRateNIC = mainTaxable * 0.08;
  }

  if (gross > NIC_BANDS.upperEarningsLimit) {
    const upperTaxable = gross - NIC_BANDS.upperEarningsLimit;
    upperRateNIC = upperTaxable * 0.02;
  }

  return {
    mainRateNIC,
    upperRateNIC,
    totalNIC: mainRateNIC + upperRateNIC,
  };
}

export function calculateTakeHome(gross, location = 'England', options = {}) {
  const {
    pensionMethod = 'none', // 'reliefAtSource', 'netPay', 'salarySacrifice'
    pensionAmount = 0,      // monthly amount
    isPercentage = false,
    marriageAllowanceCredit = 0,
    savingsInterest = 0,
    dividends = 0,
    workExpenses = 0,
    studentLoanPlan = 'No',
  } = options;

  let grossForTax = gross - workExpenses;
  let grossForNIC = gross;
  
  let annualPension = isPercentage ? (gross * (pensionAmount / 100)) : (pensionAmount * 12);
  let takeHomeDeduction = 0;

  if (pensionMethod === 'salarySacrifice') {
    grossForTax -= annualPension;
    grossForNIC -= annualPension;
  } else if (pensionMethod === 'netPay') {
    grossForTax -= annualPension;
    takeHomeDeduction = annualPension;
  } else if (pensionMethod === 'reliefAtSource') {
    takeHomeDeduction = annualPension;
  }

  const tax = calculateIncomeTax(grossForTax, location, marriageAllowanceCredit);
  const nic = calculateNIC(grossForNIC);
  
  // Basic savings & dividend tax logic (simplified)
  let savingsTax = 0;
  if (savingsInterest > 1000) {
    // Very simplified logic: basic rate payer gets £1000 allowance, higher £500
    const allowance = tax.totalTax > 7540 ? 500 : 1000;
    savingsTax = Math.max(0, (savingsInterest - allowance) * 0.20); 
  }

  let dividendTax = 0;
  if (dividends > 500) {
    dividendTax = Math.max(0, (dividends - 500) * 0.0875);
  }

  // Student loan
  let studentLoanRepayment = 0;
  if (studentLoanPlan !== 'No') {
    let threshold = 27295; // Plan 2 default
    if (studentLoanPlan.includes('Plan 1')) threshold = 24990;
    if (studentLoanPlan.includes('Plan 4')) threshold = 31395;
    if (studentLoanPlan.includes('Postgraduate')) threshold = 21000;
    
    const rate = studentLoanPlan.includes('Postgraduate') ? 0.06 : 0.09;
    if (gross > threshold) {
      studentLoanRepayment = (gross - threshold) * rate;
    }
  }

  const takeHome = gross - tax.totalTax - nic.totalNIC - takeHomeDeduction - savingsTax - dividendTax - studentLoanRepayment;
  
  return {
    gross,
    grossForTax,
    tax,
    nic,
    takeHome,
    annualPension,
    savingsTax,
    dividendTax,
    studentLoanRepayment,
    effectiveTaxRate: gross > 0 ? ((tax.totalTax + nic.totalNIC) / gross) * 100 : 0
  };
}

export function estimateGrossFromNet(annualNet, location = 'England', options = {}) {
  if (!annualNet || annualNet <= 0) return null;

  let minGross = annualNet;
  let maxGross = annualNet * 4; 
  let estimatedGross = annualNet;
  let currentNet = 0;
  
  for (let i = 0; i < 60; i++) {
    estimatedGross = (minGross + maxGross) / 2;
    const result = calculateTakeHome(estimatedGross, location, options);
    currentNet = result.takeHome;

    if (Math.abs(currentNet - annualNet) < 0.01) {
      break;
    }

    if (currentNet > annualNet) {
      maxGross = estimatedGross;
    } else {
      minGross = estimatedGross;
    }
  }

  return calculateTakeHome(estimatedGross, location, options);
}

export function getOptimizedScenario(currentInputs, currentCalculation) {
  if (!currentCalculation) return null;
  
  const suggestions = [];
  const optimizedOptions = { ...currentInputs };
  let totalSavings = 0;

  // 1. Marriage Allowance
  if (currentInputs.partnerStatus === 'Married/Civil partner' && currentInputs.partnerLowIncome === 'Yes') {
    const mac = 252; // £1,260 * 20%
    optimizedOptions.marriageAllowanceCredit = mac;
    suggestions.push({
      title: 'Claim Marriage Allowance',
      desc: 'Transfer £1,260 of unused Personal Allowance from your partner. Worth £252/year and can be backdated 4 years.',
      savings: mac
    });
    totalSavings += mac;
  }

  // 2. ISA Utilization
  if (currentInputs.hasSavingsInterest === 'Yes' && currentCalculation.savingsTax > 0) {
    suggestions.push({
      title: 'Move savings to a Cash ISA',
      desc: `You are paying £${Math.round(currentCalculation.savingsTax)}/year in tax on your savings interest. Moving this money to a Cash ISA protects it entirely from tax.`,
      savings: currentCalculation.savingsTax
    });
    totalSavings += currentCalculation.savingsTax;
    optimizedOptions.savingsInterest = 0; // Shielded
  }

  // 3. Salary Sacrifice
  if (currentInputs.offersSalarySacrifice === 'Yes' && currentInputs.usingSalarySacrifice !== 'Yes' && currentCalculation.annualPension > 0) {
    const niSaving = currentCalculation.annualPension * 0.08; // Roughly 8% saving
    suggestions.push({
      title: 'Switch to Salary Sacrifice',
      desc: `You are already contributing to a pension. If your employer offers salary sacrifice, switching to it could save you ~£${Math.round(niSaving)}/year in National Insurance.`,
      savings: niSaving
    });
    totalSavings += niSaving;
    optimizedOptions.pensionMethod = 'salarySacrifice';
  }

  // 4. Work Expenses
  const expensesAmount = parseFloat(currentInputs.workExpensesAmount || 0);
  if (currentInputs.workExpenses?.length > 0 && expensesAmount > 0) {
    const expenseRelief = expensesAmount * 0.20; // Assume basic rate relief minimum
    suggestions.push({
      title: 'Claim tax relief on work expenses',
      desc: `You have £${expensesAmount} of work expenses. Claiming this via HMRC can reduce your taxable income, saving you at least £${Math.round(expenseRelief)}/year.`,
      savings: expenseRelief
    });
    totalSavings += expenseRelief;
    optimizedOptions.workExpenses = expensesAmount;
  }

  // Recalculate with optimized options to get exact diff
  const optimizedCalculation = calculateTakeHome(currentCalculation.gross, currentInputs.location, optimizedOptions);
  
  return {
    optimizedCalculation,
    suggestions: suggestions.sort((a, b) => b.savings - a.savings),
    totalSavings: optimizedCalculation.takeHome - currentCalculation.takeHome
  };
}
