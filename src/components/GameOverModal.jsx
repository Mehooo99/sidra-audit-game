import React from 'react';

export default function GameOverModal({ reason, resetGame }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1f2937] border-4 border-red-600 rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl text-center">
        <div className="text-4xl mb-3">💥</div>
        <h2 className="text-base font-black text-red-500 mb-2">انتهت اللعبة - انهيار وظيفي!</h2>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">{reason}</p>
        <div className="bg-[#111827] p-3 rounded-lg text-xs text-slate-400 mb-5">
          لقد تجاوزتِ حدود الطاقة الاستيعابية لمكتب التدقيق يا سيدرا. يمكنكِ المحاولة مجدداً وبناء إمبراطوريتك المحاسبية بحذر أكثر!
        </div>
        <button
          onClick={resetGame}
          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-lg"
        >
          إعادة محاولة اللعبة 🔄
        </button>
      </div>
    </div>
  );
}