import { create } from 'zustand';

const initialState = {
  currentStep: 1,
  
  location: 'England',
  age: '',
  employmentStatus: '',
  
  takeHomePay: '',
  payVaries: false,

  hasWorkplacePension: '',
  workplacePensionContribution: '',
  hasPersonalPension: '',
  personalPensionContribution: '',
  offersSalarySacrifice: '',
  usingSalarySacrifice: '',
  accessedPensionFlexibly: '',

  hasSavingsInterest: '',
  savingsInterestAmount: '',
  hasISA: '',
  isaContributionAmount: '',
  hasDividends: '',
  dividendAmount: '',
  partnerStatus: '',
  partnerLowIncome: '',
  childBenefitHighIncome: '',

  workExpenses: [],
  workExpensesAmount: '',
  makesGiftAidDonations: '',
  giftAidAmount: '',
  studentLoan: '',
  otherDeductions: '',
};

export const useStore = create((set) => ({
  ...initialState,
  
  totalSteps: 5,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  
  updateField: (field, value) => set({ [field]: value }),
  
  resetStore: () => set(initialState),
}));
