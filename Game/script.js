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

/* ---------- room state ---------- */

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
  if (level >= 1 && level <= 5) {
    return "Red points move anywhere on the circle. Grey points are fixed.";
  }
  if (level === 6 || level === 7) {
    return "The red point moves anywhere in the diagram box, but stays outside the circle.";
  }
  return "All red points move anywhere on the circle.";
}

/* ---------- input ---------- */

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

/* ---------- render ---------- */

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

/* ---------- room renderers ---------- */

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

  return {
    current: `∠APB = ${fmt(angleAPB)}°, ∠AOB = ${fmt(angleAOB)}°`,
    svg: `
      ${circleBase()}
      ${line(P, A)}
      ${line(P, B)}
      ${line(O, A, "#9a9a9a", 2)}
      ${line(O, B, "#9a9a9a", 2)}
      ${fixedPointSvg(O, "O")}
      ${fixedPointSvg(A, "A")}
      ${fixedPointSvg(B, "B")}
      ${dragPointSvg(P, "P", "P")}
      ${angleLabelAtVertex(P, A, B, `∠APB ${fmt(angleAPB)}°`, 28)}
      ${angleLabelBetweenRays(O, A, B, `∠AOB ${fmt(angleAOB)}°`, 34)}
    `
  };
}

function renderRoom8() {
  const A = pointOnCircle(state.room8.aAngle);
  const B = pointOnCircle(state.room8.bAngle);
  const C = pointOnCircle(state.room8.cAngle);
  const tangent = tangentLineAt(A, 190);

  const tangentAngle = acuteAngleBetween(
    { x: tangent.p2.x - tangent.p1.x, y: tangent.p2.y - tangent.p1.y },
    { x: B.x - A.x, y: B.y - A.y }
  );
  const oppositeAngle = angleAt(C, A, B);

  return {
    current: `Tangent-chord angle = ${fmt(tangentAngle)}°, ∠ACB = ${fmt(oppositeAngle)}°`,
    svg: `
      ${circleBase()}
      ${line(tangent.p1, tangent.p2)}
      ${line(A, B)}
      ${line(A, C)}
      ${line(B, C)}
      ${dragPointSvg(A, "A", "A")}
      ${dragPointSvg(B, "B", "B")}
      ${dragPointSvg(C, "C", "C")}
      ${tangentChordAngleLabel(A, tangent.direction, B, `Tan-Chord ${fmt(tangentAngle)}°`, 28)}
      ${angleLabelAtVertex(C, A, B, `∠ACB ${fmt(oppositeAngle)}°`, 24)}
    `
  };
}

/* ---------- checking ---------- */

