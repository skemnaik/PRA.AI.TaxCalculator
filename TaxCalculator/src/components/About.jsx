import React from 'react';

export default function About({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex flex-col font-sans pb-20">
      <div className="max-w-4xl mx-auto px-4 py-16 w-full flex-grow animate-in fade-in slide-in-from-bottom-8 duration-500">

        <button
          onClick={onBack}
          className="mb-8 flex items-center text-textSecondary hover:text-primary transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="bg-white w-full rounded-3xl shadow-xl border border-border p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

          <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-8 text-center">About Me: Suresh C. Kemnaik</h1>

          <div className="space-y-10 text-textSecondary">

            {/* Summary */}
            <section>
              <h2 className="text-xl font-bold text-textPrimary mb-3 flex items-center gap-2">
                <span className="text-2xl">📋</span> Summary
              </h2>
              <p className="leading-relaxed bg-gray-50 p-6 rounded-2xl border border-border">
                I am a Seasoned Technical AI Business Analyst with 10+ years of experience. Specialising in AI, Data analytics, turning complicated data insight into successful business strategies with proficiency in AI Tools, C#, Python, SQL and Power BI.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Skills */}
              <section>
                <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧰</span> Skills
                </h2>
                <ul className="space-y-2 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 h-full">
				  <li className="flex items-center gap-2"><span className="text-primary">•</span> AI Tools | RAG | MCP-Context</li>
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> C# | Python | VBA</li>
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> SQL | Power BI | DAX | Excel</li>
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> Story Writing | Gap Analysis | BPML</li>
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> TFS | GitHub | Jira | Confluence</li>
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> Agile Scrum | Kanban | Waterfall</li>
                </ul>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏆</span> Education
                </h2>
                <ul className="space-y-4 bg-purple-50/50 p-6 rounded-2xl border border-purple-100 h-full">
                  <li>
                    <p className="font-bold text-textPrimary">Post-Grad Finance Management</p>
                    <p className="text-sm">Institute of Welingkar (India) • 2011</p>
                  </li>
                  <li>
                    <p className="font-bold text-textPrimary">Graduation Computer Science Eng.</p>
                    <p className="text-sm">The Institute of Engineers (India) • 2008</p>
                  </li>
                </ul>
              </section>
            </div>

            {/* Training & Courses */}
            <section>
              <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
                <span className="text-2xl">📖</span> Training & Courses
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                  <p className="font-bold text-textPrimary">Gen AI Data Science</p>
                  <p className="text-sm mt-1">UK • Apr 2026</p>
                </div>
                <div className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                  <p className="font-bold text-textPrimary">Data Analytics</p>
                  <p className="text-sm mt-1">UK • Oct 2025</p>
                </div>
                <div className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                  <p className="font-bold text-textPrimary">Scrum Master</p>
                  <p className="text-sm mt-1">Scrum Alliance • Licence-000353674 • UK • Dec 2014</p>
                </div>
                <div className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                  <p className="font-bold text-textPrimary">Agile Foundation</p>
                  <p className="text-sm mt-1">DSDM • Licence-3391 • UK • Oct 2013</p>
                </div>
              </div>
            </section>

            {/* Strengths */}
            <section>
              <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
                <span className="text-2xl">💪</span> Strengths
              </h2>
              <div className="space-y-4">
                <div className="p-5 bg-green-50/50 border border-green-100 rounded-2xl">
                  <h3 className="font-bold text-textPrimary flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Problem Solving
                  </h3>
                  <p className="text-sm">Presented initiative solutions during time-critical projects, boosting team efficiency.</p>
                </div>

                <div className="p-5 bg-green-50/50 border border-green-100 rounded-2xl">
                  <h3 className="font-bold text-textPrimary flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Clear Communication
                  </h3>
                  <p className="text-sm">Delivered a keynote analysis presentation to an audience of 20+ stakeholders.</p>
                </div>

                <div className="p-5 bg-green-50/50 border border-green-100 rounded-2xl">
                  <h3 className="font-bold text-textPrimary flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Technical Proficiency
                  </h3>
                  <p className="text-sm">Developed complex data models, complex rating algorithms. Enhancing data integration, recording and reporting accuracy. Developing AI understanding and practice.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
