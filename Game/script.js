// ==========================================
// Geometry Escape Lab - Core Logic (V8 - Puzzle Challenge)
// Fixed: Introduced scrambled initial states to enforce real gameplay.
// ==========================================

const svg = document.getElementById("svg");
const levelTitle = document.getElementById("levelTitle");
const statusText = document.getElementById("statusText");
const missionText = document.getElementById("missionText");
const objectiveText = document.getElementById("objectiveText");
const targetText = document.getElementById("targetAngle");
const currentText = document.getElementById("current");
const attemptsText = document.getElementById("attempts");
const feedback = document.getElementById("feedback");
const hintText = document.getElementById("hintText");
const diagramDesc = document.getElementById("diagramDesc");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const roomProgressBadge = document.getElementById("roomProgressBadge");
const breadcrumbRoom = document.getElementById("breadcrumbRoom");

const params = new URLSearchParams(window.location.search);
const requestedLevel = parseInt(params.get("level") || "1", 10);
let unlockedLevel = parseInt(localStorage.getItem("unlockedLevel") || "1", 10);
let highestCleared = parseInt(localStorage.getItem("highestCleared") || "0", 10);

const currentLevel = Math.max(1, Math.min(8, requestedLevel));
if (requestedLevel > unlockedLevel) {
  window.location.href = `play.html?level=${unlockedLevel}`;
}

let attempts = 4;
let solved = false;
let draggingPoint = null;

const center = { x: 200, y: 120 };
const radius = 78;
const svgBounds = { minX: 20, maxX: 380, minY: 20, maxY: 240 };
const OUTSIDE_PADDING = 10;

