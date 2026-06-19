import React, { useState } from 'react';
import WebsiteDetailsModal from './WebsiteDetailsModal';

export default function DataTable({ data }) {
  const [selectedSite, setSelectedSite] = useState(null);

  if (!data || data.length === 0) return <div className="animate-pulse flex space-x-4 p-4"><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-slate-700 rounded w-3/4"></div></div></div>;

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <table className="w-full text-left border-collapse relative">
        <thead className="sticky top-0 bg-slate-900 border-b border-slate-700 z-10 shadow-md">
          <tr className="text-slate-400 text-xs uppercase tracking-wider">
            <th className="p-4 font-semibold">Website</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold text-right">Daily Active Visitors</th>
            <th className="p-4 font-semibold text-center">Risk Factor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50 text-sm">
          {data.map((item) => (
            <tr 
              key={item.websiteName} 
              onClick={() => setSelectedSite(item)}
              className="hover:bg-slate-800/80 transition-colors cursor-pointer group"
              title="Click to view full analysis"
            >
              <td className="p-4 font-black text-slate-200 group-hover:text-blue-400 transition-colors">{item.websiteName}</td>
              <td className="p-4 text-slate-400 font-medium">{item.category}</td>
              <td className="p-4 text-emerald-400 font-mono text-right font-medium">{item.dailyVisitors.toLocaleString()}</td>
              <td className="p-4 text-center">
                <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider shadow-sm ${
                  item.riskLevel === 'Critical' ? 'bg-red-900/50 text-red-400 border border-red-800/50' :
                  item.riskLevel === 'High' ? 'bg-orange-900/50 text-orange-400 border border-orange-800/50' :
                  item.riskLevel === 'Low/Positive' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800/50' :
                  'bg-yellow-900/50 text-yellow-400 border border-yellow-800/50'
                }`}>
                  {item.riskLevel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {selectedSite && (
        <WebsiteDetailsModal 
          site={selectedSite} 
          onClose={() => setSelectedSite(null)} 
        />
      )}
    </div>
  );
}
