// مكتبة القضايا الشاملة (50 قضية واقعية ومنطقية)
const scenariosPool = [
  {
    id: 1,
    title: 'قضية فاتورة التوريد الهندسية',
    sector: 'قطاع المقاولات',
    description: 'شركة توريدات تطالب بصرف مبلغ 12,000$ مقابل قطع معدنية لخط الإنتاج.',
    dailyDirective: 'تعميم إداري #1: يُمنع اعتماد أي فاتورة تتجاوز 10,000$ إذا كان تاريخ الفاتورة يسبق تاريخ كشف الحساب.',
    character: { name: 'سامر (ممثل المورد)', dialogue: 'أرجوكي يا مديرة سيدرا، المصنع متوقف ونحتاج صرف الشيك اليوم!' },
    documents: [
      { id: 'doc1', title: 'فاتورة المورد الأساسية', type: 'invoice', data: { vendor: 'الشرق للتوريدات الهندسية', amount: '12,000 $', date: '2026/08/01', notes: 'توريد معدات خط الإنتاج الأول' } },
      { id: 'doc2', title: 'كشف الحساب البنكي', type: 'bank', data: { accountName: 'الشرق للتوريدات', accountNo: 'SA-9982-1102', recentTx: 'حوالة واردة بقيمة 12,000 $ بتاريخ 2026/08/01' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: 12000,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'قرار سليم يا سيدرا! البيانات مطابقة للتعميم وتم اعتماد المبلغ.',
        ledgerEntry: { type: 'توريد هندسي', desc: 'قبول وتدقيق فاتورة الشرق للتوريدات' }
      },
      {
        id: 'reject',
        cashChange: -2000,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة صحيحة، مما أدى لغرامة تأخير على المكتب.',
        ledgerEntry: { type: 'رفض خاطئ', desc: 'رفض فاتورة سليمة' }
      }
    ]
  },
  {
    id: 2,
    title: 'قضية الاشتباه والتلاعب الضريبي',
    sector: 'التفتيش الضريبي',
    description: 'مستندات مالية تقدم بها مقاول مستقل مع اختلاف طفيف في أرقام السجل الضريبي.',
    dailyDirective: 'تعميم إداري #2: أي اختلاف في أرقام الهوية أو السجل الضريبي يعتبر شبهة تلاعب فورية ويجب رفضه.',
    character: { name: 'عصام (مقاول مستقل)', dialogue: 'الأرقام صحيحة تماماً يا فندم، لا تقلقي ودققي بسرعة من فضلك.' },
    documents: [
      { id: 'doc1', title: 'فاتورة المقاول', type: 'invoice', data: { vendor: 'مؤسسة الإعمار الحديث', amount: '8,500 $', date: '2026/08/02', notes: 'أعمال صيانة الطابق الأرضي' } },
      { id: 'doc2', title: 'بطاقة الهوية والاعتماد', type: 'idCard', data: { name: 'عصام التميمي', idNumber: '4421-9981-99 (مزوّر)', jobTitle: 'مقاول معتمد', status: 'سجل منتهي الصلاحية' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'رقم الهوية غير مطابق للسجل التجاري' },
    choices: [
      {
        id: 'approve',
        cashChange: -8500,
        stressChange: 30,
        reputationChange: 'مساءلة إدارية',
        resultText: '⚠️ تنبيه: وافقتِ على معاملة تحتوي على تلاعب واضح! تراجعت سمعة المكتب.',
        ledgerEntry: { type: 'صرف مشبوه', desc: 'اعتماد فاتورة مع شبهة تلاعب' }
      },
      {
        id: 'reject',
        cashChange: 4000,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'عمل استثنائي يا سيدرا! كشفتِ التناقض وأحبطتِ عملية الاحتيال بنجاح.',
        ledgerEntry: { type: 'إحباط تلاعب', desc: 'رفض فاتورة مزورة وحماية الخزينة' }
      }
    ]
  },
  {
    id: 3,
    title: 'قضية رشوة محتملة وتوريد مشبوه',
    sector: 'قطاع الخدمات',
    description: 'مندوب شركة مجهولة يحاول تقديم مبلغ نقدي جانبي لتمرير فاتورة وهمية دون تدقيق بنكي.',
    dailyDirective: 'تعميم إداري #3: يُمنع قبول أي مبالغ نقدية جانبية، وأي محاولة رشوة تعرض للرفض والفصل الفوري.',
    character: { name: 'فادي (مندوب الحوافز)', dialogue: 'يا مديرة سيدرا، هذه هدية نقدية بسيطة خصيصاً لكِ لو مشيتي الفاتورة اليوم بهدوء!' },
    documents: [
      { id: 'doc1', title: 'فاتورة استشارات وهمية', type: 'invoice', data: { vendor: 'الخدمات السريعة والاستشارات', amount: '15,000 $', date: '2026/08/03', notes: 'استشارات تطوير برمجيات وهمية' } }
    ],
    discrepancy: { targetDoc: 'doc1', desc: 'فاتورة استشارات بدون عقد معتمد أو مسجل' },
    choices: [
      {
        id: 'approve',
        cashChange: 15000,
        stressChange: 40,
        reputationChange: 'مساءلة إدارية',
        resultText: '🚨 فضيحة إدارية! قبلتِ معاملة وهمية، وتم رصدكِ من قِبل لجنة التفتيش.',
        ledgerEntry: { type: 'صرف مشبوه', desc: 'قبول فاتورة استشارات وهمية بدون ركائز' }
      },
      {
        id: 'reject',
        cashChange: 5000,
        stressChange: -15,
        reputationChange: 'مدققة أمينة',
        resultText: 'بطولة مطلقة يا سيدرا! رفضتِ محاولة التغرير وأحبطتِ عملية هدر مالي ضخمة.',
        ledgerEntry: { type: 'رفض رشوة', desc: 'رفض رشوة وحماية نزاهة المكتب' }
      }
    ]
  },
  {
    id: 4,
    title: 'قضية تمويل أجهزة المستشفى العام',
    sector: 'بنك المدينة المركزي',
    description: 'د. حاتم يطلب اعتماد تمويل عاجل لشراء أجهزة قسم الطوارئ في المستشفى.',
    dailyDirective: 'تعميم إداري #4: قروض القطاع الطبي تتطلب مطابقة ختم وزارة الصحة وخلوها من الشوائب.',
    character: { name: 'د. حاتم (مدير المستشفى)', dialogue: 'أحتاج لاعتماد تمويل شراء أجهزة قسم الطوارئ بسرعة لإنقاذ المرضى.' },
    documents: [
      { id: 'doc1', title: 'طلب تمويل طوارئ', type: 'invoice', data: { vendor: 'مستشفى المدينة العام', amount: '14,000 $', date: '2026/08/04', notes: 'شراء أجهزة تنفس صناعي' } },
      { id: 'doc2', title: 'اعتماد وزارة الصحة', type: 'bank', data: { accountName: 'المستشفى العام', accountNo: 'MED-9011', recentTx: 'اعتماد رسمي ساري المفعول' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -14000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'إنجاز رائع يا سيدرا، تم دعم القطاع الصحي وتسيير المعاملة بنجاح.',
        ledgerEntry: { type: 'تمويل طبي', desc: 'دعم عاجل لقسم الطوارئ' }
      },
      {
        id: 'reject',
        cashChange: 2000,
        stressChange: 20,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة طبية إنسانية سليمة، مما تسبب بانتقادات إعلامية.',
        ledgerEntry: { type: 'رفض تعسفي', desc: 'تعطيل تمويل مستشفى' }
      }
    ]
  },
  {
    id: 5,
    title: 'قضية فواتير مطعم الشفاء العائلي',
    sector: 'قطاع المطاعم والمقاهي',
    description: 'أبو أحمد يتقدم بفواتير التموين الشهرية للمطعم لاعتماد صرفها.',
    dailyDirective: 'تعميم إداري #5: الفواتير التجارية فوق 8,000$ تتطلب إرفاق جدول جرد المخزون.',
    character: { name: 'أبو أحمد', dialogue: 'هذه فواتير التموين الشهرية للمطعم، أرجو اعتمادها لتوفير الوجبات.' },
    documents: [
      { id: 'doc1', title: 'فاتورة تموين غذائي', type: 'invoice', data: { vendor: 'مطعم الشفاء العائلي', amount: '9,500 $', date: '2026/08/05', notes: 'مواد غذائية أساسية' } },
      { id: 'doc2', title: 'جدول جرد المخزون', type: 'bank', data: { accountName: 'أبو أحمد', accountNo: 'RES-4412', recentTx: 'مفقود جدول الجرد الفعلي للمخزون' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'غياب جدول الجرد الإلزامي للفواتير فوق 8,000$' },
    choices: [
      {
        id: 'approve',
        cashChange: 9500,
        stressChange: 15,
        reputationChange: 'مساءلة إدارية',
        resultText: 'تجاوزتِ شرط جدول الجرد، وتم تسجيل ملاحظة رقابية عليكِ.',
        ledgerEntry: { type: 'صرف مخالف', desc: 'اعتماد بدون جرد مخزون' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'عين صائبة يا سيدرا! تمسككِ بالتعميم حال دون مخالفة قانونية.',
        ledgerEntry: { type: 'تدقيق احترازي', desc: 'رفض فاتورة لنقص مرفق الجرد' }
      }
    ]
  },
  {
    id: 6,
    title: 'قضية القرض العقاري السكني',
    sector: 'قروض الأفراد والإسكان',
    description: 'ماهر مستثمر عقاري يطلب تمويل بناء مجمع سكني جديد للعمال.',
    dailyDirective: 'تعميم إداري #6: المشاريع الإنشائية الكبرى تتطلب ضمانات بنكية تغطي 50% على الأقل.',
    character: { name: 'ماهر (مستثمر عقاري)', dialogue: 'طلب تمويل بناء المجمع السكني الجديد لدعم عمال المدينة وتسريع الإنجاز.' },
    documents: [
      { id: 'doc1', title: 'طلب تمويل عقاري', type: 'invoice', data: { vendor: 'مؤسسة البناء العمراني', amount: '18,000 $', date: '2026/08/06', notes: 'دفعة أولى للمشروع السكني' } },
      { id: 'doc2', title: 'الضمان البنكي', type: 'bank', data: { accountName: 'ماهر العقارية', accountNo: 'RE-7711', recentTx: 'ضمان بنكي بقيمة 2,000$ فقط (غير مطابق للنسبة)' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'الضمان البنكي أقل بكثير من الحد الأدنى المطلوب للمشروع' },
    choices: [
      {
        id: 'approve',
        cashChange: -18000,
        stressChange: 25,
        reputationChange: 'مساءلة إدارية',
        resultText: 'وافقتِ على تمويل بمخاطر عالية وضمانات غير كافية!',
        ledgerEntry: { type: 'تمويل عالي المخاطر', desc: 'اعتماد قرض بضمان ضعيف' }
      },
      {
        id: 'reject',
        cashChange: 3000,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'قرار استثماري حكيم؛ حميتِ أموال الخزينة من قروض غير مضمونة.',
        ledgerEntry: { type: 'حماية الائتمان', desc: 'رفض قرض لعدم كفاية الضمان' }
      }
    ]
  },
  {
    id: 7,
    title: 'قضية صيانة شبكة المياه والكهرباء',
    sector: 'الخدمات العامة والبلدية',
    description: 'فاتورة مقدمة من متعهد طوارئ البنية التحتية لإصلاح خط المياه الرئيسي.',
    dailyDirective: 'تعميم إداري #7: فواتير الطوارئ المعفاة من الإجراءات الروتينية تتطلب تقرير معاينة ميدانية معتمد.',
    character: { name: 'مهندس خالد', dialogue: 'الخط الرئيسي تعرض لكسر مفاجئ، وأنجزنا الإصلاح ونحتاج صرف التكلفة.' },
    documents: [
      { id: 'doc1', title: 'فاتورة أعمال الطوارئ', type: 'invoice', data: { vendor: 'متعاهدو الإصلاح السريع', amount: '7,000 $', date: '2026/08/07', notes: 'إصلاح عاجل لخط المياه' } },
      { id: 'doc2', title: 'تقرير المعاينة الميدانية', type: 'bank', data: { accountName: 'متعاهدو الإصلاح', accountNo: 'MUNI-332', recentTx: 'تقرير معاينة موقع معتمد ومختوم أصولاً' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -7000,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'أداء ممتاز، تم استجابة الطوارئ ودفع المستحقات بوجود التقرير السليم.',
        ledgerEntry: { type: 'خدمات طوارئ', desc: 'صرف تكلفة إصلاح خط المياه' }
      },
      {
        id: 'reject',
        cashChange: -1000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة طوارئ نظامية، مما أدى لشكوى رسمية من البلدية.',
        ledgerEntry: { type: 'رفض طوارئ', desc: 'تأخير مستحقات إصلاح' }
      }
    ]
  },
  {
    id: 8,
    title: 'قضية ترخيص متجر الحرف اليدوية',
    sector: 'المحلات التجارية والأسواق',
    description: 'طلب تجديد رخصة تجارية لمحلات التراث والحرف الشعبية وسط المدينة.',
    dailyDirective: 'تعميم إداري #8: رخص المحلات التجارية تشترط خلو السجل من أي مخالفات سلامة بيئية سابقة.',
    character: { name: 'أمينة (صاحبة المتجر)', dialogue: 'أرجو تجديد رخصة المتجر، نحن نعمل هنا منذ سنوات طويلة.' },
    documents: [
      { id: 'doc1', title: 'طلب تجديد رخصة', type: 'invoice', data: { vendor: 'متجر التراث الشعبي', amount: '3,000 $', date: '2026/08/08', notes: 'رسم تجديد سنوي' } },
      { id: 'doc2', title: 'سجل المخالفات البيئية', type: 'bank', data: { accountName: 'أمينة الحرفي', accountNo: 'SH-110', recentTx: 'تم رصد مخالفة سلامة بيئية غير مسددة بتاريخ أمس' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'وجود مخالفة بيئية نشطة تمنع تجديد الرخصة' },
    choices: [
      {
        id: 'approve',
        cashChange: 3000,
        stressChange: 20,
        reputationChange: 'مساءلة إدارية',
        resultText: 'جددتِ الرخصة مع وجود مخالفة بيئية نشطة، وتم رصد الخطأ.',
        ledgerEntry: { type: 'تجديد مخالف', desc: 'تجاوز مخالفة بيئية نشطة' }
      },
      {
        id: 'reject',
        cashChange: 500,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'رائع يا سيدرا! تم إيقاف التجديد حتى تسوية المخالفة البيئية.',
        ledgerEntry: { type: 'إيقاف إداري', desc: 'تعليق رخصة لوجود مخالفة' }
      }
    ]
  },
  {
    id: 9,
    title: 'قضية توريد الأدوية الصيدلانية',
    sector: 'قطاع الصحة والأدوية',
    description: 'مستودع الأدوية الوطني يطلب صرف مستحقات توريد أدوية المزمنة.',
    dailyDirective: 'تعميم إداري #9: شحنات الأدوية تتطلب شهادة فحص مخبري حديثة ومطابقة لدرجات الحفظ.',
    character: { name: 'صبري (مدير المستودع)', dialogue: 'شحنة الأدوية وصلت مستودعات المركز، ونحتاج تسيير الشيك المالي.' },
    documents: [
      { id: 'doc1', title: 'فاتورة توريد الأدوية', type: 'invoice', data: { vendor: 'المستودع الوطني للأدوية', amount: '16,000 $', date: '2026/08/09', notes: 'أدوية الأمراض المزمنة' } },
      { id: 'doc2', title: 'شهادة الفحص المخبري', type: 'bank', data: { accountName: 'المستودع الوطني', accountNo: 'PH-992', recentTx: 'شهادة فحص منتهية الصلاحية منذ أسبوع' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'شهادة الفحص المخبري منتهية الصلاحية ولا توثق السلامة' },
    choices: [
      {
        id: 'approve',
        cashChange: -16000,
        stressChange: 35,
        reputationChange: 'مساءلة إدارية',
        resultText: 'كارثة صحية! وافقتِ على صرف مستحقات أدوية بشهادة فحص منتهية.',
        ledgerEntry: { type: 'صرف طبي خطير', desc: 'اعتماد شحنة بدون فحص صالح' }
      },
      {
        id: 'reject',
        cashChange: 2500,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'حماية عظيمة لصحة المواطنين يا سيدرا! رفضتِ الشحنة حتى تجديد الفحص.',
        ledgerEntry: { type: 'حماية صحية', desc: 'رفض شحنة أدوية لانتهاء الفحص' }
      }
    ]
  },
  {
    id: 10,
    title: 'قضية تدقيق الرواتب والأجور الشهرية',
    sector: 'بنك المدينة المركزي',
    description: 'كشف رواتب موظفي قطاع الإشراف والمتابعة لشهر أغسطس.',
    dailyDirective: 'تعميم إداري #10: مجموع كشف الرواتب يجب أن يتطابق تماماً مع سقف الميزانية المعتمد ($20,000).',
    character: { name: 'محمود (شؤون الموظفين)', dialogue: 'تفضلي كشف الرواتب الشهري، جاهز للاعتماد والتحويل للحسابات.' },
    documents: [
      { id: 'doc1', title: 'كشف الرواتب الإجمالي', type: 'invoice', data: { vendor: 'شؤون الموظفين', amount: '19,500 $', date: '2026/08/10', notes: 'رواتب موظفي الإشراف' } },
      { id: 'doc2', title: 'ميزانية القسم المعتمدة', type: 'bank', data: { accountName: 'حساب الرواتب', accountNo: 'SAL-01', recentTx: 'السقف المالي المعتمد للقسم هو 20,000$' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -19500,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'كل شيء مطابقة ومضبوط ضمن الميزانية، تم تحويل الرواتب بنجاح.',
        ledgerEntry: { type: 'صرف رواتب', desc: 'اعتماد رواتب شهر أغسطس' }
      },
      {
        id: 'reject',
        cashChange: -1000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ كشف الرواتب السليم، مما أدى لحالة إضراب وتذمر بين الموظفين.',
        ledgerEntry: { type: 'خطأ إداري', desc: 'تعطيل صرف الرواتب' }
      }
    ]
  },
  {
    id: 11,
    title: 'قضية صيانة المصاعد في الأبراج الإدارية',
    sector: 'قطاع المقاولات',
    description: 'شركة الصيانة الهندسية تطالب بصرف تكلفة الصيانة الدورية لمصاعد الأبراج.',
    dailyDirective: 'تعميم إداري #11: عقود الصيانة الدورية تتطلب توقيع مهندس السلامة المقيم.',
    character: { name: 'جمال (مهندس الصيانة)', dialogue: 'قمنا بصيانة المصاعد الأربعة بالكامل، والفاتورة جاهزة للتوقيع.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الصيانة الدورية', type: 'invoice', data: { vendor: 'الشركة الألمانية للمصاعد', amount: '6,000 $', date: '2026/08/11', notes: 'صيانة شهرية شاملة' } },
      { id: 'doc2', title: 'محضر استلام مهندس السلامة', type: 'bank', data: { accountName: 'الشركة الألمانية', accountNo: 'LIFT-88', recentTx: 'محضر مفقود وغير مدمج في النظام' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'غياب محضر اعتماد مهندس السلامة الإلزامي' },
    choices: [
      {
        id: 'approve',
        cashChange: -6000,
        stressChange: 15,
        reputationChange: 'مساءلة إدارية',
        resultText: 'صرفتِ المبلغ بدون محضر السلامة، وتعرضتِ للتحقيق في حال حدوث عطل.',
        ledgerEntry: { type: 'صرف غير مصدق', desc: 'اعتماد صيانة بدون محضر سلامة' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'تدقيق ذكي ومحترف يا سيدرا! أوقفتِ الصرف حتى إرفاق محضر السلامة.',
        ledgerEntry: { type: 'تدقيق احترازي', desc: 'رفض صرف صيانة لنقص المحضر' }
      }
    ]
  },
  {
    id: 12,
    title: 'قضية تبرع خيري مشبوه',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'جمعية غير مرخصة تطلب إعفاء وضريبي وتمرير حوالة تبرعات مالية.',
    dailyDirective: 'تعميم إداري #12: يُحظر تماماً تمرير أي حوالات مالية لجهات خيرية لا تحمل ترخيص وزارة الداخلية.',
    character: { name: 'سليمان (ممثل الجمعية)', dialogue: 'هذه تبرعات لصالح أسر المحتاجين، نرجو إعفاءها واعتمادها فوراً.' },
    documents: [
      { id: 'doc1', title: 'طلب تمرير تبرعات', type: 'invoice', data: { vendor: 'جمعية العون المجهولة', amount: '11,000 $', date: '2026/08/12', notes: 'حوالة تبرعات خيرية' } },
      { id: 'doc2', title: 'ترخيص وزارة الداخلية', type: 'bank', data: { accountName: 'جمعية العون', accountNo: 'CHARITY-0', recentTx: 'الجهة غير مسجلة في القائمة الرسمية للوزارة' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'الجهة غير مرخصة رسمياً من وزارة الداخلية' },
    choices: [
      {
        id: 'approve',
        cashChange: 11000,
        stressChange: 45,
        reputationChange: 'مساءلة إدارية',
        resultText: 'كارثة أمنية! وافقتِ على حوالة لجهة غير مرخصة، وتم استدعاؤكِ أمنياً.',
        ledgerEntry: { type: 'حوالة محظورة', desc: 'تمرير أموال لجهة غير مرخصة' }
      },
      {
        id: 'reject',
        cashChange: 4000,
        stressChange: -15,
        reputationChange: 'مدققة أمينة',
        resultText: 'يقظة أمنية استثنائية يا سيدرا! أحبطتِ عملية تمرير أموال مشبوهة.',
        ledgerEntry: { type: 'إحباط حوالة مشبوهة', desc: 'رفض تبرعات لجهة غير مرخصة' }
      }
    ]
  },
  {
    id: 13,
    title: 'قضية إضاءة الشوارع والطاقة الشمسية',
    sector: 'الخدمات العامة والبلدية',
    description: 'مشروع تركيب وحدات إنارة بالطاقة الشمسية في أحياء وسط المدينة.',
    dailyDirective: 'تعميم إداري #13: مشاريع البنية التحتية تتطلب مطابقة المواصفات الفنية المعتمدة من لجنة الطاقة.',
    character: { name: 'م. راشد (مقاول الطاقة)', dialogue: 'تم تركيب 50 عمود إنارة بالطاقة الشمسية، ونطالب بصرف الدفعة النهائية.' },
    documents: [
      { id: 'doc1', title: 'فاتورة مشروع الطاقة', type: 'invoice', data: { vendor: 'الأنوار الذكية للطاقة', amount: '13,500 $', date: '2026/08/13', notes: 'مشروع إنارة الأحياء السكنية' } },
      { id: 'doc2', title: 'مطابقة مواصفات لجنة الطاقة', type: 'bank', data: { accountName: 'الأنوار الذكية', accountNo: 'SOLAR-55', recentTx: 'مطابقة تامة ومجازة فنياً من لجنة الطاقة' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -13500,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'ممتاز! تم إنجاز المشروع واعتماد الدفعة ودعم بيئة المدينة بنجاح.',
        ledgerEntry: { type: 'مشروع طاقة', desc: 'صرف دفعة إنارة الشوارع' }
      },
      {
        id: 'reject',
        cashChange: 1500,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة نظامية لمشروع حيوي، مما أخر إنارة الشوارع.',
        ledgerEntry: { type: 'رفض مشروع', desc: 'تأخير مستحقات إنارة' }
      }
    ]
  },
  {
    id: 14,
    title: 'قضية رسوم التفتيش الصناعي والمصانع',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'كشف رسوم التفتيش السنوي على المصانع الكيميائية في المنطقة الصناعية.',
    dailyDirective: 'تعميم إداري #14: المصانع التي تسجل انبعاثات عالية تفرض عليها غرامة إضافية بقيمة 3,000$.',
    character: { name: 'مفتشة البيئة رانيا', dialogue: 'هذا تقرير التفتيش السنوي لمصانع البلاستيك، يتضمن رسوم الغرامات المقررة.' },
    documents: [
      { id: 'doc1', title: 'كشف الرسوم والغرامات', type: 'invoice', data: { vendor: 'مكتب التفتيش البيئي', amount: '12,500 $', date: '2026/08/14', notes: 'رسوم وغرامات انبعاثات المصانع' } },
      { id: 'doc2', title: 'تقرير الانبعاثات الفعلي', type: 'bank', data: { accountName: 'مصانع البلاستيك الوطنية', accountNo: 'IND-90', recentTx: 'سجل انبعاثات عالية تتطلب الغرامة الإضافية' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: 12500,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'رائع جداً يا سيدرا، تم تحصيل الغرامات ودعم خزينة المكتب بكفاءة.',
        ledgerEntry: { type: 'تحصيل غرامات', desc: 'تحصيل رسوم التفتيش البيئي' }
      },
      {
        id: 'reject',
        cashChange: -3000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'أهملتِ تحصيل الغرامات المقررة، مما أثر على إيرادات الخزينة.',
        ledgerEntry: { type: 'خطأ تحصيل', desc: 'إلغاء تحصيل غرامات مستحقة' }
      }
    ]
  },
  {
    id: 15,
    title: 'قضية قرض تمويل المتاجر الصغيرة الناشئة',
    sector: 'قروض الأفراد والإسكان',
    description: 'شباب خريجون يطلبون قروضاً ميسرة لتأسيس متاجر رقمية وحرفية.',
    dailyDirective: 'تعميم إداري #15: قروض الشباب الناشئة تتطلب دراسة جدوى اقتصادية معتمدة.',
    character: { name: 'شادي (ممثل الشباب)', dialogue: 'نحتاج التمويل لبدء منصة التجارة الإلكترونية المحلية وتوظيف الشباب.' },
    documents: [
      { id: 'doc1', title: 'طلب تمويل مشروع ناشئ', type: 'invoice', data: { vendor: 'مبادرة الشباب الرقمي', amount: '5,000 $', date: '2026/08/15', notes: 'قرض تأسيس متجر إلكتروني' } },
      { id: 'doc2', title: 'دراسة الجدوى الاقتصادية', type: 'bank', data: { accountName: 'شادي وشركاه', accountNo: 'START-01', recentTx: 'دراسة جدوى متكاملة ومعتمدة أصولاً' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -5000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'خطوة رائعة لدعم اقتصاد الشباب ومشاريع المدينة الناشئة!',
        ledgerEntry: { type: 'تمويل شباب', desc: 'اعتماد قرض تأسيس متجر ناشئ' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ مشروعاً شبابياً واعداً، مما أحبط طاقات ريادية في المدينة.',
        ledgerEntry: { type: 'رفض تمويل', desc: 'تعطيل قرض مشروع ناشئ' }
      }
    ]
  },
  {
    id: 16,
    title: 'قضية شبهة تزوير أوراق الاعتماد المالي',
    sector: 'بنك المدينة المركزي',
    description: 'شركة استيراد تقدم مستندات تحويل بنكي دولي بقيمة عالية جداً.',
    dailyDirective: 'تعميم إداري #16: الحווلات الدولية فوق 20,000$ تتطلب كود مصادقة سويفت مطابق تماماً للسجل.',
    character: { name: 'وائل (ممثل الاستيراد)', dialogue: 'حوالة استيراد البضائع الخارجية جاهزة، نرجو اعتماد خروجها فوراً.' },
    documents: [
      { id: 'doc1', title: 'إشعار تحويل دولي', type: 'invoice', data: { vendor: 'الاستيراد السريع الدولي', amount: '22,000 $', date: '2026/08/16', notes: 'استيراد بضائع عامة' } },
      { id: 'doc2', title: 'كود المصادقة السويفت', type: 'idCard', data: { name: 'SWIFT-CODE', idNumber: 'ERR-9990 (كود وهمي)', jobTitle: 'اعتماد دولي', status: 'غير مسجل بالنظام البنكي' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'كود السويفت البنكي مزور وغير مطابق للنظام الدولي' },
    choices: [
      {
        id: 'approve',
        cashChange: -22000,
        stressChange: 50,
        reputationChange: 'مساءلة إدارية',
        resultText: 'كارثة مالية كبرى! وافقتِ على تحويل دولي بكود مزور وهربت الأموال.',
        ledgerEntry: { type: 'احتيال دولي', desc: 'اعتماد تحويل بسويفت مزور' }
      },
      {
        id: 'reject',
        cashChange: 6000,
        stressChange: -20,
        reputationChange: 'مدققة أمينة',
        resultText: 'إنجاز أسطوري يا سيدرا! كشفتِ تزوير السويفت وأنقذتِ الخزينة من سرقة محققة.',
        ledgerEntry: { type: 'إحباط احتيال', desc: 'رفض تحويل دولي مزور' }
      }
    ]
  },
  {
    id: 17,
    title: 'قضية توريد الأثاث المكتبي للإدارة',
    sector: 'المحلات التجارية والأسواق',
    description: 'ورشة النجارة المحلية تطالب بصرف تكلفة توريد طاولات ومقاعد جديدة للمكاتب.',
    dailyDirective: 'تعميم إداري #17: فواتير التوريد المكتبي تتطلب محضر استلام فني مطابق للعدد.',
    character: { name: 'النجار أبو سليم', dialogue: 'أنهينا تفصيل وتوريد كافة الطاولات والمقاعد لمكاتب الإدارة الجديدة.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الأثاث المكتبي', type: 'invoice', data: { vendor: 'مفروشات الأمانة', amount: '4,500 $', date: '2026/08/17', notes: 'طاولات وكراسي إدارية' } },
      { id: 'doc2', title: 'محضر الاستلام الفني', type: 'bank', data: { accountName: 'أبو سليم', accountNo: 'WOOD-12', recentTx: 'استلام مطابق للعدد والمواصفات الفنية' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -4500,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'كل الأمور ممتازة، تم اعتماد الفاتورة وتحديث مكاتب الإدارة بنجاح.',
        ledgerEntry: { type: 'توريد مكتبي', desc: 'شراء أثاث للمكاتب الإدارية' }
      },
      {
        id: 'reject',
        cashChange: 500,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة نظامية سليمة، وتضرر النجار المحلي من تأخير المستحقات.',
        ledgerEntry: { type: 'رفض توريد', desc: 'تأخير مستحقات نجار' }
      }
    ]
  },
  {
    id: 18,
    title: 'قضية تدقيق الرسوم الجمركية للبضائع',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'كشف مراجعة الجمارك على شحنات الأجهزة الإلكترونية الواردة عبر المعبر.',
    dailyDirective: 'تعميم إداري #18: البضائع الإلكترونية تخضع لضريبة جمركية إضافية بقيمة 15% من السैलة.',
    character: { name: 'المفتش طارق', dialogue: 'هذه كشوف الجمارك لشحنة الأجهزة الواردة هذا الأسبوع.' },
    documents: [
      { id: 'doc1', title: 'كشف الرسوم الجمركية', type: 'invoice', data: { vendor: 'معبر المدينة التجاري', amount: '10,000 $', date: '2026/08/18', notes: 'رسوم جمركية إلكترونيات' } },
      { id: 'doc2', title: 'فاتورة الشحنة الأصلية', type: 'bank', data: { accountName: 'الإلكترونيات الذكية', accountNo: 'ELEC-99', recentTx: 'قيمة البضاعة الأصلية 40,000$ (الرسوم المحسوبة أقل بكثير)' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'حساب الرسوم الجمركية أقل من النسبة القانونية المفروضة 15%' },
    choices: [
      {
        id: 'approve',
        cashChange: -2000,
        stressChange: 25,
        reputationChange: 'مساءلة إدارية',
        resultText: 'اعتمدتِ رسوماً جمركية ناقصة وغير مطابقة للقانون! خسارة مالية للخزينة.',
        ledgerEntry: { type: 'قصور جمركي', desc: 'اعتماد رسوم بأقل من القيمة القانونية' }
      },
      {
        id: 'reject',
        cashChange: 3500,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'ذكاء تدقيقي مذهل يا سيدرا! كشفتِ النقص في الرسوم وأعدتِ احتسابها لصالح الخزينة.',
        ledgerEntry: { type: 'تصحيح ضريبي', desc: 'رفض رسوم ناقصة وتحصيل المستحق' }
      }
    ]
  },
  {
    id: 19,
    title: 'قضية دعم وتطوير مركز التدريب المهني',
    sector: 'قروض الأفراد والإسكان',
    description: 'إدارة مركز التدريب تطالب بصرف ميزانية تطوير قاعات التدريب التقني.',
    dailyDirective: 'تعميم إداري #19: ميزانية مراكز التدريب تتطلب إرفاق جدول المتدربين المعتمد.',
    character: { name: 'الأستاذ سعيد', dialogue: 'نستعد لبدء دورة التدريب التقني للشباب ونحتاج صرف الميزانية التشغيلية.' },
    documents: [
      { id: 'doc1', title: 'طلب ميزانية التدريب', type: 'invoice', data: { vendor: 'مركز التدريب التقني', amount: '8,000 $', date: '2026/08/19', notes: 'تطوير قاعات الحاسوب' } },
      { id: 'doc2', title: 'جدول المتدربين المسجلين', type: 'bank', data: { accountName: 'مركز التدريب التقني', accountNo: 'TRAIN-02', recentTx: 'جدول معتمد يضم 60 متدرباً مسجلاً رسمياً' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -8000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'ممتاز! تم دعم قطاع التعليم المهني واعتماد الصرف بسلاسة.',
        ledgerEntry: { type: 'دعم تدريب', desc: 'صرف ميزانية تطوير مركز التدريب' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة نظامية لمركز التدريب، مما أدى لتعطل برامج الشباب.',
        ledgerEntry: { type: 'رفض دعم', desc: 'تأخير ميزانية تدريب مهني' }
      }
    ]
  },
  {
    id: 20,
    title: 'قضية حادث تسريب مالي في الحسابات الختامية',
    sector: 'بنك المدينة المركزي',
    description: 'مطابقة الأرصدة النقدية اليومية واكتشاف فرق غير مبرر في الخزينة الفرعية.',
    dailyDirective: 'تعميم إداري #20: أي فرق نقدي يتجاوز 500$ في الإغلاق اليومي يتطلب فتح تحقيق فوري.',
    character: { name: 'المحاسب عادل', dialogue: 'يا فندم يوجد عجز طفيف في الإغلاق اليومي، ربما خطأ مطبعي بسيط.' },
    documents: [
      { id: 'doc1', title: 'تقرير الإغلاق النقدي', type: 'invoice', data: { vendor: 'خزينة الفرع الرئيسي', amount: '3,000 $', date: '2026/08/20', notes: 'تسوية النقدية اليومية' } },
      { id: 'doc2', title: 'سجل الحركات الفعلية', type: 'bank', data: { accountName: 'الخزينة العامة', accountNo: 'CASH-99', recentTx: 'عجز غير مبرر بقيمة 1,200$ بين الرصيد الفعلي والدفتري' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'وجود عجز مالي غير مبرر في السجلات يتجاوز الحد المسموح' },
    choices: [
      {
        id: 'approve',
        cashChange: -3000,
        stressChange: 30,
        reputationChange: 'مساءلة إدارية',
        resultText: 'تجاهلتِ العجز المالي وأغلقتِ الحسابات دونه، مما زاد الشبهات الإدارية.',
        ledgerEntry: { type: 'تجاهل عجز', desc: 'إغلاق حسابات مع وجود عجز مالي' }
      },
      {
        id: 'reject',
        cashChange: 2000,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'صرامة إدارية رائعة! فتحتِ تحقيقاً فورياً وأوقفتِ التمرير لكشف سبب العجز.',
        ledgerEntry: { type: 'تحقيق عجز', desc: 'إيقاف إغلاق لكشف عجز الخزينة' }
      }
    ]
  },
  {
    id: 21,
    title: 'قضية توريد اللوازم الطبية للمستوصفات',
    sector: 'قطاع الصحة والأدوية',
    description: 'شركة المستلزمات الطبية تطالب بصرف فاتورة توريد كمامات وقفازات طبية.',
    dailyDirective: 'تعميم إداري #21: فواتير المستلزمات الطبية تتطلب مطابقة رصيد المستودع الفعلي.',
    character: { name: 'د. مروة', dialogue: 'وصلت شحنة المستلزمات ووزعت على المستوصفات، نرجو صرف الفاتورة.' },
    documents: [
      { id: 'doc1', title: 'فاتورة المستلزمات', type: 'invoice', data: { vendor: 'العالمية للمستلزمات الطبية', amount: '7,500 $', date: '2026/08/21', notes: 'كمامات وقفازات معقمة' } },
      { id: 'doc2', title: 'سجل جرد المستودع', type: 'bank', data: { accountName: 'المستوصف المركزي', accountNo: 'MED-SUP-1', recentTx: 'رصيد المستودع يطابق الكمية الواردة بالكامل' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -7500,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'اعتماد سليم ومعاملة مطابقة لشروط المستوصفات الطبية.',
        ledgerEntry: { type: 'توريد مستلزمات', desc: 'صرف فاتورة مستلزمات طبية' }
      },
      {
        id: 'reject',
        cashChange: 500,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة نظامية طبية، مما أدى لنقص المواد في المستوصفات.',
        ledgerEntry: { type: 'رفض توريد طبي', desc: 'تأخير مستحقات طبية' }
      }
    ]
  },
  {
    id: 22,
    title: 'قضية رسوم تراخيص اللوحات الإعلانية',
    sector: 'المحلات التجارية والأسواق',
    description: 'شركة الدعاية والإعلان تطالب باعتماد تراخيص اللوحات الإعلانية بالشوارع.',
    dailyDirective: 'تعميم إداري #22: المساحات الإعلانية التي تتجاوز الحجم المسموح تفرض عليها رسوم مضاعفة.',
    character: { name: 'نادر (مدير الإعلانات)', dialogue: 'نقدم رسوم ترخيص اللوحات التجارية لشوارع وسط المدينة.' },
    documents: [
      { id: 'doc1', title: 'طلب ترخيص إعلانات', type: 'invoice', data: { vendor: 'شركة الإعلان الحديث', amount: '6,000 $', date: '2026/08/22', notes: 'ترخيص لوحات تجارية' } },
      { id: 'doc2', title: 'مخطط قياس المساحات', type: 'bank', data: { accountName: 'الإعلان الحديث', accountNo: 'ADS-44', recentTx: 'المساحات الفعلية تتجاوز الحد المسموح وتتطلب رسوماً مضاعفة' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'المساحات الإعلانية تتجاوز الحجم المسموح دون احتساب الرسوم المضاعفة' },
    choices: [
      {
        id: 'approve',
        cashChange: 6000,
        stressChange: 20,
        reputationChange: 'مساءلة إدارية',
        resultText: 'وافقتِ على ترخيص بمساحات مخالفة ودون استيفاء الرسوم المضاعفة.',
        ledgerEntry: { type: 'ترخيص مخالف', desc: 'اعتماد إعلانات بمساحة مخالفة' }
      },
      {
        id: 'reject',
        cashChange: 2000,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'عين واعية يا سيدرا! أوقفتِ الترخيص حتى تعديل الرسوم وفق المساحات الحقيقية.',
        ledgerEntry: { type: 'تصحيح إعلاني', desc: 'رفض ترخيص لنقص الرسوم المضاعفة' }
      }
    ]
  },
  {
    id: 23,
    title: 'قضية شبهة رشوة مقاول الصيانة',
    sector: 'قطاع المقاولات',
    description: 'مقاول صيانة يقدم هدية نقدية جانبية لتسريع اعتماد مستخلص أعمال متأخر.',
    dailyDirective: 'تعميم إداري #23: أي هدية أو مبلغ نقدي جانبي يُعتبر محاولة رشوة تستوجب الفصل والرفض الفوري.',
    character: { name: 'برهان (مقاول الصيانة)', dialogue: 'يا مديرة سيدرا، هذه عيدية بسيطة لكِ لتسهلي صرف مستخلص الصيانة اليوم!' },
    documents: [
      { id: 'doc1', title: 'مستخلص أعمال صيانة', type: 'invoice', data: { vendor: 'مؤسسة البناء السريع', amount: '10,000 $', date: '2026/08/23', notes: 'صيانة مباني الخدمات' } }
    ],
    discrepancy: { targetDoc: 'doc1', desc: 'محاولة رشوة نقدية واضحة لتمرير مستخلص دون تدقيق' },
    choices: [
      {
        id: 'approve',
        cashChange: 10000,
        stressChange: 50,
        reputationChange: 'مساءلة إدارية',
        resultText: 'كارثة أخلاقية! قبلتِ الرشوة وتم كشفكِ من لجنة النزاهة الإدارية.',
        ledgerEntry: { type: 'قبول رشوة', desc: 'سقوط إداري وقبول رشوة' }
      },
      {
        id: 'reject',
        cashChange: 4000,
        stressChange: -20,
        reputationChange: 'مدققة أمينة',
        resultText: 'شجاعة نادرة يا سيدرا! رفضتِ الرشوة وطردتِ المقاول وحافظتِ على شرف المهنة.',
        ledgerEntry: { type: 'رفض رشوة', desc: 'إحباط رشوة وحماية النزاهة' }
      }
    ]
  },
  {
    id: 24,
    title: 'قضية دعم وتجهيز مختبرات الحاسوب',
    sector: 'قروض الأفراد والإسكان',
    description: 'جامعة المدينة تطالب بصرف دفعة مشروع تجهيز مختبرات الذكاء الاصطناعي.',
    dailyDirective: 'تعميم إداري #24: مشاريع التجهيز الأكاديمي تتطلب اعتماد لجنة التطوير التكنولوجي.',
    character: { name: 'د. عماد', dialogue: 'أجهزة المختبرات وصلت، ونحتاج اعتماد صرف الدفعة المالية للشركة الموردة.' },
    documents: [
      { id: 'doc1', title: 'فاتورة تجهيز المختبرات', type: 'invoice', data: { vendor: 'التقنية المتقدمة للبرمجيات', amount: '15,000 $', date: '2026/08/24', notes: 'أجهزة حاسوب متطورة' } },
      { id: 'doc2', title: 'اعتماد لجنة التطوير التكنولوجي', type: 'bank', data: { accountName: 'التقنية المتقدمة', accountNo: 'TECH-101', recentTx: 'اعتماد رسمي وموقع من رئيس لجنة التطوير' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -15000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'إنجاز تكنولوجي رائع! تم دعم البنية التقنية للمدينة بنجاح.',
        ledgerEntry: { type: 'دعم تقني', desc: 'صرف دفعة مختبرات الحاسوب' }
      },
      {
        id: 'reject',
        cashChange: 2000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة تطوير أكاديمي سليمة، مما أخر افتتاح المختبر.',
        ledgerEntry: { type: 'رفض تطوير', desc: 'تعطيل تجهيز مختبرات' }
      }
    ]
  },
  {
    id: 25,
    title: 'قضية مراجعة الحسابات الختامية لمنتصف الشهر',
    sector: 'بنك المدينة المركزي',
    description: 'إعداد تقرير التدقيق المالي النصف شهري ومطابقة حركة الإيرادات والمصروفات.',
    dailyDirective: 'تعميم إداري #25: التدقيق النصف شهري يتطلب تطابق رصيد الصندوق مع القيود اليومية.',
    character: { name: 'المراجع الرئيسي', dialogue: 'سيدرا، هذا تقرير منتصف الشهر، أرجو اعتماده لختام النصف الأول.' },
    documents: [
      { id: 'doc1', title: 'تقرير التدقيق النصف شهري', type: 'invoice', data: { vendor: 'قسم التدقيق الداخلي', amount: '12,000 $', date: '2026/08/25', notes: 'تسوية النصف الأول من الشهر' } },
      { id: 'doc2', title: 'سجل القيود اليومية', type: 'bank', data: { accountName: 'الحسابات العامة', accountNo: 'AUDIT-MID', recentTx: 'تطابق تام ومثالي بين كافة القيود والإيرادات' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: 12000,
        stressChange: -15,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'ممتاز يا سيدرا! إغلاق نصف شهري باهر ودقيق للغاية.',
        ledgerEntry: { type: 'تدقيق نصف شهري', desc: 'إغلاق وتسوية النصف الأول' }
      },
      {
        id: 'reject',
        cashChange: -2000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ تسوية صحيحة ومثبتة، مما أربك حسابات القسم المالي.',
        ledgerEntry: { type: 'خطأ تسوية', desc: 'رفض إغلاق نصف شهري صحيح' }
      }
    ]
  },
  {
    id: 26,
    title: 'قضية توريد اللحوم والمواد الغذائية للمستشفيات',
    sector: 'قطاع الصحة والأدوية',
    description: 'مؤسسة التموين الغذائي تطالب بصرف فاتورة توريد اللحوم لقسم التغذية بالمستشفى.',
    dailyDirective: 'تعميم إداري #26: شحنات الأغذية الطازجة تتطلب شهادة فحص بيطري خالية من الملاحظات.',
    character: { name: 'مسؤول التغذية سامي', dialogue: 'وصلت شحنة الأغذية الطازجة للمستشفى، ونحتاج تسيير الفاتورة المالية.' },
    documents: [
      { id: 'doc1', title: 'فاتورة التوريد الغذائي', type: 'invoice', data: { vendor: 'مؤسسة التموين الطازج', amount: '8,000 $', date: '2026/08/26', notes: 'لحوم ومستلزمات قسم التغذية' } },
      { id: 'doc2', title: 'شهادة الفحص البيطري', type: 'bank', data: { accountName: 'التموين الطازج', accountNo: 'MEAT-09', recentTx: 'شهادة فحص بيطري موقوفة لوجود ملاحظات صحية' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'شهادة الفحص البيطري تحمل ملاحظات صحية تمنع قبول الشحنة' },
    choices: [
      {
        id: 'approve',
        cashChange: -8000,
        stressChange: 30,
        reputationChange: 'مساءلة إدارية',
        resultText: 'كارثة صحية! وافقتِ على صرف مستحقات أغذية بشهادة بيطري مرفوضة.',
        ledgerEntry: { type: 'صرف غذائي خطير', desc: 'اعتماد شحنة أغذية بملاحظات صحية' }
      },
      {
        id: 'reject',
        cashChange: 1500,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'حماية ممتازة لمرضى المستشفى يا سيدرا! رفضتِ الشحنة فوراً.',
        ledgerEntry: { type: 'حماية صحية', desc: 'رفض شحنة أغذية لملاحظات بيطرية' }
      }
    ]
  },
  {
    id: 27,
    title: 'قضية تراخيص المقاهي الليلية والترفيهية',
    sector: 'قطاع المطاعم والمقاهي',
    description: 'طلب تجديد رخصة نشاط ترفيهي لمقهى ليلي في وسط المدينة.',
    dailyDirective: 'تعميم إداري #27: المقاهي الليلية تتطلب التزاماً تاماً بساعات الإغلاق المعتمدة وعدم وجود شكاوى إزعاج.',
    character: { name: 'مازن (صاحب المقهى)', dialogue: 'نطلب تجديد رخصة النشاط الليلي، التزمنا بكافة الشروط.' },
    documents: [
      { id: 'doc1', title: 'طلب تجديد رخصة ترفيهية', type: 'invoice', data: { vendor: 'مقهى السهر الجميل', amount: '5,000 $', date: '2026/08/27', notes: 'رسم ترخيص نشاط ليلي' } },
      { id: 'doc2', title: 'سجل شكاوى الجوار والشرطة', type: 'bank', data: { accountName: 'مازن الليلي', accountNo: 'CAFE-99', recentTx: 'وجود 4 شكاوى إزعاج مسجلة من الجيران لدى مركز الشرطة' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'وجود شكاوى جوار متعددة تمنع تجديد الترخيص الليلي' },
    choices: [
      {
        id: 'approve',
        cashChange: 5000,
        stressChange: 20,
        reputationChange: 'مساءلة إدارية',
        resultText: 'جددتِ الرخصة متجاهلة شكاوى الجوار الرسمية، وتلقت إدارتك إنذاراً.',
        ledgerEntry: { type: 'تجديد مخالف', desc: 'تجديد ترخيص رغم شكاوى الجوار' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'موقف حازم وصحيح يا سيدرا! أوقفتِ التجديد حتى تسوية شكاوى السكان.',
        ledgerEntry: { type: 'إيقاف ترخيص', desc: 'رفض تجديد لمخالفة شكاوى الجوار' }
      }
    ]
  },
  {
    id: 28,
    title: 'قضية تطوير برمجيات الأرشيف الرقمي',
    sector: 'التكنولوجيا والاتصالات',
    description: 'شركة البرمجيات تطالب بصرف الدفعة الأخيرة لمشروع الأرشيف الرقمي للمكتب.',
    dailyDirective: 'تعميم إداري #28: مشاريع البرمجيات تتطلب اجتياز اختبار الأمان السيبراني الشامل.',
    character: { name: 'المهندس رامي', dialogue: 'أنهينا برمجة وتأمين نظام الأرشيف الرقمي بالكامل.' },
    documents: [
      { id: 'doc1', title: 'فاتورة تطوير البرمجيات', type: 'invoice', data: { vendor: 'الأنظمة الرقمية الذكية', amount: '11,000 $', date: '2026/08/28', notes: 'أرشيف المستندات الرقمي' } },
      { id: 'doc2', title: 'شهادة اجتياز اختبار الأمان', type: 'bank', data: { accountName: 'الأنظمة الرقمية', accountNo: 'SOFT-04', recentTx: 'شهادة أمان معتمدة ومجتازة بنجاح تام' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -11000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'اعتماد موفق! تم تطوير الأرشيف الرقمي بنجاح وأمان تام.',
        ledgerEntry: { type: 'تطوير برمجيات', desc: 'صرف مستحقات الأرشيف الرقمي' }
      },
      {
        id: 'reject',
        cashChange: 1500,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ مشروعاً تقنياً سليماً ومجتازاً للاختبار، مما أخر التحديث.',
        ledgerEntry: { type: 'رفض تقني', desc: 'تعطيل دفعات البرمجيات' }
      }
    ]
  },
  {
    id: 29,
    title: 'قضية فواتير صيانة أسطول سيارات البلدية',
    sector: 'الخدمات العامة والبلدية',
    description: 'ورشة الميكانيكا تطالب بصرف تكلفة صيانة سيارات النظافة والطوارئ.',
    dailyDirective: 'تعميم إداري #29: فواتير صيانة السيارات تتطلب إرفاق تقرير تشخيص الأعطال القديم.',
    character: { name: 'الميكانيكي سعيد', dialogue: 'أصلحنا سيارات النظافة المعطلة، والفاتورة جاهزة للصرف.' },
    documents: [
      { id: 'doc1', title: 'فاتورة صيانة الأسطول', type: 'invoice', data: { vendor: 'ورشة المدينة المركزية', amount: '6,500 $', date: '2026/08/29', notes: 'صيانة سيارات الطوارئ' } },
      { id: 'doc2', title: 'تقرير تشخيص الأعطال', type: 'bank', data: { accountName: 'ورشة المدينة', accountNo: 'CARS-11', recentTx: 'تقرير تشخيص الأعطال مفقود وغير مرفق بالملف' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'غياب تقرير تشخيص الأعطال الإلزامي لفواتير الصيانة' },
    choices: [
      {
        id: 'approve',
        cashChange: -6500,
        stressChange: 15,
        reputationChange: 'مساءلة إدارية',
        resultText: 'صرفتِ تكلفة الصيانة دون تقرير التشخيص، وتم تسجيل ملاحظة إدارية.',
        ledgerEntry: { type: 'صرف غير مستندي', desc: 'اعتماد صيانة بدون تقرير أعطال' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'تدقيق دقيق يا سيدرا! أوقفتِ الصرف حتى إرفاق التقرير الفني.',
        ledgerEntry: { type: 'تدقيق احترازي', desc: 'رفض صيانة لنقص تقرير الأعطال' }
      }
    ]
  },
  {
    id: 30,
    title: 'قضية تدقيق الرسوم الضريبية للمجمعات التجارية',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'كشف الضرائب السنوية لأكبر مجمع تجاري في وسط المدينة.',
    dailyDirective: 'تعميم إداري #30: المجمعات التجارية الكبرى تخضع لضريبة أرباح سنوية بنسبة 20%.',
    character: { name: 'المفتشة ليلى', dialogue: 'هذا كشف حساب أرباح المجمع التجاري والضريبة المستحقة عليها.' },
    documents: [
      { id: 'doc1', title: 'كشف الضريبة المستحقة', type: 'invoice', data: { vendor: 'المجمع التجاري الكبير', amount: '18,000 $', date: '2026/08/30', notes: 'ضريبة الأرباح السنوية' } },
      { id: 'doc2', title: 'سجل الأرباح الفعلي', type: 'bank', data: { accountName: 'المجمع التجاري', accountNo: 'MALL-01', recentTx: 'إجمالي الأرباح الحقيقية يتطلب ضريبة بقيمة 25,000$' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'الضريبة المحسوبة أقل بكثير من نسبة 20% المستحقة على أرباح المجمع' },
    choices: [
      {
        id: 'approve',
        cashChange: 18000,
        stressChange: 25,
        reputationChange: 'مساءلة إدارية',
        resultText: 'اعتمدتِ ضريبة ناقصة للمجمع التجاري، مما حرم الخزينة من إيرادات هامة.',
        ledgerEntry: { type: 'قصور ضريبي', desc: 'قبول ضريبة بأقل من النسبة المقررة' }
      },
      {
        id: 'reject',
        cashChange: 7000,
        stressChange: -15,
        reputationChange: 'مدققة أمينة',
        resultText: 'عبقرية مالية يا سيدرا! كشفتِ التلاعب الضريبي وحصلتِ المبلغ كاملاً لصالح الخزينة.',
        ledgerEntry: { type: 'تصحيح ضريبي كبير', desc: 'رفض ضريبة ناقصة وتحصيل المستحق كاملاً' }
      }
    ]
  },
  {
    id: 31,
    title: 'قضية توريد الأجهزة الرياضية للحدائق العامة',
    sector: 'الخدمات العامة والبلدية',
    description: 'شركة التوريدات العامة تطالب بصرف دفعة أجهزة اللياقة البدنية للحدائق.',
    dailyDirective: 'تعميم إداري #31: توريد المعدات العامة يتطلب كفالة صيانة سارية لمدة عامين.',
    character: { name: 'المقاول جلال', dialogue: 'ركبنا الأجهزة الرياضية في حديقة المدينة، ونطالب بصرف الشيك.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الأجهزة الرياضية', type: 'invoice', data: { vendor: 'معدات اللياقة العامة', amount: '9,000 $', date: '2026/08/31', notes: 'أجهزة رياضية للحدائق' } },
      { id: 'doc2', title: 'وثيقة كفالة الصيانة', type: 'bank', data: { accountName: 'اللياقة العامة', accountNo: 'GYM-55', recentTx: 'وثيقة كفالة صيانة معتمدة لمدة عامين كاملين' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -9000,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'عمل ممتاز، تم اعتماد التوريد ودعم المرافق العامة للمدينة.',
        ledgerEntry: { type: 'توريد عام', desc: 'صرف دفعة أجهزة الحدائق' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة نظامية سليمة، مما أخر افتتاح المرافق الرياضية.',
        ledgerEntry: { type: 'رفض توريد عام', desc: 'تعطيل مستحقات مرافق' }
      }
    ]
  },
  {
    id: 32,
    title: 'قضية تدقيق حسابات الإعلانات الطرقية',
    sector: 'المحلات التجارية والأسواق',
    description: 'مراجعة عوائد الإعلانات الطرقية لشهر أغسطس ومطابقتها مع الإيرادات.',
    dailyDirective: 'تعميم إداري #32: عوائد الإعلانات يجب أن تودع في حساب الخزينة خلال 24 ساعة من تحصيلها.',
    character: { name: 'محاسب الإعلانات', dialogue: 'هذه إيرادات الإعلانات الطرقية لشهر أغسطس جاهزة للمطابقة.' },
    documents: [
      { id: 'doc1', title: 'كشف إيرادات الإعلانات', type: 'invoice', data: { vendor: 'قسم الإعلانات', amount: '14,000 $', date: '2026/08/32', notes: 'حصيلة إعلانات الطرق' } },
      { id: 'doc2', title: 'إيصالات الإيداع البنكي', type: 'bank', data: { accountName: 'حساب الإعلانات', accountNo: 'AD-DEP-1', recentTx: 'إيصالات إيداع مطابقة ومودعة في الموعد المحدد' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: 14000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'كل الحسابات مطابقة والأموال أودعت في مواعيدها بدقة تامة.',
        ledgerEntry: { type: 'إيرادات إعلانات', desc: 'مطابقة وإيداع عوائد الإعلانات' }
      },
      {
        id: 'reject',
        cashChange: -2000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ مطابقة سليمة، مما أربك السجلات الإيرادية للقسم.',
        ledgerEntry: { type: 'خطأ مطابقة', desc: 'رفض إيرادات صحيحة' }
      }
    ]
  },
  {
    id: 33,
    title: 'قضية شبهة رشوة تمرير شحنة مخالفة',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'مستورد محاولاً تقديم رشوة مالية لتمرير شحنة بضائع منتهية الصلاحية دون إتلاف.',
    dailyDirective: 'تعميم إداري #33: أي محاولة لتمرير بضائع تالفة تعرض للمساءلة القانونية والفصل الفوري.',
    character: { name: 'حسام (المستورد المخالف)', dialogue: 'يا سيدرا، هذه هدية خاصة لكِ ودعي الشحنة تعبر المستودع بهدوء!' },
    documents: [
      { id: 'doc1', title: 'طلب فسح شحنة تجارية', type: 'invoice', data: { vendor: 'استيراد المواد الاستهلاكية', amount: '13,000 $', date: '2026/08/33', notes: 'سلع استهلاكية متنوعة' } }
    ],
    discrepancy: { targetDoc: 'doc1', desc: 'محاولة رشوة واضحة لتمرير شحنة تالفة دون فحص أو إتلاف' },
    choices: [
      {
        id: 'approve',
        cashChange: 13000,
        stressChange: 55,
        reputationChange: 'مساءلة إدارية',
        resultText: 'فضيحة كبرى! وافقتِ على رشوة وتم ضبط الشحنة التالفة بمعرفة لجان الرقابة العليا.',
        ledgerEntry: { type: 'فساد إداري', desc: 'قبول رشوة وفسح بضاعة تالفة' }
      },
      {
        id: 'reject',
        cashChange: 5000,
        stressChange: -20,
        reputationChange: 'مدققة أمينة',
        resultText: 'نزاهة أسطورية يا سيدرا! أبلغتِ عن الرشوة وأحبطتِ دخول السلع التالفة للمدينة.',
        ledgerEntry: { type: 'إحباط رشوة', desc: 'رفض رشوة وحماية أمن المستهلك' }
      }
    ]
  },
  {
    id: 34,
    title: 'قضية تمويل إنشاء المدارس الابتدائية',
    sector: 'قروض الأفراد والإسكان',
    description: 'مقاول قطاع التعليم يطلب صرف الدفعة الثانية لبناء المدرسة الابتدائية الجديدة.',
    dailyDirective: 'تعميم إداري #34: مشاريع المدارس تتطلب شهادة إنجاز هندسي بنسبة لا تقل عن 50%.',
    character: { name: 'المهندس فؤاد', dialogue: 'أنجزنا هيكل المدرسة بالكامل، ونطالب بصرف دفعة المقاولات.' },
    documents: [
      { id: 'doc1', title: 'فاتورة مشروع المدرسة', type: 'invoice', data: { vendor: 'الإنشاءات التعليمية الحديثة', amount: '20,000 $', date: '2026/08/34', notes: 'بناء وتأسيس المدرسة الابتدائية' } },
      { id: 'doc2', title: 'شهادة الإنجاز الهندسي', type: 'bank', data: { accountName: 'الإنشاءات التعليمية', accountNo: 'EDU-01', recentTx: 'شهادة إنجاز تؤكد إتمام 55% من الهيكل الإنشائي' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -20000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'دعم عظيم لقطاع التعليم! تم اعتماد الصرف وفق نسبة الإنجاز الصحيحة.',
        ledgerEntry: { type: 'تمويل تعليمي', desc: 'صرف دفعة بناء مدرسة' }
      },
      {
        id: 'reject',
        cashChange: 3000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة تعليمية مستوفية للشروط، مما أخر إنجاز المدرسة.',
        ledgerEntry: { type: 'رفض تعليمي', desc: 'تعطيل تمويل بناء مدرسة' }
      }
    ]
  },
  {
    id: 35,
    title: 'قضية مراجعة فواتير استهلاك الكهرباء الحكومية',
    sector: 'الخدمات العامة والبلدية',
    description: 'شركة الكهرباء تطالب بسداد الفواتير الشهرية المجمعة للمرافق والمكاتب.',
    dailyDirective: 'تعميم إداري #35: فواتير الكهرباء يجب أن تطابق قراءات العدادات الفعلية لكل مبنى.',
    character: { name: 'ممثل شركة الكهرباء', dialogue: 'هذه فواتير استهلاك الكهرباء الشهرية لكافة المرافق التابعة.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الكهرباء المجمعة', type: 'invoice', data: { vendor: 'شركة الكهرباء الوطنية', amount: '8,500 $', date: '2026/08/35', notes: 'استهلاك مرافق المكتب والبلدية' } },
      { id: 'doc2', title: 'قراءات العدادات الفعلية', type: 'bank', data: { accountName: 'شركة الكهرباء', accountNo: 'ELEC-900', recentTx: 'تطابق تام بين الاستهلاك الفعلي والقيمة المطلوبة في الفاتورة' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -8500,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'تدقيق سليم ومطابق للقراءات الفعلية، تم سداد الفاتورة بنجاح.',
        ledgerEntry: { type: 'سداد مرافق', desc: 'دفع فاتورة استهلاك الكهرباء' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ سداد فاتورة نظامية، مما هدد بقطع التيار عن المرافق.',
        ledgerEntry: { type: 'رفض سداد', desc: 'تأخير فاتورة كهرباء' }
      }
    ]
  },
  {
    id: 36,
    title: 'قضية تدقيق الرواتب الإضافية والمكافآت',
    sector: 'بنك المدينة المركزي',
    description: 'كشف المكافآت الإضافية للعاملين بمناسبة إنجاز الربع السنوي.',
    dailyDirective: 'تعميم إداري #36: المكافآت الإضافية تتطلب موافقة وتوقيع لجنة الموارد البشرية.',
    character: { name: 'مدير الموارد البشرية', dialogue: 'تفضلي كشف المكافآت الإضافية المخصصة للموظفين المتميزين.' },
    documents: [
      { id: 'doc1', title: 'كشف المكافآت', type: 'invoice', data: { vendor: 'قسم الموارد البشرية', amount: '7,000 $', date: '2026/08/36', notes: 'مكافآت التميز الربع سنوية' } },
      { id: 'doc2', title: 'موافقة لجنة الموارد البشرية', type: 'bank', data: { accountName: 'الموارد البشرية', accountNo: 'HR-APPROVAL', recentTx: 'موافقة رسمية موقعة من رئيس لجنة الموارد' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -7000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'خطوة رائعة لتحفيز العاملين ورفع الروح المعنوية في المكتب.',
        ledgerEntry: { type: 'صرف مكافآت', desc: 'اعتماد مكافآت التميز للموظفين' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ كشف المكافآت السليم، مما أدى لحالة إحباط عامة بين العاملين.',
        ledgerEntry: { type: 'رفض مكافآت', desc: 'تعطيل صرف مكافآت الموظفين' }
      }
    ]
  },
  {
    id: 37,
    title: 'قضية صيانة أجهزة شبكة الاتصالات المركزية',
    sector: 'التكنولوجيا والاتصالات',
    description: 'شركة الاتصالات تطالب بصرف تكلفة صيانة مقاسم ومراكز الشبكة.',
    dailyDirective: 'تعميم إداري #37: عقود صيانة الاتصالات تتطلب اعتماد مهندس أمن الشبكات.',
    character: { name: 'المهندس زياد', dialogue: 'أجرينا الصيانة الشاملة لمقاسم الاتصالات المركزية.' },
    documents: [
      { id: 'doc1', title: 'فاتورة صيانة الشبكة', type: 'invoice', data: { vendor: 'الشبكات المتقدمة للاتصالات', amount: '5,500 $', date: '2026/08/37', notes: 'صيانة مقاسم الاتصالات' } },
      { id: 'doc2', title: 'اعتماد أمن الشبكات', type: 'bank', data: { accountName: 'الشبكات المتقدمة', accountNo: 'NET-09', recentTx: 'اعتماد مفقود وغير موثق من مهندس أمن الشبكات' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'غياب اعتماد مهندس أمن الشبكات الإلزامي لفاتورة الصيانة' },
    choices: [
      {
        id: 'approve',
        cashChange: -5500,
        stressChange: 15,
        reputationChange: 'مساءلة إدارية',
        resultText: 'اعتمدتِ الصيانة بدون اعتماد مهندس أمن الشبكات، مما يشكل ثغرة أمنية.',
        ledgerEntry: { type: 'صرف غير موثق', desc: 'اعتماد صيانة بدون اعتماد أمني' }
      },
      {
        id: 'reject',
        cashChange: 500,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'تدقيق تقني رفيع يا سيدرا! أوقفتِ الصرف حتى اعتماد أمن الشبكات.',
        ledgerEntry: { type: 'تدقيق أمني', desc: 'رفض صيانة لنقص الاعتماد الأمني' }
      }
    ]
  },
  {
    id: 38,
    title: 'قضية تدقيق الرسوم الضريبية لشركات المقاولات الكبرى',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'مراجعة كشوف الضرائب السنوية لشركات المقاولات الكبرى العاملة بالمدينة.',
    dailyDirective: 'تعميم إداري #38: شركات المقاولات تخضع لضريبة أرباح مشاريع بنسبة 18%.',
    character: { name: 'المفتش ماجد', dialogue: 'هذه كشوف أرباح شركات المقاولات والضرائب المستحقة عليها.' },
    documents: [
      { id: 'doc1', title: 'كشف ضريبة المقاولات', type: 'invoice', data: { vendor: 'شركات المقاولات الكبرى', amount: '16,000 $', date: '2026/08/38', notes: 'ضريبة مشاريع المقاولات' } },
      { id: 'doc2', title: 'سجل إيرادات المشاريع الفعلي', type: 'bank', data: { accountName: 'شركات المقاولات', accountNo: 'CON-TAX', recentTx: 'إجمالي الأرباح يتطلب ضريبة بقيمة 22,000$' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'الضريبة المسددة أقل من النسبة المقررة 18% على أرباح المشاريع' },
    choices: [
      {
        id: 'approve',
        cashChange: 16000,
        stressChange: 20,
        reputationChange: 'مساءلة إدارية',
        resultText: 'وافقتِ على ضريبة ناقصة، مما أدى لخسارة إيرادات ضريبية مستحقة.',
        ledgerEntry: { type: 'قصور ضريبي', desc: 'اعتماد ضريبة مقاولات بأقل من النسبة' }
      },
      {
        id: 'reject',
        cashChange: 6000,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'عين تدقيقية ممتازة يا سيدرا! كشفتِ النقص وحصلتِ المبلغ كاملاً.',
        ledgerEntry: { type: 'تصحيح ضريبي', desc: 'رفض ضريبة ناقصة وتحصيل الفارق' }
      }
    ]
  },
  {
    id: 39,
    title: 'قضية توريد الأدوية التخصصية للمستشفيات',
    sector: 'قطاع الصحة والأدوية',
    description: 'شركة التوريدات الطبية تطالب بصرف فاتورة أدوية العمليات الجراحية التخصصية.',
    dailyDirective: 'تعميم إداري #39: الأدوية التخصصية تتطلب مطابقة رقم الشحنة مع ترخيص الاستيراد الدولي.',
    character: { name: 'د. ناصر', dialogue: 'وصلت الأدوية التخصصية للعمليات ونحتاج صرف المستحقات المالية.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الأدوية التخصصية', type: 'invoice', data: { vendor: 'الأدوية التخصصية الدولية', amount: '19,000 $', date: '2026/08/39', notes: 'مستلزمات وأدوية العمليات الجراحية' } },
      { id: 'doc2', title: 'ترخيص الاستيراد الدولي', type: 'bank', data: { accountName: 'الأدوية التخصصية', accountNo: 'SPEC-MED', recentTx: 'رقم الشحنة مطابق تماماً لترخيص الاستيراد الدولي' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -19000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'اعتماد سليم ومهم جداً لدعم غرف العمليات والمستشفيات.',
        ledgerEntry: { type: 'توريد تخصصي', desc: 'صرف أدوية العمليات الجراحية' }
      },
      {
        id: 'reject',
        cashChange: 2500,
        stressChange: 20,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة أدوية تخصصية سليمة، مما تسبب بأزمة في غرف العمليات.',
        ledgerEntry: { type: 'رفض طبي تخصصي', desc: 'تعطيل توريد أدوية عمليات' }
      }
    ]
  },
  {
    id: 40,
    title: 'قضية تدقيق الرسوم البلدية للمنشآت السياحية',
    sector: 'الخدمات العامة والبلدية',
    description: 'كشف الرسوم والضرائب البلدية السنوية للفنادق والمنتجعات السياحية.',
    dailyDirective: 'تعميم إداري #40: المنشآت السياحية تخضع لرسوم خدمات بلدية بنسبة 10% من إجمالي الإيرادات.',
    character: { name: 'المسؤول السياحي عاصم', dialogue: 'تفضل كشف إيرادات المنتجع السياحي والرسوم البلدية المقررة.' },
    documents: [
      { id: 'doc1', title: 'كشف الرسوم البلدية', type: 'invoice', data: { vendor: 'منتجع الواحة السياحي', amount: '11,000 $', date: '2026/08/40', notes: 'رسوم الخدمات البلدية السنوية' } },
      { id: 'doc2', title: 'سجل إيرادات المنتجع الفعلي', type: 'bank', data: { accountName: 'منتجع الواحة', accountNo: 'RESORT-1', recentTx: 'إجمالي الإيرادات الحقيقية يتطلب رسوماً بقيمة 15,000$' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'الرسوم المسددة أقل بكثير من نسبة 10% المقررة على إيرادات المنتجع' },
    choices: [
      {
        id: 'approve',
        cashChange: 11000,
        stressChange: 20,
        reputationChange: 'مساءلة إدارية',
        resultText: 'اعتمدتِ رسوماً بلدية ناقصة للمنتجع السياحي، وخسرت الخزينة الفارق.',
        ledgerEntry: { type: 'قصور بلدي', desc: 'قبول رسوم سياحية بأقل من النسبة' }
      },
      {
        id: 'reject',
        cashChange: 4000,
        stressChange: -10,
        reputationChange: 'مدققة أمينة',
        resultText: 'مراجعة ممتازة يا سيدرا! كشفتِ النقص وحصلتِ الرسوم البلدية كاملة.',
        ledgerEntry: { type: 'تصحيح بلدي', desc: 'رفض رسوم ناقصة وتحصيل الفارق السياحي' }
      }
    ]
  },
  {
    id: 41,
    title: 'قضية تمويل مشاريع الطاقة المتجددة للمنازل',
    sector: 'قروض الأفراد والإسكان',
    description: 'شركة الطاقة النظيفة تقدم طلب قروض مدعومة لتركيب ألواح طاقة للمواطنين.',
    dailyDirective: 'تعميم إداري #41: قروض الطاقة النظيفة تتطلب اعتماد المواصفات من وزارة البيئة.',
    character: { name: 'المهندس سامر', dialogue: 'نقدم طلب تمويل تركيب ألواح الطاقة لـ 30 منزلاً في الأحياء.' },
    documents: [
      { id: 'doc1', title: 'طلب تمويل طاقة نظيفة', type: 'invoice', data: { vendor: 'الطاقة الخضراء للمنازل', amount: '12,000 $', date: '2026/08/41', notes: 'دعم تركيب ألواح شمسية منزلية' } },
      { id: 'doc2', title: 'اعتماد وزارة البيئة', type: 'bank', data: { accountName: 'الطاقة الخضراء', accountNo: 'GREEN-01', recentTx: 'اعتماد مواصفات رسمي وموقع من وزارة البيئة' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -12000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'خطوة بيئية واقتصادية رائعة لدعم المنازل والطاقة النظيفة!',
        ledgerEntry: { type: 'تمويل بيئي', desc: 'اعتماد قرض دعم الطاقة النظيفة' }
      },
      {
        id: 'reject',
        cashChange: 1500,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة تمويل بيئي نظامية، مما أخر دعم المنازل بالطاقة.',
        ledgerEntry: { type: 'رفض تمويل بيئي', desc: 'تعطيل قروض الطاقة النظيفة' }
      }
    ]
  },
  {
    id: 42,
    title: 'قضية تدقيق حسابات الصندوق الاحتياطي الطارئ',
    sector: 'بنك المدينة المركزي',
    description: 'مراجعة قيود وأرصدة الصندوق الاحتياطي الطارئ للمكتب بنهاية الشهر.',
    dailyDirective: 'تعميم إداري #42: الصندوق الاحتياطي يجب ألا يقل رصيده عن الحد الأدنى الآمن ($50,000).',
    character: { name: 'المراجع المالي حسام', dialogue: 'تفضل كشف حساب الصندوق الاحتياطي الطارئ وموازنته.' },
    documents: [
      { id: 'doc1', title: 'تقرير موازنة الاحتياطي', type: 'invoice', data: { vendor: 'قسم الخزينة المركزية', amount: '10,000 $', date: '2026/08/42', notes: 'تسوية الصندوق الاحتياطي' } },
      { id: 'doc2', title: 'سجل الرصيد الفعلي', type: 'bank', data: { accountName: 'الصندوق الاحتياطي', accountNo: 'RESERVE-0', recentTx: 'الرصيد الحالي يهبط إلى ما دون الحد الأدنى الآمن بقيمة كبيرة' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'رصيد الصندوق الاحتياطي أقل بكثير من الحد الأدنى الآمن القانوني' },
    choices: [
      {
        id: 'approve',
        cashChange: -10000,
        stressChange: 35,
        reputationChange: 'مساءلة إدارية',
        resultText: 'اعتمدتِ تسوية تستنزف الاحتياطي دون الانتباه لهبوطه دون الحد الآمن!',
        ledgerEntry: { type: 'استنزاف احتياطي', desc: 'تجاوز الحد الأدنى لصندوق الطوارئ' }
      },
      {
        id: 'reject',
        cashChange: 3000,
        stressChange: -15,
        reputationChange: 'مدققة أمينة',
        resultText: 'حكمة مالية فائقة يا سيدرا! أوقفتِ التسوية للحفاظ على أمان الصندوق الاحتياطي.',
        ledgerEntry: { type: 'حماية الاحتياطي', desc: 'رفض صرف لحماية صندوق الطوارئ' }
      }
    ]
  },
  {
    id: 43,
    title: 'قضية توريد الأجهزة المخبرية لمديرية الصحة',
    sector: 'قطاع الصحة والأدوية',
    description: 'شركة التجهيزات المخبرية تطالب بصرف فاتورة أجهزة فحص الفيروسات.',
    dailyDirective: 'تعميم إداري #43: الأجهزة المخبرية المتقدمة تتطلب شهادة منشأ أصلية ومعتمدة.',
    character: { name: 'د. هاني', dialogue: 'وصلت أجهزة الفحص المخبري الحديثة للمديرية، ونحتاج تسيير الشيك.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الأجهزة المخبرية', type: 'invoice', data: { vendor: 'المخابر المتطورة للتجهيز', amount: '17,000 $', date: '2026/08/43', notes: 'أجهزة فحص ومعدات مخبرية' } },
      { id: 'doc2', title: 'شهادة المنشأ الأصلية', type: 'bank', data: { accountName: 'المخابر المتطورة', accountNo: 'LAB-99', recentTx: 'شهادة منشأ أصلية وموثقة من الغرفة التجارية' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -17000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'اعتماد سليم وموفق، تم تزويد مديرية الصحة بأحدث أجهزة الفحص.',
        ledgerEntry: { type: 'تجهيز مخبري', desc: 'صرف فاتورة أجهزة الفحص المخبري' }
      },
      {
        id: 'reject',
        cashChange: 2000,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة تجهيز مخبري سليمة، مما أخر الفحوصات الطبية الحيوية.',
        ledgerEntry: { type: 'رفض تجهيز مخبري', desc: 'تعطيل شراء أجهزة فحص' }
      }
    ]
  },
  {
    id: 44,
    title: 'قضية تدقيق الرسوم الضريبية لشركات الاتصالات',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'كشف مراجعة الضرائب السنوية لشبكات وشركات الاتصالات العاملة بالمدينة.',
    dailyDirective: 'تعميم إداري #44: شركات الاتصالات تخضع لضريبة أرباح سنوية خاصة بنسبة 25%.',
    character: { name: 'المفتش ناصر', dialogue: 'هذا كشف أرباح شركات الاتصالات والضريبة المستحقة سنوياً.' },
    documents: [
      { id: 'doc1', title: 'كشف ضريبة الاتصالات', type: 'invoice', data: { vendor: 'شبكات الاتصالات الكبرى', amount: '22,000 $', date: '2026/08/44', notes: 'ضريبة أرباح الاتصالات' } },
      { id: 'doc2', title: 'سجل الأرباح الفعلي', type: 'bank', data: { accountName: 'شبكات الاتصالات', accountNo: 'TEL-TAX', recentTx: 'إجمالي الأرباح الحقيقية يتطلب ضريبة بقيمة 30,000$' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'الضريبة المسددة أقل بكثير من نسبة 25% المقررة على أرباح الاتصالات' },
    choices: [
      {
        id: 'approve',
        cashChange: 22000,
        stressChange: 30,
        reputationChange: 'مساءلة إدارية',
        resultText: 'اعتمدتِ ضريبة ناقصة لشركة الاتصالات، وفقدت الخزينة إيرادات ضخمة.',
        ledgerEntry: { type: 'قصور ضريبي كبير', desc: 'قبول ضريبة اتصالات بأقل من النسبة' }
      },
      {
        id: 'reject',
        cashChange: 8000,
        stressChange: -20,
        reputationChange: 'مدققة أمينة',
        resultText: 'ضربة معلم مالية يا سيدرا! كشفتِ النقص وحصلتِ الضريبة كاملة لصالح الخزينة.',
        ledgerEntry: { type: 'تصحيح ضريبي ضخم', desc: 'رفض ضريبة ناقصة وتحصيل الفارق كاملاً' }
      }
    ]
  },
  {
    id: 45,
    title: 'قضية تدقيق مستحقات أمن وحراسة المنشآت',
    sector: 'قطاع الخدمات',
    description: 'شركة الحراسة الأمنية تطالب بصرف مستحقات حراسة المباني والمقرات.',
    dailyDirective: 'تعميم إداري #45: عقود الحراسة الأمنية تتطلب حضور أفراد الحراسة ومطابقة سجلات الدوام.',
    character: { name: 'قائد الحراس طارق', dialogue: 'قدمنا كشوف دوام الحراس لشهر أغسطس، ونطالب بصرف المستحقات.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الحراسة الأمنية', type: 'invoice', data: { vendor: 'الدرع الأمني للحراسة', amount: '7,000 $', date: '2026/08/45', notes: 'خدمات حراسة المباني' } },
      { id: 'doc2', title: 'سجلات الدوام الفعلي', type: 'bank', data: { accountName: 'الدرع الأمني', accountNo: 'GUARD-01', recentTx: 'سجلات الدوام مطابقة وموقعة من المشرف المناوب' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -7000,
        stressChange: -5,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'تدقيق سليم ومطابق لسجلات الدوام، تم اعتماد صرف مستحقات الحراسة.',
        ledgerEntry: { type: 'أجور حراسة', desc: 'صرف مستحقات الحراسة الأمنية' }
      },
      {
        id: 'reject',
        cashChange: 1000,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة أمنية سليمة، مما أدى لشكوى من شركة الحراسة.',
        ledgerEntry: { type: 'رفض أجور حراسة', desc: 'تأخير مستحقات أمنية' }
      }
    ]
  },
  {
    id: 46,
    title: 'قضية توريد الأثاث الطبي للمستشفيات',
    sector: 'قطاع الصحة والأدوية',
    description: 'مصنع الأثاث الطبي يطالب بصرف فاتورة أسرة المرضى وعربات الإسعاف.',
    dailyDirective: 'تعميم إداري #46: الأثاث الطبي يتطلب مطابقة مواصفات السلامة الصحية المعتمدة.',
    character: { name: 'المقاول عادل', dialogue: 'أنهينا توريد وتركيب أسرة المرضى في أجنحة المستشفى.' },
    documents: [
      { id: 'doc1', title: 'فاتورة الأثاث الطبي', type: 'invoice', data: { vendor: 'المفروشات الطبية الحديثة', amount: '13,000 $', date: '2026/08/46', notes: 'أسرة وعربات طبية' } },
      { id: 'doc2', title: 'شهادة مطابقة مواصفات السلامة', type: 'bank', data: { accountName: 'المفروشات الطبية', accountNo: 'MED-FUR', recentTx: 'شهادة مطابقة مواصفات صحية معتمدة أصولاً' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -13000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'اعتماد سليم وموفق، تم دعم أجنحة المستشفى بالأثاث اللازم.',
        ledgerEntry: { type: 'توريد أثاث طبي', desc: 'صرف فاتورة الأثاث الطبي للمستشفى' }
      },
      {
        id: 'reject',
        cashChange: 1500,
        stressChange: 15,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة توريد طبية سليمة، مما أخر تجهيز أجنحة المرضى.',
        ledgerEntry: { type: 'رفض أثاث طبي', desc: 'تعطيل توريد مستلزمات طبية' }
      }
    ]
  },
  {
    id: 47,
    title: 'قضية تدقيق الرسوم الجمركية لقطع الغيار الصناعية',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'مراجعة كشوف الرسوم الجمركية لقطع الغيار المستوردة للمصانع.',
    dailyDirective: 'تعميم إداري #47: قطع الغيار الصناعية الأساسية معفاة من الجمارك بشرط تقديم ترخيص المصنع.',
    character: { name: 'المفتش فهد', dialogue: 'هذه كشوف جمارك قطع الغيار الواردة للمصانع المحلية.' },
    documents: [
      { id: 'doc1', title: 'كشف الرسوم الجمركية', type: 'invoice', data: { vendor: 'معبر المصانع', amount: '5,000 $', date: '2026/08/47', notes: 'رسوم قطع غيار صناعية' } },
      { id: 'doc2', title: 'ترخيص المصنع الأساسي', type: 'bank', data: { accountName: 'المصانع الوطنية', accountNo: 'SPARE-01', recentTx: 'ترخيص المصنع منتهي الصلاحية منذ عدة أشهر' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'ترخيص المصنع منتهي الصلاحية مما يسقط حق الإعفاء الجمركي' },
    choices: [
      {
        id: 'approve',
        cashChange: -5000,
        stressChange: 20,
        reputationChange: 'مساءلة إدارية',
        resultText: 'منحتِ إعفاء جمركياً لمصنع ترخيصه منتهي، وتم تسجيل مخالفة إدارية.',
        ledgerEntry: { type: 'إعفاء مخالف', desc: 'منح إعفاء برخصة منتهية' }
      },
      {
        id: 'reject',
        cashChange: 2000,
        stressChange: -5,
        reputationChange: 'مدققة أمينة',
        resultText: 'تدقيق ذكي جداً يا سيدرا! ألغيتِ الإعفاء لانتهاء الرخصة وحصلتِ الرسوم.',
        ledgerEntry: { type: 'تصحيح جمركي', desc: 'إلغاء إعفاء وتحصيل رسوم لانتهاء الرخصة' }
      }
    ]
  },
  {
    id: 48,
    title: 'قضية تدقيق حسابات الختام الشهري العام',
    sector: 'بنك المدينة المركزي',
    description: 'المراجعة الختامية الكبرى لشهر أغسطس ومطابقة كافة الإيرادات والمصروفات بالبنك.',
    dailyDirective: 'تعميم إداري #48: التدقيق الختامي الشهرى يتطلب تطابق رصيد الخزينة مع تقرير البنك المركزي.',
    character: { name: 'مدير التدقيق الأعلى', dialogue: 'سيدرا، هذا هو الاختبار الختامي لشهر أغسطس، دققيه بعناية فائقة.' },
    documents: [
      { id: 'doc1', title: 'تقرير الختام الشهري', type: 'invoice', data: { vendor: 'قسم التدقيق المالي', amount: '25,000 $', date: '2026/08/48', notes: 'إغلاق وتسوية شهر أغسطس الكبرى' } },
      { id: 'doc2', title: 'كشف مطابقة البنك المركزي', type: 'bank', data: { accountName: 'الخزينة العامة الرئيسية', accountNo: 'MAIN-BANK-01', recentTx: 'تطابق تام ومثالي بين كافة الحسابات والأرصدة الختامية' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: 25000,
        stressChange: -20,
        reputationChange: 'كفاءة اقتصادية',
        resultText: '🌟 إنجاز أسطوري يا سيدرا! أتممتِ الشهر الأول بنجاح باهر ومثالي!',
        ledgerEntry: { type: 'إغلاق شهري ختامي', desc: 'إتمام وتسوية شهر أغسطس بنجاح باهر' }
      },
      {
        id: 'reject',
        cashChange: -5000,
        stressChange: 25,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ إغلاقاً صحيحاً ومطابقاً، مما أدى لتعطل الحسابات الختامية الكبرى.',
        ledgerEntry: { type: 'خطأ إغلاق ختامي', desc: 'رفض تسوية نهاية الشهر الصحيحة' }
      }
    ]
  },
  {
    id: 49,
    title: 'قضية تطوير وتوسعة شبكة الإضاءة الذكية',
    sector: 'الخدمات العامة والبلدية',
    description: 'شركة المقاولات الذكية تطالب بصرف دفعة مشروع شبكة الإضاءة الموفرة.',
    dailyDirective: 'تعميم إداري #49: مشاريع التقنية البلدية تتطلب محضر تسليم واختبار تشغيل معتمد.',
    character: { name: 'المهندس مازن', dialogue: 'أنجزنا تركيب شبكة الإضاءة الذكية في الشوارع الرئيسية بالكامل.' },
    documents: [
      { id: 'doc1', title: 'فاتورة مشروع الإضاءة الذكية', type: 'invoice', data: { vendor: 'الأنوار الذكية للمقاولات', amount: '14,000 $', date: '2026/08/49', notes: 'تطوير شبكة الإضاءة الذكية' } },
      { id: 'doc2', title: 'محضر اختبار وتشغيل الشبكة', type: 'bank', data: { accountName: 'الأنوار الذكية', accountNo: 'SMART-LIGHT', recentTx: 'محضر اختبار وتشغيل معتمد وموقع من لجنة البلدية' } }
    ],
    discrepancy: null,
    choices: [
      {
        id: 'approve',
        cashChange: -14000,
        stressChange: -10,
        reputationChange: 'كفاءة اقتصادية',
        resultText: 'اعتماد ممتاز! تم إنجاز مشروع الإضاءة الذكية ودعم المدينة بنجاح.',
        ledgerEntry: { type: 'مشروع ذكي', desc: 'صرف دفعة مشروع الإضاءة الذكية' }
      },
      {
        id: 'reject',
        cashChange: 2000,
        stressChange: 10,
        reputationChange: 'مقبولة',
        resultText: 'رفضتِ معاملة بلدية سليمة ومستوفية للمحاضر، مما أخر تشغيل الشبكة.',
        ledgerEntry: { type: 'رفض مشروع ذكي', desc: 'تعطيل مستحقات إنارة ذكية' }
      }
    ]
  },
  {
    id: 50,
    title: 'قضية تدقيق الرسوم الضريبية للمنشآت التجارية الكبرى',
    sector: 'التفتيش الضريبي والرقابة',
    description: 'مراجعة الكشوف الضريبية الختامية لكبرى المتاجر والأسواق المركزية.',
    dailyDirective: 'تعميم إداري #50: المتاجر والأسواق الكبرى تخضع لضريبة أرباح سنوية نهائية بنسبة 15%.',
    character: { name: 'المفتش العام', dialogue: 'هذه الكشوف الختامية لأرباح الأسواق الكبرى والضريبة المستحقة عليها.' },
    documents: [
      { id: 'doc1', title: 'كشف الضريبة الختامية', type: 'invoice', data: { vendor: 'الأسواق المركزية الكبرى', amount: '20,000 $', date: '2026/08/50', notes: 'ضريبة الأرباح الختامية السنوية' } },
      { id: 'doc2', title: 'سجل الأرباح والفواتير الفعلية', type: 'bank', data: { accountName: 'الأسواق المركزية', accountNo: 'MARKET-TAX', recentTx: 'إجمالي الأرباح الحقيقية يتطلب ضريبة بقيمة 28,000$' } }
    ],
    discrepancy: { targetDoc: 'doc2', desc: 'الضريبة المسددة أقل بكثير من نسبة 15% المقررة على أرباح الأسواق الكبرى' },
    choices: [
      {
        id: 'approve',
        cashChange: 20000,
        stressChange: 30,
        reputationChange: 'مساءلة إدارية',
        resultText: 'اعتمدتِ ضريبة ناقصة للأسواق الكبرى، وفقدت الخزينة إيرادات ضريبية مستحقة.',
        ledgerEntry: { type: 'قصور ضريبي ختامي', desc: 'قبول ضريبة أسواق بأقل من النسبة' }
      },
      {
        id: 'reject',
        cashChange: 8000,
        stressChange: -20,
        reputationChange: 'مدققة أمينة',
        resultText: 'ختام مسك عظيم يا سيدرا! كشفتِ النقص وحصلتِ الضريبة كاملة في آخر القضايا.',
        ledgerEntry: { type: 'تصحيح ضريبي ختامي', desc: 'رفض ضريبة ناقصة وتحصيل الفارق كاملاً' }
      }
    ]
  }
];

export function generateCityScenario(index) {
  // اختيار القضية بناءً على المؤشر لضمان الدوران السلس بين الـ 50 قضية
  const scenarioIndex = index % scenariosPool.length;
  const baseScenario = scenariosPool[scenarioIndex];

  // إرجاع نسخة مطابقة مع تحديث الرقم التعريفي والتاريخ ليناسب تقدم الأيام
  return {
    ...baseScenario,
    id: index + 1,
    title: `قضية رقم #${index + 1} - ${baseScenario.title}`,
    documents: baseScenario.documents.map(doc => ({
      ...doc,
      data: {
        ...doc.data,
        date: `2026/08/0${((index % 9) + 1)}`
      }
    }))
  };
}