const GAME_I18N = {
  en: {
    roomChallenge: "Room Challenge", 
    missionLabel: "Mission", 
    goalLabel: "Goal",
    interactiveDiagram: "Interactive Diagram", 
    liveGeometry: "Live Geometry",
    tipLabel: "Tip:", 
    diagramTip: "Move the red points to restore the broken geometric harmony.",
    puzzleConsole: "Puzzle Console", 
    chamberLock: "Chamber Lock", 
    targetRelationship: "Target Relationship",
    currentLabel: "Current", 
    attemptsLeft: "Attempts Left", 
    checkChamber: "Check Chamber",
    nextRoom: "Next Room →", 
    backToRoomMap: "← Back to Room Map", 
    hintTitle: "Hint",
    rewardTitle: "Reward", 
    rewardText: "Clear this room to unlock a theorem fragment in the archive.", 
    playFooter: "Play Room",
    
    inProgress: "In Progress", 
    solvedStatus: "Solved", 
    failedStatus: "Try Again",
    moveThenCheck: "Restore the theorem, then press Check.",
    hintDefault: "Hints will appear if you need support.", 
    hintShortPrefix: "Hint: ", 
    hintDeepPrefix: "Stronger hint: ",
    successMessage: "Perfect Alignment! The theorem is restored.", 
    warningMessage: "Geometry unstable. Adjust the points and try again.",
    
    // --- V9: Lockdown Protocol ---
    exitAndReview: "Evacuate & Review",
    lockedStatus: "System Locked",
    noAttemptsMessage: "System Locked. Evacuate to the map and review the theory.",

    roomProgress: "Room {n} / 8", 
    roomBreadcrumb: "Room {n}", 
    currentPrefix: "Current",
    diagramDescCircle: "Drag the red points on the circle to find the exact alignment.",
    diagramDescOuter: "Drag the red points outside and on the circle to form perfect tangents.",
    diagramDescAltSegment: "Drag the points to un-break the segment angles.",
    
    // --- V8: Puzzle Challenge Missions & Hints ---
    room1Title: "Room 1 - Angle at the Centre", 
    room1Mission: "Move C out of the minor arc to restore the double angle rule.", 
    room1Objective: "Verify that ∠AOB = 2 × ∠ACB.", 
    room1Target: "∠AOB = 2 × ∠ACB", 
    room1Hint1: "Point C is trapped inside the minor arc. Drag it to the larger side of the circle.", 
    room1Hint2: "The theorem only works when the circum angle stands on the major arc.",
    
    room2Title: "Room 2 - Angles in a Semicircle", 
    room2Mission: "First, form a perfect diameter with A and B. Then observe C.", 
    room2Objective: "Verify that ∠ACB = 90°.", 
    room2Target: "∠ACB = 90°", 
    room2Hint1: "Points A and B are not forming a straight line across the centre.", 
    room2Hint2: "Drag A or B until they are exactly opposite each other (180 degrees apart).",
    
    room3Title: "Room 3 - Angles in the Same Segment", 
    room3Mission: "Point D is in the wrong segment. Fix it.", 
    room3Objective: "Verify that ∠ACB = ∠ADB.", 
    room3Target: "∠ACB = ∠ADB", 
    room3Hint1: "C and D must be on the same side of the chord AB.", 
    room3Hint2: "Drag D across the chord so it joins C in the major segment.",
    
    room4Title: "Room 4 - Cyclic Quadrilateral", 
    room4Mission: "Untangle the bowtie shape to form a proper convex quadrilateral.", 
    room4Objective: "Verify that opposite angles sum to 180°.", 
    room4Target: "∠ABC + ∠ADC = 180°", 
    room4Hint1: "The lines are crossing each other. This breaks the interior angles.", 
    room4Hint2: "Drag the vertices so they form a clean boundary around the circle.",
    
    room5Title: "Room 5 - Radius to a Tangent", 
    room5Mission: "Rotate the control arm (L) until the line becomes a perfect tangent.", 
    room5Objective: "Verify that radius ⟂ tangent.", 
    room5Target: "∠OTL = 90°", 
    room5Hint1: "The line crossing T is cutting through the circle. It needs to skim the edge.", 
    room5Hint2: "Drag L until the angle OTL is exactly 90 degrees.",
    
    room6Title: "Room 6 - Tangents from a Point", 
    room6Mission: "Drag A and B until they form perfect 90° tangents with the radius.", 
    room6Objective: "Verify that PA = PB.", 
    room6Target: "PA = PB & Tangent ⟂ Radius", 
    room6Hint1: "The lines from P are just random secants. Turn them into tangents.", 
    room6Hint2: "Drag A and B until both ∠OAP and ∠OBP are 90 degrees.",
    
    room7Title: "Room 7 - Angle Between Tangents", 
    room7Mission: "Drag A and B to form tangents, then check the sum.", 
    room7Objective: "Verify that ∠APB + ∠AOB = 180°.", 
    room7Target: "Sum = 180° & Tangents ⟂ Radius", 
    room7Hint1: "First, make sure A and B are exact tangent points (90°).", 
    room7Hint2: "When ∠OAP and ∠OBP are 90°, the opposite angles will sum to 180°.",
    
    room8Title: "Room 8 - Alternate Segment", 
    room8Mission: "Point C is in the wrong segment. Restore the alternate harmony.", 
    room8Objective: "Verify that tangent-chord angle = ∠ACB.", 
    room8Target: "Tangent-chord = ∠ACB", 
    room8Hint1: "Point C must be in the alternate segment to the tangent angle.", 
    room8Hint2: "Drag C across the chord AB to the opposite side of the circle."
  },

  zh: {
    roomChallenge: "房间挑战", 
    missionLabel: "任务", 
    goalLabel: "目标",
    interactiveDiagram: "交互图形", 
    liveGeometry: "实时几何",
    tipLabel: "提示：", 
    diagramTip: "图形初始处于破损状态，拖动红点修复定理关系。",
    puzzleConsole: "解密面板", 
    chamberLock: "房间机关", 
    targetRelationship: "目标关系",
    currentLabel: "当前值", 
    attemptsLeft: "剩余次数", 
    checkChamber: "检查机关",
    nextRoom: "下一房间 →", 
    backToRoomMap: "← 返回地图", 
    hintTitle: "提示",
    rewardTitle: "奖励", 
    rewardText: "通关此房间后，可在档案中解锁一条定理碎片。", 
    playFooter: "关卡页面",
    
    inProgress: "修复中", 
    solvedStatus: "已修复", 
    failedStatus: "再试一次",
    moveThenCheck: "将点拖动到正确位置后，点击检查。",
    hintDefault: "需要帮助时会显示提示。", 
    hintShortPrefix: "提示：", 
    hintDeepPrefix: "深度提示：",
    successMessage: "完美共振！几何定理已修复。", 
    warningMessage: "几何结构仍不稳定，继续调整红点。",
    
    // --- V9: Lockdown Protocol ---
    exitAndReview: "撤离并复习",
    lockedStatus: "系统已锁死",
    noAttemptsMessage: "机关锁死。请先撤离房间，去复习一下几何定理再来挑战。",

    roomProgress: "第 {n} 关 / 共 8 关", 
    roomBreadcrumb: "房间 {n}", 
    currentPrefix: "当前",
    diagramDescCircle: "拖动圆上的红点，找到完美的定理角度。",
    diagramDescOuter: "在圆外和圆上拖动红点，形成完美的切线。",
    diagramDescAltSegment: "把点拖离错误的区域，让交替弧定理共鸣。",
    
    // --- V8: Puzzle Challenge Missions & Hints ---
    room1Title: "房间 1 - 圆心角", 
    room1Mission: "C 点陷在了劣弧里，导致定理失效。把它拖出来。", 
    room1Objective: "验证 ∠AOB = 2 × ∠ACB。", 
    room1Target: "∠AOB = 2 × ∠ACB", 
    room1Hint1: "目前 C 点在 AB 构成的短弧里面，此时角度关系是错的。", 
    room1Hint2: "把 C 点拖到圆的另一侧（优弧）上，使其等于圆心角的一半。",
    
    room2Title: "房间 2 - 半圆所对的角", 
    room2Mission: "A 和 B 现在并不是直径。先修复直径，再观察 C。", 
    room2Objective: "验证 ∠ACB = 90°。", 
    room2Target: "∠ACB = 90°", 
    room2Hint1: "看看 A、圆心 O、B，它们现在不是一条直线。", 
    room2Hint2: "拖动 A 或 B，让它们穿过圆心形成 180° 的平角（直径）。",
    
    room3Title: "房间 3 - 同弧所对的圆周角", 
    room3Mission: "D 点跑到了错误的弧上。把它带回 C 的身边。", 
    room3Objective: "验证 ∠ACB = ∠ADB。", 
    room3Target: "∠ACB = ∠ADB", 
    room3Hint1: "C 和 D 必须在弦 AB 的同一侧，定理才会成立。", 
    room3Hint2: "把 D 点跨过弦 AB，拖到和 C 点相同的圆弧区域。",
    
    room4Title: "房间 4 - 圆内接四边形", 
    room4Mission: "四边形现在是个交叉的蝴蝶结。理顺它。", 
    room4Objective: "验证对角和为 180°。", 
    room4Target: "∠ABC + ∠ADC = 180°", 
    room4Hint1: "线条交叉导致内部角度计算崩溃了。", 
    room4Hint2: "拖动顶点，让 A, B, C, D 顺着圆周依次排列，形成凸四边形。",
    
    room5Title: "房间 5 - 半径与切线", 
    room5Mission: "拖动控制杆 L，把割线旋转成完美的切线。", 
    room5Objective: "验证半径垂直于切线。", 
    room5Target: "∠OTL = 90°", 
    room5Hint1: "现在的线穿过了圆。切线应该只在边缘擦过。", 
    room5Hint2: "拖动控制杆 L，直到 ∠OTL 变成完美的 90° 直角。",
    
    room6Title: "房间 6 - 切线长定理", 
    room6Mission: "拖动 A 和 B，直到它们成为真正的“切点”。", 
    room6Objective: "验证 PA = PB。", 
    room6Target: "PA = PB 且 切线 ⟂ 半径", 
    room6Hint1: "现在 P 连向 A 和 B 的线只是随便画的。你需要让它们垂直于半径。", 
    room6Hint2: "拖动 A 和 B，直到图上显示的 ∠OAP 和 ∠OBP 都变成 90°。",
    
    room7Title: "房间 7 - 两切线夹角", 
    room7Mission: "同上，先拖动 A 和 B 形成切线，再验证互补角。", 
    room7Objective: "验证 ∠APB + ∠AOB = 180°。", 
    room7Target: "和为 180° 且 切点为 90°", 
    room7Hint1: "定理的前提是 A 和 B 必须是切点。", 
    room7Hint2: "先让 ∠OAP 和 ∠OBP 达到 90°，你会发现剩下的两个角加起来正好 180°。",
    
    room8Title: "房间 8 - 交替弧定理", 
    room8Mission: "C 点在错误的弓形里。把它转移到交替弧中。", 
    room8Objective: "验证切线弦角 = ∠ACB。", 
    room8Target: "切线弦角 = ∠ACB", 
    room8Hint1: "C 点现在和切线夹角在弦的同一侧。", 
    room8Hint2: "把 C 点跨过弦拖到上方较大的圆弧（交替弧）里。"
  }
};

