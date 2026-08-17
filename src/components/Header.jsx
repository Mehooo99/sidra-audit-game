import React from 'react';

export default function Header({ gameState, onToggleSidebar }) {
  return (
    <header className="bg-[#111827] text-white px-4 sm:px-6 py-2.5 flex justify-between items-center shadow-md border-b border-slate-700 shrink-0 z-20">
      <div className="font-bold text-xs flex items-center gap-2.5">
        {/* زر القائمة الجانبية ظاهر دائماً (على الويب والموبايل) */}
        <button 
          onClick={onToggleSidebar}
          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition"
          aria-label="تبديل القائمة"
        >
          ☰
        </button>
        <span>👑 مكتب التدقيق (المديرة: <strong className="text-pink-400">سيدرا</strong>)</span>
        <span className="hidden sm:inline-block bg-slate-800 text-blue-300 px-2 py-0.5 rounded text-[11px]">
          اليوم {gameState.currentDay} | الساعة {gameState.workHour}:00 ص
        </span>
      </div>
      <div className="flex gap-2 sm:gap-3 text-xs">
        <span className="bg-slate-800 px-2 py-1 rounded shadow-inner">💰 <strong className="text-emerald-400">{gameState.cash.toLocaleString()} $</strong></span>
        <span className="bg-slate-800 px-2 py-1 rounded shadow-inner">🤯 <strong className="text-red-400">{gameState.stress}%</strong></span>
              <span className="bg-slate-800 px-2.5 py-1 rounded shadow-inner">⭐ السمعة: <strong className="text-amber-400">{gameState.reputation}</strong></span>
      </div>
    </header>
  );
}