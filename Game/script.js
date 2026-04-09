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
const resetBtn = document.getElementById("resetBtn");
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
    diagramTip: "Move the red point slowly and compare how the angle or length changes in real time.",
    puzzleConsole: "Puzzle Console",
    chamberLock: "Chamber Lock",
    targetRelationship: "Target Relationship",
    currentLabel: "Current",
    attemptsLeft: "Attempts Left",
    checkChamber: "Check Chamber",
    resetRoom: "Reset Room",
    nextRoom: "Next Room →",
    backToRoomMap: "← Back to Room Map",
    hintTitle: "Hint",
    rewardTitle: "Reward",
    rewardText: "Clear this room to unlock a theorem fragment in the archive.",
    playFooter: "Play Room",

    inProgress: "In Progress",
    solvedStatus: "Solved",
    failedStatus: "Try Again",
    moveThenCheck: "Move the red point, then press Check.",
    resetMessage: "Room reset. Move the red point, then press Check.",
    hintDefault: "Hints will appear if you need support.",
    hintShortPrefix: "Hint: ",
    hintDeepPrefix: "Stronger hint: ",
    successMessage: "Correct. The theorem condition is satisfied.",
    warningMessage: "Not quite yet. Adjust the point and try again.",
    noAttemptsMessage: "No attempts left. Reset the room and try again.",

    roomProgress: "Room {n} / 8",
    roomBreadcrumb: "Room {n}",
    currentPrefix: "Current",
    diagramDescCircle: "Drag the red point on the circle to test the theorem relationship.",
    diagramDescOuter: "Drag the red point outside the circle and compare the changing lengths or angles.",
    diagramDescAltSegment: "Drag the red points on the circle and compare the tangent-chord angle with the angle in the segment.",

    room1Title: "Room 1 - Angle at the Centre",
    room1Mission: "Move A, B, and C on the circle. Compare the central angle with the angle at the circumference standing on the same chord.",
    room1Objective: "Verify that ∠AOB = 2 × ∠ACB.",
    room1Target: "∠AOB = 2 × ∠ACB",
    room1Hint1: "Look at the same chord AB from the centre and from the circumference.",
    room1Hint2: "The centre angle should be double the inscribed angle on the same arc.",

    room2Title: "Room 2 - Angles in a Semicircle",
    room2Mission: "Move C on the circle and observe the angle subtended by diameter AB.",
    room2Objective: "Verify that ∠ACB = 90°.",
    room2Target: "∠ACB = 90°",
    room2Hint1: "AB is the diameter, so focus on the angle at point C.",
    room2Hint2: "Any angle standing on a diameter is a right angle.",

    room3Title: "Room 3 - Angles in the Same Segment",
    room3Mission: "Move A, B, C, and D on the circle. Compare the two angles standing on chord AB.",
    room3Objective: "Verify that ∠ACB = ∠ADB.",
    room3Target: "∠ACB = ∠ADB",
    room3Hint1: "Both angles stand on the same chord AB.",
    room3Hint2: "Angles in the same segment are equal when they subtend the same chord.",

    room4Title: "Room 4 - Cyclic Quadrilateral",
    room4Mission: "Move all four vertices on the circle and investigate opposite angles in cyclic quadrilateral ABCD.",
    room4Objective: "Verify that opposite angles sum to 180°.",
    room4Target: "∠ABC + ∠ADC = 180°",
    room4Hint1: "Compare the two opposite angles only.",
    room4Hint2: "In a cyclic quadrilateral, opposite angles are supplementary.",

    room5Title: "Room 5 - Radius to a Tangent",
    room5Mission: "Move T on the circle and observe the angle between radius OT and the tangent at T.",
    room5Objective: "Verify that radius ⟂ tangent.",
    room5Target: "90°",
    room5Hint1: "Focus on the meeting point of the radius and the tangent.",
    room5Hint2: "A radius to the point of tangency is always perpendicular to the tangent.",

    room6Title: "Room 6 - Tangents from a Point are Equal",
    room6Mission: "Move the external point anywhere outside the circle and compare the lengths of the two tangents.",
    room6Objective: "Verify that PA = PB.",
    room6Target: "PA = PB",
    room6Hint1: "Both segments start from the same external point P.",
    room6Hint2: "Tangents drawn from the same external point are equal in length.",

    room7Title: "Room 7 - Angle Between Two Tangents",
    room7Mission: "Move the external point anywhere outside the circle and compare ∠APB with ∠AOB.",
    room7Objective: "Verify that ∠APB + ∠AOB = 180°.",
    room7Target: "∠APB + ∠AOB = 180°",
    room7Hint1: "Compare the outside angle at P with the centre angle.",
    room7Hint2: "The angle between two tangents and the central angle are supplementary.",

    room8Title: "Room 8 - Alternate Segment Theorem",
    room8Mission: "Move A, B, and C on the circle and compare the tangent-chord angle with the opposite angle in the segment.",
    room8Objective: "Verify that tangent-chord angle = ∠ACB.",
    room8Target: "Tangent-chord angle = ∠ACB",
    room8Hint1: "Compare the angle at the tangent point with the angle in the opposite segment.",
    room8Hint2: "The angle between a tangent and a chord equals the angle in the alternate segment."
  },

  zh: {
    roomChallenge: "房间挑战",
    missionLabel: "任务",
    goalLabel: "目标",
    interactiveDiagram: "交互图形",
    liveGeometry: "实时几何",
    tipLabel: "提示：",
    diagramTip: "缓慢拖动红点，观察角度或长度如何实时变化。",
    puzzleConsole: "挑战面板",
    chamberLock: "房间机关",
    targetRelationship: "目标关系",
    currentLabel: "当前值",
    attemptsLeft: "剩余次数",
    checkChamber: "检查机关",
    resetRoom: "重置房间",
    nextRoom: "下一房间 →",
    backToRoomMap: "← 返回房间地图",
    hintTitle: "提示",
    rewardTitle: "奖励",
    rewardText: "通关此房间后，可在档案中解锁一条定理碎片。",
    playFooter: "关卡页面",

    inProgress: "进行中",
    solvedStatus: "已完成",
    failedStatus: "再试一次",
    moveThenCheck: "移动红点后，点击检查。",
    resetMessage: "房间已重置。移动红点后，点击检查。",
    hintDefault: "需要帮助时会显示提示。",
    hintShortPrefix: "提示：",
    hintDeepPrefix: "进一步提示：",
    successMessage: "正确，定理关系已满足。",
    warningMessage: "还不太对，继续调整点的位置再试试。",
    noAttemptsMessage: "次数已用完，请重置房间后再试。",

    roomProgress: "第 {n} 关 / 共 8 关",
    roomBreadcrumb: "房间 {n}",
    currentPrefix: "当前值",
    diagramDescCircle: "拖动圆上的红点，验证定理关系。",
    diagramDescOuter: "在圆外拖动红点，比较变化中的长度或角度。",
    diagramDescAltSegment: "拖动圆上的红点，比较切线弦角与弧内圆周角。",

    room1Title: "房间 1 - 圆心角",
    room1Mission: "拖动圆上的 A、B、C 三点，比较同弦所对的圆心角和圆周角。",
    room1Objective: "验证 ∠AOB = 2 × ∠ACB。",
    room1Target: "∠AOB = 2 × ∠ACB",
    room1Hint1: "观察同一条弦 AB 在圆心和圆周处所对的角。",
    room1Hint2: "同弧所对的圆心角等于圆周角的两倍。",

    room2Title: "房间 2 - 半圆所对的角",
    room2Mission: "拖动圆上的 C 点，观察直径 AB 所对的圆周角。",
    room2Objective: "验证 ∠ACB = 90°。",
    room2Target: "∠ACB = 90°",
    room2Hint1: "AB 是直径，重点看 C 点处的角。",
    room2Hint2: "直径所对的圆周角恒为直角。",

    room3Title: "房间 3 - 同弧所对的圆周角",
    room3Mission: "拖动圆上的 A、B、C、D 四点，比较同弦 AB 所对的两个圆周角。",
    room3Objective: "验证 ∠ACB = ∠ADB。",
    room3Target: "∠ACB = ∠ADB",
    room3Hint1: "这两个角都由同一条弦 AB 所确定。",
    room3Hint2: "同弦所对的圆周角相等。",

    room4Title: "房间 4 - 圆内接四边形",
    room4Mission: "拖动圆上的四个顶点，观察圆内接四边形 ABCD 的对角关系。",
    room4Objective: "验证对角和为 180°。",
    room4Target: "∠ABC + ∠ADC = 180°",
    room4Hint1: "只比较一组对角。",
    room4Hint2: "圆内接四边形的对角互补。",

    room5Title: "房间 5 - 半径与切线",
    room5Mission: "拖动圆上的 T 点，观察半径 OT 与该点切线形成的角。",
    room5Objective: "验证半径垂直于切线。",
    room5Target: "90°",
    room5Hint1: "注意半径和切线交于切点的位置。",
    room5Hint2: "经过切点的半径总与切线垂直。",

    room6Title: "房间 6 - 同一点引切线长度相等",
    room6Mission: "在圆外拖动点 P，比较两条切线段的长度。",
    room6Objective: "验证 PA = PB。",
    room6Target: "PA = PB",
    room6Hint1: "两条线段都从同一个圆外点 P 出发。",
    room6Hint2: "从同一圆外点引出的两条切线长度相等。",

    room7Title: "房间 7 - 两切线夹角",
    room7Mission: "在圆外拖动点 P，比较 ∠APB 与 ∠AOB。",
    room7Objective: "验证 ∠APB + ∠AOB = 180°。",
    room7Target: "∠APB + ∠AOB = 180°",
    room7Hint1: "比较圆外点 P 的角和圆心角。",
    room7Hint2: "两切线夹角与对应圆心角互补。",

    room8Title: "房间 8 - 交替弧定理",
    room8Mission: "拖动圆上的 A、B、C 三点，比较切线与弦所成的角和弧内对角。",
    room8Objective: "验证切线弦角 = ∠ACB。",
    room8Target: "切线弦角 = ∠ACB",
    room8Hint1: "比较切点处的角与对弧中的圆周角。",
    room8Hint2: "切线与弦所夹的角等于交替弧中的圆周角。"
  }
};

