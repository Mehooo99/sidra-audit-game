import React from 'react';

export default function Achievements({ achievements }) {
  return (
    <div className="w-full max-w-2xl bg-[#161b22] p-6 rounded-xl border border-slate-700 shadow-xl" dir="rtl">
      <h2 className="text-sm font-bold text-slate-200 mb-2">🏆 ألقاب وأوسمة المدققة الاستثنائية: سيدرا</h2>
      <p className="text-xs text-slate-400 mb-4">هذه الأوسمة مخصصة لمن تمتلك أذكى عقل وأجمل قلب في إدارة الحسابات!</p>

      <div className="space-y-3">
        {achievements.map(ach => (
          <div key={ach.id} className={`p-3.5 rounded-lg border flex justify-between items-center transition-all ${ach.unlocked ? 'bg-slate-800/90 border-pink-500/60 shadow-md' : 'bg-[#21262d] border-slate-800 opacity-50'}`}>
            <div>
              <div className="font-bold text-xs text-pink-400">{ach.title}</div>
              <div className="text-[11px] text-slate-300">{ach.desc}</div>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ach.unlocked ? 'bg-pink-900/50 text-pink-200 border border-pink-600' : 'bg-slate-900 text-slate-500'}`}>
              {ach.unlocked ? '🔓 وسام مفتوح ✨' : '🔒 مغلق'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}