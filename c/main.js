const STORAGE_KEY = "circle_geometry_quiz_v1";

const questionBank = {
  Foundation: [
    {
      id: "F1",
      title: "Question 1: Circle Basics",
      topic: "Radius",
      text: "A circle has radius 6 units. What is its diameter?",
      hint: "Theorem Reminder: Diameter = 2 × Radius.",
      options: ["A) 6 units", "B) 12 units", "C) 18 units", "D) 36 units"],
      correctIndex: 1,
      correctAnswer: "12 units",
      explanation: "直径等于半径的 2 倍，所以 2 × 6 = 12。",
      diagramType: "radiusDiameter"
    },
    {
      id: "F2",
      title: "Question 2: Tangent Properties",
      topic: "Tangent",
      text: "In the diagram, PA is tangent to the circle at A. O is the center of the circle. If OA = 5 units and OP = 13 units, find the length of PA.",
      hint: "Theorem Reminder: Tangent-Radius Theorem: A tangent to a circle is perpendicular to the radius at the point of contact.",
      options: ["A) 8 units", "B) 10 units", "C) 12 units", "D) 18 units"],
      correctIndex: 2,
      correctAnswer: "12 units",
      explanation: "因为 OA ⟂ PA，所以 △OAP 是直角三角形。PA = √(13² - 5²) = √144 = 12。",
      diagramType: "tangent"
    },
    {
      id: "F3",
      title: "Question 3: Circumference",
      topic: "Circumference",
      text: "What is the circumference of a circle with radius 7 units? (Use π = 22/7)",
      hint: "Theorem Reminder: Circumference = 2πr.",
      options: ["A) 14", "B) 22", "C) 44", "D) 49"],
      correctIndex: 2,
      correctAnswer: "44",
      explanation: "2 × 22/7 × 7 = 44。",
      diagramType: "basicCircle"
    }
  ],
  Intermediate: [
    {
      id: "I1",
      title: "Question 1: Tangent Length",
      topic: "Tangent",
      text: "From an external point P, two tangents PA and PB are drawn to a circle. If PA = 9 units, what is PB?",
      hint: "Theorem Reminder: Tangents from the same external point are equal.",
      options: ["A) 7 units", "B) 8 units", "C) 9 units", "D) 18 units"],
      correctIndex: 2,
      correctAnswer: "9 units",
      explanation: "同一点引出的两条切线长度相等，因此 PB = PA = 9。",
      diagramType: "twoTangents"
    },
    {
      id: "I2",
      title: "Question 2: Chord Angle",
      topic: "Angles",
      text: "An angle subtended by a diameter at the circumference is:",
      hint: "Theorem Reminder: Angle in a semicircle is 90°.",
      options: ["A) 45°", "B) 60°", "C) 90°", "D) 180°"],
      correctIndex: 2,
      correctAnswer: "90°",
      explanation: "半圆所对的圆周角恒为 90°。",
      diagramType: "semicircle"
    },
    {
      id: "I3",
      title: "Question 3: Secant Theorem",
      topic: "Secant",
      text: "If PA is a tangent and PBC is a secant, then which relation is true?",
      hint: "Theorem Reminder: Tangent-Secant Theorem: PA² = PB × PC.",
      options: ["A) PA = PB + PC", "B) PA² = PB × PC", "C) PA × PB = PC", "D) PA = PB × PC"],
      correctIndex: 1,
      correctAnswer: "PA² = PB × PC",
      explanation: "切割线定理：切线长的平方等于外部段与整条割线长度的乘积。",
      diagramType: "secant"
    }
  ],
  Advanced: [
    {
      id: "A1",
      title: "Question 1: Cyclic Quadrilateral",
      topic: "Cyclic Quadrilaterals",
      text: "In a cyclic quadrilateral, opposite angles are:",
      hint: "Theorem Reminder: Opposite angles in a cyclic quadrilateral sum to 180°.",
      options: ["A) Equal", "B) Complementary", "C) Supplementary", "D) Perpendicular"],
      correctIndex: 2,
      correctAnswer: "Supplementary",
      explanation: "圆内接四边形对角互补，和为 180°。",
      diagramType: "cyclic"
    },
    {
      id: "A2",
      title: "Question 2: Exterior Angle",
      topic: "Cyclic Quadrilaterals",
      text: "The exterior angle of a cyclic quadrilateral equals:",
      hint: "Theorem Reminder: Exterior angle equals the interior opposite angle.",
      options: ["A) Half of opposite angle", "B) The interior opposite angle", "C) Sum of adjacent angles", "D) 90°"],
      correctIndex: 1,
      correctAnswer: "The interior opposite angle",
      explanation: "圆内接四边形的外角等于其内对角。",
      diagramType: "cyclic"
    },
    {
      id: "A3",
      title: "Question 3: Chord Proof",
      topic: "Chords",
      text: "Equal chords in the same circle are:",
      hint: "Theorem Reminder: Equal chords are equidistant from the center.",
      options: ["A) Parallel", "B) Tangents", "C) Equidistant from center", "D) Diameters"],
      correctIndex: 2,
      correctAnswer: "Equidistant from center",
      explanation: "同圆中等弦到圆心的距离相等。",
      diagramType: "basicCircle"
    }
  ]
};

