import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, XCircle } from 'lucide-react';

export default function SubmitButton() {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const res = await axios.post('/api/submit');
      setResponse(res.data);
      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('idle');
      alert('Failed to submit data');
    }
  };

  return (
    <>
      <button 
        onClick={handleSubmit}
        disabled={status === 'loading' || status === 'success'}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-lg
          ${status === 'success' ? 'bg-emerald-600 text-white cursor-default' : 
            status === 'loading' ? 'bg-slate-600 text-slate-300' : 
            'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/25'}`}
      >
        {status === 'idle' && <><Send className="w-5 h-5" /> Submit to Government</>}
        {status === 'loading' && <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>}
        {status === 'success' && 'Submitted Successfully'}
      </button>

      {status === 'success' && response && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setStatus('idle')}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-black text-emerald-400 mb-2">Submission Verified!</h3>
              <p className="text-slate-300">{response.message}</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 font-mono text-sm inline-block">
                ID: {response.submissionId}
              </div>
              
              <div className="mt-6 border-2 border-slate-700 rounded-xl overflow-hidden shadow-inner">
                {/* Embedded generated proof image */}
                <img 
                  src="/government_submission_proof.png" 
                  alt="Government Data Compliance Proof" 
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