function getLang() { return localStorage.getItem("language") || "en"; }
function gt(key) { return GAME_I18N[getLang()]?.[key] || GAME_I18N.en[key] || key; }
function gtf(key, vars = {}) {
  let text = gt(key); Object.keys(vars).forEach((k) => { text = text.replace(`{${k}}`, vars[k]); }); return text;
}
function getRoomsData() {
  return [1,2,3,4,5,6,7,8].map(i => ({
    title: gt(`room${i}Title`), mission: gt(`room${i}Mission`), objective: gt(`room${i}Objective`),
    target: gt(`room${i}Target`), shortHint: gt(`room${i}Hint1`), deepHint: gt(`room${i}Hint2`)
  }));
}

// === V8 核心变动：刻意打乱的初始状态（Puzzle States） ===
const state = {
  room1: { aAngle: 135, bAngle: 35, cAngle: 85 }, // C陷在劣弧
  room2: { aAngle: 150, bAngle: 50, cAngle: 270 }, // AB不是直径
  room3: { aAngle: 150, bAngle: 30, cAngle: 240, dAngle: 90 }, // D在劣弧
  room4: { aAngle: 220, bAngle: 40, cAngle: 140, dAngle: 320 }, // 蝴蝶结形状
  room5: { tAngle: 235, L: { x: 90, y: 190 } }, // L控制切线角度（偏离90度）
  room6: { P: { x: 320, y: 120 }, aAngle: 60, bAngle: 240 }, // A,B不是切点
  room7: { P: { x: 320, y: 120 }, aAngle: 75, bAngle: 210 }, // A,B不是切点
  room8: { aAngle: 130, bAngle: 35, cAngle: 85 } // C在错误的弓形
};

init();

function applyStaticText() {
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  setText("roomChallengeLabel", gt("roomChallenge")); setText("missionLabelText", gt("missionLabel"));
  setText("goalLabelText", gt("goalLabel")); setText("interactiveDiagramLabel", gt("interactiveDiagram"));
  setText("liveGeometryLabel", gt("liveGeometry")); setText("tipLabelText", gt("tipLabel"));
  setText("diagramTipText", gt("diagramTip")); setText("puzzleConsoleLabel", gt("puzzleConsole"));
  setText("chamberLockLabel", gt("chamberLock")); setText("targetRelationshipLabel", gt("targetRelationship"));
  setText("currentLabelText", gt("currentLabel")); setText("attemptsLeftLabel", gt("attemptsLeft"));
  setText("checkBtn", gt("checkChamber")); setText("nextBtn", gt("nextRoom")); setText("backBtn", gt("backToRoomMap"));
  setText("hintTitleText", gt("hintTitle")); setText("rewardTitleText", gt("rewardTitle"));
  setText("rewardText", gt("rewardText")); setText("playFooterText", gt("playFooter"));
}

function setFeedback(type, message) {
  feedback.textContent = message; feedback.className = "feedback-box enhanced-feedback";
  if (type === "success") feedback.classList.add("feedback-success");
  if (type === "warning") feedback.classList.add("feedback-warning");
  if (type === "info") feedback.classList.add("feedback-info");
}

