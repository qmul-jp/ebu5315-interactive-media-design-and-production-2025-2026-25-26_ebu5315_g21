const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalTextContainer = document.getElementById('modal-text');
const closeModalBtn = document.querySelector('.close');

const settingsBtn = document.getElementById('settingsBtn');
const contactBtn = document.getElementById('contactBtn');
const supportBtn = document.getElementById('supportBtn');
const accessibilityBtn = document.getElementById('accessibilityBtn');
const privacyBtn = document.getElementById('privacyBtn');
const dropdownButtons = document.querySelectorAll('.dropbtn');

const COOKIE_KEY = 'cookieConsent';
const COOKIE_BANNER_ID = 'cookieBanner';

function getCookieConsent() {
  try {
    return localStorage.getItem(COOKIE_KEY);
  } catch {
    return null;
  }
}

function hasConsent() {
  return getCookieConsent() === 'accepted';
}

function safeSetItem(key, value) {
  if (!hasConsent()) return;
  try {
    localStorage.setItem(key, value);
  } catch { }
}

function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch { }
}

function clearSavedPreferences() {
  [
    'theme',
    'fontScale',
    'language',
    'colorblindMode',
    'reducedMotion',
    'highContrast',
    'legibilityMode',
    ASSISTANT_POSITION_KEY
  ].forEach(safeRemoveItem);
}

