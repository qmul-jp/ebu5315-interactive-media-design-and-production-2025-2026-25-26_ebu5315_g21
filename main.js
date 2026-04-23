const STORAGE_KEY = "circle_geometry_quiz_v1";

const questionBank = {
  Foundation: [
    {
      id: "F1",
      title: { en: "Question 1: Circle Basics", zh: "问题 1：圆的基础" },
      topic: { en: "Radius", zh: "半径" },
      text: { en: "A circle has radius 6 units. What is its diameter?", zh: "一个圆的半径是 6，求它的直径。" },
      hint: { en: "Theorem Reminder: Diameter = 2 × Radius.", zh: "定理提醒：直径 = 2 × 半径。" },
      options: {
        en: ["A) 6 units", "B) 12 units", "C) 18 units", "D) 36 units"],
        zh: ["A) 6 单位", "B) 12 单位", "C) 18 单位", "D) 36 单位"]
      },
      correctIndex: 1,
      correctAnswer: { en: "12 units", zh: "12 单位" },
      explanation: {
        en: "The diameter is twice the radius, so 2 × 6 = 12.",
        zh: "直径等于半径的 2 倍，所以 2 × 6 = 12。"
      },
      diagramType: "radiusDiameter"
    },
    {
      id: "F2",
      title: { en: "Question 2: Tangent Properties", zh: "问题 2：切线性质" },
      topic: { en: "Tangent", zh: "切线" },
      text: {
        en: "In the diagram, PA is tangent to the circle at A. O is the center of the circle. If OA = 5 units and OP = 13 units, find the length of PA.",
        zh: "如图，PA 在 A 点与圆相切，O 是圆心。若 OA = 5，OP = 13，求 PA 的长度。"
      },
      hint: {
        en: "Theorem Reminder: Tangent-Radius Theorem: A tangent to a circle is perpendicular to the radius at the point of contact.",
        zh: "定理提醒：切线—半径定理：圆的切线与过切点的半径垂直。"
      },
      options: {
        en: ["A) 8 units", "B) 10 units", "C) 12 units", "D) 18 units"],
        zh: ["A) 8 单位", "B) 10 单位", "C) 12 单位", "D) 18 单位"]
      },
      correctIndex: 2,
      correctAnswer: { en: "12 units", zh: "12 单位" },
      explanation: {
        en: "Because OA ⟂ PA, triangle OAP is a right triangle. PA = √(13² - 5²) = √144 = 12.",
        zh: "因为 OA ⟂ PA，所以 △OAP 是直角三角形。PA = √(13² - 5²) = √144 = 12。"
      },
      diagramType: "tangent"
    },
    {
      id: "F3",
      title: { en: "Question 3: Circumference", zh: "问题 3：圆周长" },
      topic: { en: "Circumference", zh: "周长" },
      text: {
        en: "What is the circumference of a circle with radius 7 units? (Use π = 22/7)",
        zh: "半径为 7 的圆的周长是多少？（取 π = 22/7）"
      },
      hint: { en: "Theorem Reminder: Circumference = 2πr.", zh: "定理提醒：圆周长 = 2πr。" },
      options: {
        en: ["A) 14", "B) 22", "C) 44", "D) 49"],
        zh: ["A) 14", "B) 22", "C) 44", "D) 49"]
      },
      correctIndex: 2,
      correctAnswer: { en: "44", zh: "44" },
      explanation: { en: "2 × 22/7 × 7 = 44.", zh: "2 × 22/7 × 7 = 44。" },
      diagramType: "basicCircle"
    }
  ],
  Intermediate: [
    {
      id: "I1",
      title: { en: "Question 1: Tangent Length", zh: "问题 1：切线长度" },
      topic: { en: "Tangent", zh: "切线" },
      text: {
        en: "From an external point P, two tangents PA and PB are drawn to a circle. If PA = 9 units, what is PB?",
        zh: "从圆外一点 P 向圆作两条切线 PA 和 PB。若 PA = 9，求 PB。"
      },
      hint: {
        en: "Theorem Reminder: Tangents from the same external point are equal.",
        zh: "定理提醒：从同一圆外点引出的两条切线长度相等。"
      },
      options: {
        en: ["A) 7 units", "B) 8 units", "C) 9 units", "D) 18 units"],
        zh: ["A) 7 单位", "B) 8 单位", "C) 9 单位", "D) 18 单位"]
      },
      correctIndex: 2,
      correctAnswer: { en: "9 units", zh: "9 单位" },
      explanation: {
        en: "Tangents from the same external point are equal, so PB = PA = 9.",
        zh: "同一点引出的两条切线长度相等，因此 PB = PA = 9。"
      },
      diagramType: "twoTangents"
    },
    {
      id: "I2",
      title: { en: "Question 2: Chord Angle", zh: "问题 2：弦所对的角" },
      topic: { en: "Angles", zh: "角度" },
      text: {
        en: "An angle subtended by a diameter at the circumference is:",
        zh: "直径所对的圆周角是："
      },
      hint: { en: "Theorem Reminder: Angle in a semicircle is 90°.", zh: "定理提醒：半圆所对的圆周角是 90°。" },
      options: {
        en: ["A) 45°", "B) 60°", "C) 90°", "D) 180°"],
        zh: ["A) 45°", "B) 60°", "C) 90°", "D) 180°"]
      },
      correctIndex: 2,
      correctAnswer: { en: "90°", zh: "90°" },
      explanation: {
        en: "The angle in a semicircle is always 90°.",
        zh: "半圆所对的圆周角恒为 90°。"
      },
      diagramType: "semicircle"
    },
    {
      id: "I3",
      title: { en: "Question 3: Secant Theorem", zh: "问题 3：割线定理" },
      topic: { en: "Secant", zh: "割线" },
      text: {
        en: "If PA is a tangent and PBC is a secant, then which relation is true?",
        zh: "若 PA 是切线，PBC 是割线，则下列哪一个关系正确？"
      },
      hint: {
        en: "Theorem Reminder: Tangent-Secant Theorem: PA² = PB × PC.",
        zh: "定理提醒：切线—割线定理：PA² = PB × PC。"
      },
      options: {
        en: ["A) PA = PB + PC", "B) PA² = PB × PC", "C) PA × PB = PC", "D) PA = PB × PC"],
        zh: ["A) PA = PB + PC", "B) PA² = PB × PC", "C) PA × PB = PC", "D) PA = PB × PC"]
      },
      correctIndex: 1,
      correctAnswer: { en: "PA² = PB × PC", zh: "PA² = PB × PC" },
      explanation: {
        en: "By the tangent-secant theorem, the square of the tangent length equals the external segment times the whole secant.",
        zh: "切割线定理：切线长的平方等于外部段与整条割线长度的乘积。"
      },
      diagramType: "secant"
    }
  ],
  Advanced: [
    {
      id: "A1",
      title: { en: "Question 1: Cyclic Quadrilateral", zh: "问题 1：圆内接四边形" },
      topic: { en: "Cyclic Quadrilaterals", zh: "圆内接四边形" },
      text: {
        en: "In a cyclic quadrilateral, opposite angles are:",
        zh: "在圆内接四边形中，对角是："
      },
      hint: {
        en: "Theorem Reminder: Opposite angles in a cyclic quadrilateral sum to 180°.",
        zh: "定理提醒：圆内接四边形的对角和为 180°。"
      },
      options: {
        en: ["A) Equal", "B) Complementary", "C) Supplementary", "D) Perpendicular"],
        zh: ["A) 相等", "B) 互余", "C) 互补", "D) 垂直"]
      },
      correctIndex: 2,
      correctAnswer: { en: "Supplementary", zh: "互补" },
      explanation: {
        en: "Opposite angles in a cyclic quadrilateral are supplementary and add up to 180°.",
        zh: "圆内接四边形对角互补，和为 180°。"
      },
      diagramType: "cyclic"
    },
    {
      id: "A2",
      title: { en: "Question 2: Exterior Angle", zh: "问题 2：外角性质" },
      topic: { en: "Cyclic Quadrilaterals", zh: "圆内接四边形" },
      text: {
        en: "The exterior angle of a cyclic quadrilateral equals:",
        zh: "圆内接四边形的外角等于："
      },
      hint: {
        en: "Theorem Reminder: Exterior angle equals the interior opposite angle.",
        zh: "定理提醒：外角等于其内对角。"
      },
      options: {
        en: ["A) Half of opposite angle", "B) The interior opposite angle", "C) Sum of adjacent angles", "D) 90°"],
        zh: ["A) 对角的一半", "B) 内对角", "C) 邻角之和", "D) 90°"]
      },
      correctIndex: 1,
      correctAnswer: { en: "The interior opposite angle", zh: "内对角" },
      explanation: {
        en: "The exterior angle of a cyclic quadrilateral equals the interior opposite angle.",
        zh: "圆内接四边形的外角等于其内对角。"
      },
      diagramType: "cyclic"
    },
    {
      id: "A3",
      title: { en: "Question 3: Chord Proof", zh: "问题 3：弦的性质" },
      topic: { en: "Chords", zh: "弦" },
      text: {
        en: "Equal chords in the same circle are:",
        zh: "同圆中的等弦："
      },
      hint: {
        en: "Theorem Reminder: Equal chords are equidistant from the center.",
        zh: "定理提醒：等弦到圆心的距离相等。"
      },
      options: {
        en: ["A) Parallel", "B) Tangents", "C) Equidistant from center", "D) Diameters"],
        zh: ["A) 平行", "B) 切线", "C) 到圆心距离相等", "D) 直径"]
      },
      correctIndex: 2,
      correctAnswer: { en: "Equidistant from center", zh: "到圆心距离相等" },
      explanation: {
        en: "Equal chords in the same circle are equidistant from the center.",
        zh: "同圆中等弦到圆心的距离相等。"
      },
      diagramType: "basicCircle"
    }
  ]
};

