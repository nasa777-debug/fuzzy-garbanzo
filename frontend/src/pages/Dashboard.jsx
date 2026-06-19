import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import AnalysisDashboard from '../components/AnalysisDashboard';
import SubmitButton from '../components/SubmitButton';
import TopWebsitesList from '../components/TopWebsitesList';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [topSites, setTopSites] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Agent';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/');
  };

  const fetchData = async () => {
    try {
      const dataRes = await axios.get('/api/data');
      setData(dataRes.data);
      
      const topSitesRes = await axios.get('/api/top-sites?limit=5');
      setTopSites(topSitesRes.data);
      
      const analysisRes = await axios.get('/api/analysis');
      setAnalysis(analysisRes.data);
    } catch (e) {
      console.error('Failed to fetch data', e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      navigate('/');
      return;
    }
    fetchData();
    const interval = setInterval(fetchData, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 md:px-8 bg-slate-900 text-white font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-700 pb-4 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              India Web Usage Engine
            </h1>
            <p className="mt-2 text-slate-400 font-medium">Click any row in the Matrix to view deep analytics.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400 px-3 py-1 bg-slate-800 rounded-full border border-slate-700 border-dashed">
              Session: {username}
            </span>
            <SubmitButton />
            <button 
              onClick={handleLogout}
              className="p-3 bg-red-900/40 text-red-400 hover:bg-red-900/60 transition-colors rounded-full"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Massive Data Table */}
          <div className="xl:col-span-2 space-y-8">
            <section className="p-6 rounded-2xl bg-slate-800 shadow-xl border border-slate-700 h-[800px] flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-slate-100 shrink-0 tracking-wide">Live Traffic Matrix</h2>
              <div className="flex-1 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/50 relative">
                <DataTable data={data} />
              </div>
            </section>
          </div>
          
          {/* Sidebar for Analysis and Top Sites */}
          <div className="xl:col-span-1 space-y-8">
            <section className="p-6 rounded-2xl bg-slate-800 shadow-xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-4 text-slate-100 tracking-wide">Macro Analysis</h2>
              {analysis && <AnalysisDashboard analysis={analysis} />}
            </section>

            <TopWebsitesList topSites={topSites} />
          </div>
        </main>

      </div>
    </div>
  );
}
