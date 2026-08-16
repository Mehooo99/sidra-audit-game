import React from 'react';

export default function Header({ gameState }) {
  return (
    <header className="bg-[#111827] text-white px-6 py-2.5 flex justify-between items-center shadow-md border-b border-slate-700 shrink-0">
      <div className="font-bold text-xs flex items-center gap-2">
        <span>👑 مكتب التدقيق المالي (المديرة: <strong className="text-pink-400">سيدرا</strong>)</span>
        <span className="bg-slate-800 text-blue-300 px-2 py-0.5 rounded text-[11px]">
          اليوم {gameState.currentDay} | الساعة {gameState.workHour}:00 ص
        </span>
      </div>
      <div className="flex gap-3 text-xs">
        <span className="bg-slate-800 px-2.5 py-1 rounded shadow-inner">💰 الخزينة: <strong className="text-emerald-400">{gameState.cash.toLocaleString()} $</strong></span>
        <span className="bg-slate-800 px-2.5 py-1 rounded shadow-inner">🤯 الضغط: <strong className="text-red-400">{gameState.stress}%</strong></span>
        <span className="bg-slate-800 px-2.5 py-1 rounded shadow-inner">⭐ السمعة: <strong className="text-amber-400">{gameState.reputation}</strong></span>
      </div>
    </header>
  );
}