function getLang() {
  return localStorage.getItem("language") || "en";
}

function gt(key) {
  const lang = getLang();
  return GAME_I18N[lang]?.[key] || GAME_I18N.en[key] || key;
}

function gtf(key, vars = {}) {
  let text = gt(key);
  Object.keys(vars).forEach((k) => {
    text = text.replace(`{${k}}`, vars[k]);
  });
  return text;
}

function getRoomsData() {
  return [
    {
      title: gt("room1Title"),
      mission: gt("room1Mission"),
      objective: gt("room1Objective"),
      target: gt("room1Target"),
      shortHint: gt("room1Hint1"),
      deepHint: gt("room1Hint2")
    },
    {
      title: gt("room2Title"),
      mission: gt("room2Mission"),
      objective: gt("room2Objective"),
      target: gt("room2Target"),
      shortHint: gt("room2Hint1"),
      deepHint: gt("room2Hint2")
    },
    {
      title: gt("room3Title"),
      mission: gt("room3Mission"),
      objective: gt("room3Objective"),
      target: gt("room3Target"),
      shortHint: gt("room3Hint1"),
      deepHint: gt("room3Hint2")
    },
    {
      title: gt("room4Title"),
      mission: gt("room4Mission"),
      objective: gt("room4Objective"),
      target: gt("room4Target"),
      shortHint: gt("room4Hint1"),
      deepHint: gt("room4Hint2")
    },
    {
      title: gt("room5Title"),
      mission: gt("room5Mission"),
      objective: gt("room5Objective"),
      target: gt("room5Target"),
      shortHint: gt("room5Hint1"),
      deepHint: gt("room5Hint2")
    },
    {
      title: gt("room6Title"),
      mission: gt("room6Mission"),
      objective: gt("room6Objective"),
      target: gt("room6Target"),
      shortHint: gt("room6Hint1"),
      deepHint: gt("room6Hint2")
    },
    {
      title: gt("room7Title"),
      mission: gt("room7Mission"),
      objective: gt("room7Objective"),
      target: gt("room7Target"),
      shortHint: gt("room7Hint1"),
      deepHint: gt("room7Hint2")
    },
    {
      title: gt("room8Title"),
      mission: gt("room8Mission"),
      objective: gt("room8Objective"),
      target: gt("room8Target"),
      shortHint: gt("room8Hint1"),
      deepHint: gt("room8Hint2")
    }
  ];
}

