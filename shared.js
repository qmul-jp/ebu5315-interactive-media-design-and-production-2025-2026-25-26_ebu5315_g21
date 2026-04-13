const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalTextContainer = document.getElementById('modal-text');
const closeModalBtn = document.querySelector('.close');

const settingsBtn = document.getElementById('settingsBtn');
const contactBtn = document.getElementById('contactBtn');
const supportBtn = document.getElementById('supportBtn');
const accessibilityBtn = document.getElementById('accessibilityBtn');
const dropdownButtons = document.querySelectorAll('.dropbtn');

const NAV_TARGETS = {
  navHomeBtn: 'homepage.html',
  navGameBtn: 'index.html',
  navQuizBtn: 'quiz.html'
};

const I18N = {
  en: {
    settings: 'Settings',
    themeMode: 'Theme mode',
    themeDesc: 'Switch between light and dark appearance.',
    light: 'Light',
    dark: 'Dark',

    language: 'Language',
    languageDesc: 'Switch between English and Chinese.',
    english: 'English',
    chinese: '中文',

    fontSize: 'Font size',
    fontSizeDesc: 'Drag the slider to adjust text size smoothly across the page.',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',

    colourFriendly: 'Colour-friendly mode',
    colourFriendlyDesc: 'Use a palette that is easier to distinguish for more users.',
    reducedMotion: 'Reduced motion',
    reducedMotionDesc: 'Lower visual motion for a calmer experience.',
    highContrast: 'High contrast',
    highContrastDesc: 'Increase separation between text and background.',
    on: 'On',
    off: 'Off',
    savedNote: 'These preferences are saved automatically for the next visit.',

    home: 'Home',
    game: 'Game',
    quiz: 'Quiz',
    about: 'About ▼',
    contactUs: 'Contact us',
    aboutProject: 'About this project',
    accessibilityHelp: 'Accessibility help',

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
    themeDesc: '在浅色与深色外观之间切换。',
    light: '浅色',
    dark: '深色',

    language: '语言',
    languageDesc: '在英文和中文之间切换。',
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
    on: '开',
    off: '关',
    savedNote: '这些设置会自动保存，下次访问时仍然生效。',

    home: '首页',
    game: '游戏',
    quiz: '测验',
    about: '关于 ▼',
    contactUs: '联系我们',
    aboutProject: '关于项目',
    accessibilityHelp: '无障碍帮助',

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

let assistantWidget = null;

function getStored(name, fallback) {
  return localStorage.getItem(name) || fallback;
}

function getCurrentLanguage() {
  return getStored('language', 'en');
}

function t(key) {
  const lang = getCurrentLanguage();
  return I18N[lang]?.[key] || I18N.en[key] || key;
}

function applyTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  localStorage.setItem('theme', theme);
}

function applyFontScale(scale) {
  const numericScale = Math.max(0.85, Math.min(1.3, Number(scale) || 1));
  document.documentElement.style.setProperty('--font-scale', numericScale);
  localStorage.setItem('fontScale', numericScale.toFixed(2));
}

function getCurrentFontScale() {
  return getStored('fontScale', '1.00');
}

function applyColorblindMode(enabled) {
  document.body.classList.toggle('colorblind-mode', enabled);
  localStorage.setItem('colorblindMode', enabled ? 'on' : 'off');
}

function applyReducedMotion(enabled) {
  document.body.classList.toggle('reduce-motion', enabled);
  localStorage.setItem('reducedMotion', enabled ? 'on' : 'off');
}

function applyHighContrast(enabled) {
  document.body.classList.toggle('high-contrast', enabled);
  localStorage.setItem('highContrast', enabled ? 'on' : 'off');
}

function emitLanguageChanged(lang) {
  window.dispatchEvent(
    new CustomEvent('languageChanged', {
      detail: { lang }
    })
  );
}

function applyLanguage(lang) {
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';

  const navHomeBtn = document.getElementById('navHomeBtn');
  const navGameBtn = document.getElementById('navGameBtn');
  const navQuizBtn = document.getElementById('navQuizBtn');
  const settingsBtnEl = document.getElementById('settingsBtn');
  const contactBtnEl = document.getElementById('contactBtn');
  const supportBtnEl = document.getElementById('supportBtn');
  const accessibilityBtnEl = document.getElementById('accessibilityBtn');
  const aboutBtn = document.querySelector('.dropbtn');

  if (navHomeBtn) navHomeBtn.textContent = t('home');
  if (navGameBtn) navGameBtn.textContent = t('game');
  if (navQuizBtn) navQuizBtn.textContent = t('quiz');
  if (settingsBtnEl) settingsBtnEl.textContent = t('settings');
  if (contactBtnEl) contactBtnEl.textContent = t('contactUs');
  if (supportBtnEl) supportBtnEl.textContent = t('aboutProject');
  if (accessibilityBtnEl) accessibilityBtnEl.textContent = t('accessibilityHelp');
  if (aboutBtn) aboutBtn.textContent = t('about');

  if (modal && modal.classList.contains('show')) {
    openSettingsPanel();
  }

  if (assistantWidget) {
    updateAssistantLanguageUI(lang);
  }

  emitLanguageChanged(lang);
}

function restorePreferences() {
  applyTheme(getStored('theme', 'light'));
  applyFontScale(getStored('fontScale', '1.00'));
  applyColorblindMode(getStored('colorblindMode', 'off') === 'on');
  applyReducedMotion(getStored('reducedMotion', 'off') === 'on');
  applyHighContrast(getStored('highContrast', 'off') === 'on');
  applyLanguage(getStored('language', 'en'));
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

function getSettingsHTML() {
  const theme = getStored('theme', 'light');
  const fontScale = getCurrentFontScale();
  const colorblind = getStored('colorblindMode', 'off') === 'on';
  const reducedMotion = getStored('reducedMotion', 'off') === 'on';
  const highContrast = getStored('highContrast', 'off') === 'on';
  const language = getCurrentLanguage();

  return `
    <div class="settings-panel">
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('themeMode')}</strong>
          <span>${t('themeDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="theme" data-value="light" class="mode-switch-btn ${theme === 'light' ? 'active' : ''}">${t('light')}</button>
          <button type="button" data-setting="theme" data-value="dark" class="mode-switch-btn ${theme === 'dark' ? 'active' : ''}">${t('dark')}</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('language')}</strong>
          <span>${t('languageDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="language" data-value="en" class="mode-switch-btn ${language === 'en' ? 'active' : ''}">${t('english')}</button>
          <button type="button" data-setting="language" data-value="zh" class="mode-switch-btn ${language === 'zh' ? 'active' : ''}">${t('chinese')}</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('fontSize')}</strong>
          <span>${t('fontSizeDesc')}</span>
        </div>
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
          />
          <span class="font-slider-label font-slider-label-large">A</span>
        </div>
        <div class="font-slider-readout">
          <span id="fontSizeValue">${Math.round(Number(fontScale) * 100)}%</span>
          <span id="fontSizePreset">${getFontLabel(fontScale)}</span>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('colourFriendly')}</strong>
          <span>${t('colourFriendlyDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="colorblindMode" data-value="toggle" class="toggle-btn ${colorblind ? 'active' : ''}">
            ${colorblind ? t('on') : t('off')}
          </button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('reducedMotion')}</strong>
          <span>${t('reducedMotionDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="reducedMotion" data-value="toggle" class="toggle-btn ${reducedMotion ? 'active' : ''}">
            ${reducedMotion ? t('on') : t('off')}
          </button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('highContrast')}</strong>
          <span>${t('highContrastDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="highContrast" data-value="toggle" class="toggle-btn ${highContrast ? 'active' : ''}">
            ${highContrast ? t('on') : t('off')}
          </button>
        </div>
      </div>

      <p class="settings-note">${t('savedNote')}</p>
    </div>
  `;
}

function openSettingsPanel() {
  openModal(t('settings'), getSettingsHTML());
  bindSettingsControls();
}

function bindSettingsControls() {
  if (!modalTextContainer) return;

  modalTextContainer.querySelectorAll("[data-setting='theme']").forEach((btn) => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.value);
      openSettingsPanel();
    });
  });

  modalTextContainer.querySelectorAll("[data-setting='language']").forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.value);
      openSettingsPanel();
    });
  });

  modalTextContainer.querySelectorAll("[data-setting='colorblindMode']").forEach((btn) => {
    btn.addEventListener('click', () => {
      const enabled = getStored('colorblindMode', 'off') !== 'on';
      applyColorblindMode(enabled);
      openSettingsPanel();
    });
  });

  modalTextContainer.querySelectorAll("[data-setting='reducedMotion']").forEach((btn) => {
    btn.addEventListener('click', () => {
      const enabled = getStored('reducedMotion', 'off') !== 'on';
      applyReducedMotion(enabled);
      openSettingsPanel();
    });
  });

  modalTextContainer.querySelectorAll("[data-setting='highContrast']").forEach((btn) => {
    btn.addEventListener('click', () => {
      const enabled = getStored('highContrast', 'off') !== 'on';
      applyHighContrast(enabled);
      openSettingsPanel();
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
    settingsBtn.addEventListener('click', openSettingsPanel);
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
  const helpP = assistantWidget.querySelector('.assistant-content p');
  const inputField = assistantWidget.querySelector('.assistant-input');
  const sendButton = assistantWidget.querySelector('.assistant-send-btn');
  const langSelector = assistantWidget.querySelector('.lang-selector');

  if (headerSpan) headerSpan.innerHTML = tData.assistantTitle || '🤖 AI Assistant';
  if (helpP) helpP.textContent = tData.assistantHelp || 'Ask me about circle theorems!';
  if (inputField) inputField.placeholder = tData.assistantPlaceholder || 'e.g., semicircle theorem';
  if (sendButton) sendButton.textContent = tData.assistantSend || 'Send';
  if (langSelector && langSelector.value !== lang) {
    langSelector.value = lang;
  }
}

function bindAssistantEvents() {
  if (!assistantWidget) return;

  const langSelector = assistantWidget.querySelector('.lang-selector');
  const input = assistantWidget.querySelector('.assistant-input');
  const sendBtn = assistantWidget.querySelector('.assistant-send-btn');

  if (langSelector) {
    langSelector.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  }

  const sendMessage = () => {
    const question = input?.value.trim() || '';
    if (!question) {
      const emptyMsg = getCurrentLanguage() === 'zh'
        ? '请输入一个关于圆定理的问题！'
        : 'Please ask something about circle theorems!';
      alert(`🤖 AI: ${emptyMsg}`);
      return;
    }

    const reply = getAIReply(question, getCurrentLanguage());
    alert(`🤖 AI: ${reply}`);
    input.value = '';
  };

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
}

function createAssistantWidget() {
  if (document.querySelector('.assistant')) {
    assistantWidget = document.querySelector('.assistant');
    updateAssistantLanguageUI(getCurrentLanguage());
    return;
  }

  const assistantDiv = document.createElement('div');
  assistantDiv.className = 'assistant';
  assistantDiv.innerHTML = `
    <div class="assistant-icon">🤖</div>
    <div class="assistant-content">
      <div class="assistant-header">
        <span>🤖 AI Assistant</span>
        <select class="lang-selector" aria-label="Language switch">
          <option value="en">🇬🇧 English</option>
          <option value="zh">🇨🇳 中文</option>
        </select>
      </div>
      <p>Ask me about circle theorems!</p>
      <div class="assistant-input-group">
        <input type="text" class="assistant-input" placeholder="e.g., semicircle theorem" />
        <button class="assistant-send-btn">Send</button>
      </div>
    </div>
  `;

  document.body.appendChild(assistantDiv);
  assistantWidget = assistantDiv;
  bindAssistantEvents();
  updateAssistantLanguageUI(getCurrentLanguage());
}

window.addEventListener('DOMContentLoaded', () => {
  restorePreferences();
  bindDropdowns();
  bindNavigation();
  bindGlobalUI();
  createAssistantWidget();
});

// ==========================================
// V11: Inclusive Design Patch (安全补丁：直接追加到 shared.js 最底部)
// ==========================================

// 1. 动态注入新文案（不破坏原有的 const I18N）
if (typeof I18N !== 'undefined') {
    Object.assign(I18N.en, {
        eyeCare: 'Eye-Care', legibility: 'Enhanced legibility', legibilityDesc: 'Increase line spacing and letter spacing for dyslexic users.'
    });
    Object.assign(I18N.zh, {
        eyeCare: '护眼', legibility: '易读排版 (Dyslexia)', legibilityDesc: '强制增大字间距与行高，使用无衬线体以提升阅读清晰度。'
    });
}

// 2. 覆盖原有函数 (利用 JavaScript 的提升特性，自动替换旧逻辑)
function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('eye-care', theme === 'eye-care');
    localStorage.setItem('theme', theme);
}

function applyLegibility(enabled) {
    document.body.classList.toggle('legibility-mode', enabled);
    localStorage.setItem('legibilityMode', enabled ? 'on' : 'off');
}

function restorePreferences() {
    applyTheme(getStored('theme', 'light'));
    applyFontScale(getStored('fontScale', '1.00'));
    applyColorblindMode(getStored('colorblindMode', 'off') === 'on');
    applyReducedMotion(getStored('reducedMotion', 'off') === 'on');
    applyHighContrast(getStored('highContrast', 'off') === 'on');
    applyLegibility(getStored('legibilityMode', 'off') === 'on');
    applyLanguage(getStored('language', 'en'));
}

function getSettingsHTML() {
  const theme = getStored('theme', 'light');
  const fontScale = getCurrentFontScale();
  const colorblind = getStored('colorblindMode', 'off') === 'on';
  const reducedMotion = getStored('reducedMotion', 'off') === 'on';
  const highContrast = getStored('highContrast', 'off') === 'on';
  const legibility = getStored('legibilityMode', 'off') === 'on';
  const language = getCurrentLanguage();

  return `
    <div class="settings-panel">
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('themeMode')}</strong><span>${t('themeDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="theme" data-value="light" class="mode-switch-btn ${theme === 'light' ? 'active' : ''}">${t('light')}</button>
          <button type="button" data-setting="theme" data-value="eye-care" class="mode-switch-btn ${theme === 'eye-care' ? 'active' : ''}">${t('eyeCare')}</button>
          <button type="button" data-setting="theme" data-value="dark" class="mode-switch-btn ${theme === 'dark' ? 'active' : ''}">${t('dark')}</button>
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('language')}</strong><span>${t('languageDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="language" data-value="en" class="mode-switch-btn ${language === 'en' ? 'active' : ''}">${t('english')}</button>
          <button type="button" data-setting="language" data-value="zh" class="mode-switch-btn ${language === 'zh' ? 'active' : ''}">${t('chinese')}</button>
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('fontSize')}</strong><span>${t('fontSizeDesc')}</span>
        </div>
        <div class="font-slider-wrap">
          <span class="font-slider-label">A</span>
          <input id="fontSizeSlider" class="font-size-slider" type="range" min="0.85" max="1.30" step="0.01" value="${fontScale}" />
          <span class="font-slider-label font-slider-label-large">A</span>
        </div>
        <div class="font-slider-readout">
          <span id="fontSizeValue">${Math.round(Number(fontScale) * 100)}%</span>
          <span id="fontSizePreset">${getFontLabel(fontScale)}</span>
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('legibility')}</strong><span>${t('legibilityDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="legibilityMode" data-value="toggle" class="toggle-btn ${legibility ? 'active' : ''}">${legibility ? t('on') : t('off')}</button>
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('colourFriendly')}</strong><span>${t('colourFriendlyDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="colorblindMode" data-value="toggle" class="toggle-btn ${colorblind ? 'active' : ''}">${colorblind ? t('on') : t('off')}</button>
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('reducedMotion')}</strong><span>${t('reducedMotionDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="reducedMotion" data-value="toggle" class="toggle-btn ${reducedMotion ? 'active' : ''}">${reducedMotion ? t('on') : t('off')}</button>
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-copy">
          <strong>${t('highContrast')}</strong><span>${t('highContrastDesc')}</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="highContrast" data-value="toggle" class="toggle-btn ${highContrast ? 'active' : ''}">${highContrast ? t('on') : t('off')}</button>
        </div>
      </div>
      <p class="settings-note">${t('savedNote')}</p>
    </div>
  `;
}

function bindSettingsControls() {
  if (!modalTextContainer) return;
  modalTextContainer.querySelectorAll("[data-setting='theme']").forEach((btn) => {
    btn.addEventListener('click', () => { applyTheme(btn.dataset.value); openSettingsPanel(); });
  });
  modalTextContainer.querySelectorAll("[data-setting='language']").forEach((btn) => {
    btn.addEventListener('click', () => { applyLanguage(btn.dataset.value); openSettingsPanel(); });
  });
  modalTextContainer.querySelectorAll("[data-setting='colorblindMode']").forEach((btn) => {
    btn.addEventListener('click', () => { applyColorblindMode(getStored('colorblindMode', 'off') !== 'on'); openSettingsPanel(); });
  });
  modalTextContainer.querySelectorAll("[data-setting='reducedMotion']").forEach((btn) => {
    btn.addEventListener('click', () => { applyReducedMotion(getStored('reducedMotion', 'off') !== 'on'); openSettingsPanel(); });
  });
  modalTextContainer.querySelectorAll("[data-setting='highContrast']").forEach((btn) => {
    btn.addEventListener('click', () => { applyHighContrast(getStored('highContrast', 'off') !== 'on'); openSettingsPanel(); });
  });
  modalTextContainer.querySelectorAll("[data-setting='legibilityMode']").forEach((btn) => {
    btn.addEventListener('click', () => { applyLegibility(getStored('legibilityMode', 'off') !== 'on'); openSettingsPanel(); });
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
}