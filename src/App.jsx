import React, { useState, useRef, useEffect } from 'react';
// استبدال الاستيراد القديم بمولد السيناريوهات وفواتير المدينة الواقعية
import { generateCityScenario } from './data/cityScenariosGenerator';
import { cityBillsData } from './data/cityBills';
import {loveMessagesPool} from './data/loveMessages'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuditTable from './components/AuditTable';
import GeneralLedger from './components/GeneralLedger';
import Store from './components/Store';
import Achievements from './components/Achievements';
import ToolsSidebar from './components/ToolsSidebar';
import FamilyBillsModal from './components/FamilyBillsModal';
import GameOverModal from './components/GameOverModal';
import LoveSurpriseModal from './components/LoveSurpriseModal'
import { playSound } from './data/sound';

export default function App() {
  const [currentTab, setCurrentTab] = useState('audit');
  
  // تحميل الحالة من LocalStorage أو استخدام القيم الافتراضية
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('sidra_gameState');
    return saved ? JSON.parse(saved) : { cash: 75000, stress: 15, reputation: 'ممتازة', currentDay: 1, workHour: 9 };
  });

  const [ledgerEntries, setLedgerEntries] = useState(() => {
    const saved = localStorage.getItem('sidra_ledger');
    return saved ? JSON.parse(saved) : [
      { id: 1, date: '2026/08/01', type: 'رصيد افتتاحي', flow: 'in', amount: 75000, desc: 'رصيد الخزينة البداية لشهر أغسطس' }
    ];
  });

  const [upgrades, setUpgrades] = useState(() => {
    const saved = localStorage.getItem('sidra_upgrades');
    return saved ? JSON.parse(saved) : { uvLight: false, ergonomicChair: false };
  });

const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('sidra_achievements');
    return saved ? JSON.parse(saved) : [
      { id: 'first_audit', title: 'مُدقق بدايات واعدة 🌟', desc: 'إتمام أول قضية بنجاح وتدقيق المعاملة الأولى.', unlocked: false },
      { id: 'master_accountant', title: 'كاهن الحسابات 📊', desc: 'تسجيل معاملتين صحيحتين أو أكثر في الأستاذ العام.', unlocked: false },
      { id: 'stress_master', title: 'أعصاب من حديد ☕', desc: 'إدارة ضغط العمل بنجاح وإبقاؤه تحت السيطرة.', unlocked: false },
      { id: 'love_unlocked', title: 'ملكة قلبي وحساباتي ❤️', desc: 'وسام خاص يفتح فور دخولكِ لعالم التدقيق يا سيدرا!', unlocked: true } // تفتح فوراً للترحيب بها
    ];
  });

  // تخزين مؤشر السيناريو الحالي للوصول إلى آلاف المراحل بلا حدود
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(() => {
    const saved = localStorage.getItem('sidra_scenarioIndex');
    return saved ? JSON.parse(saved) : 0;
  });