const state = {
  room1: { aAngle: 135, bAngle: 35, cAngle: 265 },
  room2: { cAngle: 270 },
  room3: { aAngle: 150, bAngle: 30, cAngle: 240, dAngle: 300 },
  room4: { aAngle: 220, bAngle: 140, cAngle: 40, dAngle: 320 },
  room5: { tAngle: 235 },
  room6: { P: { x: 320, y: 120 } },
  room7: { P: { x: 320, y: 120 } },
  room8: { aAngle: 130, bAngle: 35, cAngle: 250 }
};

init();

function applyStaticText() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("roomChallengeLabel", gt("roomChallenge"));
  setText("missionLabelText", gt("missionLabel"));
  setText("goalLabelText", gt("goalLabel"));
  setText("interactiveDiagramLabel", gt("interactiveDiagram"));
  setText("liveGeometryLabel", gt("liveGeometry"));
  setText("tipLabelText", gt("tipLabel"));
  setText("diagramTipText", gt("diagramTip"));
  setText("puzzleConsoleLabel", gt("puzzleConsole"));
  setText("chamberLockLabel", gt("chamberLock"));
  setText("targetRelationshipLabel", gt("targetRelationship"));
  setText("currentLabelText", gt("currentLabel"));
  setText("attemptsLeftLabel", gt("attemptsLeft"));
  setText("checkBtn", gt("checkChamber"));
  setText("resetBtn", gt("resetRoom"));
  setText("nextBtn", gt("nextRoom"));
  setText("backBtn", gt("backToRoomMap"));
  setText("hintTitleText", gt("hintTitle"));
  setText("rewardTitleText", gt("rewardTitle"));
  setText("rewardText", gt("rewardText"));
  setText("playFooterText", gt("playFooter"));
}

function setFeedback(type, message) {
  feedback.textContent = message;
  feedback.className = "feedback-box enhanced-feedback";
  if (type === "success") feedback.classList.add("feedback-success");
  if (type === "warning") feedback.classList.add("feedback-warning");
  if (type === "info") feedback.classList.add("feedback-info");
}

