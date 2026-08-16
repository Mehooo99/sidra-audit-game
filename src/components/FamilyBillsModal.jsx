import React from 'react';

export default function FamilyBillsModal({ bill, payBill, skipBill }) {
  if (!bill) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1f2937] border-2 border-amber-600 rounded-xl max-w-md w-full p-6 text-slate-100 shadow-2xl">
        <h3 className="text-sm font-bold text-amber-400 mb-2">🏠 مصاريف العائلة والمعيشة لنهاية اليوم</h3>
        <p className="text-xs text-slate-300 mb-4">يا سيدرا، تلتزم عائلتك بدفع الالتزامات التالية لضمان خفض مستوى الضغط النفسي واستمرار العمل:</p>

        <div className="bg-[#111827] p-3.5 rounded-lg border border-slate-700 mb-4 text-xs">
          <div className="font-bold text-slate-200 mb-1">{bill.title}</div>
          <div className="text-slate-400 mb-2">{bill.desc}</div>
          <div className="text-emerald-400 font-mono font-bold">المطلوب: {bill.amount.toLocaleString()} $</div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => payBill(bill.amount)}
            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs transition cursor-pointer"
          >
            دفع الفاتورة 💳
          </button>
          <button 
            onClick={skipBill}
            className="flex-1 py-2 bg-red-800/80 hover:bg-red-700 text-white font-bold rounded text-xs transition cursor-pointer"
          >
            تخطي (يرفع الضغط 🤯)
          </button>
        </div>
      </div>
    </div>
  );
}