const defaultState = {
  history: {
    Foundation: { last: [], previous: [] },
    Intermediate: { last: [], previous: [] },
    Advanced: { last: [], previous: [] }
  },
  errors: {
    Foundation: [],
    Intermediate: [],
    Advanced: []
  },
  moduleStats: {
    Foundation: { lastScore: "7/10" },
    Intermediate: { lastScore: "6/10" },
    Advanced: { lastScore: "N/A" }
  },
 recentActivity: []
};

let state = loadState();
let currentModule = "Foundation";
let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let currentAttemptScreens = [];
let currentMistakes = [];
let answeredCount = 0;
let reviewMode = false;
let reviewAttemptType = "last";
let reviewScreens = [];
let reviewScreenIndex = 0;
let quizTimer = null;
let timeLeft = 165;

const pages = {
  home: document.getElementById("homePage"),
  quiz: document.getElementById("quizPage"),
  chooser: document.getElementById("attemptChooserPage"),
  result: document.getElementById("resultPage"),
  error: document.getElementById("errorPage")
};

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  refreshHome();
  showPage("home");
  bindSharedNavForQuizApp();

  const savedLang = localStorage.getItem("language") || "en";
  applyQuizPageLanguage(savedLang);

  window.addEventListener("languageChanged", (e) => {
    applyQuizPageLanguage(e.detail.lang);
  });
});

const QUIZ_I18N = {
  en: {
    welcome: "Welcome back! Ready to master circle geometry today?",
    foundation: "Foundation",
    foundationDesc: "Radius, diameter, circumference, basic circle properties.",
    intermediate: "Intermediate",
    intermediateDesc: "Tangent & Secant Theorems, angles in circles.",
    advanced: "Advanced",
    advancedDesc: "Cyclic Quadrilaterals & Complex Proofs.",

    startQuiz: "Start Quiz",
    reviewPastAttempts: "Review Past Attempts",

    progressOverview: "Progress Overview",
    recentActivity: "Recent Activity",
    helpResources: "Help & Resources",
    keyTheorems: "Key Geometry Theorems",
    formulaSheets: "Formula Cheat Sheets",
    videoTutorials: "Video Tutorials",

    quickStart: "Quick Start / Learning Path",
    quick1: "· Start with Foundation to master circle basics",
    quick2: "· Move to Intermediate for tangent theorems",
    quick3: "· Challenge Advanced for complex proofs",
    recommend: "Recommended Next Step: Your last Foundation score: 7/10 → Review key concepts or move to Intermediate.",

    quizProgress: "Quiz Progress:",
    timeRemaining: "Time Remaining:",
    questionsAnswered: "Questions Answered:",
    selectAnswer: "Select your answer:",
    quizNavigation: "Quiz Navigation",
    additionalTools: "Additional Tools",
    submitAnswer: "Submit Answer",
    previousQuestion: "← Previous Question",
    nextQuestion: "Next Question →",
    quizSummary: "Quiz Summary",
    stepSolution: "Step-by-Step Solution",
    formulaSheet: "Formula Sheet",
    videoTutorial: "Video Tutorial",

    lastTime: "last time",
    previousTime: "the time before last",
    exit: "Exit",

    greatWork: "Great Work!",
    theoremMastery: "Theorem Mastery",
    mistakeSummary: "Mistake Summary",
    learningPath: "Learning Path",
    learningSubtitle: "Choose your next step based on this quiz result.",
    smartRecommendation: "Smart Recommendation",
    recentQuizHistory: "Recent Quiz History",
    performanceOverview: "Performance Overview",
    moduleProgress: "Module Progress",

    homeFooter: "Home",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
   copyright: "© 2023 Master Circle Geometry. All rights reserved.",

    latestAttempt: "Latest saved attempt",
    needsReview: "Needs Review",
    improving: "Improving",

    overallProgress: "Overall Progress",

    foundationQuiz: "Foundation Quiz",
    intermediateQuiz: "Intermediate Quiz",
    advancedQuiz: "Advanced Quiz",
    recentQuizHistoryTitle: "Recent Quiz History",
  moduleProgressTitle: "Module Progress",
  bestModule: "Best Module",
  averageScore: "Average Score",

  learningPathTitle: "Learning Path",
  learningPathSubtitle: "Choose your next step based on this quiz result.",
  smartRecommendation: "Smart Recommendation",

  reviewMistakesTitle: "Review Mistakes",
  reviewMistakesDesc: "Check wrong answers and explanations",
  practiceWeakTitle: "Practice Weak Problems",
  practiceWeakDesc: "Retry questions from your weakest topic",
  nextLevelTitle: "Next Level Quiz",
  nextLevelDesc: "Move forward to the next module",
  advancedTopicsTitle: "Explore Advanced Topics",
  advancedTopicsDesc: "Preview key theorems and challenge content",

  recommendedAction: "Recommended Action",
  recommendedActionText: "Based on your result, review mistakes first, then practice your weakest topic.",

overallProgressLabel: "Overall Progress:",
tangentTheoremsLabel: "Tangent Theorems:",
cyclicQuadrilateralsLabel: "Cyclic Quadrilaterals:",

overviewCardTitle: "Result Overview",
overviewScoreLabel: "Current Score",
overviewCorrectLabel: "Correct Answers",
overviewWeakLabel: "Weakest Topic",
overviewBestLabel: "Best Module",
overviewAdviceTitle: "Learning Advice",
overviewAdviceText: "Review mistakes first, then practise your weakest topic to improve accuracy.",
quickSettingsTitle: "Quick Settings",

backToHome: "Back to Home",
reviewErrors: "Review Errors",

overviewCardTitle: "Result Overview",
overviewScoreLabel: "Current Score",
overviewCorrectLabel: "Correct Answers",
overviewWeakLabel: "Weakest Topic",
overviewBestLabel: "Best Module",
overviewAdviceTitle: "Learning Advice",
overviewAdviceText: "Review mistakes first, then practise your weakest topic to improve accuracy.",
quickSettingsTitle: "Quick Settings",

backToHome: "Back to Home",
reviewErrors: "Review Errors"
  },

  zh: {
    welcome: "欢迎回来！准备好今天掌握圆几何了吗？",
    foundation: "基础",
    foundationDesc: "半径、直径、周长和基础圆性质。",
    intermediate: "进阶",
    intermediateDesc: "切线与割线定理、圆中的角。",
    advanced: "高级",
    advancedDesc: "圆内接四边形与复杂证明。",

    startQuiz: "开始测验",
    reviewPastAttempts: "查看历史测验",

    progressOverview: "学习进度",
    recentActivity: "最近活动",
    helpResources: "帮助与资源",
    keyTheorems: "核心几何定理",
    formulaSheets: "公式速查表",
    videoTutorials: "视频教程",

    quickStart: "快速开始 / 学习路径",
    quick1: "· 从基础模块开始掌握圆的基本概念",
    quick2: "· 进入进阶模块学习切线定理",
    quick3: "· 挑战高级模块中的复杂证明",
    recommend: "推荐下一步：你上次基础模块得分 7/10 → 建议复习关键概念或进入进阶模块。",

    quizProgress: "测验进度：",
    timeRemaining: "剩余时间：",
    questionsAnswered: "已答题数：",
    selectAnswer: "请选择答案：",
    quizNavigation: "题目导航",
    additionalTools: "辅助工具",
    submitAnswer: "提交答案",
    previousQuestion: "← 上一题",
    nextQuestion: "下一题 →",
    quizSummary: "测验总结",
    stepSolution: "分步讲解",
    formulaSheet: "公式表",
    videoTutorial: "视频教程",

    lastTime: "上一次",
    previousTime: "上上次",
    exit: "退出",

    greatWork: "做得很好！",
    theoremMastery: "定理掌握度",
    mistakeSummary: "错题总结",
    learningPath: "学习路径",
    learningSubtitle: "根据本次测验结果选择下一步。",
    smartRecommendation: "智能推荐",
    performanceOverview: "表现概览",

    homeFooter: "首页",
    helpCenter: "帮助中心",
    contactUs: "联系我们",
    privacyPolicy: "隐私政策",
    copyright: "© 2023 Master Circle Geometry. 保留所有权利。",
    // 中文
    recentQuizHistory: "最近测验记录",
    latestAttempt: "最近一次记录",
    needsReview: "需要复习",
    improving: "正在提升",

    moduleProgress: "模块进度",
    overallProgress: "总体进度",

    foundationQuiz: "基础测验",
    intermediateQuiz: "进阶测验",
    advancedQuiz: "高级测验",
    recentQuizHistoryTitle: "最近测验记录",
  performanceOverview: "表现概览",
  moduleProgressTitle: "模块进度",
  bestModule: "最佳模块",
  needsReview: "需要复习",
  averageScore: "平均分",

  learningPathTitle: "学习路径",
  learningPathSubtitle: "根据本次测验结果选择下一步。",
  smartRecommendation: "智能推荐",

  reviewMistakesTitle: "复习错题",
  reviewMistakesDesc: "查看错题与解析",
  practiceWeakTitle: "练习薄弱题目",
  practiceWeakDesc: "重新练习你最薄弱主题的题目",
  nextLevelTitle: "下一等级测验",
  nextLevelDesc: "继续进入下一个模块",
  advancedTopicsTitle: "探索高级主题",
  advancedTopicsDesc: "预习关键定理与挑战内容",

  recommendedAction: "推荐操作",
  recommendedActionText: "根据你的结果，建议先复习错题，再练习最薄弱的主题。",

overallProgressLabel: "总体进度：",
tangentTheoremsLabel: "切线定理：",
cyclicQuadrilateralsLabel: "圆内接四边形：",

overviewCardTitle: "结果概览",
overviewScoreLabel: "当前得分",
overviewCorrectLabel: "答对题数",
overviewWeakLabel: "最薄弱主题",
overviewBestLabel: "最佳模块",
overviewAdviceTitle: "学习建议",
overviewAdviceText: "建议先复习错题，再针对最薄弱主题进行练习，这样能更快提高正确率。",
quickSettingsTitle: "快捷设置",

backToHome: "返回首页",
reviewErrors: "查看错题",

overviewCardTitle: "结果概览",
overviewScoreLabel: "当前得分",
overviewCorrectLabel: "答对题数",
overviewWeakLabel: "最薄弱主题",
overviewBestLabel: "最佳模块",
overviewAdviceTitle: "学习建议",
overviewAdviceText: "建议先复习错题，再针对最薄弱主题进行练习，这样能更快提高正确率。",
quickSettingsTitle: "快捷设置",

backToHome: "返回首页",
reviewErrors: "查看错题"
  }
};