function setHint(text) {
  if (hintText) hintText.textContent = text;
}

function getDiagramDescription(level) {
  if (level === 6 || level === 7) return gt("diagramDescOuter");
  if (level === 8) return gt("diagramDescAltSegment");
  return gt("diagramDescCircle");
}

function init() {
  applyStaticText();

  const rooms = getRoomsData();
  const room = rooms[currentLevel - 1];

  levelTitle.textContent = room.title;
  if (breadcrumbRoom) breadcrumbRoom.textContent = gtf("roomBreadcrumb", { n: currentLevel });
  if (roomProgressBadge) roomProgressBadge.textContent = gtf("roomProgress", { n: currentLevel });

  statusText.textContent = gt("inProgress");
  missionText.textContent = room.mission;
  objectiveText.textContent = room.objective;
  targetText.textContent = room.target;
  diagramDesc.textContent = getDiagramDescription(currentLevel);
  attemptsText.textContent = String(attempts);
  setFeedback("info", gt("moveThenCheck"));
  setHint(gt("hintDefault"));
  nextBtn.disabled = true;

  renderRoom();

  svg.addEventListener("pointerdown", onPointerDown);
  svg.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  checkBtn.addEventListener("click", checkRoom);
  nextBtn.addEventListener("click", goNextRoom);
  resetBtn.addEventListener("click", resetCurrentRoom);

  window.addEventListener("focus", syncLanguageAndText);
  window.addEventListener("storage", syncLanguageAndText);
  window.addEventListener("languageChanged", syncLanguageAndText);
}

function syncLanguageAndText() {
  applyStaticText();

  const rooms = getRoomsData();
  const room = rooms[currentLevel - 1];

  levelTitle.textContent = room.title;
  if (breadcrumbRoom) breadcrumbRoom.textContent = gtf("roomBreadcrumb", { n: currentLevel });
  if (roomProgressBadge) roomProgressBadge.textContent = gtf("roomProgress", { n: currentLevel });

  if (!solved) {
    statusText.textContent = gt("inProgress");
  }

  missionText.textContent = room.mission;
  objectiveText.textContent = room.objective;
  targetText.textContent = room.target;
  diagramDesc.textContent = getDiagramDescription(currentLevel);

  if (!solved && feedback.classList.contains("feedback-info")) {
    setFeedback("info", gt("moveThenCheck"));
  }

  if (
    !solved &&
    (
      hintText?.textContent === GAME_I18N.en.hintDefault ||
      hintText?.textContent === GAME_I18N.zh.hintDefault
    )
  ) {
    setHint(gt("hintDefault"));
  }

  renderRoom();
}

function resetCurrentRoom() {
  attempts = 4;
  solved = false;

  if (currentLevel === 1) state.room1 = { aAngle: 135, bAngle: 35, cAngle: 265 };
  if (currentLevel === 2) state.room2 = { cAngle: 270 };
  if (currentLevel === 3) state.room3 = { aAngle: 150, bAngle: 30, cAngle: 240, dAngle: 300 };
  if (currentLevel === 4) state.room4 = { aAngle: 220, bAngle: 140, cAngle: 40, dAngle: 320 };
  if (currentLevel === 5) state.room5 = { tAngle: 235 };
  if (currentLevel === 6) state.room6 = { P: { x: 320, y: 120 } };
  if (currentLevel === 7) state.room7 = { P: { x: 320, y: 120 } };
  if (currentLevel === 8) state.room8 = { aAngle: 130, bAngle: 35, cAngle: 250 };

  attemptsText.textContent = String(attempts);
  statusText.textContent = gt("inProgress");
  setFeedback("info", gt("resetMessage"));
  setHint(gt("hintDefault"));
  nextBtn.disabled = true;
  renderRoom();
}

function onPointerDown(e) {
  const role = e.target?.dataset?.role;
  if (!role || solved) return;
  draggingPoint = role;
}

function onPointerMove(e) {
  if (!draggingPoint || solved) return;

  const pt = getSvgPoint(e);

  if (currentLevel >= 1 && currentLevel <= 5) {
    const angle = pointToCircleAngle(pt);
    updateCircleConstrainedRoom(angle);
  } else if (currentLevel === 6 || currentLevel === 7) {
    const clamped = {
      x: clamp(pt.x, svgBounds.minX, svgBounds.maxX),
      y: clamp(pt.y, svgBounds.minY, svgBounds.maxY)
    };
    const outside = keepPointOutsideCircle(clamped);
    if (currentLevel === 6) state.room6.P = outside;
    if (currentLevel === 7) state.room7.P = outside;
  } else if (currentLevel === 8) {
    const angle = pointToCircleAngle(pt);
    if (draggingPoint === "A") state.room8.aAngle = angle;
    if (draggingPoint === "B") state.room8.bAngle = angle;
    if (draggingPoint === "C") state.room8.cAngle = angle;
  }

  renderRoom();
}

function onPointerUp() {
  draggingPoint = null;
}

