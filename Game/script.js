const svg = document.getElementById("svg");
const levelTitle = document.getElementById("levelTitle");
const statusText = document.getElementById("statusText");
const missionText = document.getElementById("missionText");
const objectiveText = document.getElementById("objectiveText");
const targetText = document.getElementById("targetAngle");
const currentText = document.getElementById("current");
const attemptsText = document.getElementById("attempts");
const feedback = document.getElementById("feedback");
const diagramDesc = document.getElementById("diagramDesc");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");

const params = new URLSearchParams(window.location.search);
const requestedLevel = parseInt(params.get("level") || "1", 10);
let unlockedLevel = parseInt(localStorage.getItem("unlockedLevel") || "1", 10);
let highestCleared = parseInt(localStorage.getItem("highestCleared") || "0", 10);

const currentLevel = Math.max(1, Math.min(8, requestedLevel));
if (requestedLevel > unlockedLevel) {
  window.location.href = `play.html?level=${unlockedLevel}`;
}

let attempts = 3;
let solved = false;
let draggingPoint = null;

const center = { x: 200, y: 120 };
const radius = 78;
const svgBounds = { minX: 20, maxX: 380, minY: 20, maxY: 240 };
const OUTSIDE_PADDING = 10;

const rooms = [
  {
    title: "Room 1 - Angle at the Centre",
    mission:
      "Move A, B, and C on the circle. Compare the central angle with the angle at the circumference standing on the same chord.",
    objective: "Verify that ∠AOB = 2 × ∠ACB.",
    target: "∠AOB = 2 × ∠ACB"
  },
  {
    title: "Room 2 - Angles in a Semicircle",
    mission:
      "Move C on the circle and observe the angle subtended by diameter AB.",
    objective: "Verify that ∠ACB = 90°.",
    target: "∠ACB = 90°"
  },
  {
    title: "Room 3 - Angles in the Same Segment",
    mission:
      "Move A, B, C, and D on the circle. Compare the two angles standing on chord AB.",
    objective: "Verify that ∠ACB = ∠ADB.",
    target: "∠ACB = ∠ADB"
  },
  {
    title: "Room 4 - Cyclic Quadrilateral",
    mission:
      "Move all four vertices on the circle and investigate opposite angles in cyclic quadrilateral ABCD.",
    objective: "Verify that opposite angles sum to 180°.",
    target: "∠ABC + ∠ADC = 180°"
  },
  {
    title: "Room 5 - Radius to a Tangent",
    mission:
      "Move T on the circle and observe the angle between radius OT and the tangent at T.",
    objective: "Verify that radius ⟂ tangent.",
    target: "90°"
  },
  {
    title: "Room 6 - Tangents from a Point are Equal",
    mission:
      "Move the external point anywhere outside the circle and compare the lengths of the two tangents.",
    objective: "Verify that PA = PB.",
    target: "PA = PB"
  },
  {
    title: "Room 7 - Angle Between Two Tangents",
    mission:
      "Move the external point anywhere outside the circle and compare ∠APB with ∠AOB.",
    objective: "Verify that ∠APB + ∠AOB = 180°.",
    target: "∠APB + ∠AOB = 180°"
  },
  {
    title: "Room 8 - Alternate Segment Theorem",
    mission:
      "Move A, B, and C on the circle and compare the tangent-chord angle with the opposite angle in the segment.",
    objective: "Verify that tangent-chord angle = ∠ACB.",
    target: "Tangent-chord angle = ∠ACB"
  }
];

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

function init() {
  const room = rooms[currentLevel - 1];
  levelTitle.textContent = room.title;
  statusText.textContent = "Status: In Progress";
  missionText.textContent = room.mission;
  objectiveText.textContent = room.objective;
  targetText.textContent = room.target;
  diagramDesc.textContent = getDiagramDescription(currentLevel);
  attemptsText.textContent = String(attempts);
  feedback.innerHTML = "Move the red point, then press Check.";
  nextBtn.disabled = true;

  renderRoom();

  svg.addEventListener("pointerdown", onPointerDown);
  svg.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  checkBtn.addEventListener("click", checkRoom);
  nextBtn.addEventListener("click", goNextRoom);
}