function setHint(text) {
  if (hintText) {
    hintText.textContent = text;
    const hintBox = hintText.closest('.hint-box');
    if (hintBox) {
      hintBox.classList.remove('hint-flash');
      void hintBox.offsetWidth;
      hintBox.classList.add('hint-flash');
    }
  }
}

function getDiagramDescription(level) {
  if (level === 6 || level === 7) return gt("diagramDescOuter");
  if (level === 8) return gt("diagramDescAltSegment");
  return gt("diagramDescCircle");
}

function init() {
  applyStaticText();
  const rooms = getRoomsData(); const room = rooms[currentLevel - 1];
  levelTitle.textContent = room.title;
  if (breadcrumbRoom) breadcrumbRoom.textContent = gtf("roomBreadcrumb", { n: currentLevel });
  if (roomProgressBadge) roomProgressBadge.textContent = gtf("roomProgress", { n: currentLevel });
  statusText.textContent = gt("inProgress"); missionText.textContent = room.mission;
  objectiveText.textContent = room.objective; targetText.textContent = room.target;
  diagramDesc.textContent = getDiagramDescription(currentLevel); attemptsText.textContent = String(attempts);
  setFeedback("info", gt("moveThenCheck")); setHint(gt("hintDefault")); nextBtn.disabled = true;
  
  renderRoom();

  svg.addEventListener("pointerdown", onPointerDown);
  svg.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  checkBtn.addEventListener("click", checkRoom);
  nextBtn.addEventListener("click", goNextRoom);
  window.addEventListener("focus", syncLanguageAndText);
  window.addEventListener("storage", syncLanguageAndText);
  window.addEventListener("languageChanged", syncLanguageAndText);
}

function syncLanguageAndText() {
  applyStaticText();
  const rooms = getRoomsData(); const room = rooms[currentLevel - 1];
  levelTitle.textContent = room.title;
  if (breadcrumbRoom) breadcrumbRoom.textContent = gtf("roomBreadcrumb", { n: currentLevel });
  if (roomProgressBadge) roomProgressBadge.textContent = gtf("roomProgress", { n: currentLevel });
  if (!solved) statusText.textContent = gt("inProgress");
  missionText.textContent = room.mission; objectiveText.textContent = room.objective;
  targetText.textContent = room.target; diagramDesc.textContent = getDiagramDescription(currentLevel);
  if (!solved && feedback.classList.contains("feedback-info")) setFeedback("info", gt("moveThenCheck"));
  if (!solved && (hintText?.textContent === GAME_I18N.en.hintDefault || hintText?.textContent === GAME_I18N.zh.hintDefault)) setHint(gt("hintDefault"));
  renderRoom();
}

function onPointerDown(e) {
  const role = e.target?.dataset?.role;
  if (!role || solved) return;
  draggingPoint = role;
}

function onPointerMove(e) {
  if (!draggingPoint || solved) return;
  e.preventDefault(); // 防止移动端画面滑动
  const pt = getSvgPoint(e);
  
  if (typeof playSound === 'function' && Math.random() > 0.6) playSound('drag');

  if (currentLevel === 5) {
    if (draggingPoint === "T") state.room5.tAngle = pointToCircleAngle(pt);
    if (draggingPoint === "L") state.room5.L = pt;
  } else if (currentLevel === 6 || currentLevel === 7) {
    if (draggingPoint === "P") state[`room${currentLevel}`].P = keepPointOutsideCircle(pt);
    else if (draggingPoint === "A") state[`room${currentLevel}`].aAngle = pointToCircleAngle(pt);
    else if (draggingPoint === "B") state[`room${currentLevel}`].bAngle = pointToCircleAngle(pt);
  } else {
    updateCircleConstrainedRoom(pointToCircleAngle(pt));
  }
  renderRoom();
}

function onPointerUp() { draggingPoint = null; }

function updateCircleConstrainedRoom(angle) {
  switch (currentLevel) {
    case 1:
      if (draggingPoint === "A") state.room1.aAngle = angle;
      if (draggingPoint === "B") state.room1.bAngle = angle;
      if (draggingPoint === "C") state.room1.cAngle = angle; break;
    case 2:
      if (draggingPoint === "A") state.room2.aAngle = angle;
      if (draggingPoint === "B") state.room2.bAngle = angle;
      if (draggingPoint === "C") state.room2.cAngle = angle; break;
    case 3:
      if (draggingPoint === "A") state.room3.aAngle = angle;
      if (draggingPoint === "B") state.room3.bAngle = angle;
      if (draggingPoint === "C") state.room3.cAngle = angle;
      if (draggingPoint === "D") state.room3.dAngle = angle; break;
    case 4:
      if (draggingPoint === "A") state.room4.aAngle = angle;
      if (draggingPoint === "B") state.room4.bAngle = angle;
      if (draggingPoint === "C") state.room4.cAngle = angle;
      if (draggingPoint === "D") state.room4.dAngle = angle; break;
    case 8:
      if (draggingPoint === "A") state.room8.aAngle = angle;
      if (draggingPoint === "B") state.room8.bAngle = angle;
      if (draggingPoint === "C") state.room8.cAngle = angle; break;
  }
}

