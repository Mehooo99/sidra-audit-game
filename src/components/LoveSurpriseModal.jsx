import React from 'react';

export default function LoveSurpriseModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-b from-[#1f2937] to-[#111827] border-2 border-pink-500 rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl text-center relative overflow-hidden">
        
        {/* شريط زينة جمالي */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400"></div>

        <div className="text-4xl mb-3 animate-bounce">{message.icon || '💖'}</div>
        <h3 className="text-sm font-black text-pink-400 mb-2">{message.title}</h3>
        <p className="text-xs text-slate-200 mb-6 leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          "{message.text}"
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-lg"
        >
          {message.buttonText || 'تابعي التألق يا قلبي ✨'}
        </button>
      </div>
    </div>
  );
}