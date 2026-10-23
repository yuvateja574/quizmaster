
"use strict";

/* ==========================================
   QuizMaster Day 7 — Settings
   Standalone add-on. Existing quiz code untouched.
   ========================================== */

(() => {
  const STORAGE_KEY = "qm_day7_preferences";

  const DEFAULTS = {
    theme: "dark",
    sound: true,
    timerSeconds: "20"
  };

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

      return {
        theme: saved?.theme === "light" ? "light" : DEFAULTS.theme,
        sound: typeof saved?.sound === "boolean"
          ? saved.sound
          : DEFAULTS.sound,
        timerSeconds: ["15", "20", "30", "60", "0"].includes(
          String(saved?.timerSeconds)
        )
          ? String(saved.timerSeconds)
          : DEFAULTS.timerSeconds
      };
    } catch {
      return { ...DEFAULTS };
    }
  }

  let settings = loadSettings();

  function applyTheme() {
    document.body.classList.toggle(
      "day7-light-theme",
      settings.theme === "light"
    );
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setStatus("Settings saved on this device.");
      return true;
    } catch {
      setStatus(
        "Could not save settings. Your browser storage may be unavailable."
      );
      return false;
    }
  }

  function setStatus(message) {
    const status = $("#day7Status");
    if (status) status.textContent = message;
  }

  function buildPanel() {
    if ($("#day7Settings")) return;

    const panel = document.createElement("section");
    panel.id = "day7Settings";
    panel.className = "day7-settings";
    panel.setAttribute("aria-labelledby", "day7Title");

    panel.innerHTML = `
      <p class="day7-settings-intro">QUIZMASTER PERSONALIZATION</p>
      <h2 id="day7Title">Settings &amp; Preferences ⚙️</h2>
      <p class="day7-settings-intro">
        Customize your experience. Your choices are saved in this browser.
      </p>

      <div class="day7-setting-list">
        <div class="day7-setting-row">
          <div class="day7-setting-copy">
            <strong>Light theme</strong>
            <span>Switch between the default dark look and a light page theme.</span>
          </div>
          <label class="day7-switch">
            <input id="day7Theme" type="checkbox" aria-label="Enable light theme">
            <span class="day7-switch-track"></span>
          </label>
        </div>

        <div class="day7-setting-row">
          <div class="day7-setting-copy">
            <strong>Sound preference</strong>
            <span>Save whether you prefer quiz sounds on or off.</span>
          </div>
          <label class="day7-switch">
            <input id="day7Sound" type="checkbox" aria-label="Enable sound preference">
            <span class="day7-switch-track"></span>
          </label>
        </div>

        <div class="day7-setting-row">
          <div class="day7-setting-copy">
            <strong>Preferred quiz timer</strong>
            <span>Choose a preferred duration for future quiz integration.</span>
          </div>
          <select id="day7Timer" class="day7-select" aria-label="Preferred quiz timer">
            <option value="15">15 seconds</option>
            <option value="20">20 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
            <option value="0">No timer</option>
          </select>
        </div>
      </div>

      <div class="day7-actions">
        <button id="day7Save" class="day7-button" type="button">
          Save settings
        </button>
        <button id="day7Reset" class="day7-button secondary" type="button">
          Reset defaults
        </button>
      </div>

      <p id="day7Status" class="day7-status" role="status" aria-live="polite"></p>

      <p class="day7-note">
        Integration note: these preferences are stored separately from the
        existing quiz engine. The sound and timer choices won't change the
        existing quiz timer or sound until those features are connected.
      </p>
    `;

    const main = $("main") || $(".container") || document.body;
    main.appendChild(panel);

    $("#day7Theme", panel).checked = settings.theme === "light";
    $("#day7Sound", panel).checked = settings.sound;
    $("#day7Timer", panel).value = settings.timerSeconds;

    applyTheme();
    connectEvents(panel);
  }

  function connectEvents(panel) {
    $("#day7Theme", panel).addEventListener("change", event => {
      settings.theme = event.target.checked ? "light" : "dark";
      applyTheme();
      saveSettings();
    });

    $("#day7Sound", panel).addEventListener("change", event => {
      settings.sound = event.target.checked;
      saveSettings();
    });

    $("#day7Timer", panel).addEventListener("change", event => {
      settings.timerSeconds = event.target.value;
      saveSettings();
    });

    $("#day7Save", panel).addEventListener("click", () => {
      settings.theme = $("#day7Theme", panel).checked ? "light" : "dark";
      settings.sound = $("#day7Sound", panel).checked;
      settings.timerSeconds = $("#day7Timer", panel).value;

      applyTheme();
      saveSettings();
    });

    $("#day7Reset", panel).addEventListener("click", () => {
      settings = { ...DEFAULTS };

      $("#day7Theme", panel).checked = false;
      $("#day7Sound", panel).checked = DEFAULTS.sound;
      $("#day7Timer", panel).value = DEFAULTS.timerSeconds;

      applyTheme();
      saveSettings();
      setStatus("Default preferences restored.");
    });
  }

  function init() {
    buildPanel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