const api = {
  baseUrl: "/api",
  async startQuiz(moduleName) {
    // 示例接口：POST /api/quiz/start
    // return fetch(`${this.baseUrl}/quiz/start`, {...})
    return Promise.resolve({ success: true, moduleName });
  },
  async saveAttempt(payload) {
    // 示例接口：POST /api/attempts/save
    return Promise.resolve({ success: true, payload });
  },
  async fetchPastAttempt(moduleName, type) {
    // 示例接口：GET /api/attempts?module=Foundation&type=last
    return Promise.resolve({ success: true, moduleName, type });
  },
  async saveErrors(payload) {
    // 示例接口：POST /api/errors/save
    return Promise.resolve({ success: true, payload });
  },
  async submitAnswer(payload) {
    // 示例接口：POST /api/quiz/submit
    return Promise.resolve({ success: true, payload });
  }
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
  recentActivity: [
    "Foundation Quiz: 7/10",
    "Intermediate Quiz: 6/10",
    "Advanced Quiz: N/A"
  ]
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
});

function bindEvents() {
  document.querySelectorAll(".start-btn").forEach(btn => {
    btn.addEventListener("click", () => startQuizFlow(btn.dataset.module));
  });

  document.querySelectorAll(".review-btn").forEach(btn => {
    btn.addEventListener("click", () => openAttemptChooser(btn.dataset.module));
  });

  document.getElementById("submitAnswerBtn").addEventListener("click", submitCurrentAnswer);
  document.getElementById("prevQuestionBtn").addEventListener("click", goPrevQuestion);
  document.getElementById("nextQuestionBtn").addEventListener("click", goNextQuestion);
  document.getElementById("quizSummaryBtn").addEventListener("click", () => alert("答题中无法提前查看最终总结。"));
  document.getElementById("quizHomeBtn").addEventListener("click", () => safeBackHome());
  document.getElementById("quizBackBtn").addEventListener("click", () => safeBackHome());
  document.getElementById("topBackBtn").addEventListener("click", () => showPage("home"));

  document.getElementById("openLastAttemptBtn").addEventListener("click", () => openPastAttempt("last"));
  document.getElementById("openPreviousAttemptBtn").addEventListener("click", () => openPastAttempt("previous"));
  document.getElementById("exitChooserBtn").addEventListener("click", () => showPage("home"));

  document.getElementById("backHomeFromResultBtn").addEventListener("click", () => showPage("home"));
  document.getElementById("reviewErrorsFromResultBtn").addEventListener("click", () => openErrors(currentModule));

  document.getElementById("reviewMistakesBtn").addEventListener("click", () => {
  updateLearningPanel("review");
  openErrors(currentModule);
});

document.getElementById("practiceWeakBtn").addEventListener("click", () => {
  updateLearningPanel("practice");
  startQuizFlow(currentModule);
});

document.getElementById("nextLevelBtn").addEventListener("click", () => {
  updateLearningPanel("next");
  goNextModuleQuiz();
});

document.getElementById("advancedTopicsBtn").addEventListener("click", () => {
  updateLearningPanel("advanced");
});

  document.getElementById("errorHomeBtn").addEventListener("click", () => showPage("home"));
  document.getElementById("errorBackBtn").addEventListener("click", () => showPage("result"));
  document.getElementById("backHomeFromErrorBtn").addEventListener("click", () => showPage("home"));

  document.getElementById("stepSolutionBtn").addEventListener("click", showCurrentExplanation);
  document.getElementById("formulaBtn").addEventListener("click", () => alert("这里预留 Formula Sheet 接口/跳转。"));
  document.getElementById("videoBtn").addEventListener("click", () => alert("这里预留 Video Tutorial 接口/跳转。"));
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
  await api.startQuiz(moduleName);
  renderQuizQuestion();
  showPage("quiz");
}