function getDiagramDescription(level) {
  return "";
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
  currentText.innerHTML = `<strong>Current:</strong> ${data.current}`;
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
    current: `Tangent-chord angle = ${fmt(tangentAngle)}°, ∠ACB = ${fmt(segmentAngle)}°`,
    svg: `
      ${circleBase()}
      ${line(A, B)}
      ${line(A, C)}
      ${line(B, C)}
      ${line(tangent.p1, tangent.p2)}
      ${dragPointSvg(A, "A", "A")}
      ${dragPointSvg(B, "B", "B")}
      ${dragPointSvg(C, "C", "C")}
      ${angleLabelTangentChord(B, tangent.direction, A, `tan ${fmt(tangentAngle)}°`, 24)}
      ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(segmentAngle)}°`, 24)}
    `
  };
}

function checkRoom() {
  if (solved) return;

  const passed = evaluateRoom();

  if (passed) {
    solved = true;
    statusText.textContent = "Status: Cleared";
    feedback.innerHTML = "Great! The chamber is unlocked.";
    checkBtn.disabled = true;
    nextBtn.disabled = false;

    highestCleared = Math.max(highestCleared, currentLevel);
    unlockedLevel = Math.max(unlockedLevel, Math.min(8, currentLevel + 1));

    localStorage.setItem("highestCleared", String(highestCleared));
    localStorage.setItem("unlockedLevel", String(unlockedLevel));

    if (currentLevel === 8) {
      nextBtn.textContent = "Finish Adventure →";
    }
    return;
  }

  attempts -= 1;
  attemptsText.textContent = String(attempts);

  if (attempts <= 0) {
    feedback.innerHTML = "Almost there. Try moving the point again.";
    checkBtn.disabled = true;
    return;
  }

  feedback.innerHTML = `Not quite yet. ${attempts} attempt${attempts === 1 ? "" : "s"} left.`;
}

function evaluateRoom() {
  switch (currentLevel) {
    case 1: {
      const A = pointOnCircle(state.room1.aAngle);
      const B = pointOnCircle(state.room1.bAngle);
      const C = pointOnCircle(state.room1.cAngle);
      const centreAngle = angleAt(center, A, B);
      const circumAngle = angleAt(C, A, B);
      return approxEqual(centreAngle, circumAngle * 2, 2);
    }
    case 2: {
      const A = pointOnCircle(180);
      const B = pointOnCircle(0);
      const C = pointOnCircle(state.room2.cAngle);
      const angle = angleAt(C, A, B);
      return approxEqual(angle, 90, 2);
    }
    case 3: {
      const A = pointOnCircle(state.room3.aAngle);
      const B = pointOnCircle(state.room3.bAngle);
      const C = pointOnCircle(state.room3.cAngle);
      const D = pointOnCircle(state.room3.dAngle);
      const angle1 = angleAt(C, A, B);
      const angle2 = angleAt(D, A, B);
      return approxEqual(angle1, angle2, 2);
    }
    case 4: {
      const A = pointOnCircle(state.room4.aAngle);
      const B = pointOnCircle(state.room4.bAngle);
      const C = pointOnCircle(state.room4.cAngle);
      const D = pointOnCircle(state.room4.dAngle);
      const angleABC = angleAt(B, A, C);
      const angleADC = angleAt(D, A, C);
      return approxEqual(angleABC + angleADC, 180, 2);
    }
    case 5:
      return true;
    case 6: {
      const P = keepPointOutsideCircle(state.room6.P);
      const [A, B] = tangentPointsFromExternalPointSafe(P);
      const PA = distance(P, A);
      const PB = distance(P, B);
      return approxEqual(PA, PB, 1);
    }
    case 7: {
      const P = keepPointOutsideCircle(state.room7.P);
      const [A, B] = tangentPointsFromExternalPointSafe(P);
      const angleAPB = angleAt(P, A, B);
      const angleAOB = angleAt(center, A, B);
      return approxEqual(angleAPB + angleAOB, 180, 2);
    }
    case 8: {
      const A = pointOnCircle(state.room8.aAngle);
      const B = pointOnCircle(state.room8.bAngle);
      const C = pointOnCircle(state.room8.cAngle);
      const tangent = tangentLineAt(B, 180);
      const tangentAngle = angleBetweenLineAndChordAtPoint(B, tangent.direction, A);
      const segmentAngle = angleAt(C, A, B);
      return approxEqual(tangentAngle, segmentAngle, 2);
    }
    default:
      return false;
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

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function normalizeAngle(angle) {
  let result = angle % 360;
  if (result < 0) result += 360;
  return result;
}

function distance(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function approxEqual(a, b, tolerance = 1) {
  return Math.abs(a - b) <= tolerance;
}

function fmt(n) {
  return Number(n).toFixed(1);
}

function getSvgPoint(evt) {
  const rect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  const x = ((evt.clientX - rect.left) / rect.width) * viewBox.width + viewBox.x;
  const y = ((evt.clientY - rect.top) / rect.height) * viewBox.height + viewBox.y;
  return { x, y };
}

function angleAt(vertex, p1, p2) {
  const v1x = p1.x - vertex.x;
  const v1y = p1.y - vertex.y;
  const v2x = p2.x - vertex.x;
  const v2y = p2.y - vertex.y;

  const dot = v1x * v2x + v1y * v2y;
  const mag1 = Math.hypot(v1x, v1y);
  const mag2 = Math.hypot(v2x, v2y);

  if (mag1 === 0 || mag2 === 0) return 0;

  const cosTheta = clamp(dot / (mag1 * mag2), -1, 1);
  return radToDeg(Math.acos(cosTheta));
}

function keepPointOutsideCircle(P) {
  const dx = P.x - center.x;
  const dy = P.y - center.y;
  const d = Math.hypot(dx, dy);

  if (d < radius + OUTSIDE_PADDING) {
    const safeD = radius + OUTSIDE_PADDING;
    const ux = d === 0 ? 1 : dx / d;
    const uy = d === 0 ? 0 : dy / d;
    return {
      x: center.x + ux * safeD,
      y: center.y + uy * safeD
    };
  }

  return P;
}

function tangentPointsFromExternalPointSafe(P) {
  const dx = P.x - center.x;
  const dy = P.y - center.y;
  const d = Math.hypot(dx, dy);
  const safeD = Math.max(d, radius + OUTSIDE_PADDING);

  const base = Math.atan2(dy, dx);
  const alpha = Math.acos(radius / safeD);

  const t1 = base + alpha;
  const t2 = base - alpha;

  return [
    { x: center.x + radius * Math.cos(t1), y: center.y + radius * Math.sin(t1) },
    { x: center.x + radius * Math.cos(t2), y: center.y + radius * Math.sin(t2) }
  ];
}

function tangentLineAt(point, halfLength = 160) {
  const rx = point.x - center.x;
  const ry = point.y - center.y;
  const len = Math.hypot(rx, ry) || 1;

  const dx = -ry / len;
  const dy = rx / len;

  return {
    p1: { x: point.x - dx * halfLength, y: point.y - dy * halfLength },
    p2: { x: point.x + dx * halfLength, y: point.y + dy * halfLength },
    direction: { x: dx, y: dy }
  };
}

function angleBetweenLineAndChordAtPoint(vertex, lineDirection, otherPoint) {
  const chord = {
    x: otherPoint.x - vertex.x,
    y: otherPoint.y - vertex.y
  };

  const dot = lineDirection.x * chord.x + lineDirection.y * chord.y;
  const mag1 = Math.hypot(lineDirection.x, lineDirection.y);
  const mag2 = Math.hypot(chord.x, chord.y);

  if (mag1 === 0 || mag2 === 0) return 0;

  const angle = radToDeg(Math.acos(clamp(dot / (mag1 * mag2), -1, 1)));
  return Math.min(angle, 180 - angle);
}

/* ---------- 关键修复：全部 SVG 颜色改为 CSS 变量 ---------- */

function circleBase() {
  return `
    <rect x="8" y="8" width="384" height="244" rx="20" fill="transparent"></rect>
    <circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="none" stroke="var(--diagram-circle)" stroke-width="2.8"></circle>
  `;
}

function line(p1, p2, color = "var(--diagram-line)", width = 2.4) {
  return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" />`;
}

