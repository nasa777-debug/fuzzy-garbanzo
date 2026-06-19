import React from 'react';
import { XCircle, Activity, ShieldAlert, Globe } from 'lucide-react';

export default function WebsiteDetailsModal({ site, onClose }) {
  if (!site) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <XCircle className="w-8 h-8" />
        </button>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8 text-blue-400 border border-blue-400/50 rounded-full p-1 bg-blue-900/20" />
              <h3 className="text-3xl font-black text-white">{site.websiteName}</h3>
            </div>
            <p className="text-slate-400 font-medium text-lg uppercase tracking-wide">{site.category}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
              <div className="bg-emerald-900/30 p-3 rounded-full">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Live Daily Traffic</p>
                <p className="text-2xl font-mono font-bold text-emerald-400">{site.dailyVisitors.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
              <div className={`p-3 rounded-full ${
                site.riskLevel === 'Critical' ? 'bg-red-900/30 text-red-500' :
                site.riskLevel === 'High' ? 'bg-orange-900/30 text-orange-500' :
                'bg-blue-900/30 text-blue-500'
              }`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Assessed Risk Factor</p>
                <p className={`text-xl font-black uppercase tracking-widest ${
                  site.riskLevel === 'Critical' ? 'text-red-500' :
                  site.riskLevel === 'High' ? 'text-orange-500' :
                  'text-blue-500'
                }`}>{site.riskLevel}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl space-y-3">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-slate-700 pb-2">Verified Architectural Analysis</h4>
            <p className="text-lg text-slate-300 leading-relaxed font-serif tracking-wide">{site.detailedAnalysis}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