function updateCircleConstrainedRoom(angle) {
  switch (currentLevel) {
    case 1:
      if (draggingPoint === "A") state.room1.aAngle = angle;
      if (draggingPoint === "B") state.room1.bAngle = angle;
      if (draggingPoint === "C") state.room1.cAngle = angle;
      break;
    case 2:
      if (draggingPoint === "C") state.room2.cAngle = angle;
      break;
    case 3:
      if (draggingPoint === "A") state.room3.aAngle = angle;
      if (draggingPoint === "B") state.room3.bAngle = angle;
      if (draggingPoint === "C") state.room3.cAngle = angle;
      if (draggingPoint === "D") state.room3.dAngle = angle;
      break;
    case 4:
      if (draggingPoint === "A") state.room4.aAngle = angle;
      if (draggingPoint === "B") state.room4.bAngle = angle;
      if (draggingPoint === "C") state.room4.cAngle = angle;
      if (draggingPoint === "D") state.room4.dAngle = angle;
      break;
    case 5:
      if (draggingPoint === "T") state.room5.tAngle = angle;
      break;
  }
}

function pointToCircleAngle(pt) {
  const dx = pt.x - center.x;
  const dy = center.y - pt.y;
  return normalizeAngle(radToDeg(Math.atan2(dy, dx)));
}

function renderRoom() {
  let data;
  switch (currentLevel) {
    case 1:
      data = renderRoom1();
      break;
    case 2:
      data = renderRoom2();
      break;
    case 3:
      data = renderRoom3();
      break;
    case 4:
      data = renderRoom4();
      break;
    case 5:
      data = renderRoom5();
      break;
    case 6:
      data = renderRoom6();
      break;
    case 7:
      data = renderRoom7();
      break;
    case 8:
      data = renderRoom8();
      break;
    default:
      data = renderRoom1();
  }

  svg.innerHTML = data.svg;
  currentText.innerHTML = `<strong>${gt("currentPrefix")}:</strong> ${data.current}`;
}

function renderRoom1() {
  const O = center;
  const A = pointOnCircle(state.room1.aAngle);
  const B = pointOnCircle(state.room1.bAngle);
  const C = pointOnCircle(state.room1.cAngle);

  const centreAngle = angleAt(O, A, B);
  const circumAngle = angleAt(C, A, B);

  return {
    current: `∠AOB = ${fmt(centreAngle)}°, ∠ACB = ${fmt(circumAngle)}°`,
    svg: `
      ${circleBase()}
      ${line(A, O)}
      ${line(B, O)}
      ${line(A, C)}
      ${line(B, C)}
      ${fixedPointSvg(O, "O")}
      ${dragPointSvg(A, "A", "A")}
      ${dragPointSvg(B, "B", "B")}
      ${dragPointSvg(C, "C", "C")}
      ${angleLabelBetweenRays(O, A, B, `∠AOB ${fmt(centreAngle)}°`, 34)}
      ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(circumAngle)}°`, 24)}
    `
  };
}

function renderRoom2() {
  const O = center;
  const A = pointOnCircle(180);
  const B = pointOnCircle(0);
  const C = pointOnCircle(state.room2.cAngle);

  const angle = angleAt(C, A, B);

  return {
    current: `∠ACB = ${fmt(angle)}°`,
    svg: `
      ${circleBase()}
      ${line(A, B)}
      ${line(A, C)}
      ${line(B, C)}
      ${fixedPointSvg(O, "O")}
      ${fixedPointSvg(A, "A")}
      ${fixedPointSvg(B, "B")}
      ${dragPointSvg(C, "C", "C")}
      ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(angle)}°`, 24)}
    `
  };
}