function checkRoom() {
  if (solved) {
    feedback.innerHTML = "This room is already cleared. Click Next Room.";
    return;
  }

  let passed = false;
  let message = "";

  switch (currentLevel) {
    case 1: {
      const O = center;
      const A = pointOnCircle(state.room1.aAngle);
      const B = pointOnCircle(state.room1.bAngle);
      const C = pointOnCircle(state.room1.cAngle);
      const centreAngle = angleAt(O, A, B);
      const circumAngle = angleAt(C, A, B);
      passed = Math.abs(centreAngle - 2 * circumAngle) <= 5;
      message = `∠AOB = ${fmt(centreAngle)}°, 2×∠ACB = ${fmt(2 * circumAngle)}°`;
      break;
    }

    case 2: {
      const A = pointOnCircle(180);
      const B = pointOnCircle(0);
      const C = pointOnCircle(state.room2.cAngle);
      const angle = angleAt(C, A, B);
      passed = Math.abs(angle - 90) <= 5;
      message = `∠ACB = ${fmt(angle)}°`;
      break;
    }

    case 3: {
      const A = pointOnCircle(state.room3.aAngle);
      const B = pointOnCircle(state.room3.bAngle);
      const C = pointOnCircle(state.room3.cAngle);
      const D = pointOnCircle(state.room3.dAngle);
      const angle1 = angleAt(C, A, B);
      const angle2 = angleAt(D, A, B);
      passed = Math.abs(angle1 - angle2) <= 5;
      message = `∠ACB = ${fmt(angle1)}°, ∠ADB = ${fmt(angle2)}°`;
      break;
    }

    case 4: {
      const A = pointOnCircle(state.room4.aAngle);
      const B = pointOnCircle(state.room4.bAngle);
      const C = pointOnCircle(state.room4.cAngle);
      const D = pointOnCircle(state.room4.dAngle);
      const angleABC = angleAt(B, A, C);
      const angleADC = angleAt(D, A, C);
      passed = Math.abs(angleABC + angleADC - 180) <= 6;
      message = `∠ABC + ∠ADC = ${fmt(angleABC + angleADC)}°`;
      break;
    }

    case 5: {
      passed = true;
      message = "The radius is perpendicular to the tangent.";
      break;
    }

    case 6: {
      const P = keepPointOutsideCircle(state.room6.P);
      state.room6.P = P;
      const [A, B] = tangentPointsFromExternalPointSafe(P);
      const PA = distance(P, A);
      const PB = distance(P, B);
      passed = Math.abs(PA - PB) <= 2;
      message = `PA = ${fmt(PA)}, PB = ${fmt(PB)}`;
      break;
    }

    case 7: {
      const O = center;
      const P = keepPointOutsideCircle(state.room7.P);
      state.room7.P = P;
      const [A, B] = tangentPointsFromExternalPointSafe(P);
      const angleAPB = angleAt(P, A, B);
      const angleAOB = angleAt(O, A, B);
      passed = Math.abs(angleAPB + angleAOB - 180) <= 5;
      message = `∠APB + ∠AOB = ${fmt(angleAPB + angleAOB)}°`;
      break;
    }

    case 8: {
      const A = pointOnCircle(state.room8.aAngle);
      const B = pointOnCircle(state.room8.bAngle);
      const C = pointOnCircle(state.room8.cAngle);
      const tangent = tangentLineAt(A, 180);
      const tangentAngle = acuteAngleBetween(
        { x: tangent.p2.x - tangent.p1.x, y: tangent.p2.y - tangent.p1.y },
        { x: B.x - A.x, y: B.y - A.y }
      );
      const oppositeAngle = angleAt(C, A, B);
      passed = Math.abs(tangentAngle - oppositeAngle) <= 5;
      message = `Tangent-chord angle = ${fmt(tangentAngle)}°, ∠ACB = ${fmt(oppositeAngle)}°`;
      break;
    }
  }

  attempts -= 1;
  attemptsText.textContent = String(Math.max(attempts, 0));

  if (passed) {
    solved = true;
    statusText.textContent = "Status: Completed ✅";
    nextBtn.disabled = false;

    highestCleared = Math.max(highestCleared, currentLevel);
    localStorage.setItem("highestCleared", String(highestCleared));

    if (currentLevel < 8) {
      unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
      localStorage.setItem("unlockedLevel", String(unlockedLevel));
      feedback.innerHTML = `🎉 Room Cleared!<br>${message}<br>The corresponding theorem has been unlocked in Theorem Collection.`;
    } else {
      localStorage.setItem("unlockedLevel", "8");
      feedback.innerHTML = `🎉 Room 8 Cleared!<br>${message}<br>Opening the completion page...`;
      setTimeout(() => {
        window.location.href = "complete.html";
      }, 600);
    }
  } else if (attempts > 0) {
    feedback.innerHTML = `Not quite yet.<br>${message}<br>${attempts} attempt(s) left.`;
  } else {
    feedback.innerHTML = `No attempts left.<br>${message}<br>You can still move the point and observe the diagram.`;
  }
}

function goNextRoom() {
  if (!solved) {
    feedback.innerHTML = "Complete this room first.";
    return;
  }

  if (currentLevel < 8) {
    window.location.href = `play.html?level=${currentLevel + 1}`;
  } else {
    window.location.href = "complete.html";
  }
}

/* ---------- geometry ---------- */

function pointOnCircle(angleDeg) {
  const rad = degToRad(angleDeg);
  return {
    x: center.x + radius * Math.cos(rad),
    y: center.y - radius * Math.sin(rad)
  };
}

function keepPointOutsideCircle(p) {
  const dx = p.x - center.x;
  const dy = p.y - center.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  if (d >= radius + OUTSIDE_PADDING) {
    return p;
  }

  const safeDistance = radius + OUTSIDE_PADDING;
  const scale = safeDistance / (d || 1);
  return {
    x: center.x + dx * scale,
    y: center.y + dy * scale
  };
}