function polyline(points, color = "var(--diagram-line)", width = 2.4) {
  const pts = points.map((p) => `${p.x},${p.y}`).join(" ");
  return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" />`;
}

function fixedPointSvg(p, label) {
  return `
    <circle cx="${p.x}" cy="${p.y}" r="6" fill="var(--diagram-fixed-point)"></circle>
    ${pointLabel(p, label, 12, -12)}
  `;
}

function dragPointSvg(p, label, role) {
  return `
    <circle cx="${p.x}" cy="${p.y}" r="8" fill="var(--diagram-drag-point)" stroke="var(--diagram-drag-stroke)" stroke-width="2.4" data-role="${role}" style="cursor:pointer;"></circle>
    ${pointLabel(p, label, 12, -12)}
  `;
}

function pointLabel(p, label, dx = 10, dy = -10) {
  return `<text x="${p.x + dx}" y="${p.y + dy}" font-size="15" font-weight="800" fill="var(--diagram-text)">${label}</text>`;
}

function freeLabel(x, y, text) {
  return `<text x="${x}" y="${y}" font-size="15" font-weight="800" fill="var(--diagram-accent-text)">${text}</text>`;
}

function segmentMidLabel(p1, p2, text) {
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  return `<text x="${mx + 8}" y="${my - 6}" font-size="13.5" font-weight="800" fill="var(--diagram-accent-text)">${text}</text>`;
}