function getQuizLang() {
  return localStorage.getItem("language") || "en";
}

function getTextByLang(value, lang) {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value[lang] || value.en || "";
}

function getLocalizedQuestion(question) {
  const lang = getQuizLang();
  return {
    ...question,
    title: getTextByLang(question.title, lang),
    topic: getTextByLang(question.topic, lang),
    text: getTextByLang(question.text, lang),
    hint: getTextByLang(question.hint, lang),
    options: Array.isArray(question.options) ? question.options : (question.options?.[lang] || question.options?.en || []),
    correctAnswer: getTextByLang(question.correctAnswer, lang),
    explanation: getTextByLang(question.explanation, lang)
  };
}

function getModuleDisplayName(moduleKey, lang = getQuizLang()) {
  const t = QUIZ_I18N[lang] || QUIZ_I18N.en;
  const map = {
    Foundation: t.foundation,
    Intermediate: t.intermediate,
    Advanced: t.advanced
  };
  return map[moduleKey] || moduleKey;
}

function applyQuizPageLanguage(lang) {
  const t = QUIZ_I18N[lang] || QUIZ_I18N.en;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

const setTextById = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

  // 首页
  setTextById("welcomeBanner", t.welcome);
  setTextById("foundationTitle", t.foundation);
  setTextById("foundationDesc", t.foundationDesc);
  setTextById("intermediateTitle", t.intermediate);
  setTextById("intermediateDesc", t.intermediateDesc);
  setTextById("advancedTitle", t.advanced);
  setTextById("advancedDesc", t.advancedDesc);

  document.querySelectorAll(".start-btn").forEach(btn => {
    btn.textContent = t.startQuiz;
  });

  document.querySelectorAll(".review-btn").forEach(btn => {
    btn.textContent = t.reviewPastAttempts;
  });

  setTextById("progressOverviewTitle", t.progressOverview);
  setTextById("recentActivityTitle", t.recentActivity);
  setTextById("helpResourcesTitle", t.helpResources);
  setTextById("keyTheoremsLink", t.keyTheorems);
  setTextById("formulaSheetsLink", t.formulaSheets);
  setTextById("videoTutorialsLink", t.videoTutorials);

  setTextById("quickStartTitle", t.quickStart);
  setTextById("quickLine1", t.quick1);
  setTextById("quickLine2", t.quick2);
  setTextById("quickLine3", t.quick3);
  setTextById("recommendTip", t.recommend);

  // 题目页
  setTextById("quizProgressTitle", t.quizProgress);
  setTextById("selectAnswerTitle", t.selectAnswer);
  setTextById("quizNavigationTitle", t.quizNavigation);
  setTextById("additionalToolsTitle", t.additionalTools);
  setTextById("submitAnswerBtn", t.submitAnswer);
  setTextById("prevQuestionBtn", t.previousQuestion);
  setTextById("nextQuestionBtn", t.nextQuestion);
  setTextById("quizSummaryBtn", t.quizSummary);
  setTextById("stepSolutionBtn", t.stepSolution);
  setTextById("formulaBtn", t.formulaSheet);
  setTextById("videoBtn", t.videoTutorial);

  const progressRightSpans = document.querySelectorAll(".quiz-progress-right > span");
  if (progressRightSpans[0]) {
    progressRightSpans[0].childNodes[0].nodeValue = t.timeRemaining + " ";
  }
  if (progressRightSpans[1]) {
    progressRightSpans[1].childNodes[0].nodeValue = t.questionsAnswered + " ";
  }

  // 历史记录页
  setTextById("openLastAttemptBtn", t.lastTime);
  setTextById("openPreviousAttemptBtn", t.previousTime);
  setTextById("exitChooserBtn", t.exit);

  // 结果页
  setTextById("greatWorkTitle", t.greatWork);
  setTextById("theoremMasteryTitle", t.theoremMastery);
  setTextById("mistakeSummaryTitle", t.mistakeSummary);
  setTextById("learningPathTitle", t.learningPath);
  setTextById("learningPathSubtitle", t.learningSubtitle);
  setTextById("smartRecommendationBadge", t.smartRecommendation);
  setTextById("recentQuizHistoryTitle", t.recentQuizHistory);
  setTextById("performanceOverviewBadge", t.performanceOverview);
  setTextById("moduleProgressTitle", t.moduleProgress);

  setTextById("overviewCardTitle", t.overviewCardTitle);
setTextById("overviewScoreLabel", t.overviewScoreLabel);
setTextById("overviewCorrectLabel", t.overviewCorrectLabel);
setTextById("overviewWeakLabel", t.overviewWeakLabel);
setTextById("overviewBestLabel", t.overviewBestLabel);
setTextById("overviewAdviceTitle", t.overviewAdviceTitle);
setTextById("overviewAdviceText", t.overviewAdviceText);
setTextById("quickSettingsTitle", t.quickSettingsTitle);

setTextById("backHomeFromResultBtn", t.backToHome);
setTextById("reviewErrorsFromResultBtn", t.reviewErrors);

  setTextById("recentQuizHistoryTitle", t.recentQuizHistoryTitle);
setTextById("performanceOverviewBadge", t.performanceOverview);
setTextById("moduleProgressTitle", t.moduleProgressTitle);
setTextById("bestModuleLabel", t.bestModule);
setTextById("needsReviewLabel", t.needsReview);
setTextById("averageScoreLabel", t.averageScore);

setTextById("learningPathTitle", t.learningPathTitle);
setTextById("learningPathSubtitle", t.learningPathSubtitle);
setTextById("smartRecommendationBadge", t.smartRecommendation);

setTextById("reviewMistakesTitle", t.reviewMistakesTitle);
setTextById("reviewMistakesDesc", t.reviewMistakesDesc);
setTextById("practiceWeakTitle", t.practiceWeakTitle);
setTextById("practiceWeakDesc", t.practiceWeakDesc);
setTextById("nextLevelTitle", t.nextLevelTitle);
setTextById("nextLevelDesc", t.nextLevelDesc);
setTextById("advancedTopicsTitle", t.advancedTopicsTitle);
setTextById("advancedTopicsDesc", t.advancedTopicsDesc);

setTextById("learningDetailTitle", t.recommendedAction);
setTextById("learningDetailText", t.recommendedActionText);

setTextById("overallProgressLabel", t.overallProgressLabel);
setTextById("tangentTheoremsLabel", t.tangentTheoremsLabel);
setTextById("cyclicQuadrilateralsLabel", t.cyclicQuadrilateralsLabel);

setTextById("greatWorkTitle", t.greatWork);
setTextById("theoremMasteryTitle", t.theoremMastery);
setTextById("mistakeSummaryTitle", t.mistakeSummary);

setTextById("learningPathTitle", t.learningPathTitle);
setTextById("learningPathSubtitle", t.learningPathSubtitle);
setTextById("smartRecommendationBadge", t.smartRecommendation);

setTextById("recentQuizHistoryTitle", t.recentQuizHistoryTitle);
setTextById("performanceOverviewBadge", t.performanceOverview);
setTextById("moduleProgressTitle", t.moduleProgressTitle);

setTextById("bestModuleLabel", t.bestModule);
setTextById("needsReviewLabel", t.needsReview);
setTextById("averageScoreLabel", t.averageScore);

  // footer
  document.querySelectorAll(".footer").forEach(footer => {
    const divs = footer.querySelectorAll("div");
    if (divs[0]) {
      divs[0].innerHTML = `${t.homeFooter} &nbsp;&nbsp; ${t.helpCenter} &nbsp;&nbsp; ${t.contactUs} &nbsp;&nbsp; ${t.privacyPolicy}`;
    }
    if (divs[1]) {
      divs[1].textContent = t.copyright;
    }
  });

  if (pages.quiz && pages.quiz.classList.contains("active")) {
    if (reviewMode) {
      renderReviewScreen();
    } else {
      renderQuizQuestion();
    }
  }

  if (pages.result && pages.result.classList.contains("active")) {
    const finishedScreens = currentAttemptScreens.filter(Boolean);
    const correctCount = finishedScreens.filter(item => item.isCorrect).length;
    const total = currentQuestions.length || 1;
    const percent = Math.round((correctCount / total) * 100);
    renderResultPage(correctCount, total, percent);
   }
  // ⭐ 强制刷新当前页面内容
  if (pages.home.classList.contains("active")) {
    refreshHome();
   }

  if (pages.home.classList.contains("active")) {
  refreshHome();
}

if (pages.result && pages.result.classList.contains("active")) {
  const finishedScreens = currentAttemptScreens.filter(Boolean);
  const correctCount = finishedScreens.filter(item => item.isCorrect).length;
  const total = currentQuestions.length || 1;
  const percent = Math.round((correctCount / total) * 100);
  renderResultPage(correctCount, total, percent);
}
}

