import React from 'react';

export default function Store({ upgrades, buyUpgrade }) {
  return (
    <div className="w-full max-w-2xl bg-[#161b22] p-6 rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-sm font-bold text-slate-200 mb-2">🛍️ متجر ترقيات المكتب والأدوات</h2>
      <p className="text-xs text-slate-400 mb-4">استثمري أرباحك لتطوير مكتبك وكفاءتك في التدقيق يا سيدرا.</p>

      <div className="space-y-3">
        <div className="bg-[#21262d] p-4 rounded-lg border border-slate-700 flex justify-between items-center">
          <div>
            <div className="font-bold text-xs text-slate-200">🔍 آلة كشف التزوير بالأشعة فوق البنفسجية (UV)</div>
            <div className="text-[11px] text-slate-400">تكشف العلامات السرية على الفواتير المزورة تلقائياً.</div>
          </div>
          <button 
            onClick={() => buyUpgrade('uvLight', 15000)}
            disabled={upgrades.uvLight}
            className={`px-3 py-1.5 rounded text-xs font-bold cursor-pointer ${upgrades.uvLight ? 'bg-emerald-800 text-emerald-200' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {upgrades.uvLight ? 'تم الشراء ✅' : 'شراء (15,000 $)'}
          </button>
        </div>

        <div className="bg-[#21262d] p-4 rounded-lg border border-slate-700 flex justify-between items-center">
          <div>
            <div className="font-bold text-xs text-slate-200">🪑 كرسي مكتبي مريح فاخر</div>
            <div className="text-[11px] text-slate-400">يقلل معدل ارتفاع الضغط النفسي بنسبة 30% مع كل معاملة.</div>
          </div>
          <button 
            onClick={() => buyUpgrade('ergonomicChair', 10000)}
            disabled={upgrades.ergonomicChair}
            className={`px-3 py-1.5 rounded text-xs font-bold cursor-pointer ${upgrades.ergonomicChair ? 'bg-emerald-800 text-emerald-200' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {upgrades.ergonomicChair ? 'تم الشراء ✅' : 'شراء (10,000 $)'}
          </button>
        </div>
      </div>
    </div>
  );
}