function tangentPointsFromExternalPointSafe(P) {
  const safeP = keepPointOutsideCircle(P);

  let dx = safeP.x - center.x;
  let dy = safeP.y - center.y;
  let d = Math.sqrt(dx * dx + dy * dy);

  if (d <= radius + 1) {
    d = radius + OUTSIDE_PADDING;
    dx = d;
    dy = 0;
  }

  const base = Math.atan2(dy, dx);
  const offset = Math.acos(radius / d);

  const a1 = base + offset;
  const a2 = base - offset;

  return [
    { x: center.x + radius * Math.cos(a1), y: center.y + radius * Math.sin(a1) },
    { x: center.x + radius * Math.cos(a2), y: center.y + radius * Math.sin(a2) }
  ];
}

function tangentLineAt(T, halfLength = 180) {
  const rx = T.x - center.x;
  const ry = T.y - center.y;
  const len = Math.sqrt(rx * rx + ry * ry) || 1;

  const dx = -ry / len;
  const dy = rx / len;

  return {
    p1: { x: T.x - dx * halfLength, y: T.y - dy * halfLength },
    p2: { x: T.x + dx * halfLength, y: T.y + dy * halfLength },
    direction: { x: dx, y: dy }
  };
}

function angleAt(vertex, p1, p2) {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  const dot = v1.x * v2.x + v1.y * v2.y;
  const m1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y) || 1;
  const m2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y) || 1;

  let c = dot / (m1 * m2);
  c = Math.max(-1, Math.min(1, c));
  return radToDeg(Math.acos(c));
}

function acuteAngleBetween(v1, v2) {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const m1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y) || 1;
  const m2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y) || 1;

  let c = dot / (m1 * m2);
  c = Math.max(-1, Math.min(1, c));
  let angle = radToDeg(Math.acos(c));
  if (angle > 180) angle = 360 - angle;
  if (angle > 90) angle = 180 - angle;
  return angle;
}

function getSvgPoint(evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  const transformed = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: transformed.x, y: transformed.y };
}

/* ---------- svg helpers ---------- */

function circleBase() {
  return `<circle cx="${center.x}" cy="${center.y}" r="${radius}" stroke="#c8c8c8" stroke-width="2" fill="none"/>`;
}

function line(p1, p2, color = "#8f8f8f", width = 2) {
  return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="${width}"/>`;
}

function polyline(points, color = "#8f8f8f", width = 2) {
  const pts = points.map((p) => `${p.x},${p.y}`).join(" ");
  return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
}

function fixedPointSvg(p, label) {
  return `
    <circle cx="${p.x}" cy="${p.y}" r="5.5" fill="#9aa3b2"/>
    <text x="${p.x + 8}" y="${p.y - 8}" font-size="14" fill="#333">${label}</text>
  `;
}

function dragPointSvg(p, label, role) {
  return `
    <circle cx="${p.x}" cy="${p.y}" r="6.5" fill="#d64545" data-role="${role}" style="cursor:pointer;"/>
    <text x="${p.x + 8}" y="${p.y - 8}" font-size="14" fill="#333">${label}</text>
  `;
}

function freeLabel(x, y, text) {
  return `<text x="${x}" y="${y}" font-size="15" fill="#111">${text}</text>`;
}

function angleLabelAtVertex(vertex, p1, p2, text, offset = 24) {
  const dir1 = unitVector(vertex, p1);
  const dir2 = unitVector(vertex, p2);
  const sum = { x: dir1.x + dir2.x, y: dir1.y + dir2.y };

  let labelPos;
  if (Math.abs(sum.x) < 0.001 && Math.abs(sum.y) < 0.001) {
    labelPos = { x: vertex.x, y: vertex.y - offset };
  } else {
    const u = normalizeVector(sum);
    labelPos = {
      x: vertex.x + u.x * offset,
      y: vertex.y + u.y * offset
    };
  }

  return `<text x="${labelPos.x}" y="${labelPos.y}" font-size="13" fill="#111">${text}</text>`;
}

function angleLabelBetweenRays(vertex, p1, p2, text, offset = 34) {
  const dir1 = unitVector(vertex, p1);
  const dir2 = unitVector(vertex, p2);
  const mid = normalizeVector({ x: dir1.x + dir2.x, y: dir1.y + dir2.y });

  const labelPos = {
    x: vertex.x + mid.x * offset,
    y: vertex.y + mid.y * offset
  };

  return `<text x="${labelPos.x}" y="${labelPos.y}" font-size="13" fill="#111">${text}</text>`;
}

function tangentChordAngleLabel(A, tangentDir, B, text, offset = 28) {
  const t1 = normalizeVector(tangentDir);
  const chord = unitVector(A, B);
  const mid = normalizeVector({ x: t1.x + chord.x, y: t1.y + chord.y });

  const labelPos = {
    x: A.x + mid.x * offset,
    y: A.y + mid.y * offset
  };

  return `<text x="${labelPos.x}" y="${labelPos.y}" font-size="13" fill="#111">${text}</text>`;
}

function segmentMidLabel(p1, p2, text) {
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  return `<text x="${mx + 6}" y="${my - 6}" font-size="13" fill="#111">${text}</text>`;
}

function rightAngleMark(T, O, tangentDir) {
  const d = distance(T, O) || 1;
  const ux = (O.x - T.x) / d;
  const uy = (O.y - T.y) / d;
  const vx = tangentDir.x;
  const vy = tangentDir.y;
  const s = 14;

  const p1 = { x: T.x + ux * s, y: T.y + uy * s };
  const p2 = { x: p1.x + vx * s, y: p1.y + vy * s };
  const p3 = { x: T.x + vx * s, y: T.y + vy * s };

  return `<polyline points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}" fill="none" stroke="#4f8f5f" stroke-width="2"/>`;
}

