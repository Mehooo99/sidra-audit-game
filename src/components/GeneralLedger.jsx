import React from 'react';

export default function GeneralLedger({ ledgerEntries }) {
  return (
    <div className="w-full max-w-4xl bg-[#161b22] p-6 rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-sm font-bold text-slate-200 mb-2">📊 دفتر الأستاذ العام (General Ledger)</h2>
      <p className="text-xs text-slate-400 mb-4">سجل الحركات المحاسبية المعتمدة بواسطة سيدرا.</p>
      
      <table className="w-full text-right text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-700 text-slate-400">
            <th className="p-2.5">التاريخ</th>
            <th className="p-2.5">نوع الحركة</th>
            <th className="p-2.5">الوصف التفصيلي</th>
            <th className="p-2.5">المبلغ ($)</th>
          </tr>
        </thead>
        <tbody>
          {ledgerEntries.map(entry => (
            <tr key={entry.id} className="border-b border-slate-800 hover:bg-slate-800/50">
              <td className="p-2.5 font-mono text-slate-400">{entry.date}</td>
              <td className="p-2.5 text-blue-300 font-semibold">{entry.type}</td>
              <td className="p-2.5 text-slate-300">{entry.desc}</td>
              <td className={`p-2.5 font-mono font-bold ${entry.flow === 'in' ? 'text-emerald-400' : 'text-red-400'}`}>
                {entry.flow === 'in' ? `+${entry.amount.toLocaleString()}` : `-${entry.amount.toLocaleString()}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}