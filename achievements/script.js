
"use strict";

/* ==========================================
   QuizMaster Day 5 — Achievement Center
   Separate add-on. Does not modify script.js.
   ========================================== */

(() => {
  const STORAGE_KEY = "qm_day5_achievement_data";

  const BADGES = [
    {
      id: "firstQuiz",
      icon: "🥇",
      name: "First Quiz",
      description: "Complete your first quiz.",
      requirement: "Complete 1 quiz."
    },
    {
      id: "perfectScore",
      icon: "🎯",
      name: "Perfect Score",
      description: "Get every question correct in a quiz.",
      requirement: "Record a perfect quiz."
    },
    {
      id: "quizMaster",
      icon: "🏆",
      name: "Quiz Master",
      description: "Complete 10 quizzes.",
      requirement: "Complete 10 quizzes."
    },
    {
      id: "dailyStreak",
      icon: "🔥",
      name: "Daily Streak",
      description: "Complete quizzes on 3 different days in a row.",
      requirement: "Complete quizzes on 3 consecutive days."
    }
  ];

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  function todayKey() {
    const date = new Date();
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
  }

  function readData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

      return {
        completedQuizzes: Math.max(
          0,
          Number(saved?.completedQuizzes) || 0
        ),
        perfectQuizzes: Math.max(
          0,
          Number(saved?.perfectQuizzes) || 0
        ),
        completionDates: Array.isArray(saved?.completionDates)
          ? [...new Set(saved.completionDates.filter(
              date => typeof date === "string" &&
                /^\d{4}-\d{2}-\d{2}$/.test(date)
            ))].sort()
          : [],
        earned: Array.isArray(saved?.earned)
          ? [...new Set(saved.earned)]
          : []
      };
    } catch {
      return {
        completedQuizzes: 0,
        perfectQuizzes: 0,
        completionDates: [],
        earned: []
      };
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      showFeedback("Could not save data. Check your browser storage settings.");
      return false;
    }
  }

  function consecutiveDayStreak(dates) {
    const uniqueDates = [...new Set(dates)].sort().reverse();

    if (!uniqueDates.length) return 0;

    let streak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const previous = new Date(`${uniqueDates[i - 1]}T12:00:00`);
      const current = new Date(`${uniqueDates[i]}T12:00:00`);

      const difference = Math.round(
        (previous.getTime() - current.getTime()) / 86400000
      );

      if (difference === 1) {
        streak++;
      } else if (difference > 1) {
        break;
      }
    }

    return streak;
  }

  function evaluateBadges(data) {
    const conditions = {
      firstQuiz: data.completedQuizzes >= 1,
      perfectScore: data.perfectQuizzes >= 1,
      quizMaster: data.completedQuizzes >= 10,
      dailyStreak: consecutiveDayStreak(data.completionDates) >= 3
    };

    data.earned = [...new Set([
      ...data.earned,
      ...BADGES.filter(badge => conditions[badge.id]).map(badge => badge.id)
    ])];

    return data;
  }

  function showFeedback(message) {
    const feedback = $("#day5Feedback");
    if (feedback) feedback.textContent = message;
  }

  function render() {
    const panel = $("#day5Achievements");
    if (!panel) return;

    const data = evaluateBadges(readData());
    const earnedCount = BADGES.filter(
      badge => data.earned.includes(badge.id)
    ).length;

    panel.innerHTML = `
      <span class="day5-description">QUIZMASTER REWARDS</span>
      <h2 class="day5-heading">Achievements &amp; Badges 🏆</h2>
      <p class="day5-description">
        Every quiz is a step forward. Keep learning and unlock your badges!
      </p>

      <div class="day5-summary">
        <div class="day5-stat">
          Quizzes completed
          <strong>${data.completedQuizzes}</strong>
        </div>
        <div class="day5-stat">
          Perfect quizzes
          <strong>${data.perfectQuizzes}</strong>
        </div>
        <div class="day5-stat">
          Badges earned
          <strong>${earnedCount} / ${BADGES.length}</strong>
        </div>
      </div>

      <div class="day5-grid">
        ${BADGES.map(badge => {
          const earned = data.earned.includes(badge.id);

          return `
            <article class="day5-badge ${earned ? "is-earned" : ""}">
              <div class="day5-badge-icon" aria-hidden="true">
                ${badge.icon}
              </div>
              <h3>${badge.name}</h3>
              <p>${badge.description}</p>
              <span class="day5-status">
                ${earned ? "✓ Unlocked" : "🔒 " + badge.requirement}
              </span>
            </article>
          `;
        }).join("")}
      </div>

      <p class="day5-note">
        This standalone tracker uses its own saved data. It does not yet
        import quiz history from the existing QuizMaster quiz engine.
      </p>

      <h3>Record a quiz</h3>
      <p class="day5-description">
        Use these controls to test the achievement system. Record a perfect
        result only when your quiz score was actually perfect.
      </p>

      <div class="day5-controls">
        <button class="day5-button" id="day5RecordQuiz" type="button">
          + Record completed quiz
        </button>
        <button class="day5-button secondary" id="day5RecordPerfect" type="button">
          🎯 Record perfect quiz
        </button>
      </div>

      <p class="day5-feedback" id="day5Feedback" role="status" aria-live="polite"></p>
    `;

    $("#day5RecordQuiz", panel).addEventListener("click", () => {
      const updated = readData();
      updated.completedQuizzes++;
      updated.completionDates.push(todayKey());

      const nextData = evaluateBadges(updated);

      if (saveData(nextData)) {
        render();
        showFeedback("Quiz completion recorded! Your badges have been updated.");
      }
    });

    $("#day5RecordPerfect", panel).addEventListener("click", () => {
      const updated = readData();
      updated.completedQuizzes++;
      updated.perfectQuizzes++;
      updated.completionDates.push(todayKey());

      const nextData = evaluateBadges(updated);

      if (saveData(nextData)) {
        render();
        showFeedback("Perfect quiz recorded! Your achievements have been updated.");
      }
    });
  }

  function init() {
    // Add a separate section without replacing existing page content.
    const panel = document.createElement("section");
    panel.id = "day5Achievements";
    panel.className = "day5-achievements";
    panel.setAttribute("aria-label", "QuizMaster achievements");

    const main = $("main") || $(".container") || document.body;
    main.appendChild(panel);

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
