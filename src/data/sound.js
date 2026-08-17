// دالة لتشغيل الأصوات المحلية الواقعية
export const playSound = (type) => {
  let audioPath = '';
  
  if (type === 'drag') {
    audioPath = '/paper-slide.mp3'; // مسار ملف السحب المحلي
  } else if (type === 'drop' || type === 'crinkle') {
    audioPath = '/paper-crinkle.mp3'; // مسار ملف الإفلات/الكمش المحلي
  }

  if (audioPath) {
    const audio = new Audio(audioPath);
    audio.volume = 0.5; // يمكنك التحكم بدرجة الصوت هنا
    audio.play().catch(err => {
      console.log("Audio play prevented or file missing:", err);
    });
  }
};