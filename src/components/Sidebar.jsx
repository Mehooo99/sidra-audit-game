import React from 'react';

export default function Sidebar({ currentTab, setCurrentTab }) {
  return (
    <nav className="w-56 bg-[#161b22] border-l border-slate-800 flex flex-col py-3 shrink-0 z-20">
      <button 
        onClick={() => setCurrentTab('audit')}
        className={`px-4 py-2.5 text-right font-semibold text-xs transition flex items-center gap-2 ${currentTab === 'audit' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800/50'}`}
      >
        <span>📝</span> طاولة الأوراق والتدقيق
      </button>
      <button 
        onClick={() => setCurrentTab('ledger')}
        className={`px-4 py-2.5 text-right font-semibold text-xs transition flex items-center gap-2 ${currentTab === 'ledger' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800/50'}`}
      >
        <span>📊</span> دفتر الأستاذ العام (Ledger)
      </button>
      <button 
        onClick={() => setCurrentTab('store')}
        className={`px-4 py-2.5 text-right font-semibold text-xs transition flex items-center gap-2 ${currentTab === 'store' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800/50'}`}
      >
        <span>🛍️</span> متجر ترقيات المكتب
      </button>
      <button 
        onClick={() => setCurrentTab('achievements')}
        className={`px-4 py-2.5 text-right font-semibold text-xs transition flex items-center gap-2 ${currentTab === 'achievements' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800/50'}`}
      >
        <span>🏆</span> الألقاب والإنجازات الخفية
      </button>
    </nav>
  );
}