function angleLabelAtVertex(vertex, p1, p2, text, offset = 22) {
  const mid = unitBisector(vertex, p1, p2);
  const lx = vertex.x + mid.x * offset;
  const ly = vertex.y + mid.y * offset;
  return `<text x="${lx}" y="${ly}" font-size="13.5" font-weight="800" fill="var(--diagram-angle-text)">${text}</text>`;
}

function angleLabelBetweenRays(vertex, p1, p2, text, offset = 30) {
  const mid = unitBisector(vertex, p1, p2);
  const lx = vertex.x + mid.x * offset;
  const ly = vertex.y + mid.y * offset;
  return `<text x="${lx}" y="${ly}" font-size="13.5" font-weight="800" fill="var(--diagram-angle-text)">${text}</text>`;
}

function angleLabelTangentChord(vertex, tangentDir, otherPoint, text, offset = 24) {
  const chordDir = normalizeVector({
    x: otherPoint.x - vertex.x,
    y: otherPoint.y - vertex.y
  });
  const tanDir = normalizeVector(tangentDir);
  const mid = normalizeVector({
    x: chordDir.x + tanDir.x,
    y: chordDir.y + tanDir.y
  });
  const lx = vertex.x + mid.x * offset;
  const ly = vertex.y + mid.y * offset;
  return `<text x="${lx}" y="${ly}" font-size="13.5" font-weight="800" fill="var(--diagram-angle-text)">${text}</text>`;
}

function rightAngleMark(vertex, centerPoint, tangentDir, size = 16) {
  const r = normalizeVector({
    x: centerPoint.x - vertex.x,
    y: centerPoint.y - vertex.y
  });
  const t = normalizeVector(tangentDir);

  const p1 = { x: vertex.x + r.x * size, y: vertex.y + r.y * size };
  const p2 = { x: p1.x + t.x * size, y: p1.y + t.y * size };
  const p3 = { x: vertex.x + t.x * size, y: vertex.y + t.y * size };

  return `
    <polyline
      points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}"
      fill="none"
      stroke="var(--diagram-accent-text)"
      stroke-width="2.2"
    />
  `;
}

function normalizeVector(v) {
  const mag = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / mag, y: v.y / mag };
}

function unitBisector(vertex, p1, p2) {
  const v1 = normalizeVector({ x: p1.x - vertex.x, y: p1.y - vertex.y });
  const v2 = normalizeVector({ x: p2.x - vertex.x, y: p2.y - vertex.y });
  const sum = { x: v1.x + v2.x, y: v1.y + v2.y };
  const mag = Math.hypot(sum.x, sum.y);

  if (mag < 1e-6) {
    return { x: 1, y: 0 };
  }

  return { x: sum.x / mag, y: sum.y / mag };
}