function renderRoom3() {
  const A = pointOnCircle(state.room3.aAngle);
  const B = pointOnCircle(state.room3.bAngle);
  const C = pointOnCircle(state.room3.cAngle);
  const D = pointOnCircle(state.room3.dAngle);

  const angle1 = angleAt(C, A, B);
  const angle2 = angleAt(D, A, B);

  return {
    current: `∠ACB = ${fmt(angle1)}°, ∠ADB = ${fmt(angle2)}°`,
    svg: `
      ${circleBase()}
      ${line(A, C)}
      ${line(B, C)}
      ${line(A, D)}
      ${line(B, D)}
      ${dragPointSvg(A, "A", "A")}
      ${dragPointSvg(B, "B", "B")}
      ${dragPointSvg(C, "C", "C")}
      ${dragPointSvg(D, "D", "D")}
      ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(angle1)}°`, 22)}
      ${angleLabelAtVertex(D, A, B, `∠ADB ${fmt(angle2)}°`, 22)}
    `
  };
}

function renderRoom4() {
  const A = pointOnCircle(state.room4.aAngle);
  const B = pointOnCircle(state.room4.bAngle);
  const C = pointOnCircle(state.room4.cAngle);
  const D = pointOnCircle(state.room4.dAngle);

  const angleABC = angleAt(B, A, C);
  const angleADC = angleAt(D, A, C);
  const sum = angleABC + angleADC;

  return {
    current: `∠ABC = ${fmt(angleABC)}°, ∠ADC = ${fmt(angleADC)}°, sum = ${fmt(sum)}°`,
    svg: `
      ${circleBase()}
      ${polyline([A, B, C, D, A])}
      ${dragPointSvg(A, "A", "A")}
      ${dragPointSvg(B, "B", "B")}
      ${dragPointSvg(C, "C", "C")}
      ${dragPointSvg(D, "D", "D")}
      ${angleLabelAtVertex(B, A, C, `∠ABC ${fmt(angleABC)}°`, 22)}
      ${angleLabelAtVertex(D, A, C, `∠ADC ${fmt(angleADC)}°`, 22)}
      ${freeLabel(20, 240, `sum = ${fmt(sum)}°`)}
    `
  };
}

function renderRoom5() {
  const O = center;
  const T = pointOnCircle(state.room5.tAngle);
  const tangent = tangentLineAt(T, 180);

  return {
    current: `Angle = 90.0°`,
    svg: `
      ${circleBase()}
      ${line(O, T)}
      ${line(tangent.p1, tangent.p2)}
      ${fixedPointSvg(O, "O")}
      ${dragPointSvg(T, "T", "T")}
      ${rightAngleMark(T, O, tangent.direction)}
      ${freeLabel(20, 240, `Angle = 90.0°`)}
    `
  };
}

function renderRoom6() {
  const O = center;
  const P = keepPointOutsideCircle(state.room6.P);
  state.room6.P = P;

  const [A, B] = tangentPointsFromExternalPointSafe(P);
  const PA = distance(P, A);
  const PB = distance(P, B);

  return {
    current: `PA = ${fmt(PA)}, PB = ${fmt(PB)}`,
    svg: `
      ${circleBase()}
      ${line(P, A)}
      ${line(P, B)}
      ${fixedPointSvg(O, "O")}
      ${fixedPointSvg(A, "A")}
      ${fixedPointSvg(B, "B")}
      ${dragPointSvg(P, "P", "P")}
      ${segmentMidLabel(P, A, `PA ${fmt(PA)}`)}
      ${segmentMidLabel(P, B, `PB ${fmt(PB)}`)}
    `
  };
}

function renderRoom7() {
  const O = center;
  const P = keepPointOutsideCircle(state.room7.P);
  state.room7.P = P;

  const [A, B] = tangentPointsFromExternalPointSafe(P);
  const angleAPB = angleAt(P, A, B);
  const angleAOB = angleAt(O, A, B);
  const sum = angleAPB + angleAOB;

  return {
    current: `∠APB = ${fmt(angleAPB)}°, ∠AOB = ${fmt(angleAOB)}°, sum = ${fmt(sum)}°`,
    svg: `
      ${circleBase()}
      ${line(P, A)}
      ${line(P, B)}
      ${line(O, A)}
      ${line(O, B)}
      ${fixedPointSvg(O, "O")}
      ${fixedPointSvg(A, "A")}
      ${fixedPointSvg(B, "B")}
      ${dragPointSvg(P, "P", "P")}
      ${angleLabelAtVertex(P, A, B, `∠APB ${fmt(angleAPB)}°`, 24)}
      ${angleLabelBetweenRays(O, A, B, `∠AOB ${fmt(angleAOB)}°`, 32)}
      ${freeLabel(18, 240, `sum = ${fmt(sum)}°`)}
    `
  };
}

function renderRoom8() {
  const A = pointOnCircle(state.room8.aAngle);
  const B = pointOnCircle(state.room8.bAngle);
  const C = pointOnCircle(state.room8.cAngle);

  const tangent = tangentLineAt(B, 180);
  const tangentAngle = angleBetweenLineAndChordAtPoint(B, tangent.direction, A);
  const segmentAngle = angleAt(C, A, B);

  return {
    current: `Tangent-chord = ${fmt(tangentAngle)}°, ∠ACB = ${fmt(segmentAngle)}°`,
    svg: `
      ${circleBase()}
      ${line(tangent.p1, tangent.p2)}
      ${line(A, B)}
      ${line(A, C)}
      ${line(B, C)}
      ${dragPointSvg(A, "A", "A")}
      ${dragPointSvg(B, "B", "B")}
      ${dragPointSvg(C, "C", "C")}
      ${freeLabel(20, 32, `Tangent-chord ${fmt(tangentAngle)}°`)}
      ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(segmentAngle)}°`, 24)}
    `
  };
}