function ensureCookieBannerExists() {
  let banner = document.getElementById(COOKIE_BANNER_ID);
  if (banner) return banner;

  banner = document.createElement('div');
  banner.id = COOKIE_BANNER_ID;
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Cookie consent banner');
  banner.innerHTML = `
    <div class="cookie-banner__content">
      <div class="cookie-banner__text">
        <h3 data-cookie-role="title"></h3>
        <p data-cookie-role="desc"></p>
      </div>
      <div class="cookie-banner__actions">
        <button id="cookieDeclineBtn" class="btn secondary" type="button"></button>
        <button id="cookieAcceptBtn" class="btn primary" type="button"></button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);
  return banner;
}

const NAV_TARGETS = {
  navHomeBtn: 'homepage.html',
  navGameBtn: 'gamehome.html',
  navQuizBtn: 'index.html'
};

const I18N = {
  en: {
    settings: 'Settings',
    themeMode: 'Theme mode',
    themeDesc: 'Choose the overall appearance.',
    light: 'Light',
    eyeCare: 'Eye-Care',
    dark: 'Dark',

    language: 'Language',
    languageDesc: 'Choose the display language.',
    english: 'English',
    chinese: '中文',

    fontSize: 'Font size',
    fontSizeDesc: 'Adjust text size smoothly across the page.',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',

    colourFriendly: 'Colour-friendly mode',
    colourFriendlyDesc: 'Use a palette that is easier to distinguish.',
    reducedMotion: 'Reduced motion',
    reducedMotionDesc: 'Lower visual motion for a calmer experience.',
    highContrast: 'High contrast',
    highContrastDesc: 'Increase separation between text and background.',
    legibility: 'Enhanced legibility',
    legibilityDesc: 'Increase line spacing and letter spacing for dyslexic users.',
    on: 'On',
    off: 'Off',
    savedNote: 'These preferences are saved automatically for the next visit.',

    appearanceSection: 'Appearance',
    accessibilitySection: 'Accessibility',

    home: 'Home',
    game: 'Game',
    quiz: 'Quiz',
    about: 'About ▼',
    contactUs: 'Contact us',
    aboutProject: 'About this project',
    accessibilityHelp: 'Accessibility help',
    privacyPolicy: 'Privacy Policy',
    cookieSettings: 'Cookie settings',
    cookieSettingsDesc: 'Review or change your data preference choice.',
    reviewChoice: 'Review choice',
    reopenCookieBanner: 'Change cookie choice',
    privacyTitle: 'Privacy Policy',
    privacyHeading: 'Privacy & Data Policy',
    privacyDesc: 'This website stores only essential local preferences on your device, such as theme, language, font size, accessibility options and assistant position.',
    privacyPoint1: 'No personal identity information is collected.',
    privacyPoint2: 'No external server database is used for storing user profiles.',
    privacyPoint3: 'You can accept or decline local preference storage at any time.',
    privacyPoint4: 'If you decline, the website will still work, but your preferences will not be remembered next time.',
    cookieBannerTitle: 'Privacy & Data Notice',
    cookieBannerDesc: 'We use local storage on your device to save preferences such as theme, language, font size and accessibility settings. No personal identity information is collected.',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline',

    contactTitle: 'Contact us',
    supportTitle: 'About this project',
    accessibilityTitle: 'Accessibility help',

    contactHeading: 'Project contacts',
    contactDesc: 'Reach the team directly by email.',

    supportHeading: 'About this project',
    supportDesc: 'Geometry Escape Lab is an interactive circle-theorem learning website with game, theorem archive and quiz navigation.',
    supportGoalHeading: 'Design goal',
    supportGoalDesc: 'Keep the interface visually consistent, readable and easy to use in both light and dark mode.',

    accessibilityHeading: 'Inclusive options included',
    accessibilityDesc: 'Adjustable font size, dark mode, colour-friendly palette, high contrast and reduced motion are all available in Settings.',
    accessibilityTipHeading: 'Best viewing tip',
    accessibilityTipDesc: 'If colours are hard to distinguish, turn on Colour-friendly mode and High contrast together.',

    assistantTitle: '🤖 AI Assistant',
    assistantPlaceholder: 'e.g., semicircle theorem',
    assistantHelp: 'Ask me about circle theorems!',
    assistantSend: 'Send'
  },

  zh: {
    settings: '设置',
    themeMode: '主题模式',
    themeDesc: '选择页面整体外观。',
    light: '浅色',
    eyeCare: '护眼',
    dark: '深色',

    language: '语言',
    languageDesc: '切换界面显示语言。',
    english: 'English',
    chinese: '中文',

    fontSize: '字体大小',
    fontSizeDesc: '拖动滑块可平滑调整整页文字大小。',
    small: '小',
    medium: '中',
    large: '大',

    colourFriendly: '色彩友好模式',
    colourFriendlyDesc: '使用更容易区分的配色方案。',
    reducedMotion: '减少动态效果',
    reducedMotionDesc: '降低页面动态效果，获得更平静的浏览体验。',
    highContrast: '高对比度',
    highContrastDesc: '增强文字与背景之间的区分度。',
    legibility: '易读排版',
    legibilityDesc: '强制增大字间距与行高，提升阅读清晰度。',
    on: '开',
    off: '关',
    savedNote: '这些设置会自动保存，下次访问时仍然生效。',

    appearanceSection: '外观',
    accessibilitySection: '辅助功能',

    home: '首页',
    game: '游戏',
    quiz: '测验',
    about: '关于 ▼',
    contactUs: '联系我们',
    aboutProject: '关于项目',
    accessibilityHelp: '无障碍帮助',
    privacyPolicy: '隐私政策',
    cookieSettings: 'Cookie 设置',
    cookieSettingsDesc: '查看或重新选择你的数据偏好。',
    reviewChoice: '重新选择',
    reopenCookieBanner: '重新选择 Cookie',
    privacyTitle: '隐私政策',
    privacyHeading: '隐私与数据政策',
    privacyDesc: '本网站只会在你的设备本地保存必要偏好设置，例如主题、语言、字体大小、无障碍选项和助手位置。',
    privacyPoint1: '不会收集任何可识别个人身份的信息。',
    privacyPoint2: '不会使用外部服务器数据库来存储用户资料。',
    privacyPoint3: '你可以随时接受或拒绝本地偏好存储。',
    privacyPoint4: '如果你拒绝，网站仍可正常使用，但下次访问时不会记住你的偏好。',
    cookieBannerTitle: '隐私与数据说明',
    cookieBannerDesc: '我们会在你的设备上使用本地存储来保存主题、语言、字体大小和无障碍设置等偏好信息，不会收集任何个人身份信息。',
    cookieAccept: '接受',
    cookieDecline: '拒绝',

    contactTitle: '联系我们',
    supportTitle: '关于项目',
    accessibilityTitle: '无障碍帮助',

    contactHeading: '项目联系方式',
    contactDesc: '你可以通过邮箱直接联系小组成员。',

    supportHeading: '关于项目',
    supportDesc: 'Geometry Escape Lab 是一个用于学习圆定理的交互式网站，包含游戏、定理档案和测验导航。',
    supportGoalHeading: '设计目标',
    supportGoalDesc: '让界面在浅色和深色模式下都保持统一、清晰且易用。',

    accessibilityHeading: '已包含的无障碍选项',
    accessibilityDesc: '设置中提供了字体大小调整、深色模式、色彩友好模式、高对比度和减少动态效果。',
    accessibilityTipHeading: '最佳使用建议',
    accessibilityTipDesc: '如果颜色不容易区分，可以同时开启色彩友好模式和高对比度。',

    assistantTitle: '🤖 AI 助手',
    assistantPlaceholder: '例如：半圆定理',
    assistantHelp: '问我任何圆定理问题！',
    assistantSend: '发送'
  }

};

// ----- 新增：AI Assistant 可拖拽位置存储 -----
const ASSISTANT_POSITION_KEY = 'assistantPosition';

function getSavedAssistantPosition() {
  if (!hasConsent()) return null;
  try {
    return JSON.parse(localStorage.getItem(ASSISTANT_POSITION_KEY) || 'null');
  } catch {
    return null;
  }
}

function saveAssistantPosition(x, y) {
  safeSetItem(ASSISTANT_POSITION_KEY, JSON.stringify({ x: Math.round(x), y: Math.round(y) }));
}

function clampAssistantPosition(x, y, el) {
  if (!el) return { x: 0, y: 0 };
  const rect = el.getBoundingClientRect();
  const maxX = Math.max(0, window.innerWidth - rect.width);
  const maxY = Math.max(0, window.innerHeight - rect.height);
  return { x: Math.max(0, Math.min(x, maxX)), y: Math.max(0, Math.min(y, maxY)) };
}

function applyAssistantPosition(el, x, y) {
  if (!el) return;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.right = 'auto';
  el.style.bottom = 'auto';
}

function restoreAssistantPosition() {
  if (!assistantWidget) return;
  const saved = getSavedAssistantPosition();
  if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') {
    requestAnimationFrame(() => {
      if (!assistantWidget) return;
      const pos = clampAssistantPosition(saved.x, saved.y, assistantWidget);
      applyAssistantPosition(assistantWidget, pos.x, pos.y);
    });
  } else {
    requestAnimationFrame(() => {
      if (!assistantWidget) return;
      const rect = assistantWidget.getBoundingClientRect();
      applyAssistantPosition(assistantWidget, rect.left, rect.top);
      saveAssistantPosition(rect.left, rect.top);
    });
  }
}

function enableAssistantDragging() {
  if (!assistantWidget) return;
  let isDragging = false, startPointerX = 0, startPointerY = 0, startLeft = 0, startTop = 0, moved = false;

  const getPoint = (e) => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };
  const canStartDrag = (target) => !!target.closest('.assistant-trigger');

  const onStart = (e) => {
    if (!assistantWidget || !canStartDrag(e.target)) return;
    const point = getPoint(e);
    const rect = assistantWidget.getBoundingClientRect();
    isDragging = true;
    moved = false;
    startPointerX = point.x;
    startPointerY = point.y;
    startLeft = rect.left;
    startTop = rect.top;
    assistantWidget.classList.add('dragging');
    e.preventDefault();
  };

  const onMove = (e) => {
    if (!isDragging || !assistantWidget) return;
    const point = getPoint(e);
    const dx = point.x - startPointerX;
    const dy = point.y - startPointerY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
    const pos = clampAssistantPosition(startLeft + dx, startTop + dy, assistantWidget);
    applyAssistantPosition(assistantWidget, pos.x, pos.y);
    e.preventDefault();
  };

  const onEnd = () => {
    if (!isDragging || !assistantWidget) return;
    isDragging = false;
    assistantWidget.classList.remove('dragging');
    const rect = assistantWidget.getBoundingClientRect();
    const pos = clampAssistantPosition(rect.left, rect.top, assistantWidget);
    applyAssistantPosition(assistantWidget, pos.x, pos.y);
    saveAssistantPosition(pos.x, pos.y);
    setTimeout(() => { moved = false; }, 0);
  };

  assistantWidget.addEventListener('mousedown', onStart);
  assistantWidget.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
  window.addEventListener('resize', () => {
    if (!assistantWidget) return;
    const saved = getSavedAssistantPosition();
    if (!saved) return;
    const pos = clampAssistantPosition(saved.x, saved.y, assistantWidget);
    applyAssistantPosition(assistantWidget, pos.x, pos.y);
    saveAssistantPosition(pos.x, pos.y);
  });

  assistantWidget.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
}

let assistantWidget = null;

function getStored(name, fallback) {
  if (!hasConsent()) return fallback;
  try {
    return localStorage.getItem(name) || fallback;
  } catch {
    return fallback;
  }
}

function getCurrentLanguage() {
  return getStored('language', 'en');
}

function t(key) {
  const lang = getCurrentLanguage();
  return I18N[lang]?.[key] || I18N.en[key] || key;
}

function applyTheme(theme, options = {}) {
  const { persist = true } = options;
  document.body.classList.remove('dark-mode', 'eye-care');
  if (theme === 'dark') document.body.classList.add('dark-mode');
  if (theme === 'eye-care') document.body.classList.add('eye-care');
  if (persist) safeSetItem('theme', theme);
}

function applyFontScale(scale, options = {}) {
  const { persist = true } = options;
  const numericScale = Math.max(0.85, Math.min(1.3, Number(scale) || 1));
  document.documentElement.style.setProperty('--font-scale', numericScale);
  if (persist) safeSetItem('fontScale', numericScale.toFixed(2));
}

function getCurrentFontScale() {
  return getStored('fontScale', '1.00');
}

function applyColorblindMode(enabled, options = {}) {
  const { persist = true } = options;
  document.body.classList.toggle('colorblind-mode', enabled);
  if (persist) safeSetItem('colorblindMode', enabled ? 'on' : 'off');
}

function applyReducedMotion(enabled, options = {}) {
  const { persist = true } = options;
  document.body.classList.toggle('reduce-motion', enabled);
  if (persist) safeSetItem('reducedMotion', enabled ? 'on' : 'off');
}

function applyHighContrast(enabled, options = {}) {
  const { persist = true } = options;
  document.body.classList.toggle('high-contrast', enabled);
  if (persist) safeSetItem('highContrast', enabled ? 'on' : 'off');
}

function applyLegibility(enabled, options = {}) {
  const { persist = true } = options;
  document.body.classList.toggle('legibility-mode', enabled);
  if (persist) safeSetItem('legibilityMode', enabled ? 'on' : 'off');
}

function emitLanguageChanged(lang) {
  window.dispatchEvent(
    new CustomEvent('languageChanged', { detail: { lang } })
  );
}

function updateCookieBannerLanguage() {
  const banner = document.getElementById(COOKIE_BANNER_ID);
  if (!banner) return;
  const titleEl = banner.querySelector('[data-cookie-role="title"]');
  const descEl = banner.querySelector('[data-cookie-role="desc"]');
  const acceptBtn = banner.querySelector('#cookieAcceptBtn');
  const declineBtn = banner.querySelector('#cookieDeclineBtn');

  if (titleEl) titleEl.textContent = t('cookieBannerTitle');
  if (descEl) descEl.textContent = t('cookieBannerDesc');
  if (acceptBtn) acceptBtn.textContent = t('cookieAccept');
  if (declineBtn) declineBtn.textContent = t('cookieDecline');
}

function applyLanguage(lang, options = {}) {
  const { persist = true } = options;
  if (persist) safeSetItem('language', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';

  const navHomeBtn = document.getElementById('navHomeBtn');
  const navGameBtn = document.getElementById('navGameBtn');
  const navQuizBtn = document.getElementById('navQuizBtn');
  const settingsBtnEl = document.getElementById('settingsBtn');
  const contactBtnEl = document.getElementById('contactBtn');
  const supportBtnEl = document.getElementById('supportBtn');
  const accessibilityBtnEl = document.getElementById('accessibilityBtn');
  const privacyBtnEl = document.getElementById('privacyBtn');
  const aboutBtn = document.querySelector('.dropbtn');

  if (navHomeBtn) navHomeBtn.textContent = t('home');
  if (navGameBtn) navGameBtn.textContent = t('game');
  if (navQuizBtn) navQuizBtn.textContent = t('quiz');
  if (settingsBtnEl) settingsBtnEl.textContent = t('settings');
  if (contactBtnEl) contactBtnEl.textContent = t('contactUs');
  if (supportBtnEl) supportBtnEl.textContent = t('aboutProject');
  if (accessibilityBtnEl) accessibilityBtnEl.textContent = t('accessibilityHelp');
  if (privacyBtnEl) privacyBtnEl.textContent = t('privacyPolicy');
  if (aboutBtn) aboutBtn.textContent = t('about');

  updateCookieBannerLanguage();

  if (assistantWidget) {
    updateAssistantLanguageUI(lang);
  }

  emitLanguageChanged(lang);
}

function restorePreferences() {
  applyTheme(getStored('theme', 'light'), { persist: false });
  applyFontScale(getStored('fontScale', '1.00'), { persist: false });
  applyColorblindMode(getStored('colorblindMode', 'off') === 'on', { persist: false });
  applyReducedMotion(getStored('reducedMotion', 'off') === 'on', { persist: false });
  applyHighContrast(getStored('highContrast', 'off') === 'on', { persist: false });
  applyLegibility(getStored('legibilityMode', 'off') === 'on', { persist: false });
  applyLanguage(getStored('language', 'en'), { persist: false });
}

function buildContactHTML() {
  return `
    <div class="info-panel">
      <div class="info-row">
        <div>
          <strong>${t('contactHeading')}</strong>
          <span>${t('contactDesc')}</span>
        </div>
      </div>
      <div class="info-row">
        <div><strong>Yining Qin</strong><span>3029970043@qq.com</span></div>
      </div>
      <div class="info-row">
        <div><strong>Yafei Yang</strong><span>1662060048@qq.com</span></div>
      </div>
      <div class="info-row">
        <div><strong>Yiran Fan</strong><span>van52985@foxmail.com</span></div>
      </div>
    </div>
  `;
}

function buildSupportHTML() {
  return `
    <div class="info-panel">
      <div class="info-row">
        <div>
          <strong>${t('supportHeading')}</strong>
          <span>${t('supportDesc')}</span>
        </div>
      </div>
      <div class="info-row">
        <div>
          <strong>${t('supportGoalHeading')}</strong>
          <span>${t('supportGoalDesc')}</span>
        </div>
      </div>
    </div>
  `;
}

function buildAccessibilityHTML() {
  return `
    <div class="info-panel">
      <div class="info-row">
        <div>
          <strong>${t('accessibilityHeading')}</strong>
          <span>${t('accessibilityDesc')}</span>
        </div>
      </div>
      <div class="info-row">
        <div>
          <strong>${t('accessibilityTipHeading')}</strong>
          <span>${t('accessibilityTipDesc')}</span>
        </div>
      </div>
    </div>
  `;
}

function buildPrivacyHTML() {
  return `
    <div class="info-panel">
      <div class="info-row">
        <div>
          <strong>${t('privacyHeading')}</strong>
          <span>${t('privacyDesc')}</span>
        </div>
      </div>
      <div class="info-row"><div><span>• ${t('privacyPoint1')}</span></div></div>
      <div class="info-row"><div><span>• ${t('privacyPoint2')}</span></div></div>
      <div class="info-row"><div><span>• ${t('privacyPoint3')}</span></div></div>
      <div class="info-row"><div><span>• ${t('privacyPoint4')}</span></div></div>
    </div>
  `;
}

function openModal(title, html) {
  if (!modal || !modalTitle || !modalTextContainer) return;
  modalTitle.textContent = title;
  modalTextContainer.innerHTML = html;
  modal.classList.add('show');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('show');
}

function getFontLabel(scale) {
  const value = Number(scale);
  if (value <= 0.92) return t('small');
  if (value >= 1.16) return t('large');
  return t('medium');
}

function getSettingsPanelScrollTop() {
  if (!modalTextContainer) return 0;
  const panel = modalTextContainer.querySelector('.apple-settings-panel, .settings-panel');
  return panel ? panel.scrollTop : 0;
}

function restoreSettingsPanelScrollTop(scrollTop = 0) {
  if (!modalTextContainer) return;
  const panel = modalTextContainer.querySelector('.apple-settings-panel, .settings-panel');
  if (panel) {
    panel.scrollTop = scrollTop;
  }
}

function getSettingsHTML() {
  const theme = getStored('theme', 'light');
  const fontScale = getCurrentFontScale();
  const colorblind = getStored('colorblindMode', 'off') === 'on';
  const reducedMotion = getStored('reducedMotion', 'off') === 'on';
  const highContrast = getStored('highContrast', 'off') === 'on';
  const legibility = getStored('legibilityMode', 'off') === 'on';
  const language = getCurrentLanguage();

  const buildSwitch = (settingName, enabled, ariaLabel) => `
    <button
      type="button"
      class="ios-switch ${enabled ? 'active' : ''}"
      data-setting="${settingName}"
      data-value="toggle"
      role="switch"
      aria-checked="${enabled ? 'true' : 'false'}"
      aria-label="${ariaLabel}"
    >
      <span class="ios-switch-track">
        <span class="ios-switch-thumb"></span>
      </span>
    </button>
  `;

  return `
    <div class="settings-panel apple-settings-panel">
      <div class="settings-section">
        <div class="settings-section-title">${t('appearanceSection')}</div>

        <div class="settings-group settings-row">
          <div class="settings-copy">
            <strong>${t('themeMode')}</strong>
            <span>${t('themeDesc')}</span>
          </div>
          <div class="control-row segmented-control" role="tablist" aria-label="${t('themeMode')}">
            <button type="button" data-setting="theme" data-value="light" class="mode-switch-btn ${theme === 'light' ? 'active' : ''}">${t('light')}</button>
            <button type="button" data-setting="theme" data-value="eye-care" class="mode-switch-btn ${theme === 'eye-care' ? 'active' : ''}">${t('eyeCare')}</button>
            <button type="button" data-setting="theme" data-value="dark" class="mode-switch-btn ${theme === 'dark' ? 'active' : ''}">${t('dark')}</button>
          </div>
        </div>

        <div class="settings-group settings-row">
          <div class="settings-copy">
            <strong>${t('language')}</strong>
            <span>${t('languageDesc')}</span>
          </div>
          <div class="control-row segmented-control" data-segment="language" role="tablist" aria-label="${t('language')}">
            <button type="button" data-setting="language" data-value="en" class="mode-switch-btn ${language === 'en' ? 'active' : ''}">${t('english')}</button>
            <button type="button" data-setting="language" data-value="zh" class="mode-switch-btn ${language === 'zh' ? 'active' : ''}">${t('chinese')}</button>
          </div>
        </div>

        <div class="settings-group settings-row settings-row-slider">
          <div class="settings-copy">
            <strong>${t('fontSize')}</strong>
            <span>${t('fontSizeDesc')}</span>
          </div>
          <div class="settings-slider-block">
            <div class="font-slider-wrap">
              <span class="font-slider-label">A</span>
              <input
                id="fontSizeSlider"
                class="font-size-slider"
                type="range"
                min="0.85"
                max="1.30"
                step="0.01"
                value="${fontScale}"
                aria-label="${t('fontSize')}"
              />
              <span class="font-slider-label font-slider-label-large">A</span>
            </div>
            <div class="font-slider-readout compact">
              <span id="fontSizeValue">${Math.round(Number(fontScale) * 100)}%</span>
              <span id="fontSizePreset">${getFontLabel(fontScale)}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">${t('accessibilitySection')}</div>

        <div class="settings-group settings-row">
          <div class="settings-copy">
            <strong>${t('colourFriendly')}</strong>
            <span>${t('colourFriendlyDesc')}</span>
          </div>
          <div class="control-row">
            ${buildSwitch('colorblindMode', colorblind, t('colourFriendly'))}
          </div>
        </div>

        <div class="settings-group settings-row">
          <div class="settings-copy">
            <strong>${t('highContrast')}</strong>
            <span>${t('highContrastDesc')}</span>
          </div>
          <div class="control-row">
            ${buildSwitch('highContrast', highContrast, t('highContrast'))}
          </div>
        </div>

        <div class="settings-group settings-row">
          <div class="settings-copy">
            <strong>${t('reducedMotion')}</strong>
            <span>${t('reducedMotionDesc')}</span>
          </div>
          <div class="control-row">
            ${buildSwitch('reducedMotion', reducedMotion, t('reducedMotion'))}
          </div>
        </div>

        <div class="settings-group settings-row">
          <div class="settings-copy">
            <strong>${t('legibility')}</strong>
            <span>${t('legibilityDesc')}</span>
          </div>
          <div class="control-row">
            ${buildSwitch('legibilityMode', legibility, t('legibility'))}
          </div>
        </div>

        <div class="settings-group settings-row">
          <div class="settings-copy">
            <strong>${t('cookieSettings')}</strong>
            <span>${t('cookieSettingsDesc')}</span>
          </div>
          <div class="control-row">
            <button id="reopenCookieBannerBtn" class="btn secondary" type="button">${t('reopenCookieBanner')}</button>
          </div>
        </div>
      </div>

      <p class="settings-note">${t('savedNote')}</p>
    </div>
  `;
}

function openSettingsPanel(preservedScrollTop = 0) {
  openModal(t('settings'), getSettingsHTML());
  bindSettingsControls();
  restoreSettingsPanelScrollTop(preservedScrollTop);

  setTimeout(() => {
    requestAnimationFrame(() => {
      updateAllSegmentedThumbs(modalTextContainer, false);
    });
  }, 10);
}

window.addEventListener('resize', () => {
  if (modal.classList.contains('show')) {
    updateAllSegmentedThumbs(document, false);
  }
  if (modal && modal.classList.contains('show')) updateAllSegmentedThumbs(document, false);
  updateAssistantPanelDirection();
});

function bindSettingsControls() {
  if (!modalTextContainer) return;

  modalTextContainer.querySelectorAll("[data-setting='theme']").forEach((btn) => {
    btn.addEventListener('click', () => {
      const newTheme = btn.dataset.value;
      const currentTheme = getStored('theme', 'light');
      if (newTheme === currentTheme) return;

      applyTheme(newTheme);

      const group = btn.closest('.segmented-control');
      group?.querySelectorAll('.mode-switch-btn').forEach((item) => {
        item.classList.toggle('active', item === btn);
      });
      updateSegmentedThumb(group, true);
    });
  });

  modalTextContainer.querySelectorAll("[data-setting='language']").forEach((btn) => {
    btn.addEventListener('click', () => {
      const newLang = btn.dataset.value;
      const currentLang = getStored('language', 'en');
      if (newLang === currentLang) return;

      const oldGroup = btn.closest('.segmented-control');
      const oldActiveBtn = oldGroup?.querySelector('.mode-switch-btn.active');

      const oldThumbX = oldActiveBtn
        ? oldActiveBtn.offsetLeft - oldGroup.querySelector('.mode-switch-btn').offsetLeft
        : 0;
      const oldThumbWidth = oldActiveBtn
        ? oldActiveBtn.offsetWidth
        : 76;

      const scrollTop = getSettingsPanelScrollTop();

      applyLanguage(newLang);
      openSettingsPanel(scrollTop);

      requestAnimationFrame(() => {
        updateAllSegmentedThumbs(modalTextContainer, false);
        const newLanguageGroup = modalTextContainer.querySelector('[data-segment="language"]');
        if (!newLanguageGroup) return;

        newLanguageGroup.classList.add('no-thumb-transition');
        newLanguageGroup.style.setProperty('--segment-thumb-x', `${oldThumbX}px`);
        newLanguageGroup.style.setProperty('--segment-thumb-width', `${oldThumbWidth}px`);

        void newLanguageGroup.offsetWidth;

        newLanguageGroup.classList.remove('no-thumb-transition');
        updateSegmentedThumb(newLanguageGroup, true);
      });
    });
  });

  ['colorblindMode', 'reducedMotion', 'highContrast', 'legibilityMode'].forEach(setting => {
    modalTextContainer.querySelectorAll(`[data-setting='${setting}']`).forEach((btn) => {
      btn.addEventListener('click', () => {
        const isCurrentlyOn = getStored(setting, 'off') === 'on';
        const enabled = !isCurrentlyOn;

        if (setting === 'colorblindMode') applyColorblindMode(enabled);
        if (setting === 'reducedMotion') applyReducedMotion(enabled);
        if (setting === 'highContrast') applyHighContrast(enabled);
        if (setting === 'legibilityMode') applyLegibility(enabled);

        btn.classList.toggle('active', enabled);
        btn.setAttribute('aria-checked', enabled ? 'true' : 'false');
      });
    });
  });

  const fontSlider = document.getElementById('fontSizeSlider');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const fontSizePreset = document.getElementById('fontSizePreset');

  if (fontSlider) {
    const updateSliderUI = (value) => {
      if (fontSizeValue) fontSizeValue.textContent = `${Math.round(Number(value) * 100)}%`;
      if (fontSizePreset) fontSizePreset.textContent = getFontLabel(value);
    };

    updateSliderUI(fontSlider.value);

    fontSlider.addEventListener('input', () => {
      applyFontScale(fontSlider.value);
      updateSliderUI(fontSlider.value);
    });
  }

  const reopenCookieBannerBtn = document.getElementById('reopenCookieBannerBtn');
  if (reopenCookieBannerBtn) {
    reopenCookieBannerBtn.addEventListener('click', () => {
      reopenCookieBanner();
      closeModal();
    });
  }
}

function reopenCookieBanner() {
  const banner = ensureCookieBannerExists();
  updateCookieBannerLanguage();
  banner.classList.add('show');
}

function hideCookieBanner() {
  const banner = document.getElementById(COOKIE_BANNER_ID);
  if (banner) banner.classList.remove('show');
}

function handleConsentAcceptance() {
  try {
    localStorage.setItem(COOKIE_KEY, 'accepted');
  } catch { }
  hideCookieBanner();
}

function handleConsentDecline() {
  try {
    localStorage.setItem(COOKIE_KEY, 'declined');
  } catch { }
  clearSavedPreferences();
  hideCookieBanner();
  applyTheme('light', { persist: false });
  applyFontScale(1, { persist: false });
  applyColorblindMode(false, { persist: false });
  applyReducedMotion(false, { persist: false });
  applyHighContrast(false, { persist: false });
  applyLegibility(false, { persist: false });
  applyLanguage('en', { persist: false });
}

function initCookieConsent() {
  const banner = ensureCookieBannerExists();
  updateCookieBannerLanguage();

  const acceptBtn = banner.querySelector('#cookieAcceptBtn');
  const declineBtn = banner.querySelector('#cookieDeclineBtn');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', handleConsentAcceptance);
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', handleConsentDecline);
  }

  if (!getCookieConsent()) {
    banner.classList.add('show');
  } else {
    banner.classList.remove('show');
  }
}

function bindNavigation() {
  Object.entries(NAV_TARGETS).forEach(([id, target]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        window.location.href = target;
      });
    }
  });
}

function bindDropdowns() {
  dropdownButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const parent = button.closest('.nav-group');
      if (!parent) return;
      parent.classList.toggle('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-group.open').forEach((group) => {
      group.classList.remove('open');
    });
  });
}

function bindGlobalUI() {
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => openSettingsPanel(0));
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(t('contactTitle'), buildContactHTML());
    });
  }

  if (supportBtn) {
    supportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(t('supportTitle'), buildSupportHTML());
    });
  }

  if (accessibilityBtn) {
    accessibilityBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(t('accessibilityTitle'), buildAccessibilityHTML());
    });
  }

  if (privacyBtn) {
    privacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(t('privacyTitle'), buildPrivacyHTML());
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ---------- AI Assistant ---------- */

function getAIReply(question, lang) {
  const lowerQ = question.toLowerCase();

  if (lang === 'zh') {
    if (lowerQ.includes('圆心角') || lowerQ.includes('中心角') || lowerQ.includes('center')) {
      return '📐 圆心角定理：圆心角是圆周角的两倍。∠AOB = 2∠ACB';
    }
    if (lowerQ.includes('半圆') || lowerQ.includes('semicircle')) {
      return '🔵 半圆定理：直径所对的圆周角是90°（直角）。';
    }
    if (lowerQ.includes('切线') || lowerQ.includes('tangent')) {
      return '🌀 半径垂直于切线。半径与切点连线垂直于切线。';
    }
    if (lowerQ.includes('弦') || lowerQ.includes('chord')) {
      return '🎵 垂径定理：垂直于弦的直径平分弦。';
    }
    return '✨ 我可以解释：圆心角定理、半圆定理、切线与半径、圆内接四边形、弦切角等。再问我更多吧！';
  }

  if (lowerQ.includes('center') || lowerQ.includes('centre')) {
    return '📐 Theorem: The angle at the center is twice the angle at the circumference. ∠AOB = 2∠ACB';
  }
  if (lowerQ.includes('semicircle')) {
    return '🔵 Angle in a semicircle is always 90° (right angle).';
  }
  if (lowerQ.includes('tangent')) {
    return '🌀 The radius to a point of tangency is perpendicular to the tangent.';
  }
  if (lowerQ.includes('chord')) {
    return '🎵 Perpendicular from center to chord bisects the chord.';
  }
  return '✨ I can explain: angle at center, semicircle theorem, tangent-radius, cyclic quadrilateral, alternate segment. Ask me!';
}

function updateAssistantLanguageUI(lang) {
  if (!assistantWidget) return;
  const tData = I18N[lang] || I18N.en;
  const headerSpan = assistantWidget.querySelector('.assistant-header span');
  const helpP = assistantWidget.querySelector('.assistant-help');
  const inputField = assistantWidget.querySelector('.assistant-input');
  const sendButton = assistantWidget.querySelector('.assistant-send-btn');
  const langSelector = assistantWidget.querySelector('.lang-selector');
  const answerBox = assistantWidget.querySelector('.assistant-answer');

  if (headerSpan) headerSpan.innerHTML = tData.assistantTitle || '🤖 AI Assistant';
  if (helpP) helpP.textContent = tData.assistantHelp || 'Ask me about circle theorems!';
  if (inputField) inputField.placeholder = tData.assistantPlaceholder || 'e.g., semicircle theorem';
  if (sendButton) sendButton.textContent = tData.assistantSend || 'Send';
  if (langSelector && langSelector.value !== lang) langSelector.value = lang;

  if (answerBox && answerBox.classList.contains('empty')) {
    answerBox.textContent = lang === 'zh' ? '在这里输入问题，答案会显示在这个窗口中。' : 'Ask a question and the answer will appear here.';
  }
}

function updateAssistantPanelDirection() {
  if (!assistantWidget) return;
  const panel = assistantWidget.querySelector('.assistant-panel');
  if (!panel) return;

  assistantWidget.classList.remove('expand-up', 'expand-down', 'expand-left', 'expand-right');

  const widgetRect = assistantWidget.getBoundingClientRect();
  const estimatedPanelHeight = Math.min(panel.scrollHeight || 260, window.innerHeight * 0.7);
  const estimatedPanelWidth = Math.min(panel.offsetWidth || 340, window.innerWidth * 0.88);
  const gap = 12;

  const spaceAbove = widgetRect.top;
  const spaceBelow = window.innerHeight - widgetRect.bottom;
  const spaceLeft = widgetRect.left;
  const spaceRight = window.innerWidth - widgetRect.right;

  if (spaceAbove >= estimatedPanelHeight + gap || spaceAbove >= spaceBelow) {
    assistantWidget.classList.add('expand-up');
  } else {
    assistantWidget.classList.add('expand-down');
  }

  if (spaceLeft >= estimatedPanelWidth - widgetRect.width + gap || spaceLeft >= spaceRight) {
    assistantWidget.classList.add('expand-left');
  } else {
    assistantWidget.classList.add('expand-right');
  }
}

function bindAssistantEvents() {
  if (!assistantWidget) return;
  const langSelector = assistantWidget.querySelector('.lang-selector');
  const input = assistantWidget.querySelector('.assistant-input');
  const sendBtn = assistantWidget.querySelector('.assistant-send-btn');
  const answerBox = assistantWidget.querySelector('.assistant-answer');
  const panel = assistantWidget.querySelector('.assistant-panel');

  if (langSelector) {
    langSelector.addEventListener('change', (e) => applyLanguage(e.target.value));
  }

  const setAssistantAnswer = (text, isEmpty = false) => {
    if (!answerBox) return;
    answerBox.textContent = text;
    answerBox.classList.toggle('empty', isEmpty);
    updateAssistantPanelDirection();
  };

  const sendMessage = () => {
    const question = input?.value.trim() || '';
    const lang = getCurrentLanguage();
    if (!question) {
      const emptyMsg = lang === 'zh' ? '请输入一个关于圆定理的问题！' : 'Please ask something about circle theorems!';
      setAssistantAnswer(emptyMsg, false);
      assistantWidget.classList.add('open');
      updateAssistantPanelDirection();
      return;
    }
    const reply = getAIReply(question, lang);
    setAssistantAnswer(reply, false);
    assistantWidget.classList.add('open');
    updateAssistantPanelDirection();
    input.value = '';
    input.focus();
  };

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    input.addEventListener('focus', () => {
      assistantWidget.classList.add('open');
      updateAssistantPanelDirection();
    });
  }
  if (panel) panel.addEventListener('mouseenter', () => {
    assistantWidget.classList.add('open');
    updateAssistantPanelDirection();
  });
  assistantWidget.addEventListener('mouseenter', () => {
    assistantWidget.classList.add('open');
    updateAssistantPanelDirection();
  });
  assistantWidget.addEventListener('mouseleave', () => {
    if (!assistantWidget.classList.contains('dragging')) assistantWidget.classList.remove('open');
  });
}

function createAssistantWidget() {
  const existing = document.querySelector('.assistant');
  if (existing) existing.remove();

  const assistantDiv = document.createElement('div');
  assistantDiv.className = 'assistant';
  assistantDiv.innerHTML = `
    <button class="assistant-trigger" type="button" aria-label="Open AI assistant">
      <span class="assistant-icon">🤖</span>
    </button>
    <div class="assistant-panel">
      <div class="assistant-content">
        <div class="assistant-header">
          <span>🤖 AI Assistant</span>
          <select class="lang-selector" aria-label="Language switch">
            <option value="en">🇬🇧 English</option>
            <option value="zh">🇨🇳 中文</option>
          </select>
        </div>
        <p class="assistant-help">Ask me about circle theorems!</p>
        <div class="assistant-answer-wrap">
          <div class="assistant-answer empty">Ask a question and the answer will appear here.</div>
        </div>
        <div class="assistant-input-group">
          <input type="text" class="assistant-input" placeholder="e.g., semicircle theorem" />
          <button class="assistant-send-btn">Send</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(assistantDiv);
  assistantWidget = assistantDiv;
  bindAssistantEvents();
  updateAssistantLanguageUI(getCurrentLanguage());
  restoreAssistantPosition();
  enableAssistantDragging();
}

function updateSegmentedThumb(group, animate = true) {
  if (!group) return;

  const activeBtn = group.querySelector('.mode-switch-btn.active');
  if (!activeBtn) return;

  if (!animate) {
    group.classList.add('no-thumb-transition');
  }

  group.style.setProperty('--segment-thumb-x', `${activeBtn.offsetLeft}px`);
  group.style.setProperty('--segment-thumb-width', `${activeBtn.offsetWidth}px`);

  if (!animate) {
    requestAnimationFrame(() => {
      group.classList.remove('no-thumb-transition');
    });
  }
}

function updateAllSegmentedThumbs(scope = document, animate = true) {
  scope.querySelectorAll('.segmented-control').forEach((group) => {
    updateSegmentedThumb(group, animate);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  restorePreferences();
  bindDropdowns();
  bindNavigation();
  bindGlobalUI();
  createAssistantWidget();
});
