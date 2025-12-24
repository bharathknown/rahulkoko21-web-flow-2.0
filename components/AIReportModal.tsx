
import React from 'react';

interface AIReportProps {
  report: {
    summary: string;
    nextSteps: string[];
    riskLevel: string;
  } | null;
  onClose: () => void;
  isLoading: boolean;
  outletName: string;
}

const AIReportModal: React.FC<AIReportProps> = ({ report, onClose, isLoading, outletName }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold">AI Strategic Report</h3>
              <p className="text-indigo-100 text-xs">{outletName}</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-8">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-slate-100 rounded-full"></div>
                <div className="w-12 h-12 border-4 border-t-indigo-600 rounded-full animate-spin absolute top-0"></div>
              </div>
              <p className="text-sm font-medium animate-pulse">Consulting Gemini AI...</p>
            </div>
          ) : report ? (
            <div className="space-y-6">
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Analysis Summary</h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    report.riskLevel.toLowerCase().includes('high') ? 'bg-rose-100 text-rose-600' : 
                    report.riskLevel.toLowerCase().includes('med') ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {report.riskLevel} Risk
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm italic border-l-2 border-indigo-100 pl-4 bg-slate-50/50 py-2">
                  "{report.summary}"
                </p>
              </section>

              <section>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Actionable Next Steps</h4>
                <ul className="space-y-3">
                  {report.nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 group">
                      <div className="mt-0.5 w-5 h-5 min-w-[20px] rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="leading-tight">{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <button 
                onClick={onClose}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
              >
                Dismiss Analysis
              </button>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500">
              <i className="fa-solid fa-triangle-exclamation text-rose-400 text-3xl mb-4"></i>
              <p>Failed to generate AI report. Please check your connection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIReportModal;