function bindEvents() {
  document.querySelectorAll(".start-btn").forEach(btn => {
    btn.addEventListener("click", () => startQuizFlow(btn.dataset.module));
  });

  document.querySelectorAll(".review-btn").forEach(btn => {
    btn.addEventListener("click", () => openAttemptChooser(btn.dataset.module));
  });

  const submitAnswerBtn = document.getElementById("submitAnswerBtn");
  if (submitAnswerBtn) submitAnswerBtn.addEventListener("click", submitCurrentAnswer);

  const prevQuestionBtn = document.getElementById("prevQuestionBtn");
  if (prevQuestionBtn) prevQuestionBtn.addEventListener("click", goPrevQuestion);

  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  if (nextQuestionBtn) nextQuestionBtn.addEventListener("click", goNextQuestion);

  const quizSummaryBtn = document.getElementById("quizSummaryBtn");
  if (quizSummaryBtn) {
    quizSummaryBtn.addEventListener("click", () => alert("答题中无法提前查看最终总结。"));
  }

  const openLastAttemptBtn = document.getElementById("openLastAttemptBtn");
  if (openLastAttemptBtn) {
    openLastAttemptBtn.addEventListener("click", () => openPastAttempt("last"));
  }

  const openPreviousAttemptBtn = document.getElementById("openPreviousAttemptBtn");
  if (openPreviousAttemptBtn) {
    openPreviousAttemptBtn.addEventListener("click", () => openPastAttempt("previous"));
  }

  const exitChooserBtn = document.getElementById("exitChooserBtn");
  if (exitChooserBtn) {
    exitChooserBtn.addEventListener("click", () => showPage("home"));
  }

  const backHomeFromResultBtn = document.getElementById("backHomeFromResultBtn");
  if (backHomeFromResultBtn) {
    backHomeFromResultBtn.addEventListener("click", () => showPage("home"));
  }

  const reviewErrorsFromResultBtn = document.getElementById("reviewErrorsFromResultBtn");
  if (reviewErrorsFromResultBtn) {
    reviewErrorsFromResultBtn.addEventListener("click", () => openErrors(currentModule));
  }

  const reviewMistakesBtn = document.getElementById("reviewMistakesBtn");
  if (reviewMistakesBtn) {
    reviewMistakesBtn.addEventListener("click", () => {
      updateLearningPanel("review");
      openErrors(currentModule);
    });
  }

  const practiceWeakBtn = document.getElementById("practiceWeakBtn");
  if (practiceWeakBtn) {
    practiceWeakBtn.addEventListener("click", () => {
      updateLearningPanel("practice");
      startQuizFlow(currentModule);
    });
  }

  const nextLevelBtn = document.getElementById("nextLevelBtn");
  if (nextLevelBtn) {
    nextLevelBtn.addEventListener("click", () => {
      updateLearningPanel("next");
      goNextModuleQuiz();
    });
  }

  const advancedTopicsBtn = document.getElementById("advancedTopicsBtn");
  if (advancedTopicsBtn) {
    advancedTopicsBtn.addEventListener("click", () => {
      updateLearningPanel("advanced");
    });
  }

  const errorHomeBtn = document.getElementById("errorHomeBtn");
  if (errorHomeBtn) {
    errorHomeBtn.addEventListener("click", () => showPage("home"));
  }

  const errorBackBtn = document.getElementById("errorBackBtn");
  if (errorBackBtn) {
    errorBackBtn.addEventListener("click", () => showPage("result"));
  }

  const backHomeFromErrorBtn = document.getElementById("backHomeFromErrorBtn");
  if (backHomeFromErrorBtn) {
    backHomeFromErrorBtn.addEventListener("click", () => showPage("home"));
  }

  const stepSolutionBtn = document.getElementById("stepSolutionBtn");
  if (stepSolutionBtn) {
    stepSolutionBtn.addEventListener("click", showCurrentExplanation);
  }

  const formulaBtn = document.getElementById("formulaBtn");
  if (formulaBtn) {
    formulaBtn.addEventListener("click", () => alert("这里预留 Formula Sheet 接口/跳转。"));
  }

  const videoBtn = document.getElementById("videoBtn");
  if (videoBtn) {
    videoBtn.addEventListener("click", () => alert("这里预留 Video Tutorial 接口/跳转。"));
  }
}


