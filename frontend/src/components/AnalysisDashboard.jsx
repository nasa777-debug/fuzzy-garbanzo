import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#f97316', '#a855f7', '#06b6d4', '#eab308'];

export default function AnalysisDashboard({ analysis }) {
  if (!analysis || !analysis.categoryBreakdown) return null;

  const data = Object.keys(analysis.categoryBreakdown).map(key => ({
    name: key,
    value: analysis.categoryBreakdown[key]
  })).sort((a,b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <p className="text-red-400 text-lg font-medium bg-red-950/40 p-4 rounded-xl border border-red-900/50">
        {analysis.summary}
      </p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({name, percent}) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : null}
              labelLine={false}
              className="text-xs text-slate-200"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} 
              itemStyle={{ color: '#fff' }}
              formatter={(value) => value.toLocaleString()}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