// === 核心判断与反馈逻辑 ===
function evaluateRoom() {
  switch (currentLevel) {
    case 1: {
      const centreAngle = angleAt(center, pointOnCircle(state.room1.aAngle), pointOnCircle(state.room1.bAngle));
      const circumAngle = angleAt(pointOnCircle(state.room1.cAngle), pointOnCircle(state.room1.aAngle), pointOnCircle(state.room1.bAngle));
      const delta = Math.abs(centreAngle - 2 * circumAngle);
      return { passed: delta < 3.5, delta: delta };
    }
    case 2: {
      const angleC = angleAt(pointOnCircle(state.room2.cAngle), pointOnCircle(state.room2.aAngle), pointOnCircle(state.room2.bAngle));
      let diff = Math.abs(state.room2.aAngle - state.room2.bAngle);
      if (diff > 180) diff = 360 - diff;
      const diameterDelta = Math.abs(180 - diff);
      const delta = Math.abs(angleC - 90) + diameterDelta;
      return { passed: delta < 4, delta: delta };
    }
    case 3: {
      const angle1 = angleAt(pointOnCircle(state.room3.cAngle), pointOnCircle(state.room3.aAngle), pointOnCircle(state.room3.bAngle));
      const angle2 = angleAt(pointOnCircle(state.room3.dAngle), pointOnCircle(state.room3.aAngle), pointOnCircle(state.room3.bAngle));
      return { passed: Math.abs(angle1 - angle2) < 3.5, delta: Math.abs(angle1 - angle2) };
    }
    case 4: {
      const angleABC = angleAt(pointOnCircle(state.room4.bAngle), pointOnCircle(state.room4.aAngle), pointOnCircle(state.room4.cAngle));
      const angleADC = angleAt(pointOnCircle(state.room4.dAngle), pointOnCircle(state.room4.aAngle), pointOnCircle(state.room4.cAngle));
      const delta = Math.abs((angleABC + angleADC) - 180);
      return { passed: delta < 3.5, delta: delta };
    }
    case 5: {
      const T = pointOnCircle(state.room5.tAngle); const L = state.room5.L;
      const angleOTL = angleAt(T, center, L);
      return { passed: Math.abs(angleOTL - 90) < 3.5, delta: Math.abs(angleOTL - 90) };
    }
    case 6: {
      const A = pointOnCircle(state.room6.aAngle); const B = pointOnCircle(state.room6.bAngle); const P = state.room6.P;
      const OAP = angleAt(A, center, P); const OBP = angleAt(B, center, P);
      const delta = Math.max(Math.abs(OAP - 90), Math.abs(OBP - 90));
      return { passed: delta < 4, delta: delta };
    }
    case 7: {
      const A = pointOnCircle(state.room7.aAngle); const B = pointOnCircle(state.room7.bAngle); const P = state.room7.P;
      const OAP = angleAt(A, center, P); const OBP = angleAt(B, center, P);
      const APB = angleAt(P, A, B); const AOB = angleAt(center, A, B);
      const delta = Math.max(Math.abs(OAP - 90), Math.abs(OBP - 90), Math.abs(APB+AOB - 180));
      return { passed: delta < 4, delta: delta };
    }
    case 8: {
      const A = pointOnCircle(state.room8.aAngle); const B = pointOnCircle(state.room8.bAngle); const C = pointOnCircle(state.room8.cAngle);
      const tangentDir = tangentLineAt(B, 180).direction;
      const tangentAngle = angleBetweenLineAndChordAtPoint(B, tangentDir, A);
      const segmentAngle = angleAt(C, A, B);
      const delta = Math.abs(tangentAngle - segmentAngle);
      return { passed: delta < 3.5, delta: delta };
    }
    default: return { passed: false, delta: 999 };
  }
}

function renderRoom() {
  const evalResult = evaluateRoom();
  const isClose = evalResult.delta <= 3.5; 
  const activeColor = isClose ? "var(--primary)" : "var(--svg-line)";
  const activeWidth = isClose ? "4" : "2";

  let data;
  switch (currentLevel) {
    case 1: data = renderRoom1(activeColor, activeWidth); break;
    case 2: data = renderRoom2(activeColor, activeWidth); break;
    case 3: data = renderRoom3(activeColor, activeWidth); break;
    case 4: data = renderRoom4(activeColor, activeWidth); break;
    case 5: data = renderRoom5(activeColor, activeWidth); break;
    case 6: data = renderRoom6(activeColor, activeWidth); break;
    case 7: data = renderRoom7(activeColor, activeWidth); break;
    case 8: data = renderRoom8(activeColor, activeWidth); break;
  }

  svg.innerHTML = data.svg;
  currentText.innerHTML = `<strong>${gt("currentPrefix")}:</strong><br> ${data.current}`;
  if (isClose) currentText.classList.add("close-value"); else currentText.classList.remove("close-value");
}