function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultState);
  try {
    return { ...structuredClone(defaultState), ...JSON.parse(raw) };
  } catch (e) {
    return structuredClone(defaultState);
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove("active"));
  pages[name].classList.add("active");
}

async function startQuizFlow(moduleName) {
  currentModule = moduleName;
  currentQuestions = questionBank[moduleName].map(q => ({ ...q }));
  currentQuestionIndex = 0;
  selectedOptionIndex = null;
  currentAttemptScreens = [];
  currentMistakes = [];
  answeredCount = 0;
  reviewMode = false;
  reviewScreens = [];
  reviewScreenIndex = 0;
  timeLeft = 165;
  clearTimer();
  startTimer();

  try {
    if (window.api && api.startQuiz) {
      await api.startQuiz(moduleName);
    }
  } catch (err) {
    console.error("startQuiz 接口失败：", err);
  }

  renderQuizQuestion();
  showPage("quiz");
}

function openAttemptChooser(moduleName) {
  currentModule = moduleName;
  document.getElementById("attemptChooserModule").textContent = getModuleDisplayName(moduleName);
  showPage("chooser");
}

async function openPastAttempt(type) {
  reviewAttemptType = type;
  if (window.api && api.fetchPastAttempt) await api.fetchPastAttempt(currentModule, type);
  reviewMode = true;
  reviewScreens = state.history[currentModule][type] || [];
  reviewScreenIndex = 0;
  clearTimer();

  if (!reviewScreens.length) {
    const lang = getQuizLang();
    alert(lang === "zh" ? `${getModuleDisplayName(currentModule, lang)} 的${type === "last" ? "上一次" : "上上次"}记录为空。` : `No ${type === "last" ? "last" : "previous"} record found for ${getModuleDisplayName(currentModule, lang)}.`);
    return;
  }

  showPage("quiz");
  renderReviewScreen();
}

function renderQuizQuestion() {
  const rawQ = currentQuestions[currentQuestionIndex];
  if (!rawQ) return;
  const q = getLocalizedQuestion(rawQ);

  selectedOptionIndex = null;
  document.getElementById("questionTitle").textContent = q.title;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionHint").textContent = q.hint;
  document.getElementById("questionsAnswered").textContent = `${answeredCount}/${currentQuestions.length}`;
  document.getElementById("quizTopProgress").style.width = `${((answeredCount) / currentQuestions.length) * 100 || 8}%`;

  const optionsList = document.getElementById("optionsList");
  optionsList.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.className = "option-item";
    div.textContent = opt;
    div.addEventListener("click", () => {
      document.querySelectorAll(".option-item").forEach(el => el.classList.remove("selected"));
      div.classList.add("selected");
      selectedOptionIndex = index;
    });
    optionsList.appendChild(div);
  });

  document.getElementById("answerPanel").classList.remove("hidden");
  document.getElementById("feedbackPanel").classList.add("hidden");
  renderQuizNav();
  renderDiagram(q.diagramType);
}

function renderReviewScreen() {
  const snapshot = reviewScreens[reviewScreenIndex];
  if (!snapshot) return;

  const lang = getQuizLang();
  document.getElementById("questionTitle").textContent = snapshot.title + (lang === "zh" ? "（历史测验）" : " (Past Attempt)");
  document.getElementById("questionText").textContent = snapshot.text;
  document.getElementById("questionHint").textContent = snapshot.hint;
  document.getElementById("questionsAnswered").textContent = `${reviewScreenIndex + 1}/${reviewScreens.length}`;
  document.getElementById("quizTopProgress").style.width = `${((reviewScreenIndex + 1) / reviewScreens.length) * 100}%`;
  document.getElementById("timeRemaining").textContent = "--:--";

  const optionsList = document.getElementById("optionsList");
  optionsList.innerHTML = "";
  snapshot.options.forEach((opt, idx) => {
    const div = document.createElement("div");
    div.className = "option-item";
    div.textContent = opt;
    if (idx === snapshot.userAnswerIndex) div.classList.add("selected");
    if (idx === snapshot.correctIndex && idx !== snapshot.userAnswerIndex) {
      div.style.borderColor = "#0d8c3d";
      div.style.background = "#eefbf2";
    }
    optionsList.appendChild(div);
  });

  document.getElementById("answerPanel").classList.remove("hidden");
  document.getElementById("submitAnswerBtn").style.display = "none";

  document.getElementById("feedbackPanel").classList.remove("hidden");
  const feedbackText = document.getElementById("feedbackText");
  feedbackText.textContent = snapshot.isCorrect ? "Correct" : "Incorrect";
  feedbackText.className = `feedback-text ${snapshot.isCorrect ? "correct" : "incorrect"}`;

  const actions = document.getElementById("feedbackActions");
  actions.innerHTML = "";
  const info = document.createElement("div");
  info.innerHTML = `
    <div><strong>你的答案：</strong>${snapshot.userAnswer || "未作答"}</div>
    <div><strong>正确答案：</strong>${snapshot.correctAnswer}</div>
    <div><strong>解析：</strong>${snapshot.explanation}</div>
  `;
  actions.appendChild(info);

  renderReviewNav();
  renderDiagram(snapshot.diagramType);
}

function renderQuizNav() {
  const nav = document.getElementById("quizNavGrid");
  nav.innerHTML = "";
  currentQuestions.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.className = `nav-item ${idx === currentQuestionIndex ? "active" : ""}`;
    btn.textContent = idx + 1;
    btn.addEventListener("click", () => {
      currentQuestionIndex = idx;
      renderQuizQuestion();
    });
    nav.appendChild(btn);
  });
  document.getElementById("submitAnswerBtn").style.display = "block";
}

function renderReviewNav() {
  const nav = document.getElementById("quizNavGrid");
  nav.innerHTML = "";
  reviewScreens.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.className = `nav-item ${idx === reviewScreenIndex ? "active" : ""}`;
    btn.textContent = idx + 1;
    btn.addEventListener("click", () => {
      reviewScreenIndex = idx;
      renderReviewScreen();
    });
    nav.appendChild(btn);
  });
}

async function submitCurrentAnswer() {
  if (reviewMode) return;

  if (selectedOptionIndex === null) {
    alert(getQuizLang() === "zh" ? "请先选择一个答案。" : "Please choose an answer first.");
    return;
  }

  const rawQ = currentQuestions[currentQuestionIndex];
  const q = getLocalizedQuestion(rawQ);
  const isCorrect = selectedOptionIndex === rawQ.correctIndex;
  answeredCount = Math.max(answeredCount, currentQuestionIndex + 1);

  const snapshot = {
    id: rawQ.id,
    title: q.title,
    topic: q.topic,
    text: q.text,
    hint: q.hint,
    options: [...q.options],
    correctIndex: rawQ.correctIndex,
    userAnswerIndex: selectedOptionIndex,
    userAnswer: q.options[selectedOptionIndex],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    isCorrect,
    diagramType: rawQ.diagramType
  };

  currentAttemptScreens[currentQuestionIndex] = snapshot;

  try {
    if (!isCorrect) {
      currentMistakes.push(snapshot);
      state.errors[currentModule].push({
        ...snapshot,
        module: currentModule,
        createdAt: new Date().toISOString()
      });

      if (window.api && api.saveErrors) {
        await api.saveErrors(snapshot);
      }
    }

    if (window.api && api.submitAnswer) {
      await api.submitAnswer({
        module: currentModule,
        questionId: rawQ.id,
        selectedOptionIndex,
        isCorrect
      });
    }
  } catch (err) {
    console.error("submitAnswer 接口失败：", err);
  }

  showFeedback(snapshot);
  persistState();
}

