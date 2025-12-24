
import React, { useState } from 'react';
import { Outlet, Stage } from '../types.ts';
import { STAGES } from '../constants.ts';

interface AnalyticsModalProps {
  outlets: Outlet[];
  onClose: () => void;
  initialSelectedId?: string;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ outlets, onClose, initialSelectedId }) => {
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(initialSelectedId || (outlets[0]?.id || null));

  const selectedOutlet = outlets.find(o => o.id === selectedOutletId);

  const formatDate = (ts: number) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(ts));
  };

  const getStageInfo = (stageId: Stage) => STAGES.find(s => s.id === stageId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Pipeline Analytics</h3>
              <p className="text-slate-400 text-xs font-medium">Tracking outlet journeys & time-to-live</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-72 border-r border-slate-100 flex flex-col bg-slate-50/30">
            <div className="p-4 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Select Outlet</p>
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs"></i>
                <input 
                  type="text" 
                  placeholder="Filter outlets..."
                  className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {outlets.map(o => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOutletId(o.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedOutletId === o.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'hover:bg-white text-slate-600'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{o.name}</p>
                  <p className={`text-[10px] opacity-70 truncate ${selectedOutletId === o.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {o.currentStage}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {selectedOutlet ? (
              <div className="max-w-2xl mx-auto">
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 mb-1">{selectedOutlet.name}</h2>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <i className="fa-regular fa-calendar"></i>
                        Listed: {formatDate(selectedOutlet.createdAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="fa-solid fa-arrow-right-long"></i>
                        Status: {selectedOutlet.currentStage}
                      </span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter ${
                    selectedOutlet.priority === 'high' ? 'bg-rose-50 text-rose-600' : 
                    selectedOutlet.priority === 'medium' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                  }`}>
                    {selectedOutlet.priority} priority
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-[21px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                  <div className="space-y-12 relative">
                    {selectedOutlet.history && selectedOutlet.history.length > 0 ? (
                      selectedOutlet.history.slice().reverse().map((log, index) => {
                        const stageInfo = getStageInfo(log.stage);
                        const isLatest = index === 0;
                        return (
                          <div key={index} className="flex gap-6 group">
                            <div className={`w-11 h-11 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm transition-transform group-hover:scale-110 ${
                              isLatest ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-100 text-slate-400'
                            }`}>
                              <i className={`fa-solid ${stageInfo?.icon || 'fa-circle'} text-sm`}></i>
                            </div>
                            <div className="flex-1 pt-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`text-sm font-bold ${isLatest ? 'text-slate-800' : 'text-slate-500'}`}>
                                  {log.stage}
                                </h4>
                                <span className="text-[10px] font-bold text-slate-300 uppercase">
                                  {formatDate(log.timestamp)}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                {isLatest 
                                  ? 'Currently processing in this stage.' 
                                  : `Transitioned through this stage on ${new Date(log.timestamp).toLocaleDateString()}.`}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                        <i className="fa-solid fa-timeline text-4xl mb-4 opacity-20"></i>
                        <p className="text-sm font-medium">No movement history recorded yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <i className="fa-solid fa-chart-pie text-6xl mb-6 opacity-10"></i>
                <h3 className="text-xl font-bold mb-1">No Outlet Selected</h3>
                <p className="text-sm">Select an outlet from the left to view its journey.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