function renderRoom1(ac, aw) {
  const O = center; const A = pointOnCircle(state.room1.aAngle); const B = pointOnCircle(state.room1.bAngle); const C = pointOnCircle(state.room1.cAngle);
  const centreAngle = angleAt(O, A, B); const circumAngle = angleAt(C, A, B);
  return {
    current: `∠AOB = ${fmt(centreAngle)}°<br>∠ACB = ${fmt(circumAngle)}°`,
    svg: `${circleBase()} ${line(A, O)} ${line(B, O)} ${line(A, C, ac, aw)} ${line(B, C, ac, aw)}
          ${fixedPointSvg(O, "O")} ${dragPointSvg(A, "A", "A")} ${dragPointSvg(B, "B", "B")} ${dragPointSvg(C, "C", "C")}
          ${angleLabelBetweenRays(O, A, B, `∠AOB ${fmt(centreAngle)}°`, 34)} ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(circumAngle)}°`, 24)}`
  };
}

function renderRoom2(ac, aw) {
  const O = center; const A = pointOnCircle(state.room2.aAngle); const B = pointOnCircle(state.room2.bAngle); const C = pointOnCircle(state.room2.cAngle);
  const angle = angleAt(C, A, B);
  return {
    current: `∠ACB = ${fmt(angle)}°`,
    svg: `${circleBase()} ${line(A, B)} ${line(A, C, ac, aw)} ${line(B, C, ac, aw)}
          ${fixedPointSvg(O, "O")} ${dragPointSvg(A, "A", "A")} ${dragPointSvg(B, "B", "B")} ${dragPointSvg(C, "C", "C")}
          ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(angle)}°`, 24)}`
  };
}

function renderRoom3(ac, aw) {
  const A = pointOnCircle(state.room3.aAngle); const B = pointOnCircle(state.room3.bAngle); const C = pointOnCircle(state.room3.cAngle); const D = pointOnCircle(state.room3.dAngle);
  const angle1 = angleAt(C, A, B); const angle2 = angleAt(D, A, B);
  return {
    current: `∠ACB = ${fmt(angle1)}°<br>∠ADB = ${fmt(angle2)}°`,
    svg: `${circleBase()} ${line(A, C, ac, aw)} ${line(B, C, ac, aw)} ${line(A, D, ac, aw)} ${line(B, D, ac, aw)} ${line(A, B)}
          ${dragPointSvg(A, "A", "A")} ${dragPointSvg(B, "B", "B")} ${dragPointSvg(C, "C", "C")} ${dragPointSvg(D, "D", "D")}
          ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(angle1)}°`, 22)} ${angleLabelAtVertex(D, A, B, `∠ADB ${fmt(angle2)}°`, 22)}`
  };
}

function renderRoom4(ac, aw) {
  const A = pointOnCircle(state.room4.aAngle); const B = pointOnCircle(state.room4.bAngle); const C = pointOnCircle(state.room4.cAngle); const D = pointOnCircle(state.room4.dAngle);
  const angleABC = angleAt(B, A, C); const angleADC = angleAt(D, A, C); const sum = angleABC + angleADC;
  return {
    current: `∠ABC = ${fmt(angleABC)}°<br>∠ADC = ${fmt(angleADC)}°<br>Sum = ${fmt(sum)}°`,
    svg: `${circleBase()} ${polyline([A, B, C, D, A], ac, aw)}
          ${dragPointSvg(A, "A", "A")} ${dragPointSvg(B, "B", "B")} ${dragPointSvg(C, "C", "C")} ${dragPointSvg(D, "D", "D")}
          ${angleLabelAtVertex(B, A, C, `∠ABC ${fmt(angleABC)}°`, 22)} ${angleLabelAtVertex(D, A, C, `∠ADC ${fmt(angleADC)}°`, 22)}`
  };
}

function renderRoom5(ac, aw) {
  const O = center; const T = pointOnCircle(state.room5.tAngle); const L = state.room5.L;
  const angleOTL = angleAt(T, O, L);
  const dx = L.x - T.x, dy = L.y - T.y; const mag = Math.hypot(dx,dy) || 1;
  const p1 = { x: T.x - dx/mag * 200, y: T.y - dy/mag * 200 }; const p2 = { x: T.x + dx/mag * 200, y: T.y + dy/mag * 200 };
  return {
    current: `∠OTL = ${fmt(angleOTL)}°`,
    svg: `${circleBase()} ${line(O, T)} ${line(p1, p2, ac, aw)}
          ${fixedPointSvg(O, "O")} ${dragPointSvg(T, "T", "T")} ${dragPointSvg(L, "L", "L")}
          ${freeLabel(T.x + 10, T.y + 20, `∠OTL ${fmt(angleOTL)}°`)}`
  };
}

function renderRoom6(ac, aw) {
  const O = center; const P = state.room6.P; const A = pointOnCircle(state.room6.aAngle); const B = pointOnCircle(state.room6.bAngle);
  const OAP = angleAt(A, center, P); const OBP = angleAt(B, center, P);
  const PA = distance(P, A); const PB = distance(P, B);
  return {
    current: `∠OAP = ${fmt(OAP)}°, ∠OBP = ${fmt(OBP)}°<br>PA = ${fmt(PA)}, PB = ${fmt(PB)}`,
    svg: `${circleBase()} ${line(O, A)} ${line(O, B)} ${line(P, A, ac, aw)} ${line(P, B, ac, aw)}
          ${fixedPointSvg(O, "O")} ${dragPointSvg(A, "A", "A")} ${dragPointSvg(B, "B", "B")} ${dragPointSvg(P, "P", "P")}
          ${freeLabel(A.x - 20, A.y + 20, `∠OAP ${fmt(OAP)}°`)} ${freeLabel(B.x - 20, B.y - 10, `∠OBP ${fmt(OBP)}°`)}`
  };
}

function renderRoom7(ac, aw) {
  const O = center; const P = state.room7.P; const A = pointOnCircle(state.room7.aAngle); const B = pointOnCircle(state.room7.bAngle);
  const OAP = angleAt(A, center, P); const OBP = angleAt(B, center, P);
  const APB = angleAt(P, A, B); const AOB = angleAt(O, A, B); const sum = APB + AOB;
  return {
    current: `∠OAP: ${fmt(OAP)}°, ∠OBP: ${fmt(OBP)}°<br>∠APB + ∠AOB = ${fmt(sum)}°`,
    svg: `${circleBase()} ${line(O, A)} ${line(O, B)} ${line(P, A, ac, aw)} ${line(P, B, ac, aw)}
          ${fixedPointSvg(O, "O")} ${dragPointSvg(A, "A", "A")} ${dragPointSvg(B, "B", "B")} ${dragPointSvg(P, "P", "P")}
          ${angleLabelAtVertex(P, A, B, `∠APB ${fmt(APB)}°`, 24)} ${angleLabelBetweenRays(O, A, B, `∠AOB ${fmt(AOB)}°`, 32)}`
  };
}

function renderRoom8(ac, aw) {
  const A = pointOnCircle(state.room8.aAngle); const B = pointOnCircle(state.room8.bAngle); const C = pointOnCircle(state.room8.cAngle);
  const tangent = tangentLineAt(B, 180);
  const tangentAngle = angleBetweenLineAndChordAtPoint(B, tangent.direction, A);
  const segmentAngle = angleAt(C, A, B);
  return {
    current: `Tangent-chord = ${fmt(tangentAngle)}°<br>∠ACB = ${fmt(segmentAngle)}°`,
    svg: `${circleBase()} ${line(tangent.p1, tangent.p2, ac, aw)} ${line(A, B, ac, aw)} ${line(A, C, ac, aw)} ${line(B, C, ac, aw)}
          ${dragPointSvg(A, "A", "A")} ${dragPointSvg(B, "B", "B")} ${dragPointSvg(C, "C", "C")}
          ${freeLabel(B.x - 30, B.y + 30, `Tangent-chord ${fmt(tangentAngle)}°`)}
          ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(segmentAngle)}°`, 24)}`
  };
}

