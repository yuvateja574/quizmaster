
"use strict";

/* ==========================================
   QuizMaster Day 4 — Daily Challenge
   Separate add-on; does not edit script.js.
   ========================================== */

(() => {
  const STORAGE_KEY = "qm_day4_daily_completion";
  const XP_KEY = "qm_day4_daily_bonus_xp";
  const BONUS_XP = 50;

  const questions = [
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Venus", "Mars", "Jupiter", "Mercury"],
      correct: 1,
      explanation: "Mars looks reddish because of iron oxide on its surface."
    },
    {
      question: "Which language is commonly used for data analysis?",
      answers: ["HTML", "CSS", "Python", "XML"],
      correct: 2,
      explanation: "Python is widely used for data analysis and machine learning."
    },
    {
      question: "What is the main function of the brain?",
      answers: [
        "Pump blood",
        "Control and coordinate body activities",
        "Digest food",
        "Filter blood"
      ],
      correct: 1,
      explanation: "The brain processes information and coordinates many body functions."
    },
    {
      question: "How many sides does a hexagon have?",
      answers: ["Five", "Six", "Seven", "Eight"],
      correct: 1,
      explanation: "A hexagon is a polygon with six sides."
    },
    {
      question: "Which device is used to connect a computer to a network?",
      answers: ["Network interface card", "Speaker", "Scanner", "Projector"],
      correct: 0,
      explanation: "A network interface card enables a computer to connect to a network."
    }
  ];

  let currentIndex = 0;
  let score = 0;
  let answered = false;

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  function getToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getCompletion() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  }

  function getBonusXP() {
    return Number(localStorage.getItem(XP_KEY) || 0);
  }

  function createChallenge() {
    const dailyPage = $("#daily");
    if (!dailyPage) return;

    let panel = $("#day4Challenge");

    if (!panel) {
      panel = document.createElement("section");
      panel.id = "day4Challenge";
      panel.className = "day4-challenge";
      panel.setAttribute("aria-live", "polite");

      // Add the new panel without replacing existing page content.
      dailyPage.appendChild(panel);
    }

    updateDailyStatus();
  }

  function updateDailyStatus() {
    const panel = $("#day4Challenge");
    if (!panel) return;

    const completion = getCompletion();
    const completedToday =
      completion && completion.date === getToday();

    if (completedToday) {
      panel.hidden = false;
      panel.innerHTML = `
        <span class="day4-label">Daily Challenge</span>
        <h2>Challenge completed! 🎉</h2>
        <p class="day4-muted">
          You scored ${completion.score} out of ${questions.length}.
        </p>
        <div class="day4-reward">
          🏆 Today's bonus: +${completion.bonusXP} XP
        </div>
        <p class="day4-muted">
          Come back tomorrow for another daily challenge.
        </p>
      `;
    } else {
      panel.hidden = true;
    }

    const status = $("#dailyStatus");
    if (status && completedToday) {
      status.textContent =
        "Today's Day 4 challenge is completed. Come back tomorrow!";
    }
  }

  function startChallenge() {
    const panel = $("#day4Challenge");
    if (!panel) return;

    const completion = getCompletion();

    if (completion && completion.date === getToday()) {
      updateDailyStatus();
      return;
    }

    currentIndex = 0;
    score = 0;
    answered = false;

    panel.hidden = false;
    renderQuestion();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderQuestion() {
    const panel = $("#day4Challenge");
    const item = questions[currentIndex];

    if (!panel || !item) return;

    answered = false;

    panel.innerHTML = `
      <span class="day4-label">Daily Challenge · Bonus ${BONUS_XP} XP</span>
      <h2>Question ${currentIndex + 1} of ${questions.length}</h2>
      <p class="day4-muted">
        Correct answers: ${score} / ${questions.length}
      </p>

      <div
        class="day4-progress-track"
        role="progressbar"
        aria-label="Daily challenge progress"
        aria-valuemin="0"
        aria-valuemax="${questions.length}"
        aria-valuenow="${currentIndex}">
        <div class="day4-progress-fill"
          style="width: ${(currentIndex / questions.length) * 100}%">
        </div>
      </div>

      <h3 class="day4-question"></h3>
      <div class="day4-answers"></div>
      <p class="day4-feedback" id="day4Feedback"></p>
      <button class="day4-action" id="day4Next" disabled>
        Check an answer first
      </button>
    `;

    $(".day4-question", panel).textContent = item.question;

    const answerList = $(".day4-answers", panel);

    item.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "day4-answer";
      button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;

      button.addEventListener("click", () => chooseAnswer(index));
      answerList.appendChild(button);
    });

    $("#day4Next", panel).addEventListener("click", () => {
      if (!answered) return;

      currentIndex++;

      if (currentIndex < questions.length) {
        renderQuestion();
      } else {
        finishChallenge();
      }
    });
  }

  function chooseAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const item = questions[currentIndex];
    const buttons = [...$("#day4Challenge .day4-answers").children];
    const feedback = $("#day4Feedback");
    const next = $("#day4Next");

    buttons.forEach((button, index) => {
      button.disabled = true;

      if (index === item.correct) {
        button.classList.add("day4-correct");
      } else if (index === selectedIndex) {
        button.classList.add("day4-wrong");
      }
    });

    if (selectedIndex === item.correct) {
      score++;
      feedback.textContent = `Correct! ${item.explanation}`;
    } else {
      feedback.textContent =
        `Not quite. ${item.explanation}`;
    }

    next.disabled = false;
    next.textContent =
      currentIndex === questions.length - 1
        ? "Finish challenge"
        : "Next question →";
  }

  function finishChallenge() {
    const panel = $("#day4Challenge");

    // A second click or repeat finish cannot award XP twice.
    const existing = getCompletion();
    if (existing && existing.date === getToday()) {
      updateDailyStatus();
      return;
    }

    const previousXP = getBonusXP();
    const newXP = previousXP + BONUS_XP;

    try {
      localStorage.setItem(XP_KEY, String(newXP));
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          date: getToday(),
          score,
          total: questions.length,
          bonusXP: BONUS_XP
        })
      );
    } catch (error) {
      panel.innerHTML = `
        <h2>Could not save your result</h2>
        <p class="day4-muted">
          Your browser storage may be unavailable. Please enable local
          storage and try again.
        </p>
      `;
      return;
    }

    panel.innerHTML = `
      <span class="day4-label">Challenge completed</span>
      <h2>${score === questions.length ? "Perfect score! 🏆" : "Well done! 🎉"}</h2>
      <p class="day4-muted">
        You answered ${score} out of ${questions.length} questions correctly.
      </p>
      <div class="day4-reward">
        ✨ Bonus earned: +${BONUS_XP} XP
      </div>
      <p class="day4-muted">
        Day 4 bonus XP saved: ${newXP} XP in total.
      </p>
      <p class="day4-muted">
        Your daily challenge is now marked complete for today.
        Return tomorrow to try again.
      </p>
    `;

    updateDailyStatus();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function connectStartButton() {
    const button = $("#startDaily");
    if (!button) return;

    /*
      Capture the click before existing handlers run.
      This keeps the new challenge separate from the old handler.
    */
    document.addEventListener("click", (event) => {
      const clickedButton = event.target.closest("#startDaily");
      if (!clickedButton) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      startChallenge();
    }, true);
  }

  function init() {
    createChallenge();
    connectStartButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
