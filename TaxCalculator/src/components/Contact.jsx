import React from 'react';

export default function Contact({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex flex-col font-sans">
      <div className="max-w-3xl mx-auto px-4 py-16 w-full flex-grow flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        <button 
          onClick={onBack}
          className="self-start mb-8 flex items-center text-textSecondary hover:text-primary transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="bg-white w-full rounded-3xl shadow-xl border border-border p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-2">Get in Touch</h1>
          <p className="text-lg text-textSecondary mb-10">Have questions about the Tax Optimizer? I'd love to hear from you.</p>

          <div className="space-y-6 max-w-sm mx-auto text-left">
            
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-border">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <p className="text-sm text-textSecondary font-medium">Name</p>
                <p className="font-bold text-textPrimary text-lg">Suresh C. Kemnaik</p>
              </div>
            </div>

            <a href="mailto:skemnaik@googlemail.com" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-border group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                <span className="text-xl">✉️</span>
              </div>
              <div>
                <p className="text-sm text-textSecondary font-medium">Email</p>
                <p className="font-bold text-textPrimary text-lg group-hover:text-primary transition-colors">skemnaik@googlemail.com</p>
              </div>
            </a>

            <a href="tel:+447841292995" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-border group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <p className="text-sm text-textSecondary font-medium">Mobile</p>
                <p className="font-bold text-textPrimary text-lg group-hover:text-primary transition-colors">+44 7841 292 995</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/suresh-kemnaik/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-border group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                <span className="text-xl">🔗</span>
              </div>
              <div>
                <p className="text-sm text-textSecondary font-medium">LinkedIn</p>
                <p className="font-bold text-textPrimary text-lg group-hover:text-primary transition-colors truncate">linkedin.com/in/suresh-kemnaik</p>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}