function checkRoom() {
  if (solved) return;
  const result = evaluateRoom();
  attempts -= 1;
  attemptsText.textContent = String(Math.max(attempts, 0));

  if (result.passed) {
    solved = true;
    if (typeof playSound === 'function') playSound('success'); 
    statusText.textContent = gt("solvedStatus");
    setFeedback("success", gt("successMessage"));
    setHint(gt("hintDefault"));
    nextBtn.disabled = false; 

    if (currentLevel === unlockedLevel && unlockedLevel < 8) {
      unlockedLevel += 1;
      localStorage.setItem("unlockedLevel", String(unlockedLevel));
    }
    if (currentLevel > highestCleared) {
      highestCleared = currentLevel;
      localStorage.setItem("highestCleared", String(highestCleared));
    }
    return;
  }

  if (typeof playSound === 'function') playSound('error'); 
  const challengePanel = document.querySelector('.challenge-panel');
  if (challengePanel) {
    challengePanel.classList.add('shake-animation');
    setTimeout(() => challengePanel.classList.remove('shake-animation'), 400);
  }

  // 修改 checkRoom 里的锁死部分：
  if (attempts <= 0) {
    statusText.textContent = gt("lockedStatus");
    setFeedback("warning", gt("noAttemptsMessage")); // 这里会显示建议复习的文案
    setHint(`${gt("hintDeepPrefix")}${getRoomsData()[currentLevel - 1].deepHint}`);
    
    if (typeof playSound === 'function') playSound('lockdown');
    document.body.classList.add('lockdown-mode'); 
    
    // 把按钮文字变成“撤离并复习”
    checkBtn.textContent = gt("exitAndReview"); 
    checkBtn.classList.add("reboot-btn"); // 继续借用那个红色的高警报样式
    
    checkBtn.removeEventListener("click", checkRoom);
    checkBtn.addEventListener("click", () => {
      // 核心修改：不再是 reload 原地重启，而是强制踢回选关地图（或定理学习页）
      window.location.href = "index.html"; 
    });
    return;
  }
  statusText.textContent = gt("failedStatus");
  setFeedback("warning", gt("warningMessage"));

  if (attempts === 3) setHint(`${gt("hintShortPrefix")}${getRoomsData()[currentLevel - 1].shortHint}`);
  else setHint(`${gt("hintDeepPrefix")}${getRoomsData()[currentLevel - 1].deepHint}`);
}

function goNextRoom() {
  if (!solved) return;
  if (currentLevel >= 8) { window.location.href = "complete.html"; return; }
  window.location.href = `play.html?level=${currentLevel + 1}`;
}