/* ---------- vector helpers ---------- */

function unitVector(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: dx / len, y: dy / len };
}

function normalizeVector(v) {
  const len = Math.sqrt(v.x * v.x + v.y * v.y) || 1;
  return { x: v.x / len, y: v.y / len };
}

/* ---------- utilities ---------- */

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function fmt(n) {
  return Number(n).toFixed(1);
}

function degToRad(d) {
  return (d * Math.PI) / 180;
}

function radToDeg(r) {
  return (r * 180) / Math.PI;
}

function restrictToUpperSemicircle(angle) {
  let a = normalizeAngle(angle);
  if (a > 180) {
    a = a < 270 ? 180 : 0;
  }
  return a;
}

function restrictRoom3Point(angle) {
  const a = normalizeAngle(angle);
  const A = normalizeAngle(state.room3.aAngle);
  const B = normalizeAngle(state.room3.bAngle);

  return restrictToMajorArc(a, A, B, 6);
}

function restrictToMajorArc(testAngle, angle1, angle2, padding = 6) {
  const cw = clockwiseDistance(angle1, angle2);

  // 从 angle1 顺时针到 angle2 是劣弧
  if (cw <= 180) {
    const minorStart = angle1;
    const minorEnd = angle2;
    return snapOutsideArc(testAngle, minorStart, minorEnd, padding);
  }

  // 否则从 angle2 顺时针到 angle1 是劣弧
  const minorStart = angle2;
  const minorEnd = angle1;
  return snapOutsideArc(testAngle, minorStart, minorEnd, padding);
}

function snapOutsideArc(testAngle, arcStart, arcEnd, padding = 6) {
  const t = normalizeAngle(testAngle);
  const start = normalizeAngle(arcStart + padding);
  const end = normalizeAngle(arcEnd - padding);

  // 如果这个角不在受限劣弧内，直接允许
  if (!isAngleOnClockwiseArc(t, start, end)) {
    return t;
  }

  // 如果落进劣弧，就吸附到最近边界
  const toStart = angularDistance(t, start);
  const toEnd = angularDistance(t, end);

  return toStart < toEnd ? start : end;
}

function clockwiseDistance(from, to) {
  return normalizeAngle(to - from);
}

function angularDistance(a, b) {
  const d = Math.abs(normalizeAngle(a - b));
  return Math.min(d, 360 - d);
}

function isAngleOnClockwiseArc(test, start, end) {
  const total = clockwiseDistance(start, end);
  const part = clockwiseDistance(start, test);
  return part >= 0 && part <= total;
}

function normalizeAngle(deg) {
  let a = deg;
  while (a < 0) a += 360;
  while (a >= 360) a -= 360;
  return a;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