function openAttemptChooser(moduleName) {
  currentModule = moduleName;
  document.getElementById("attemptChooserModule").textContent = moduleName;
  showPage("chooser");
}

async function openPastAttempt(type) {
  reviewAttemptType = type;
  await api.fetchPastAttempt(currentModule, type);
  reviewMode = true;
  reviewScreens = state.history[currentModule][type] || [];
  reviewScreenIndex = 0;
  clearTimer();

  if (!reviewScreens.length) {
    alert(`${currentModule} 的 ${type === "last" ? "last time" : "the time before last"} 暂无记录。`);
    return;
  }

  showPage("quiz");
  renderReviewScreen();
}

function renderQuizQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  if (!q) return;

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

  document.getElementById("questionTitle").textContent = snapshot.title + "（历史测验）";
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
    alert("请先选择一个答案。");
    return;
  }

  const q = currentQuestions[currentQuestionIndex];
  const isCorrect = selectedOptionIndex === q.correctIndex;
  answeredCount = Math.max(answeredCount, currentQuestionIndex + 1);

  const snapshot = {
    id: q.id,
    title: q.title,
    topic: q.topic,
    text: q.text,
    hint: q.hint,
    options: [...q.options],
    correctIndex: q.correctIndex,
    userAnswerIndex: selectedOptionIndex,
    userAnswer: q.options[selectedOptionIndex],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    isCorrect,
    diagramType: q.diagramType
  };

  currentAttemptScreens[currentQuestionIndex] = snapshot;

  if (!isCorrect) {
    currentMistakes.push(snapshot);
    state.errors[currentModule].push({
      ...snapshot,
      module: currentModule,
      createdAt: new Date().toISOString()
    });
    await api.saveErrors(snapshot);
  }

  await api.submitAnswer({
    module: currentModule,
    questionId: q.id,
    selectedOptionIndex,
    isCorrect
  });

  showFeedback(snapshot);
  persistState();
}