// SVG Drawing Helpers
function line(a, b, stroke = "var(--svg-line)", width = "2") { return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${stroke}" stroke-width="${width}" style="transition: all 0.2s" />`; }
function polyline(points, stroke = "var(--blue)", width = "2") { return `<polyline points="${points.map(p=>`${p.x},${p.y}`).join(" ")}" fill="none" stroke="${stroke}" stroke-width="${width}" style="transition: all 0.2s"/>`; }
function circleBase() { return `<circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="none" stroke="var(--svg-circle)" stroke-width="2"/>`; }
function pointOnCircle(angleDeg) { const rad = degToRad(angleDeg); return { x: center.x + radius * Math.cos(rad), y: center.y - radius * Math.sin(rad) }; }
function tangentLineAt(T, halfLen = 170) { const dx = T.x - center.x, dy = T.y - center.y, mag = Math.hypot(dx, dy) || 1; return { p1: { x: T.x + dy/mag * halfLen, y: T.y - dx/mag * halfLen }, p2: { x: T.x - dy/mag * halfLen, y: T.y + dx/mag * halfLen }, direction: { x: -dy/mag, y: dx/mag } }; }
function tangentPointsFromExternalPointSafe(P) { const d = Math.hypot(P.x - center.x, P.y - center.y), base = Math.atan2(P.y - center.y, P.x - center.x), alpha = Math.acos(radius / d); return [ { x: center.x + radius * Math.cos(base + alpha), y: center.y + radius * Math.sin(base + alpha) }, { x: center.x + radius * Math.cos(base - alpha), y: center.y + radius * Math.sin(base - alpha) } ]; }
function angleAt(vertex, p1, p2) { const v1x = p1.x - vertex.x, v1y = p1.y - vertex.y, v2x = p2.x - vertex.x, v2y = p2.y - vertex.y; const cos = clamp((v1x * v2x + v1y * v2y) / (Math.hypot(v1x, v1y) * Math.hypot(v2x, v2y)), -1, 1); return radToDeg(Math.acos(cos)); }
function angleBetweenLineAndChordAtPoint(B, direction, A) { const chord = { x: A.x - B.x, y: A.y - B.y }; const cos = clamp(Math.abs(direction.x * chord.x + direction.y * chord.y) / (Math.hypot(direction.x, direction.y) * Math.hypot(chord.x, chord.y)), -1, 1); return radToDeg(Math.acos(cos)); }
function keepPointOutsideCircle(P) { const d = Math.hypot(P.x - center.x, P.y - center.y), minDist = radius + OUTSIDE_PADDING; if (d >= minDist) return P; return { x: center.x + (P.x - center.x) * minDist / (d || 1), y: center.y + (P.y - center.y) * minDist / (d || 1) }; }
function getSvgPoint(e) { const rect = svg.getBoundingClientRect(); return { x: ((e.clientX - rect.left) / rect.width) * 400, y: ((e.clientY - rect.top) / rect.height) * 260 }; }
function pointToCircleAngle(pt) { return normalizeAngle(radToDeg(Math.atan2(center.y - pt.y, pt.x - center.x))); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function normalizeAngle(deg) { return (deg % 360 + 360) % 360; }
function degToRad(deg) { return (deg * Math.PI) / 180; }
function radToDeg(rad) { return (rad * 180) / Math.PI; }
function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function fmt(num) { return Number(num).toFixed(1); }

function dragPointSvg(p, label, role) { return `<circle cx="${p.x}" cy="${p.y}" r="7" fill="var(--svg-drag-fill)" stroke="var(--svg-drag-stroke)" stroke-width="2" data-role="${role}" style="cursor:pointer"/><text x="${p.x + 10}" y="${p.y - 10}" fill="var(--svg-label)" font-size="14" font-weight="700">${label}</text>`; }
function fixedPointSvg(p, label) { return `<circle cx="${p.x}" cy="${p.y}" r="5" fill="var(--svg-fixed-point)"/><text x="${p.x + 9}" y="${p.y - 9}" fill="var(--svg-label)" font-size="14" font-weight="700">${label}</text>`; }
function freeLabel(x, y, text) { return `<text x="${x}" y="${y}" fill="var(--svg-accent-text)" font-size="14" font-weight="700">${text}</text>`; }
function angleLabelAtVertex(vertex, p1, p2, text, radiusLabel = 24) { const m1 = normalizeVector({ x: p1.x - vertex.x, y: p1.y - vertex.y }); const m2 = normalizeVector({ x: p2.x - vertex.x, y: p2.y - vertex.y }); const mx = m1.x + m2.x, my = m1.y + m2.y, mag = Math.hypot(mx, my) || 1; return freeLabel(vertex.x + (mx / mag) * radiusLabel, vertex.y + (my / mag) * radiusLabel, text); }
function angleLabelBetweenRays(vertex, p1, p2, text, radiusLabel = 34) { return angleLabelAtVertex(vertex, p1, p2, text, radiusLabel); }
function normalizeVector(v) { const mag = Math.hypot(v.x, v.y) || 1; return { x: v.x / mag, y: v.y / mag }; }

// ==========================================
// 音效引擎
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator(), gainNode = audioCtx.createGain();
  osc.connect(gainNode); gainNode.connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  if (type === 'drag') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
    gainNode.gain.setValueAtTime(0.05, now); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.start(now); osc.stop(now + 0.05);
  } else if (type === 'success') {
    osc.type = 'triangle'; osc.frequency.setValueAtTime(440, now); osc.frequency.setValueAtTime(554.37, now + 0.1); osc.frequency.setValueAtTime(659.25, now + 0.2);
    gainNode.gain.setValueAtTime(0, now); gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.start(now); osc.stop(now + 0.8);
  } else if (type === 'error') {
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);
    gainNode.gain.setValueAtTime(0.2, now); gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.start(now); osc.stop(now + 0.3);
  }else if (type === 'lockdown') {
    // 刺耳的双段警报声
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.3);
    osc.frequency.setValueAtTime(400, now + 0.4);
    osc.frequency.linearRampToValueAtTime(600, now + 0.7);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 1.0);
    osc.start(now); osc.stop(now + 1);
  }
}