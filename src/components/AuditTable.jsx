import React from 'react';

export default function AuditTable({
  scenario,
  positions,
  zIndices,
  handleMouseDown,
  handleDragOver,
  handleDropOnMainFolder,
  signDocument,
  isSigned,
  appliedStamp,
  feedback,
  nextScenario,
  upgrades,
  highlightMode,
  setHighlightMode,
  checkDiscrepancy
}) {
    
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
        <span>💡 <strong>إرشاد سيدرا:</strong> قارني الأوراق، أو فعّلي أداة المطابقة الدقيقة لاكتشاف التزوير.</span>
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
              onMouseDown={(e) => handleMouseDown(e, 'mainFolder')}
              onDragOver={handleDragOver}
              onDrop={handleDropOnMainFolder}
              style={{ 
                position: folderPos ? 'absolute' : 'relative',
                left: folderPos?.x,
                top: folderPos?.y,
                zIndex: folderZ 
              }}
              className="w-[450px] bg-[#f8f5ee] text-slate-900 p-4 rounded-lg shadow-2xl border-4 border-slate-700 font-serif cursor-grab active:cursor-grabbing"
            >
              <div className="border-b-2 border-slate-800 pb-2 mb-2 flex justify-between items-center bg-slate-200 -mx-4 -mt-4 p-2.5 rounded-t">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-600">ملف الاعتماد المالي</h4>
                  <h3 className="text-xs font-black text-slate-900">{scenario.title}</h3>
                </div>
                <span className="text-[10px] font-mono bg-slate-300 text-slate-700 px-2 py-0.5 rounded">اسحب الملف</span>
              </div>

              <p className="text-[11px] font-sans text-slate-700 mb-3 bg-slate-100 p-2 rounded border border-slate-300 mt-2">
                {scenario.description}
              </p>

              <div className="flex justify-between items-end pt-2 border-t border-dashed border-slate-400 font-sans">
                <div className="text-[11px] text-slate-600">
                  <div>1. توقيع سيدرا:</div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); signDocument(); }}
                    className={`mt-1 h-7 w-28 border border-dashed rounded flex items-center justify-center cursor-pointer transition ${isSigned ? 'border-pink-600 bg-pink-50' : 'border-slate-400 hover:border-slate-600'}`}
                  >
                    {isSigned ? (
                      <span className="font-['Caveat',cursive] text-pink-900 text-xs font-bold rotate-[-2deg]">
                        سيدرا المحاسبة ✔
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[9px]">🖊️ وقّعي هنا</span>
                    )}
                  </div>
                </div>

                <div className="relative h-14 w-18 border-2 border-dashed border-slate-400 rounded flex items-center justify-center bg-white">
                  <span className="absolute text-[8px] text-slate-400 top-0.5">2. الختم</span>
                  {appliedStamp === 'approve' && (
                    <div className="absolute border-2 border-emerald-600 text-emerald-600 font-black p-1 rounded rotate-[-8deg] tracking-widest text-center shadow bg-emerald-50 text-[9px] font-sans">
                      معتمد ✅
                    </div>
                  )}
                  {appliedStamp === 'reject' && (
                    <div className="absolute border-2 border-red-600 text-red-600 font-black p-1 rounded rotate-[8deg] tracking-widest text-center shadow bg-red-50 text-[9px] font-sans">
                      مرفوض ❌
                    </div>
                  )}
                </div>
              </div>

              {feedback && (
                <div className="mt-3 p-2.5 bg-slate-900 text-slate-100 rounded text-xs leading-relaxed font-sans shadow-inner">
                  <div className="font-bold text-amber-400 mb-1">نتيجة تدقيق سيدرا:</div>
                  {feedback}
                  <button
                    onClick={nextScenario}
                    className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-xs transition cursor-pointer"
                  >
                    الانتقال للقضية التالية ➡️
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* الأوراق المستاندة مع فصل حركة السحب عن النقر للتناقض */}
        <div className="flex flex-wrap justify-center gap-6 w-full mt-4">
          {scenario.documents.map((doc) => {
            const pos = positions[doc.id];
            const currentZ = zIndices[doc.id] || 1;

            return (
              <div
                key={doc.id}
                onMouseDown={(e) => handleMouseDown(e, doc.id)}
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
                  zIndex: currentZ 
                }}
                className={`w-[280px] bg-[#fdfbf7] text-slate-900 p-3.5 rounded shadow-2xl border transition-all ${
                  highlightMode 
                    ? 'border-red-600 ring-4 ring-red-400/50 cursor-pointer bg-red-50/30' 
                    : 'border-slate-400 cursor-grab active:cursor-grabbing'
                } font-serif`}
              >
                <div className="border-b border-slate-300 pb-1.5 mb-2 flex justify-between items-center font-sans text-xs bg-slate-100 -mx-3.5 -mt-3.5 p-2 rounded-t">
                  <span className="font-bold text-slate-800">{doc.title}</span>
                  <span className="text-[10px] text-slate-500">
                    {highlightMode ? '🎯 اضغطي هنا لكشف التناقض' : '↔ اسحب للتحريك'}
                  </span>
                </div>

                {doc.type === 'invoice' && (
                  <div className="text-xs font-sans space-y-1 text-slate-700 pointer-events-none">
                    <div><strong>المورد:</strong> {doc.data.vendor}</div>
                    <div><strong>المبلغ:</strong> <span className="text-emerald-700 font-bold">{doc.data.amount}</span></div>
                    <div><strong>التاريخ:</strong> {doc.data.date}</div>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-dashed border-slate-300">{doc.data.notes}</div>
                    {upgrades.uvLight && (
                      <div className="mt-2 p-1.5 bg-purple-100 border border-purple-400 text-purple-900 rounded text-[10px]">
                        🔍 فحص UV: الختم الضريبي يبدو أصلياً.
                      </div>
                    )}
                  </div>
                )}

                {doc.type === 'bank' && (
                  <div className="text-xs font-sans space-y-1 text-slate-700 pointer-events-none">
                    <div><strong>الحساب:</strong> {doc.data.accountName}</div>
                    <div><strong>رقم:</strong> <span className="font-mono text-[11px]">{doc.data.accountNo}</span></div>
                    <div className="text-[11px] text-slate-700 bg-amber-50 p-1.5 rounded border border-amber-200 mt-1">
                      <strong>الحركة:</strong> {doc.data.recentTx}
                    </div>
                  </div>
                )}

                {doc.type === 'idCard' && (
                  <div className="text-xs font-sans space-y-1 text-slate-700 pointer-events-none">
                    <div><strong>الاسم:</strong> {doc.data.name}</div>
                    <div><strong>الهوية:</strong> <span className="font-mono text-[11px]">{doc.data.idNumber}</span></div>
                    <div className="text-slate-800 font-bold mt-1">{doc.data.status}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}