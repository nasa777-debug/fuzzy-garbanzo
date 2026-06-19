import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

export default function TopWebsitesList({ topSites }) {
  if (!topSites || topSites.length === 0) return null;

  return (
    <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl border border-slate-700">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-3">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-slate-100">Most Used Websites</h2>
      </div>

      <div className="space-y-4">
        {topSites.map((site, index) => (
          <div key={site.websiteName} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-slate-600 w-6 text-center">{index + 1}</span>
              <div>
                <p className="font-bold text-slate-200 leading-tight">{site.websiteName}</p>
                <p className="text-xs text-slate-400">{site.category}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1">
                {site.dailyVisitors >= 1000000 ? (site.dailyVisitors / 1000000).toFixed(1) + 'M' : site.dailyVisitors} <TrendingUp className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