function showFeedback(snapshot) {
  document.getElementById("answerPanel").classList.add("hidden");
  document.getElementById("feedbackPanel").classList.remove("hidden");
  const feedbackText = document.getElementById("feedbackText");
  feedbackText.textContent = snapshot.isCorrect ? "Correct" : "Incorrect";
  feedbackText.className = `feedback-text ${snapshot.isCorrect ? "correct" : "incorrect"}`;

  const actions = document.getElementById("feedbackActions");
  actions.innerHTML = "";

  if (snapshot.isCorrect) {
    actions.appendChild(makeButton("Next Question", "btn btn-primary", () => {
      moveToNextAfterFeedback();
    }));
  } else {
    actions.appendChild(makeButton("Review Error", "btn btn-secondary", () => openErrors(currentModule)));
    actions.appendChild(makeButton("Next Question", "btn btn-primary", () => moveToNextAfterFeedback()));
    actions.appendChild(makeButton("Try Again", "btn btn-secondary", () => {
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
  state.recentActivity.unshift(`${currentModule} Quiz: ${correctCount}/${total}`);
  state.recentActivity = state.recentActivity.slice(0, 8);

  await api.saveAttempt({
    module: currentModule,
    last: state.history[currentModule].last,
    previous: state.history[currentModule].previous,
    score: `${correctCount}/${total}`
  });

  persistState();
  refreshHome();
  renderResultPage(correctCount, total, percent);
  showPage("result");
}

function renderResultPage(correctCount, total, percent) {
  document.getElementById("resultPercent").textContent = percent;
  document.getElementById("resultSummaryText").textContent = `${correctCount}/${total} Correct, ${total - correctCount} Mistakes`;
  document.getElementById("resultBadge").textContent = percent >= 80 ? `${currentModule} Proficient` : `${currentModule} In Progress`;
  document.getElementById("resultMessage").textContent =
    percent >= 80
      ? `Great job in ${currentModule}! Keep strengthening weak topics for full mastery.`
      : `You are improving in ${currentModule}. Review your mistakes and try again.`;

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
    if (!byTopic[q.topic]) byTopic[q.topic] = { total: 0, correct: 0 };
    byTopic[q.topic].total += 1;
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
    ? `Next Steps: Focus on ${nextWeak[0]} to reach 100% mastery`
    : "Next Steps: Keep practicing";

  const mistakeSummaryList = document.getElementById("mistakeSummaryList");
  mistakeSummaryList.innerHTML = currentMistakes.length
    ? ""
    : '<div class="mistake-row"><span>No mistakes this time.</span><span>Excellent!</span></div>';

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
    let statusText = "Needs Review";

    if (percentValue >= 80) {
      statusClass = "good";
      statusText = "Strong";
    } else if (percentValue >= 50) {
      statusClass = "mid";
      statusText = "Improving";
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
          <div class="history-module">${item.moduleName}</div>
          <div class="history-subtext">Latest saved attempt</div>
        </div>
        <div class="history-score">${item.scoreText}</div>
        <div class="history-status ${item.statusClass}">${item.statusText}</div>
      `;
      historyBox.appendChild(row);

      const progressRow = document.createElement("div");
      progressRow.className = "progress-row";
      progressRow.innerHTML = `
        <div class="module-name">${item.moduleName}</div>
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

  if (bestModuleText) bestModuleText.textContent = sortedByBest[0].moduleName;
  if (needsReviewText) needsReviewText.textContent = sortedByWeak[0].moduleName;
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
      title: "Review Mistakes",
      text: "You will open your mistake collection to review incorrect answers, compare your answer with the correct one, and read the explanation step by step.",
      tags: ["Wrong Questions", "Explanation", "Retry"]
    },
    practice: {
      title: "Practice Weak Problems",
      text: "You will restart practice for the current module and focus on weak topics from this quiz result. This is the fastest way to improve your accuracy.",
      tags: ["Weak Topic", "Practice", "Accuracy"]
    },
    next: {
      title: "Next Level Quiz",
      text: "You will move to the next module in order: Foundation → Intermediate → Advanced. This helps you continue learning with increasing difficulty.",
      tags: ["Next Module", "Challenge", "Progress"]
    },
    advanced: {
      title: "Explore Advanced Topics",
      text: "Suggested advanced content: cyclic quadrilateral theorems, tangent-secant relationships, chord properties, and proof-based geometry questions.",
      tags: ["Theorems", "Proof", "Challenge"]
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
  document.getElementById("tangentProgressText").textContent = `${tangentMastery}% Mastered`;
  document.getElementById("tangentProgressBar").style.width = `${tangentMastery}%`;
  document.getElementById("cyclicProgressText").textContent = `${cyclicMastery}% Mastered`;
  document.getElementById("cyclicProgressBar").style.width = `${cyclicMastery}%`;

  const foundationScore = state.moduleStats.Foundation.lastScore;
  document.getElementById("recommendTip").textContent =
    `Recommended Next Step: Your last Foundation score: ${foundationScore} → Review key concepts or move to Intermediate.`;
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