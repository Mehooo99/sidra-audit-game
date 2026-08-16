import React from 'react';

export default function ToolsSidebar({ signDocument, applyStampDecision, isSigned, handleDragStartTool }) {
  
  const handleStampClick = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("تم النقر يدويخ على الختم:", type);
    applyStampDecision(type);
  };

  return (
    <aside className="w-52 bg-[#161b22] border-r border-slate-800 p-3.5 flex flex-col gap-2.5 shrink-0 z-20">
      <h3 className="text-xs font-bold text-slate-200 border-b border-slate-700 pb-1.5">🧰 أدوات سيدرا</h3>
      <p className="text-[10px] text-slate-400 leading-relaxed">
        نسقي الأوراق، وقّعي، واستخدمي الأختام لإدارة الحسابات بدقة.
      </p>

      <div
        draggable
        onDragStart={(e) => handleDragStartTool(e, 'pen')}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          signDocument();
        }}
        className="p-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded shadow flex items-center justify-between cursor-grab active:cursor-grabbing transition text-xs"
      >
        <span>🖊️ قلم التوقيع</span>
        <span className="text-[9px] bg-slate-900 px-1 py-0.5 rounded">اسحب</span>
      </div>

   <div
        draggable
        onDragStart={(e) => handleDragStartTool(e, 'approve')}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // نتحقق من عدم تكرار النقر السريع
          if (e.detail > 1) return; 
          applyStampDecision('approve');
        }}
        className={`p-2 rounded shadow flex items-center justify-between transition text-xs font-semibold ${isSigned ? 'bg-emerald-700 hover:bg-emerald-600 text-white cursor-grab active:cursor-grabbing' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'}`}
      >
        <span>🟢 ختم الاعتماد</span>
        <span className="text-[9px] bg-emerald-900 px-1 py-0.5 rounded">اسحب</span>
      </div>

      <div
        draggable
        onDragStart={(e) => handleDragStartTool(e, 'reject')}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // نتحقق من عدم تكرار النقر السريع
          if (e.detail > 1) return;
          applyStampDecision('reject');
        }}
        className={`p-2 rounded shadow flex items-center justify-between transition text-xs font-semibold ${isSigned ? 'bg-red-700 hover:bg-red-600 text-white cursor-grab active:cursor-grabbing' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'}`}
      >
        <span>🔴 ختم الرفض</span>
        <span className="text-[9px] bg-red-900 px-1 py-0.5 rounded">اسحب</span>
      </div>

      <div className="text-[9px] text-pink-400 mt-2 text-center font-bold">
        💖 إهداء إلى خطيبتي الغالية سيدرا
      </div>
    </aside>
  );
}