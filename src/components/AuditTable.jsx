import React,{ useMemo } from 'react';

export default function AuditTable({
  scenario,
  positions,
  zIndices,
  handleMouseDown,
    handleDragOver,
  handleDropOnMainFolder,
  handleMouseMove,
  handleMouseUp,
  draggingId,
  isSigned,
  appliedStamp,
  feedback,
  nextScenario,
  upgrades,
  highlightMode,
  setHighlightMode,
  checkDiscrepancy,
  handleMainFolderPointerUp
}) {
    const randomRef = useMemo(() => {
  return Math.floor(Math.random() * 9000 + 1000);
}, [scenario.id]); // يتغير فقط عند الانتقال لسيناريو جديد
  return (
    <div className="w-full max-w-5xl flex flex-col items-center relative min-h-[600px]">
      
      {/* قاعدة التعاميم والأنظمة المتغيرة يومياً */}
      <div className="w-full bg-amber-950/40 border border-amber-600/50 p-3 rounded-lg mb-3 text-amber-200 text-xs flex justify-between items-center shadow">
        <span>📜 <strong>تعميم اليوم الصارم:</strong> {scenario.dailyDirective}</span>
      </div>

      {/* الشخصية والعميل المتكرر */}
      <div className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-lg mb-3 flex items-center gap-3 text-xs shadow">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">👤</div>
        <div>
          <span className="font-bold text-blue-400">{scenario.character.name}: </span>
          <span className="text-slate-300 italic">"{scenario.character.dialogue}"</span>
        </div>
      </div>

      {/* شريط الأدوات المساعد */}
      <div className="w-full text-xs text-slate-300 mb-4 bg-[#161b22] p-2.5 rounded-lg border border-slate-800 flex justify-between items-center shadow-md">
        <span>💡 <strong>إرشاد سيدرا:</strong> اسحبي القلم أو الختم المرئي من القائمة الجانبية وأسقطيه فوق المعاملة.</span>
        <button 
          onClick={() => setHighlightMode(!highlightMode)}
          className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${highlightMode ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          {highlightMode ? '🔍 وضع الكشف نشط (اضغطي على الخطأ بالأوراق)' : '🔍 أداة المطابقة الدقيقة (Red Cross)'}
        </button>
      </div>

      <div className="relative w-full flex flex-col items-center gap-8 pb-20">
        {/* ملف القرار الرئيسي */}
        {(() => {
          const folderPos = positions['mainFolder'];
          const folderZ = zIndices['mainFolder'] || 10;

          return (
            <div
              onPointerDown={(e) => handleMouseDown(e, 'mainFolder')}
              onPointerMove={handleMouseMove}
              onPointerUp={(e) => {
                handleMouseUp(e);
                handleMainFolderPointerUp();
              }}
              onDragOver={handleDragOver}
              onDrop={handleDropOnMainFolder}
              style={{ 
                position: folderPos ? 'absolute' : 'relative',
                left: folderPos?.x,
                top: folderPos?.y,
                zIndex: folderZ,
                touchAction: 'none',
                transform: draggingId === 'mainFolder' ? 'rotate(-1deg) scale(1.02)' : 'rotate(0deg)',
                transition: draggingId === 'mainFolder' ? 'none' : 'transform 0.2s ease-out'
              }}
              className="w-[380px] sm:w-[420px] bg-[#fdfbf7] text-slate-900 p-6 sm:p-8 rounded-sm shadow-[0_10px_25px_rgba(0,0,0,0.2)] border-2 border-slate-400 font-serif relative overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* علامة مائية خلفية للورقة الرسمية */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none text-7xl font-black">
                🏛️
              </div>

              {/* ترويسة الخطاب الرسمي */}
              <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
                <div className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase mb-1">الجمهورية الإدارية الكبرى - ديوان المحاسبة</div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{scenario.title}</h2>
                <div className="text-[11px] font-mono text-slate-600 mt-1">المرجع: (CR-2026-{randomRef})</div>
              </div>

              {/* نص الخطاب الرسمي */}
              <div className="text-xs sm:text-sm font-serif text-slate-800 space-y-3 leading-relaxed mb-6 bg-slate-50/70 p-4 rounded border border-slate-200">
                <p className="font-bold text-slate-900">إلى الزميلة المدققة / سيدرا المحترمة،</p>
                <p className="text-slate-700 text-justify">
                  {scenario.description}
                </p>
                <div className="pt-2 border-t border-dashed border-slate-300 text-[11px] text-slate-600 flex justify-between items-center font-sans">
                  <span>📌 الحالة المالية المطلوبة:</span>
                  <span className="font-bold text-slate-900">تدقيق واعتماد الميزانية</span>
                </div>
              </div>

              {/* قسم التوقيع والختم الرسمي الواقعي */}
              <div className="flex justify-between items-end pt-4 border-t-2 border-slate-300 font-sans relative">
                {/* مكان التوقيع */}
                <div className="text-xs text-slate-700">
                  <div className="font-bold mb-1.5 text-slate-800">توقيع المدقق المعتمد:</div>
                  <div className={`h-10 w-32 sm:w-36 border-2 border-dashed rounded flex items-center justify-center transition ${isSigned ? 'border-pink-600 bg-pink-50/90 shadow-sm' : 'border-slate-400 bg-white'}`}>
                    {isSigned ? (
                      <span className="font-['Caveat',cursive] text-pink-900 text-base font-bold rotate-[-2deg]">
                        سيدرا المحاسبة ✔
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-semibold">🖊️ اسحبي القلم هنا</span>
                    )}
                  </div>
                </div>

                {/* مكان الختم المادي البارز */}
                <div className="relative h-18 w-26 border-2 border-dashed border-slate-400 rounded-md flex items-center justify-center bg-white shadow-inner">
                  <span className="absolute text-[9px] text-slate-400 top-1 font-bold">الختم الرسمي</span>
                  {appliedStamp === 'approve' && (
                    <div className="absolute inset-2 border-4 border-emerald-600 text-emerald-700 font-black flex flex-col items-center justify-center rounded rotate-[-8deg] tracking-widest shadow-lg bg-emerald-50/90 text-xs font-sans">
                      <span>معتمد رسمي</span>
                      <span className="text-[8px] font-mono">2026/08</span>
                    </div>
                  )}
                  {appliedStamp === 'reject' && (
                    <div className="absolute inset-2 border-4 border-red-600 text-red-700 font-black flex flex-col items-center justify-center rounded rotate-[8deg] tracking-widest shadow-lg bg-red-50/90 text-xs font-sans">
                      <span>مرفوض نهائياً</span>
                      <span className="text-[8px] font-mono">ديوان المحاسبة</span>
                    </div>
                  )}
                  {!appliedStamp && (
                    <span className="text-[10px] text-slate-400">اسحبي الختم</span>
                  )}
                </div>
              </div>

             {feedback && (
                <div className="mt-5 p-3.5 bg-slate-900 text-slate-100 rounded-md text-xs leading-relaxed font-sans shadow-inner relative z-30">
                  <div className="font-bold text-amber-400 mb-1">نتيجة تدقيق سيدرا:</div>
                  {feedback}
                  <button
                    onPointerUp={(e) => {
                      e.stopPropagation();
                      nextScenario();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextScenario();
                    }}
                    className="mt-3 w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded text-xs transition cursor-pointer shadow flex items-center justify-center gap-2"
                  >
                    <span>الانتقال للقضية التالية</span>
                    <span>➡️</span>
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* الأوراق المستاندة */}
        <div className="flex flex-wrap justify-center gap-6 w-full mt-4">
          {scenario.documents.map((doc) => {
            const pos = positions[doc.id];
            const currentZ = zIndices[doc.id] || 1;

            return (
              <div
                key={doc.id}
                onPointerDown={(e) => handleMouseDown(e, doc.id)}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
                onClick={(e) => {
                  e.stopPropagation();
                  if (highlightMode) {
                    checkDiscrepancy(doc.id);
                  }
                }}
                style={{ 
                  position: pos ? 'absolute' : 'relative',
                  left: pos?.x,
                  top: pos?.y,
                  zIndex: currentZ,
                  touchAction: 'none',
                  transform: draggingId === doc.id ? 'rotate(-2deg) scale(1.02)' : 'rotate(0deg)',
                  transition: draggingId === doc.id ? 'none' : 'transform 0.2s ease-out'
                }}
                className={`w-[320px] bg-[#fefdfa] text-slate-900 p-5 rounded-sm shadow-[0_8px_20px_rgba(0,0,0,0.18)] border-2 border-slate-300 
                  ${highlightMode ? 'border-red-500 ring-4 ring-red-300/60 bg-red-50/40 cursor-pointer' : 'cursor-grab active:cursor-grabbing hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)]'} 
                  font-serif relative overflow-hidden`}
              >
                <div className="border-b-2 border-slate-800 pb-2 mb-3 flex justify-between items-center bg-slate-100/95 -mx-5 -mt-5 p-3.5 rounded-t-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏛️</span>
                    <div>
                      <div className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">الجمهورية الإدارية</div>
                      <span className="font-black text-slate-900 text-xs">{doc.title}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                    {highlightMode ? '🎯 اضغطي لاكتشاف الخطأ' : '📄 مستند رسمي'}
                  </span>
                </div>

                {doc.type === 'invoice' && (
                  <div className="text-xs font-sans space-y-2 text-slate-800 pointer-events-none">
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                      <span className="text-slate-500">جهة التوريد:</span>
                      <span className="font-bold">{doc.data.vendor}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                      <span className="text-slate-500">القيمة المستحقة:</span>
                      <span className="text-emerald-700 font-extrabold text-sm">{doc.data.amount}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                      <span className="text-slate-500">تاريخ الإصدار:</span>
                      <span className="font-mono">{doc.data.date}</span>
                    </div>
                    <div className="bg-amber-50/80 p-2.5 rounded border border-amber-200/60 text-[11px] text-slate-700 mt-2">
                      <strong className="text-amber-900 block mb-0.5">ملاحظات الفاتورة:</strong>
                      {doc.data.notes}
                    </div>
                    {upgrades.uvLight && (
                      <div className="mt-2 p-2 bg-purple-50 border border-purple-300 text-purple-900 rounded text-[10px] flex items-center gap-1.5">
                        <span>🔍</span> فحص الأشعة فوق البنفسجية: الختم الضريبي يبدو أصلياً وموثقاً.
                      </div>
                    )}
                  </div>
                )}

                {doc.type === 'bank' && (
                  <div className="text-xs font-sans space-y-2 text-slate-800 pointer-events-none">
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                      <span className="text-slate-500">اسم الحساب:</span>
                      <span className="font-bold">{doc.data.accountName}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                      <span className="text-slate-500">رقم الحساب:</span>
                      <span className="font-mono text-xs">{doc.data.accountNo}</span>
                    </div>
                    <div className="bg-blue-50/80 p-2.5 rounded border border-blue-200/60 text-[11px] text-slate-700 mt-2">
                      <strong className="text-blue-900 block mb-0.5">آخر حركة مسجلة:</strong>
                      {doc.data.recentTx}
                    </div>
                  </div>
                )}

                {doc.type === 'idCard' && (
                  <div className="text-xs font-sans space-y-2 text-slate-800 pointer-events-none">
                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-lg">👤</div>
                      <div>
                        <div className="font-bold text-slate-900">{doc.data.name}</div>
                        <div className="font-mono text-[10px] text-slate-500">الرقم: {doc.data.idNumber}</div>
                      </div>
                    </div>
                    <div className="bg-emerald-50/80 p-2 rounded border border-emerald-200 text-[11px] text-emerald-900 font-bold text-center">
                      {doc.data.status}
                    </div>
                  </div>
                )}
                {/* ختم خلفي خفيف يضفي طابعاً حكومياً أصلياً */}
                <div className="absolute bottom-2 left-2 opacity-10 pointer-events-none font-black text-xl rotate-[-15deg] text-slate-900 border-2 border-slate-900 px-1.5 py-0.5 rounded">
                  مستند معتمد
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}