function showFeedback(snapshot) {
  const lang = getQuizLang();
  document.getElementById("answerPanel").classList.add("hidden");
  document.getElementById("feedbackPanel").classList.remove("hidden");
  const feedbackText = document.getElementById("feedbackText");
  feedbackText.textContent = snapshot.isCorrect
    ? (lang === "zh" ? "回答正确" : "Correct")
    : (lang === "zh" ? "回答错误" : "Incorrect");
  feedbackText.className = `feedback-text ${snapshot.isCorrect ? "correct" : "incorrect"}`;

  const actions = document.getElementById("feedbackActions");
  actions.innerHTML = "";

  if (snapshot.isCorrect) {
    actions.appendChild(makeButton(lang === "zh" ? "下一题" : "Next Question", "btn btn-primary", () => {
      moveToNextAfterFeedback();
    }));
  } else {
    actions.appendChild(makeButton(lang === "zh" ? "查看错题" : "Review Error", "btn btn-secondary", () => openErrors(currentModule)));
    actions.appendChild(makeButton(lang === "zh" ? "下一题" : "Next Question", "btn btn-primary", () => moveToNextAfterFeedback()));
    actions.appendChild(makeButton(lang === "zh" ? "再试一次" : "Try Again", "btn btn-secondary", () => {
      document.getElementById("feedbackPanel").classList.add("hidden");
      document.getElementById("answerPanel").classList.remove("hidden");
    }));
  }
}

function moveToNextAfterFeedback() {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex += 1;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

async function finishQuiz() {
  clearTimer();

  const finishedScreens = currentAttemptScreens.filter(Boolean);
  state.history[currentModule].previous = [...state.history[currentModule].last];
  state.history[currentModule].last = finishedScreens;

  const correctCount = finishedScreens.filter(item => item.isCorrect).length;
  const total = currentQuestions.length;
  const percent = Math.round((correctCount / total) * 100);

  state.moduleStats[currentModule].lastScore = `${correctCount}/${total}`;
  const lang = localStorage.getItem("language") || "en";
const t = QUIZ_I18N[lang];

const moduleNameMap = {
  Foundation: t.foundationQuiz,
  Intermediate: t.intermediateQuiz,
  Advanced: t.advancedQuiz
};

state.recentActivity.unshift(
  `${moduleNameMap[currentModule]}: ${correctCount}/${total}`
);
  state.recentActivity = state.recentActivity.slice(0, 8);

  try {
    if (window.api && api.saveAttempt) {
      await api.saveAttempt({
        module: currentModule,
        last: state.history[currentModule].last,
        previous: state.history[currentModule].previous,
        score: `${correctCount}/${total}`
      });
    }
  } catch (err) {
    console.error("saveAttempt 接口失败：", err);
  }

  persistState();
  refreshHome();
  renderResultPage(correctCount, total, percent);
  showPage("result");
}

function renderResultPage(correctCount, total, percent) {
  const lang = getQuizLang();
  const moduleName = getModuleDisplayName(currentModule, lang);
  document.getElementById("resultPercent").textContent = percent;
  document.getElementById("resultSummaryText").textContent = lang === "zh"
    ? `答对 ${correctCount}/${total} 题，错题 ${total - correctCount} 题`
    : `${correctCount}/${total} Correct, ${total - correctCount} Mistakes`;
  document.getElementById("resultBadge").textContent = percent >= 80
    ? (lang === "zh" ? `${moduleName} 已掌握` : `${moduleName} Proficient`)
    : (lang === "zh" ? `${moduleName} 进行中` : `${moduleName} In Progress`);
  document.getElementById("resultMessage").textContent =
    percent >= 80
      ? (lang === "zh" ? `${moduleName} 模块完成得很好，继续巩固薄弱知识点。` : `Great job in ${moduleName}! Keep strengthening weak topics for full mastery.`)
      : (lang === "zh" ? `你正在逐步掌握 ${moduleName}，建议复习错题后再练习一次。` : `You are improving in ${moduleName}. Review your mistakes and try again.`);

  const starsEl = document.getElementById("resultStars");
  let starCount = 0;

  if (percent >= 90) {
    starCount = 3;
  } else if (percent >= 60) {
    starCount = 2;
  } else if (percent >= 30) {
    starCount = 1;
  } else {
    starCount = 0;
  }

  if (starsEl) {
    starsEl.textContent = starCount === 0 ? "☆ ☆ ☆" : "★ ".repeat(starCount).trim();
  }

  const byTopic = {};
  currentQuestions.forEach(q => {
    const topic = getTextByLang(q.topic, getQuizLang());
    if (!byTopic[topic]) byTopic[topic] = { total: 0, correct: 0 };
    byTopic[topic].total += 1;
  });

  currentAttemptScreens.forEach(s => {
    if (s && s.isCorrect) byTopic[s.topic].correct += 1;
  });

  const masteryGrid = document.getElementById("masteryGrid");
  masteryGrid.innerHTML = "";

  Object.entries(byTopic).forEach(([topic, info]) => {
    const pct = Math.round((info.correct / info.total) * 100);
    const bars = Math.max(1, Math.round(pct / 20));
    const item = document.createElement("div");
    item.className = "mastery-item";
    item.innerHTML = `
      <div>${topic}</div>
      <div class="mini-bar">
        ${Array.from({ length: 5 }).map((_, i) => `<span class="${i < bars ? "active" : ""}"></span>`).join("")}
      </div>
      <div>${pct}%</div>
    `;
    masteryGrid.appendChild(item);
  });

  const nextWeak = Object.entries(byTopic).sort(
    (a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)
  )[0];

  document.getElementById("nextStepsText").textContent = nextWeak
  ? (lang === "zh"
      ? `下一步：重点提升 ${nextWeak[0]}，向 100% 掌握前进`
      : `Next Steps: Focus on ${nextWeak[0]} to reach 100% mastery`)
  : (lang === "zh" ? "下一步：继续练习" : "Next Steps: Keep practicing");

  const mistakeSummaryList = document.getElementById("mistakeSummaryList");
  mistakeSummaryList.innerHTML = currentMistakes.length
  ? ""
  : (lang === "zh"
      ? '<div class="mistake-row"><span>本次没有错题。</span><span>非常棒！</span></div>'
      : '<div class="mistake-row"><span>No mistakes this time.</span><span>Excellent!</span></div>');

  currentMistakes.forEach(item => {
    const row = document.createElement("div");
    row.className = "mistake-row";
    row.innerHTML = `<span>${item.title}</span><a href="javascript:void(0)">Review Explanation</a>`;
    row.querySelector("a").addEventListener("click", () => openErrors(currentModule));
    mistakeSummaryList.appendChild(row);
  });

  const historyBox = document.getElementById("recentQuizHistory");
  const progressBarsBox = document.getElementById("historyProgressBars");
  const bestModuleText = document.getElementById("bestModuleText");
  const needsReviewText = document.getElementById("needsReviewText");
  const averageScoreText = document.getElementById("averageScoreText");

  if (historyBox) historyBox.innerHTML = "";
  if (progressBarsBox) progressBarsBox.innerHTML = "";

  const modules = ["Foundation", "Intermediate", "Advanced"];

  const moduleData = modules.map(moduleName => {
    const scoreText = state.moduleStats[moduleName].lastScore;
    const percentValue = parseScore(scoreText);

    let statusClass = "low";
let statusText = lang === "zh" ? "需要复习" : "Needs Review";

if (percentValue >= 80) {
  statusClass = "good";
  statusText = lang === "zh" ? "掌握良好" : "Strong";
} else if (percentValue >= 50) {
  statusClass = "mid";
  statusText = lang === "zh" ? "正在提升" : "Improving";
}

    return {
      moduleName,
      scoreText,
      percentValue,
      statusClass,
      statusText
    };
  });

  if (historyBox && progressBarsBox) {
    moduleData.forEach(item => {
      const row = document.createElement("div");
      row.className = "history-item";
      row.innerHTML = `
  <div class="history-item-left">
    <div class="history-module">${getModuleDisplayName(item.moduleName, lang)}</div>
    <div class="history-subtext">${lang === "zh" ? "最近一次记录" : "Latest saved attempt"}</div>
  </div>
  <div class="history-score">${item.scoreText}</div>
  <div class="history-status ${item.statusClass}">${item.statusText}</div>
`;
      historyBox.appendChild(row);

      const progressRow = document.createElement("div");
      progressRow.className = "progress-row";
      progressRow.innerHTML = `
  <div class="module-name">${getModuleDisplayName(item.moduleName, lang)}</div>
  <div class="bar">
    <div class="bar-fill" style="width:${item.percentValue}%"></div>
  </div>
  <div class="module-percent">${item.percentValue}%</div>
`;
      progressBarsBox.appendChild(progressRow);
    });
  }

  const sortedByBest = [...moduleData].sort((a, b) => b.percentValue - a.percentValue);
  const sortedByWeak = [...moduleData].sort((a, b) => a.percentValue - b.percentValue);
  const avgPercent = Math.round(
    moduleData.reduce((sum, item) => sum + item.percentValue, 0) / moduleData.length
  );

if (bestModuleText) bestModuleText.textContent = getModuleDisplayName(sortedByBest[0].moduleName, lang);
if (needsReviewText) needsReviewText.textContent = getModuleDisplayName(sortedByWeak[0].moduleName, lang);
if (averageScoreText) averageScoreText.textContent = `${avgPercent}%`;

  updateLearningPanel("review");
}

function openErrors(moduleName) {
  const list = document.getElementById("errorList");
  const errors = state.errors[moduleName] || [];
  list.innerHTML = "";

  if (!errors.length) {
    list.innerHTML = '<div class="error-item"><h3>暂无错题</h3><p>当前模块还没有错题记录。</p></div>';
  } else {
    errors.slice().reverse().forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "error-item";
      card.innerHTML = `
        <h3>${index + 1}. ${item.title}</h3>
        <p><strong>题目：</strong>${item.text}</p>
        <p><strong>你的答案：</strong>${item.userAnswer}</p>
        <p><strong>正确答案：</strong>${item.correctAnswer}</p>
        <p><strong>解析：</strong>${item.explanation}</p>
        <div class="error-btn-row"></div>
      `;
      const row = card.querySelector(".error-btn-row");
      row.appendChild(makeButton("重做本题", "btn btn-primary", () => redoWrongQuestion(item, moduleName)));
      row.appendChild(makeButton("返回成绩页", "btn btn-secondary", () => showPage("result")));
      list.appendChild(card);
    });
  }

  showPage("error");
}