function checkRoom() {
  if (solved) return;

  const result = evaluateRoom();
  attempts -= 1;
  attemptsText.textContent = String(Math.max(attempts, 0));

  if (result.passed) {
    solved = true;
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

  if (attempts <= 0) {
    statusText.textContent = gt("failedStatus");
    setFeedback("warning", gt("noAttemptsMessage"));
    setHint(`${gt("hintDeepPrefix")}${getRoomsData()[currentLevel - 1].deepHint}`);
    return;
  }

  statusText.textContent = gt("failedStatus");
  setFeedback("warning", gt("warningMessage"));

  if (attempts === 3) {
    setHint(`${gt("hintShortPrefix")}${getRoomsData()[currentLevel - 1].shortHint}`);
  } else {
    setHint(`${gt("hintDeepPrefix")}${getRoomsData()[currentLevel - 1].deepHint}`);
  }
}

function evaluateRoom() {
  switch (currentLevel) {
    case 1: {
      const O = center;
      const A = pointOnCircle(state.room1.aAngle);
      const B = pointOnCircle(state.room1.bAngle);
      const C = pointOnCircle(state.room1.cAngle);
      const centreAngle = angleAt(O, A, B);
      const circumAngle = angleAt(C, A, B);
      const delta = Math.abs(centreAngle - 2 * circumAngle);
      return { passed: approxEqual(centreAngle, 2 * circumAngle, 2), delta };
    }
    case 2: {
      const A = pointOnCircle(180);
      const B = pointOnCircle(0);
      const C = pointOnCircle(state.room2.cAngle);
      const angle = angleAt(C, A, B);
      const delta = Math.abs(angle - 90);
      return { passed: approxEqual(angle, 90, 2), delta };
    }
    case 3: {
      const A = pointOnCircle(state.room3.aAngle);
      const B = pointOnCircle(state.room3.bAngle);
      const C = pointOnCircle(state.room3.cAngle);
      const D = pointOnCircle(state.room3.dAngle);
      const angle1 = angleAt(C, A, B);
      const angle2 = angleAt(D, A, B);
      const delta = Math.abs(angle1 - angle2);
      return { passed: approxEqual(angle1, angle2, 2), delta };
    }
    case 4: {
      const A = pointOnCircle(state.room4.aAngle);
      const B = pointOnCircle(state.room4.bAngle);
      const C = pointOnCircle(state.room4.cAngle);
      const D = pointOnCircle(state.room4.dAngle);
      const angleABC = angleAt(B, A, C);
      const angleADC = angleAt(D, A, C);
      const delta = Math.abs(angleABC + angleADC - 180);
      return { passed: approxEqual(angleABC + angleADC, 180, 2), delta };
    }
    case 5:
      return { passed: true, delta: 0 };
    case 6: {
      const P = keepPointOutsideCircle(state.room6.P);
      const [A, B] = tangentPointsFromExternalPointSafe(P);
      const PA = distance(P, A);
      const PB = distance(P, B);
      const delta = Math.abs(PA - PB);
      return { passed: approxEqual(PA, PB, 1), delta };
    }
    case 7: {
      const P = keepPointOutsideCircle(state.room7.P);
      const [A, B] = tangentPointsFromExternalPointSafe(P);
      const angleAPB = angleAt(P, A, B);
      const angleAOB = angleAt(center, A, B);
      const delta = Math.abs(angleAPB + angleAOB - 180);
      return { passed: approxEqual(angleAPB + angleAOB, 180, 2), delta };
    }
    case 8: {
      const A = pointOnCircle(state.room8.aAngle);
      const B = pointOnCircle(state.room8.bAngle);
      const C = pointOnCircle(state.room8.cAngle);
      const tangent = tangentLineAt(B, 180);
      const tangentAngle = angleBetweenLineAndChordAtPoint(B, tangent.direction, A);
      const segmentAngle = angleAt(C, A, B);
      const delta = Math.abs(tangentAngle - segmentAngle);
      return { passed: approxEqual(tangentAngle, segmentAngle, 2), delta };
    }
    default:
      return { passed: false, delta: 999 };
  }
}

function goNextRoom() {
  if (!solved) return;
  if (currentLevel >= 8) {
    window.location.href = "complete.html";
    return;
  }
  window.location.href = `play.html?level=${currentLevel + 1}`;
}

function pointOnCircle(angleDeg) {
  const rad = degToRad(angleDeg);
  return {
    x: center.x + radius * Math.cos(rad),
    y: center.y - radius * Math.sin(rad)
  };
}

function tangentLineAt(T, halfLen = 170) {
  const dx = T.x - center.x;
  const dy = T.y - center.y;
  const mag = Math.hypot(dx, dy) || 1;
  const tx = -dy / mag;
  const ty = dx / mag;
  return {
    p1: { x: T.x - tx * halfLen, y: T.y - ty * halfLen },
    p2: { x: T.x + tx * halfLen, y: T.y + ty * halfLen },
    direction: { x: tx, y: ty }
  };
}

function tangentPointsFromExternalPointSafe(P) {
  const dx = P.x - center.x;
  const dy = P.y - center.y;
  const d = Math.hypot(dx, dy);
  const base = Math.atan2(dy, dx);
  const alpha = Math.acos(radius / d);
  const angle1 = base + alpha;
  const angle2 = base - alpha;
  return [
    { x: center.x + radius * Math.cos(angle1), y: center.y + radius * Math.sin(angle1) },
    { x: center.x + radius * Math.cos(angle2), y: center.y + radius * Math.sin(angle2) }
  ];
}

function angleAt(vertex, p1, p2) {
  const v1x = p1.x - vertex.x;
  const v1y = p1.y - vertex.y;
  const v2x = p2.x - vertex.x;
  const v2y = p2.y - vertex.y;
  const dot = v1x * v2x + v1y * v2y;
  const m1 = Math.hypot(v1x, v1y);
  const m2 = Math.hypot(v2x, v2y);
  const cos = clamp(dot / (m1 * m2), -1, 1);
  return radToDeg(Math.acos(cos));
}

function angleBetweenLineAndChordAtPoint(B, direction, A) {
  const chord = { x: A.x - B.x, y: A.y - B.y };
  const dot = direction.x * chord.x + direction.y * chord.y;
  const m1 = Math.hypot(direction.x, direction.y);
  const m2 = Math.hypot(chord.x, chord.y);
  const cos = clamp(Math.abs(dot) / (m1 * m2), -1, 1);
  return radToDeg(Math.acos(cos));
}

function keepPointOutsideCircle(P) {
  const dx = P.x - center.x;
  const dy = P.y - center.y;
  const d = Math.hypot(dx, dy);
  const minDist = radius + OUTSIDE_PADDING;
  if (d >= minDist) return P;
  const scale = minDist / (d || 1);
  return { x: center.x + dx * scale, y: center.y + dy * scale };
}

function getSvgPoint(e) {
  const rect = svg.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 400;
  const y = ((e.clientY - rect.top) / rect.height) * 260;
  return { x, y };
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function approxEqual(a, b, tolerance = 2) {
  return Math.abs(a - b) <= tolerance;
}

function normalizeAngle(deg) {
  let value = deg % 360;
  if (value < 0) value += 360;
  return value;
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function fmt(num) {
  return Number(num).toFixed(1);
}

function circleBase() {
  return `<circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="none" stroke="var(--svg-circle)" stroke-width="2"/>`;
}

function line(a, b, extra = "") {
  return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="var(--svg-line)" stroke-width="2" ${extra}/>`;
}

function polyline(points) {
  const joined = points.map((p) => `${p.x},${p.y}`).join(" ");
  return `<polyline points="${joined}" fill="none" stroke="var(--svg-line)" stroke-width="2"/>`;
}

function dragPointSvg(p, label, role) {
  return `
    <circle cx="${p.x}" cy="${p.y}" r="7" fill="var(--svg-drag-fill)" stroke="var(--svg-drag-stroke)" stroke-width="2" data-role="${role}" style="cursor:pointer"/>
    <text x="${p.x + 10}" y="${p.y - 10}" fill="var(--svg-label)" font-size="14" font-weight="700">${label}</text>
  `;
}

function fixedPointSvg(p, label) {
  return `
    <circle cx="${p.x}" cy="${p.y}" r="5" fill="var(--svg-fixed-point)"/>
    <text x="${p.x + 9}" y="${p.y - 9}" fill="var(--svg-label)" font-size="14" font-weight="700">${label}</text>
  `;
}

function freeLabel(x, y, text) {
  return `<text x="${x}" y="${y}" fill="var(--svg-accent-text)" font-size="14" font-weight="700">${text}</text>`;
}

function angleLabelAtVertex(vertex, p1, p2, text, radiusLabel = 24) {
  const m1 = normalizeVector({ x: p1.x - vertex.x, y: p1.y - vertex.y });
  const m2 = normalizeVector({ x: p2.x - vertex.x, y: p2.y - vertex.y });
  const mx = m1.x + m2.x;
  const my = m1.y + m2.y;
  const mag = Math.hypot(mx, my) || 1;
  const px = vertex.x + (mx / mag) * radiusLabel;
  const py = vertex.y + (my / mag) * radiusLabel;
  return freeLabel(px, py, text);
}

function angleLabelBetweenRays(vertex, p1, p2, text, radiusLabel = 34) {
  return angleLabelAtVertex(vertex, p1, p2, text, radiusLabel);
}

function segmentMidLabel(a, b, text) {
  const x = (a.x + b.x) / 2;
  const y = (a.y + b.y) / 2;
  return freeLabel(x + 8, y - 8, text);
}

function rightAngleMark(T, O, dir) {
  const vx = (O.x - T.x) / distance(O, T);
  const vy = (O.y - T.y) / distance(O, T);
  const tx = dir.x;
  const ty = dir.y;
  const s = 14;

  const p1 = { x: T.x + vx * s, y: T.y + vy * s };
  const p2 = { x: p1.x + tx * s, y: p1.y + ty * s };
  const p3 = { x: T.x + tx * s, y: T.y + ty * s };

  return `<polyline points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}" fill="none" stroke="var(--svg-accent-text)" stroke-width="2"/>`;
}

function normalizeVector(v) {
  const mag = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / mag, y: v.y / mag };
}