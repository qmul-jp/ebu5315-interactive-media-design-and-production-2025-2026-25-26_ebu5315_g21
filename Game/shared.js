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

const CONTACT_HTML = `
  <div class="info-panel">
    <div class="info-row"><div><strong>Project contacts</strong><span>Reach the team directly by email.</span></div></div>
    <div class="info-row"><div><strong>Yining Qin</strong><span>3029970043@qq.com</span></div></div>
    <div class="info-row"><div><strong>Yafei Yang</strong><span>1662060048@qq.com</span></div></div>
    <div class="info-row"><div><strong>Yiran Fan</strong><span>van52985@foxmail.com</span></div></div>
  </div>
`;

const SUPPORT_HTML = `
  <div class="info-panel">
    <div class="info-row"><div><strong>About this project</strong><span>Geometry Escape Lab is an interactive circle-theorem learning website with game, theorem archive and quiz navigation.</span></div></div>
    <div class="info-row"><div><strong>Design goal</strong><span>Keep the interface visually consistent, readable and easy to use in both light and dark mode.</span></div></div>
  </div>
`;

const ACCESSIBILITY_HTML = `
  <div class="info-panel">
    <div class="info-row"><div><strong>Inclusive options included</strong><span>Adjustable font size, dark mode, colour-friendly palette, high contrast and reduced motion are all available in Settings.</span></div></div>
    <div class="info-row"><div><strong>Best viewing tip</strong><span>If colours are hard to distinguish, turn on Colour-friendly mode and High contrast together.</span></div></div>
  </div>
`;

function getStored(name, fallback) {
  return localStorage.getItem(name) || fallback;
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

function restorePreferences() {
  applyTheme(getStored('theme', 'light'));
  applyFontScale(getStored('fontScale', '1.00'));
  applyColorblindMode(getStored('colorblindMode', 'off') === 'on');
  applyReducedMotion(getStored('reducedMotion', 'off') === 'on');
  applyHighContrast(getStored('highContrast', 'off') === 'on');
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
  if (value <= 0.92) return 'Small';
  if (value >= 1.16) return 'Large';
  return 'Medium';
}

function getSettingsHTML() {
  const theme = getStored('theme', 'light');
  const fontScale = getCurrentFontScale();
  const colorblind = getStored('colorblindMode', 'off') === 'on';
  const reducedMotion = getStored('reducedMotion', 'off') === 'on';
  const highContrast = getStored('highContrast', 'off') === 'on';

  return `
    <div class="settings-panel">
      <div class="settings-group">
        <div class="settings-copy">
          <strong>Theme mode</strong>
          <span>Switch between light and dark appearance.</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="theme" data-value="light" class="mode-switch-btn ${theme === 'light' ? 'active' : ''}">Light</button>
          <button type="button" data-setting="theme" data-value="dark" class="mode-switch-btn ${theme === 'dark' ? 'active' : ''}">Dark</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>Font size</strong>
          <span>Drag the slider to adjust text size smoothly across the page.</span>
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
          <strong>Colour-friendly mode</strong>
          <span>Use a palette that is easier to distinguish for more users.</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="colorblindMode" data-value="toggle" class="toggle-btn ${colorblind ? 'active' : ''}">${colorblind ? 'On' : 'Off'}</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>Reduced motion</strong>
          <span>Lower visual motion for a calmer experience.</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="reducedMotion" data-value="toggle" class="toggle-btn ${reducedMotion ? 'active' : ''}">${reducedMotion ? 'On' : 'Off'}</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-copy">
          <strong>High contrast</strong>
          <span>Increase separation between text and background.</span>
        </div>
        <div class="control-row">
          <button type="button" data-setting="highContrast" data-value="toggle" class="toggle-btn ${highContrast ? 'active' : ''}">${highContrast ? 'On' : 'Off'}</button>
        </div>
      </div>
    </div>
    <p class="modal-note">These preferences are saved automatically for the next visit.</p>
  `;
}

function bindSettingsActions() {
  if (!modalTextContainer) return;

  modalTextContainer.querySelectorAll('[data-setting]').forEach((button) => {
    button.addEventListener('click', () => {
      const setting = button.dataset.setting;
      const value = button.dataset.value;

      if (setting === 'theme') applyTheme(value);

      if (setting === 'colorblindMode') {
        const current = getStored('colorblindMode', 'off') === 'on';
        applyColorblindMode(!current);
      }

      if (setting === 'reducedMotion') {
        const current = getStored('reducedMotion', 'off') === 'on';
        applyReducedMotion(!current);
      }

      if (setting === 'highContrast') {
        const current = getStored('highContrast', 'off') === 'on';
        applyHighContrast(!current);
      }

      openSettingsPanel();
    });
  });

  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const fontSizePreset = document.getElementById('fontSizePreset');

  if (fontSizeSlider) {
    const updateSliderUI = (value) => {
      const numeric = Number(value);
      if (fontSizeValue) fontSizeValue.textContent = `${Math.round(numeric * 100)}%`;
      if (fontSizePreset) fontSizePreset.textContent = getFontLabel(numeric);
    };

    updateSliderUI(fontSizeSlider.value);

    fontSizeSlider.addEventListener('input', () => {
      applyFontScale(fontSizeSlider.value);
      updateSliderUI(fontSizeSlider.value);
    });

    fontSizeSlider.addEventListener('change', () => {
      applyFontScale(fontSizeSlider.value);
      updateSliderUI(fontSizeSlider.value);
    });
  }
}

function openSettingsPanel() {
  openModal('Settings', getSettingsHTML());
  bindSettingsActions();
}

function setupDropdowns() {
  dropdownButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const parent = btn.closest('.nav-group');
      document.querySelectorAll('.nav-group').forEach((group) => {
        if (group !== parent) group.classList.remove('open');
      });
      parent?.classList.toggle('open');
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-group')) {
      document.querySelectorAll('.nav-group').forEach((group) => group.classList.remove('open'));
    }
  });
}

function setupNavigation() {
  Object.entries(NAV_TARGETS).forEach(([id, href]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.location.href = href;
    });
  });
}

if (settingsBtn) {
  settingsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openSettingsPanel();
  });
}

if (contactBtn) {
  contactBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openModal('Contact us', CONTACT_HTML);
  });
}

if (supportBtn) {
  supportBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openModal('About this project', SUPPORT_HTML);
  });
}

if (accessibilityBtn) {
  accessibilityBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openModal('Accessibility help', ACCESSIBILITY_HTML);
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener('DOMContentLoaded', () => {
  restorePreferences();
  setupDropdowns();
  setupNavigation();
});