function redoWrongQuestion(item, moduleName) {
  currentModule = moduleName;
  currentQuestions = [{ ...item, options: item.options || questionBank[moduleName][0].options }];
  currentQuestionIndex = 0;
  selectedOptionIndex = null;
  currentAttemptScreens = [];
  currentMistakes = [];
  answeredCount = 0;
  reviewMode = false;
  clearTimer();
  startTimer();
  renderQuizQuestion();
  showPage("quiz");
}

function goPrevQuestion() {
  if (reviewMode) {
    if (reviewScreenIndex > 0) {
      reviewScreenIndex -= 1;
      renderReviewScreen();
    }
    return;
  }
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    renderQuizQuestion();
  }
}

function goNextQuestion() {
  if (reviewMode) {
    if (reviewScreenIndex < reviewScreens.length - 1) {
      reviewScreenIndex += 1;
      renderReviewScreen();
    }
    return;
  }
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex += 1;
    renderQuizQuestion();
  }
}

function safeBackHome() {
  clearTimer();
  showPage("home");
}

function goNextModuleQuiz() {
  const order = ["Foundation", "Intermediate", "Advanced"];
  const idx = order.indexOf(currentModule);
  const next = order[(idx + 1) % order.length];
  startQuizFlow(next);
}


function updateLearningPanel(type) {
  const titleEl = document.getElementById("learningDetailTitle");
  const textEl = document.getElementById("learningDetailText");
  const tagsEl = document.getElementById("learningDetailTags");

  if (!titleEl || !textEl || !tagsEl) return;

  const lang = getQuizLang();

  document.querySelectorAll(".learning-btn").forEach(btn => {
    btn.classList.remove("active-learning");
  });

  const buttonMap = {
    review: "reviewMistakesBtn",
    practice: "practiceWeakBtn",
    next: "nextLevelBtn",
    advanced: "advancedTopicsBtn"
  };

  const activeBtn = document.getElementById(buttonMap[type]);
  if (activeBtn) activeBtn.classList.add("active-learning");

  const config = {
    review: {
      title: lang === "zh" ? "复习错题" : "Review Mistakes",
      text: lang === "zh"
        ? "你将打开错题集，查看错误答案、对比正确答案，并逐步阅读解析。"
        : "You will open your mistake collection to review incorrect answers, compare your answer with the correct one, and read the explanation step by step.",
      tags: lang === "zh" ? ["错题", "解析", "重做"] : ["Wrong Questions", "Explanation", "Retry"]
    },
    practice: {
      title: lang === "zh" ? "练习薄弱题目" : "Practice Weak Problems",
      text: lang === "zh"
        ? "你将重新开始当前模块练习，并重点训练本次测验中的薄弱主题，这是提高正确率最快的方法。"
        : "You will restart practice for the current module and focus on weak topics from this quiz result. This is the fastest way to improve your accuracy.",
      tags: lang === "zh" ? ["薄弱主题", "练习", "正确率"] : ["Weak Topic", "Practice", "Accuracy"]
    },
    next: {
      title: lang === "zh" ? "下一等级测验" : "Next Level Quiz",
      text: lang === "zh"
        ? "你将按顺序进入下一个模块：基础 → 进阶 → 高级，帮助你逐步挑战更高难度内容。"
        : "You will move to the next module in order: Foundation → Intermediate → Advanced. This helps you continue learning with increasing difficulty.",
      tags: lang === "zh" ? ["下一模块", "挑战", "进步"] : ["Next Module", "Challenge", "Progress"]
    },
    advanced: {
      title: lang === "zh" ? "探索高级主题" : "Explore Advanced Topics",
      text: lang === "zh"
        ? "推荐高级内容：圆内接四边形定理、切线与割线关系、弦的性质，以及证明题训练。"
        : "Suggested advanced content: cyclic quadrilateral theorems, tangent-secant relationships, chord properties, and proof-based geometry questions.",
      tags: lang === "zh" ? ["定理", "证明", "挑战"] : ["Theorems", "Proof", "Challenge"]
    }
  };

  const selected = config[type];
  if (!selected) return;

  titleEl.textContent = selected.title;
  textEl.textContent = selected.text;
  tagsEl.innerHTML = selected.tags
    .map(tag => `<span class="learning-tag">${tag}</span>`)
    .join("");
}

function makeButton(text, className, onClick) {
  const btn = document.createElement("button");
  btn.className = className;
  btn.textContent = text;
  btn.addEventListener("click", onClick);
  return btn;
}

function startTimer() {
  document.getElementById("timeRemaining").textContent = formatTime(timeLeft);
  quizTimer = setInterval(() => {
    timeLeft -= 1;
    document.getElementById("timeRemaining").textContent = formatTime(Math.max(timeLeft, 0));
    if (timeLeft <= 0) {
      clearTimer();
      alert("时间到，系统将自动提交已完成部分并进入结果页。");
      finishQuiz();
    }
  }, 1000);
}

