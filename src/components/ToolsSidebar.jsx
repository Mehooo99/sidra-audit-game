import React from 'react';

export default function ToolsSidebar({ handleToolPointerDown }) {
  return (
    <aside className="w-52 bg-[#161b22] border-r border-slate-800 p-3.5 flex flex-col gap-3 shrink-0 z-20 select-none">
      <h3 className="text-xs font-bold text-slate-200 border-b border-slate-700 pb-1.5">🧰 أدوات سيدرا المادية</h3>
      <p className="text-[10px] text-slate-400 leading-relaxed">
        اسحبي القلم أو الختم وشاهديه يتحرك معكِ للإفلات فوق الملف.
      </p>

      {/* أداة قلم التوقيع المرئية */}
      <div
        onPointerDown={(e) => handleToolPointerDown(e, 'pen')}
        className="p-3 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 text-white font-semibold rounded-lg shadow-lg flex items-center gap-3 cursor-grab active:cursor-grabbing transition text-xs"
      >
        <div className="w-8 h-8 rounded bg-slate-900 border border-slate-500 flex items-center justify-center text-base shadow">
          🖊️
        </div>
        <div>
          <div className="font-bold">قلم التوقيع</div>
          <span className="text-[9px] text-slate-400 font-mono">اسحب للاستخدام</span>
        </div>
      </div>

      {/* أداة ختم الاعتماد المرئية */}
      <div
        onPointerDown={(e) => handleToolPointerDown(e, 'approve')}
        className="p-3 bg-emerald-950/80 hover:bg-emerald-900 border-2 border-emerald-600 text-emerald-200 font-semibold rounded-lg shadow-lg flex items-center gap-3 cursor-grab active:cursor-grabbing transition text-xs"
      >
        <div className="w-8 h-8 rounded bg-emerald-900 border border-emerald-400 flex items-center justify-center text-sm shadow text-white font-black">
          ✅
        </div>
        <div>
          <div className="font-bold">ختم الاعتماد</div>
          <span className="text-[9px] text-emerald-400 font-mono">اسحب للاستخدام</span>
        </div>
      </div>

      {/* أداة ختم الرفض المرئية */}
      <div
        onPointerDown={(e) => handleToolPointerDown(e, 'reject')}
        className="p-3 bg-red-950/80 hover:bg-red-900 border-2 border-red-600 text-red-200 font-semibold rounded-lg shadow-lg flex items-center gap-3 cursor-grab active:cursor-grabbing transition text-xs"
      >
        <div className="w-8 h-8 rounded bg-red-900 border border-red-400 flex items-center justify-center text-sm shadow text-white font-black">
          ❌
        </div>
        <div>
          <div className="font-bold">ختم الرفض</div>
          <span className="text-[9px] text-red-400 font-mono">اسحب للاستخدام</span>
        </div>
      </div>

      <div className="text-[9px] text-pink-400 mt-auto text-center font-bold pt-2 border-t border-slate-800">
        💖 إهداء إلى خطيبتي الغالية سيدرا
      </div>
    </aside>
  );
}