const [activeLoveMessage, setActiveLoveMessage] = useState(null);
const [draggingId, setDraggingId] = useState(null);
  // توليد السيناريو الحالي ديناميكياً عبر المحرك
  const scenario = generateCityScenario(currentScenarioIndex);

  // حفظ التغييرات تلقائياً في LocalStorage
  useEffect(() => {
    localStorage.setItem('sidra_gameState', JSON.stringify(gameState));
    localStorage.setItem('sidra_ledger', JSON.stringify(ledgerEntries));
    localStorage.setItem('sidra_upgrades', JSON.stringify(upgrades));
    localStorage.setItem('sidra_achievements', JSON.stringify(achievements));
    localStorage.setItem('sidra_scenarioIndex', JSON.stringify(currentScenarioIndex));
  }, [gameState, ledgerEntries, upgrades, achievements, currentScenarioIndex]);

  const [positions, setPositions] = useState({});
  const [zIndices, zIndicesSet] = useState({ mainFolder: 10 });
  const maxZRef = useRef(10);
  const draggingItemRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const [isSigned, setIsSigned] = useState(false);
  const [appliedStamp, setAppliedStamp] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [highlightMode, setHighlightMode] = useState(false);
  const [activeFamilyBill, setActiveFamilyBill] = useState(null);
  const [gameOverReason, setGameOverReason] = useState(null);

  const signAudioRef = useRef(null);
  const stampAudioRef = useRef(null);
  // مرجع لمنع تكرار تنفيذ دالة الختم مرتين في نفس اللحظة
  const isProcessingStampRef = useRef(false);

  // ==========================================
  // ⏱️ تايمر الوقت المستمر في الخلفية (Game Timer)
  // ==========================================
  useEffect(() => {
    // إذا كانت فواتير العائلة ظاهرة أو اللعبة انتهت، لا يتقدم الوقت
    if (activeFamilyBill || gameOverReason) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        // كل فترة زمنية (مثلاً كل 10 ثوانٍ حقيقية تتقدم ساعة عمل واحدة، يمكنك تعديل السرعة بحسب رغبتك)
        const nextHour = prev.workHour + 1;

        // إذا وصل الوقت إلى الساعة 6 مساءً (18:00)، ينتهي الدوام وتفتح فواتير العائلة تلقائياً
        if (nextHour >= 18) {
          const matchingBill = cityBillsData[(prev.currentDay - 1) % cityBillsData.length];
          setActiveFamilyBill(matchingBill);
          return { ...prev, workHour: 18 };
        }

        return { ...prev, workHour: nextHour };
      });
    }, 30000); // 10000 ميلي ثانية = 10 ثوانٍ لكل ساعة عمل باللعبة (يمكنك تقليلها أو زيادتها)

    return () => clearInterval(timer);
  }, [activeFamilyBill, gameOverReason]);

  useEffect(() => {
    setPositions({});
    setIsSigned(false);
    setAppliedStamp(null);
    setHighlightMode(false);

    // التحقق من شروط الانهيار الوظيفي
    if (gameState.stress >= 100) {
      setGameOverReason("وصل معدل الضغط النفسي إلى 100%! أصابتكِ حالة انهيار عصبي مهني وتم إعفاؤكِ من مهام التدقيق.");
    } else if (gameState.cash < 0) {
      setGameOverReason("وصل رصيد الخزينة إلى قيمة سالبة تامة! أعلن المكتب إفلاسه المالي.");
    }
  }, [gameState.stress, gameState.cash]);

  const resetGame = () => {
    localStorage.clear();
    window.location.reload();
  };

  const bringToFront = (id) => {
    maxZRef.current += 1;
    zIndicesSet(prev => ({ ...prev, [id]: maxZRef.current }));
  };

  // const handleMouseDown = (e, id) => {
  //   if (highlightMode) return;
  //   e.stopPropagation();
  //   bringToFront(id);
  //   draggingItemRef.current = id;
  //   const element = e.currentTarget;
  //   const rect = element.getBoundingClientRect();
  //   const parentRect = element.parentElement.getBoundingClientRect();
    
  //   setPositions(prev => ({
  //     ...prev,
  //     [id]: { x: rect.left - parentRect.left, y: rect.top - parentRect.top }
  //   }));
  //   dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  // };

  // const handleMouseMove = (e) => {
  //   if (!draggingItemRef.current) return;
  //   const id = draggingItemRef.current;
  //   const parentRect = e.currentTarget.getBoundingClientRect();
  //   setPositions(prev => ({
  //     ...prev,
  //     [id]: { x: e.clientX - parentRect.left - dragOffsetRef.current.x, y: e.clientY - parentRect.top - dragOffsetRef.current.y }
  //   }));
  // };

  // const handleMouseUp = () => { draggingItemRef.current = null; };

 const handlePointerDown = (e, id) => {
    if (highlightMode) return;

    // 🛑 منع السحب نهائياً إذا كانت فواتير العائلة أو نافذة الحب أو نهاية اللعبة ظاهرة
    if (activeFamilyBill || gameOverReason || activeLoveMessage) {
      return;
    }

    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }

    e.stopPropagation();
    bringToFront(id);
    draggingItemRef.current = id;
    setDraggingId(id);
    

    playSound('drag');

    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : 0);
    
    const element = e.currentTarget;
    const parentContainer = document.querySelector('main');
    if (!parentContainer) return;
    
    const rect = element.getBoundingClientRect();
    const parentRect = parentContainer.getBoundingClientRect();
    
    if (!positions[id]) {
      setPositions(prev => ({
        ...prev,
        [id]: { x: rect.left - parentRect.left, y: rect.top - parentRect.top }
      }));
    }
    
    dragOffsetRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    
    if (element.setPointerCapture) {
      element.setPointerCapture(e.pointerId);
    }
  };
  const handlePointerMove = (e) => {
    if (!draggingItemRef.current) return;
    const id = draggingItemRef.current;
    
    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : 0);
    
    const parentContainer = document.querySelector('main');
    if (!parentContainer) return;
    const parentRect = parentContainer.getBoundingClientRect();

    // تحديث الموقع بسلاسة فائقة مع حركة الإصبع أو الماوس
    setPositions(prev => ({
      ...prev,
      [id]: { 
        x: clientX - parentRect.left - dragOffsetRef.current.x, 
        y: clientY - parentRect.top - dragOffsetRef.current.y 
      }
    }));
  };

  const handlePointerUp = (e) => {
  if (draggingItemRef.current && e.target.releasePointerCapture) {
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (err) {}
  }
  if (draggingItemRef.current !== null) {
    // 🔊 تشغيل صوت الاستقرار أو الإفلات
    playSound('drop');
  }
  draggingItemRef.current = null;
  setDraggingId(null); // <-- تصفير الحالة هنا
};

  const signDocument = () => {
    if (!isSigned) {
      setIsSigned(true);
      if (signAudioRef.current) {
        signAudioRef.current.currentTime = 0;
        signAudioRef.current.play().catch(() => {});
      }
    }
  };

  const handleDragStartTool = (e, toolType) => {
    e.dataTransfer.setData('text/plain', toolType);
  };

  const checkDiscrepancy = (docId) => {
    if (scenario.discrepancy && scenario.discrepancy.targetDoc === docId) {
      alert(`✅ ممتاز يا سيدرا! تم رصد التناقض بنجاح: "${scenario.discrepancy.desc}". تم اعتماد ختم الرفض تلقائياً لحماية المؤسسة.`);
      setHighlightMode(false);
      applyStampDecision('reject');
    } else {
      alert("❌ خطأ يا سيدرا! هذا المستند سليم ولا يحتوي على التناقض المطلوب.");
      setGameState(prev => ({ ...prev, stress: Math.min(100, prev.stress + 10) }));
    }
  };

  const applyStampDecision = (type) => {
    if (isProcessingStampRef.current) return;
    
    try {
      if (!isSigned) {
        alert("⚠️ تنبيه إداري يا سيدرا: لا يمكن ختم ملف المعاملة قبل توقيعكِ أولاً!");
        return;
      }
      if (appliedStamp !== null) return;

      isProcessingStampRef.current = true;
      setAppliedStamp(type);
      
      if (stampAudioRef.current) {
        stampAudioRef.current.currentTime = 0;
        stampAudioRef.current.play().catch(() => {});
      }

      const choice = scenario.choices.find(c => c.id === type);
      if (choice) {
        const stressDelta = upgrades.ergonomicChair ? Math.round(choice.stressChange * 0.7) : choice.stressChange;

        setGameState(prev => {
          const updated = {
            ...prev,
            cash: prev.cash + choice.cashChange,
            stress: Math.min(100, Math.max(0, prev.stress + stressDelta)),
            reputation: choice.reputationChange
          };
          localStorage.setItem('sidra_gameState', JSON.stringify(updated));
          return updated;
        });

        setFeedback(choice.resultText);

        if (choice.ledgerEntry) {
          setLedgerEntries(prev => {
            const lastEntry = prev[prev.length - 1];
            if (lastEntry && lastEntry.desc === choice.ledgerEntry.desc) {
              return prev;
            }

            const updatedLedger = [
              ...prev,
              {
                id: prev.length + 1,
                date: `2026/08/0${gameState.currentDay}`,
                type: choice.ledgerEntry.type,
                flow: choice.cashChange >= 0 ? 'in' : 'out',
                amount: Math.abs(choice.cashChange),
                desc: choice.ledgerEntry.desc
              }
            ];
            localStorage.setItem('sidra_ledger', JSON.stringify(updatedLedger));
            return updatedLedger;
          });
        }
        setAchievements(prev => prev.map(ach => {
          if (ach.id === 'first_audit') {
            return { ...ach, unlocked: true }; // تفتح فور إتمام أي قضية
          }
          if (ach.id === 'master_accountant' && ledgerEntries.length >= 2) {
            return { ...ach, unlocked: true }; // تفتح عند تعدد القيود بالسجل
          }
          if (ach.id === 'stress_master' && gameState.stress < 30) {
            return { ...ach, unlocked: true }; // تفتح لو ظل الضغط منخفضاً
          }
          return ach;
        }));
      }
    } catch (error) {
      console.error("خطأ أثناء تطبيق الختم:", error);
    } finally {
      setTimeout(() => {
        isProcessingStampRef.current = false;
      }, 300);
    }
  };

  // زر الانتقال للقضية التالية ضمن نفس اليوم وساعات العمل الحالية
  const nextScenario = () => {
    setFeedback(null);
    setCurrentScenarioIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      localStorage.setItem('sidra_scenarioIndex', JSON.stringify(nextIndex));

      if (nextIndex % 2 === 0) {
      const randomIndex = Math.floor(Math.random() * loveMessagesPool.length);
      setActiveLoveMessage(loveMessagesPool[randomIndex]);
    }

      return nextIndex;
    });
  };

  const handlePayFamilyBill = (amount) => {
    setFeedback(null);
    setGameState(prev => {
      const nextDayVal = prev.currentDay + 1;
      const updated = { ...prev, cash: prev.cash - amount, stress: Math.max(0, prev.stress - 10), currentDay: nextDayVal, workHour: 9 };
      localStorage.setItem('sidra_gameState', JSON.stringify(updated));
      return updated;
    });

    setCurrentScenarioIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      localStorage.setItem('sidra_scenarioIndex', JSON.stringify(nextIndex));
      return nextIndex;
    });

    setActiveFamilyBill(null);
  };

  const handleSkipFamilyBill = () => {
    setFeedback(null);
    setGameState(prev => {
      const nextDayVal = prev.currentDay + 1;
      const updated = { ...prev, stress: Math.min(100, prev.stress + 25), currentDay: nextDayVal, workHour: 9 };
      localStorage.setItem('sidra_gameState', JSON.stringify(updated));
      return updated;
    });

    setCurrentScenarioIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      localStorage.setItem('sidra_scenarioIndex', JSON.stringify(nextIndex));
      return nextIndex;
    });

    setActiveFamilyBill(null);
  };

  const buyUpgrade = (upgradeKey, cost, upgradeTitle) => {
    if (gameState.cash >= cost && !upgrades[upgradeKey]) {
      setGameState(prev => ({ ...prev, cash: prev.cash - cost }));
      setUpgrades(prev => ({ ...prev, [upgradeKey]: true }));
      
      setLedgerEntries(prev => [
        ...prev,
        {
          id: prev.length + 1,
          date: `2026/08/0${gameState.currentDay}`,
          type: 'شراء ترقية مكتب',
          flow: 'out',
          amount: cost,
          desc: `شراء ترقية: ${upgradeTitle}`
        }
      ]);

      alert(`✨ تم شراء وترقية المكتب بنجاح يا سيدرا!`);
    } else {
      alert("⚠️ رصيد الخزينة غير كافٍ أو تم شراء هذه الترقية مسبقاً.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#161b22] text-slate-100 font-sans select-none overflow-hidden" dir="rtl">
      <audio ref={signAudioRef} src="/pen-scratch.mp3" preload="auto" />
      <audio ref={stampAudioRef} src="/stamp-thud.mp3" preload="auto" />

      <Header gameState={gameState} />

      {gameOverReason && (
        <div className="fixed inset-0 z-300 flex items-center justify-center bg-black/70">
          <GameOverModal reason={gameOverReason} resetGame={resetGame} />
        </div>
      )}

      {activeFamilyBill && (
        <div className="fixed inset-0 z-300 flex items-center justify-center bg-black/70">
          <FamilyBillsModal 
            bill={activeFamilyBill}
            payBill={handlePayFamilyBill}
            skipBill={handleSkipFamilyBill}
          />
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <main 
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          className="flex-1 relative overflow-auto bg-[#21262d] flex flex-col items-center justify-start p-6"
        >
          {currentTab === 'audit' && (
            <AuditTable 
              scenario={scenario}
              positions={positions}
              zIndices={zIndices}
              handleMouseDown={handlePointerDown}
              handleDragOver={(e) => e.preventDefault()}
              handleDropOnMainFolder={(e) => {
                e.preventDefault();
                const toolType = e.dataTransfer.getData('text/plain');
                if (toolType === 'approve' || toolType === 'reject') applyStampDecision(toolType);
              }}
              handleMouseMove={handlePointerMove}
              handleMouseUp={handlePointerUp}
              draggingId={draggingId}
              signDocument={signDocument}
              isSigned={isSigned}
              appliedStamp={appliedStamp}
              feedback={feedback}
              nextScenario={nextScenario}
              upgrades={upgrades}
              highlightMode={highlightMode}
              setHighlightMode={setHighlightMode}
              checkDiscrepancy={checkDiscrepancy}
            />
          )}

          {currentTab === 'ledger' && <GeneralLedger ledgerEntries={ledgerEntries} />}
          {currentTab === 'store' && <Store upgrades={upgrades} buyUpgrade={buyUpgrade} />}
          {currentTab === 'achievements' && <Achievements achievements={achievements} />}
        </main>

        {currentTab === 'audit' && (
          <ToolsSidebar 
            signDocument={signDocument}
            applyStampDecision={applyStampDecision}
            isSigned={isSigned}
            handleDragStartTool={handleDragStartTool}
          />
        )}
        {activeLoveMessage && (
  <div className="fixed inset-0 z-300 flex items-center justify-center bg-black/70">
          <LoveSurpriseModal 
            message={activeLoveMessage} 
            onClose={() => setActiveLoveMessage(null)} 
          />
        </div>
)}
      </div>
    </div>
  );
}