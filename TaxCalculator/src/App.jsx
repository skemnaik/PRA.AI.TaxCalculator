import React, { useState } from 'react';
import WizardContainer from './components/WizardContainer';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import LivePreview from './components/LivePreview';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Results from './components/Results';
import Contact from './components/Contact';
import About from './components/About';
import { useStore } from './store/useStore';

function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { currentStep } = useStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      default:
        return null;
    }
  };

  if (isContactOpen) {
    return <Contact onBack={() => setIsContactOpen(false)} />;
  }

  if (isAboutOpen) {
    return <About onBack={() => setIsAboutOpen(false)} />;
  }

  if (isWizardOpen) {
    if (currentStep > 5) {
      return (
        <div className="min-h-screen bg-background font-sans">
          <Results />
        </div>
      );
    }

    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-background relative font-sans pb-40 lg:pb-0">
        <div className="w-full lg:w-[60%]">
          <WizardContainer>{renderStep()}</WizardContainer>
        </div>
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-full lg:w-[40%] bg-white lg:border-l lg:border-border lg:fixed lg:right-0 lg:top-0 lg:h-screen lg:overflow-y-auto z-10">
          <LivePreview />
        </div>

        {/* Mobile Bottom Sheet */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-border shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] z-50 max-h-[50vh] overflow-y-auto rounded-t-2xl">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-1"></div>
          <LivePreview />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex flex-col font-sans">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary tracking-tight mb-6">
            Find out how much tax you could save
          </h1>
          <p className="text-lg sm:text-xl text-textSecondary mb-10 max-w-2xl mx-auto">
            Answer 5 simple questions about your money. We'll show you exactly where you're overpaying tax and how to fix it.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="bg-primary hover:bg-blue-700 text-white text-lg font-semibold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
            >
              Start — Takes 2 minutes
            </button>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-textSecondary mt-4 font-medium">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                No signup required
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"></path></svg>
                100% private — all in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Updated for FY 2025-26
              </span>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-24 w-full max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Features List */}
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold text-textPrimary mb-6">Here's what you'll get:</h2>
              <ul className="space-y-4">
                {[
                  "Exact tax breakdown based on your take-home pay",
                  "Pension optimization tips (salary sacrifice vs net pay)",
                  "ISA recommendations to shield your savings",
                  "Personalized action plan to maximize your income"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </span>
                    <span className="text-textSecondary text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mockup Card */}
            <div className="order-1 md:order-2 bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="absolute -top-5 -right-5 bg-success text-white font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12">
                £1,240 saved!
              </div>
              <h3 className="text-xl font-bold text-textPrimary mb-4">Current vs Optimized</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
                  <div>
                    <p className="text-sm text-textSecondary font-medium">Take-Home Pay</p>
                    <p className="text-lg font-bold text-textPrimary">£3,200 <span className="text-sm font-normal text-textSecondary">/mo</span></p>
                  </div>
                  <svg className="w-5 h-5 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  <div className="text-right">
                    <p className="text-sm text-success font-medium">Optimized</p>
                    <p className="text-lg font-bold text-success">£3,303 <span className="text-sm font-normal opacity-80">/mo</span></p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
                  <div>
                    <p className="text-sm text-textSecondary font-medium">Tax Paid</p>
                    <p className="text-lg font-bold text-textPrimary">£8,450 <span className="text-sm font-normal text-textSecondary">/yr</span></p>
                  </div>
                  <svg className="w-5 h-5 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  <div className="text-right">
                    <p className="text-sm text-success font-medium">Optimized</p>
                    <p className="text-lg font-bold text-success">£7,210 <span className="text-sm font-normal opacity-80">/yr</span></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-textSecondary">
          <p>© {new Date().getFullYear()} UK Tax Optimizer. Not financial advice. For informational purposes only.</p>
          <div className="flex gap-6 flex-wrap justify-center items-center">
            <span>Tax year: 2025-26 (England, Wales, NI)</span>
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              About Me
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              Contact Us
            </button>
            <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline underline-offset-2">
              Official HMRC Rates
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