function clearTimer() {
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function refreshHome() {
  ["Foundation", "Intermediate", "Advanced"].forEach(moduleName => {
    document.getElementById(`badge-${moduleName}`).textContent = `Last: ${state.moduleStats[moduleName].lastScore}`;
  });

  const recentActivityList = document.getElementById("recentActivityList");
  recentActivityList.innerHTML = state.recentActivity.map(item => `<p>${item}</p>`).join("");

  const scores = ["Foundation", "Intermediate", "Advanced"].map(m => parseScore(state.moduleStats[m].lastScore));
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  document.getElementById("overallProgressText").textContent = `${avg}%`;
  document.getElementById("overallProgressBar").style.width = `${avg}%`;

  const tangentMastery = calculateTopicMastery("Tangent");
  const cyclicMastery = calculateTopicMastery("Cyclic Quadrilaterals");
const lang = getQuizLang();

document.getElementById("tangentProgressText").textContent =
  lang === "zh" ? `${tangentMastery}% 已掌握` : `${tangentMastery}% Mastered`;

document.getElementById("cyclicProgressText").textContent =
  lang === "zh" ? `${cyclicMastery}% 已掌握` : `${cyclicMastery}% Mastered`;

const foundationScore = state.moduleStats.Foundation.lastScore;
document.getElementById("recommendTip").textContent =
  lang === "zh"
    ? `推荐下一步：你上次基础模块得分 ${foundationScore} → 建议复习关键概念或进入进阶模块。`
    : `Recommended Next Step: Your last Foundation score: ${foundationScore} → Review key concepts or move to Intermediate.`;
}

function parseScore(text) {
  if (!text || text === "N/A") return 0;
  const parts = text.split("/");
  if (parts.length !== 2) return 0;
  return Math.round((Number(parts[0]) / Number(parts[1])) * 100);
}

function calculateTopicMastery(topicName) {
  const allAttempts = Object.values(state.history).flatMap(v => v.last || []);
  const related = allAttempts.filter(item => item.topic === topicName);
  if (!related.length) return 50;
  const correct = related.filter(item => item.isCorrect).length;
  return Math.round((correct / related.length) * 100);
}

function showCurrentExplanation() {
  const q = reviewMode ? reviewScreens[reviewScreenIndex] : currentQuestions[currentQuestionIndex];
  if (!q) return;
  alert(`解析：${q.explanation || "当前题暂无解析。"} `);
}

function renderDiagram(type) {
  const diagram = document.getElementById("diagramArea");

  const map = {
    tangent: `
      <div class="circle-shape" style="left:120px; top:180px; width:210px; height:210px;"></div>

      <div class="point" style="left:225px; top:180px;"></div>
      <div class="point-name" style="left:225px; top:152px;">A</div>

      <div class="point" style="left:225px; top:285px;"></div>
      <div class="point-name" style="left:225px; top:322px;">O</div>

      <div class="point" style="left:500px; top:180px;"></div>
      <div class="point-name" style="left:528px; top:152px;">P</div>

      <div class="line" style="left:225px; top:180px; width:275px; transform: rotate(0deg);"></div>
      <div class="line" style="left:225px; top:285px; width:105px; transform: rotate(-90deg);"></div>
      <div class="line" style="left:225px; top:285px; width:292px; transform: rotate(-20deg);"></div>

      <div class="label" style="left:332px; top:132px;">PA = ?</div>
      <div class="label" style="left:134px; top:246px;">OA = 5</div>
      <div class="label" style="left:375px; top:248px;">OP = 13</div>
    `,

    radiusDiameter: `
      <div class="circle-shape" style="left:120px; top:150px; width:300px; height:300px;"></div>

      <div class="point" style="left:120px; top:300px;"></div>
      <div class="point-name" style="left:94px; top:300px;">A</div>

      <div class="point" style="left:420px; top:300px;"></div>
      <div class="point-name" style="left:448px; top:300px;">B</div>

      <div class="point" style="left:270px; top:300px;"></div>
      <div class="point-name" style="left:270px; top:342px;">O</div>

      <div class="line" style="left:120px; top:300px; width:300px; transform: rotate(0deg);"></div>
      <div class="line" style="left:270px; top:300px; width:126px; transform: rotate(-65deg);"></div>

      <div class="label" style="left:200px; top:226px;">Diameter = ?</div>
      <div class="label" style="left:210px; top:372px;">Radius = 6</div>
    `,

    basicCircle: `
      <div class="circle-shape" style="left:150px; top:165px; width:270px; height:270px;"></div>

      <div class="point" style="left:285px; top:300px;"></div>
      <div class="point-name" style="left:285px; top:340px;">O</div>

      <div class="line" style="left:285px; top:300px; width:110px; transform: rotate(-36deg);"></div>

      <div class="label" style="left:160px; top:470px;">Use circle formula / theorem</div>
    `,

    twoTangents: `
      <div class="circle-shape" style="left:145px; top:180px; width:220px; height:220px;"></div>

      <div class="point" style="left:255px; top:180px;"></div>
      <div class="point-name" style="left:235px; top:148px;">A</div>

      <div class="point" style="left:255px; top:400px;"></div>
      <div class="point-name" style="left:235px; top:434px;">B</div>

      <div class="point" style="left:520px; top:290px;"></div>
      <div class="point-name" style="left:548px; top:290px;">P</div>

      <div class="line" style="left:255px; top:180px; width:285px; transform: rotate(22deg);"></div>
      <div class="line" style="left:255px; top:400px; width:285px; transform: rotate(-22deg);"></div>

      <div class="label" style="left:320px; top:275px;">PA = PB</div>
    `,

    semicircle: `
      <div class="circle-shape" style="left:155px; top:170px; width:280px; height:280px;"></div>
      <div class="line" style="left:155px; top:310px; width:280px; transform: rotate(0deg);"></div>
      <div class="label" style="left:176px; top:472px;">Angle in a semicircle = 90°</div>
    `,

    secant: `
      <div class="circle-shape" style="left:160px; top:180px; width:250px; height:250px;"></div>
      <div class="line" style="left:86px; top:255px; width:388px; transform: rotate(10deg);"></div>
      <div class="line" style="left:145px; top:420px; width:290px; transform: rotate(-32deg);"></div>
      <div class="label" style="left:188px; top:475px;">PA² = PB × PC</div>
    `,

    cyclic: `
      <div class="circle-shape" style="left:145px; top:160px; width:280px; height:280px;"></div>
      <div class="line" style="left:196px; top:235px; width:184px; transform: rotate(35deg);"></div>
      <div class="line" style="left:196px; top:365px; width:184px; transform: rotate(-35deg);"></div>
      <div class="label" style="left:128px; top:480px;">Opposite angles sum to 180°</div>
    `
  };

  diagram.innerHTML = map[type] || map.basicCircle;
}
function bindSharedNavForQuizApp() {
  const navHomeBtn = document.getElementById("navHomeBtn");
  const navGameBtn = document.getElementById("navGameBtn");
  const navQuizBtn = document.getElementById("navQuizBtn");
  const pageBreadcrumb = document.getElementById("pageBreadcrumb");

  if (navHomeBtn) {
    navHomeBtn.addEventListener("click", () => {
      showPage("home");
      if (pageBreadcrumb) pageBreadcrumb.textContent = "Home";
      setActiveSharedNav("home");
    });
  }

  if (navGameBtn) {
    navGameBtn.addEventListener("click", () => {
      showPage("home");
      if (pageBreadcrumb) pageBreadcrumb.textContent = "Game";
      setActiveSharedNav("game");
    });
  }

  if (navQuizBtn) {
    navQuizBtn.addEventListener("click", () => {
      showPage("quiz");
      if (pageBreadcrumb) pageBreadcrumb.textContent = "Quiz";
      setActiveSharedNav("quiz");
    });
  }

  setActiveSharedNav("quiz");
}

function setActiveSharedNav(type) {
  const navHomeBtn = document.getElementById("navHomeBtn");
  const navGameBtn = document.getElementById("navGameBtn");
  const navQuizBtn = document.getElementById("navQuizBtn");

  [navHomeBtn, navGameBtn, navQuizBtn].forEach(btn => {
    if (btn) btn.classList.remove("active-nav");
  });

  if (type === "home" && navHomeBtn) navHomeBtn.classList.add("active-nav");
  if (type === "game" && navGameBtn) navGameBtn.classList.add("active-nav");
  if (type === "quiz" && navQuizBtn) navQuizBtn.classList.add("active-nav");
}
