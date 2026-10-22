
"use strict";

/* ==========================================
   QuizMaster Day 6 — Statistics Dashboard
   Standalone demo; existing quiz code untouched.
   ========================================== */

(() => {
  const demoViews = [
    {
      name: "Demo dataset A",
      quizzes: 12,
      correct: 84,
      incorrect: 36,
      categories: [
        { name: "Programming", accuracy: 88 },
        { name: "Data Science", accuracy: 76 },
        { name: "Computer Networks", accuracy: 82 },
        { name: "AI & Machine Learning", accuracy: 91 },
        { name: "Computer Fundamentals", accuracy: 70 }
      ],
      recent: [
        { name: "JavaScript Basics", score: 90, date: "Demo result 1" },
        { name: "Python Fundamentals", score: 80, date: "Demo result 2" },
        { name: "Computer Networks", score: 70, date: "Demo result 3" }
      ]
    },
    {
      name: "Demo dataset B",
      quizzes: 8,
      correct: 49,
      incorrect: 31,
      categories: [
        { name: "Programming", accuracy: 75 },
        { name: "Data Science", accuracy: 90 },
        { name: "Computer Networks", accuracy: 68 },
        { name: "AI & Machine Learning", accuracy: 85 },
        { name: "Computer Fundamentals", accuracy: 80 }
      ],
      recent: [
        { name: "Data Science Basics", score: 95, date: "Demo result 1" },
        { name: "AI Fundamentals", score: 85, date: "Demo result 2" },
        { name: "Network Basics", score: 65, date: "Demo result 3" }
      ]
    }
  ];

  let activeView = 0;

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  function makeCategoryBars(categories) {
    return categories.map(category => `
      <div>
        <div class="day6-bar-heading">
          <span>${category.name}</span>
          <strong>${category.accuracy}%</strong>
        </div>
        <div
          class="day6-bar-track"
          role="progressbar"
          aria-label="${category.name} demo accuracy"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="${category.accuracy}">
          <div
            class="day6-bar-fill"
            style="width:${category.accuracy}%">
          </div>
        </div>
      </div>
    `).join("");
  }

  function makeRecentRows(recent) {
    return recent.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.score}%</td>
        <td>${item.date}</td>
      </tr>
    `).join("");
  }

  function render() {
    const dashboard = $("#day6Statistics");
    if (!dashboard) return;

    const data = demoViews[activeView];
    const totalAnswers = data.correct + data.incorrect;
    const accuracy = totalAnswers
      ? Math.round((data.correct / totalAnswers) * 100)
      : 0;

    const averageScore = data.categories.length
      ? Math.round(
          data.categories.reduce(
            (sum, category) => sum + category.accuracy, 0
          ) / data.categories.length
        )
      : 0;

    dashboard.innerHTML = `
      <p class="day6-muted">QUIZMASTER LEARNING INSIGHTS</p>
      <h2 class="day6-heading">Statistics Dashboard 📊</h2>
      <p class="day6-muted">
        Explore your quiz performance using this interactive demo.
      </p>

      <div class="day6-kpis">
        <div class="day6-kpi">
          <span class="day6-kpi-label">Quizzes completed</span>
          <strong class="day6-kpi-value">${data.quizzes}</strong>
          <span class="day6-kpi-detail">Demo data</span>
        </div>

        <div class="day6-kpi">
          <span class="day6-kpi-label">Answer accuracy</span>
          <strong class="day6-kpi-value">${accuracy}%</strong>
          <span class="day6-kpi-detail">Correct / all answers</span>
        </div>

        <div class="day6-kpi">
          <span class="day6-kpi-label">Correct answers</span>
          <strong class="day6-kpi-value">${data.correct}</strong>
          <span class="day6-kpi-detail">Demo answers</span>
        </div>

        <div class="day6-kpi">
          <span class="day6-kpi-label">Category average</span>
          <strong class="day6-kpi-value">${averageScore}%</strong>
          <span class="day6-kpi-detail">Across demo categories</span>
        </div>
      </div>

      <div class="day6-panels">
        <section class="day6-panel">
          <h3>Answer accuracy</h3>
          <p class="day6-muted">Correct and incorrect answers</p>

          <div class="day6-donut-wrap">
            <div
              class="day6-donut"
              role="img"
              aria-label="${accuracy}% correct answers in demo data"
              style="--day6-accuracy:${accuracy}%">
              <div class="day6-donut-hole">
                <strong>${accuracy}%</strong>
                <span class="day6-muted">Accuracy</span>
              </div>
            </div>

            <div class="day6-legend">
              <div class="day6-legend-item">
                <span class="day6-dot"></span>
                Correct: ${data.correct}
              </div>
              <div class="day6-legend-item">
                <span class="day6-dot incorrect"></span>
                Incorrect: ${data.incorrect}
              </div>
              <div class="day6-legend-item">
                Total: ${totalAnswers} answers
              </div>
            </div>
          </div>
        </section>

        <section class="day6-panel">
          <h3>Category performance</h3>
          <p class="day6-muted">Demo accuracy by category</p>
          <div class="day6-bar-list">
            ${makeCategoryBars(data.categories)}
          </div>
        </section>
      </div>

      <section class="day6-panel">
        <h3>Recent quiz results</h3>
        <p class="day6-muted">
          These entries are examples, not real quiz history.
        </p>

        <div class="day6-table-wrap">
          <table class="day6-table">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Score</th>
                <th>Record</th>
              </tr>
            </thead>
            <tbody>
              ${makeRecentRows(data.recent)}
            </tbody>
          </table>
        </div>
      </section>

      <div class="day6-controls">
        <button class="day6-button" id="day6SwitchDemo" type="button">
          Switch demo dataset
        </button>
      </div>

      <p class="day6-note" role="status" aria-live="polite">
        Showing ${data.name}. All values on this dashboard are sample data.
        Switching views changes only this demo; it does not alter your quiz
        results, profile, XP, or leaderboard.
      </p>
    `;

    $("#day6SwitchDemo", dashboard).addEventListener("click", () => {
      activeView = (activeView + 1) % demoViews.length;
      render();
    });
  }

  function init() {
    // Append a separate panel; don't replace existing page content.
    if ($("#day6Statistics")) return;

    const dashboard = document.createElement("section");
    dashboard.id = "day6Statistics";
    dashboard.className = "day6-dashboard";
    dashboard.setAttribute("aria-label", "Quiz statistics dashboard");

    const main = $("main") || $(".container") || document.body;
    main.appendChild(dashboard);

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
