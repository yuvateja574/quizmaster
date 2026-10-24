/* ==========================================
   QUIZMASTER DAY 8
   Leaderboard & Ranking Improvements

   Standalone demo add-on.
   Does not modify the existing quiz engine.
========================================== */

(() => {
    "use strict";

    const STORAGE_KEY = "qm_day8_leaderboard_preferences";

    // Prevent this add-on from creating duplicate panels.
    if (document.getElementById("day8Leaderboard")) {
        return;
    }

    /*
      DEMO DATA

      "You" is a sample user for demonstration.
      Replace these records with real data when
      integrating this feature with the main app.
    */

    const players = [
        {
            id: "alex",
            name: "Alex",
            xp: 2450,
            bestScore: 98,
            category: "AI & Machine Learning"
        },
        {
            id: "you",
            name: "You",
            xp: 2100,
            bestScore: 95,
            category: "Computer Fundamentals"
        },
        {
            id: "sophia",
            name: "Sophia",
            xp: 2800,
            bestScore: 92,
            category: "Database & SQL"
        },
        {
            id: "liam",
            name: "Liam",
            xp: 1750,
            bestScore: 88,
            category: "Cybersecurity"
        },
        {
            id: "emma",
            name: "Emma",
            xp: 1950,
            bestScore: 97,
            category: "AI & Machine Learning"
        },
        {
            id: "noah",
            name: "Noah",
            xp: 1500,
            bestScore: 82,
            category: "Computer Networks"
        },
        {
            id: "olivia",
            name: "Olivia",
            xp: 2300,
            bestScore: 90,
            category: "Database & SQL"
        },
        {
            id: "ethan",
            name: "Ethan",
            xp: 1250,
            bestScore: 76,
            category: "Cybersecurity"
        },
        {
            id: "mia",
            name: "Mia",
            xp: 1600,
            bestScore: 85,
            category: "Computer Fundamentals"
        },
        {
            id: "aarav",
            name: "Aarav",
            xp: 2200,
            bestScore: 94,
            category: "AI & Machine Learning"
        }
    ];

    const categories = [
        "All Categories",
        ...new Set(players.map(player => player.category))
    ];

    function loadPreferences() {
        try {
            const saved = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "{}"
            );

            return {
                mode: saved.mode === "score" ? "score" : "xp",
                category: categories.includes(saved.category)
                    ? saved.category
                    : "All Categories"
            };
        } catch (error) {
            return {
                mode: "xp",
                category: "All Categories"
            };
        }
    }

    const preferences = loadPreferences();

    function savePreferences() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(preferences)
            );
        } catch (error) {
            console.warn(
                "Day 8 leaderboard preferences could not be saved."
            );
        }
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function getInitials(name) {
        return name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(part => part.charAt(0).toUpperCase())
            .join("");
    }

    function getMetric(player) {
        return preferences.mode === "score"
            ? player.bestScore
            : player.xp;
    }

    function getMetricLabel() {
        return preferences.mode === "score"
            ? "Best score"
            : "XP points";
    }

    function formatMetric(player) {
        if (preferences.mode === "score") {
            return `${player.bestScore}%`;
        }

        return `${player.xp.toLocaleString()} XP`;
    }

    function getSortedPlayers() {
        const filtered = players.filter(player => {
            return (
                preferences.category === "All Categories" ||
                player.category === preferences.category
            );
        });

        return filtered.sort((a, b) => {
            const difference = getMetric(b) - getMetric(a);

            if (difference !== 0) {
                return difference;
            }

            return a.name.localeCompare(b.name);
        });
    }

    function getRankLabel(rank) {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";

        return `#${rank}`;
    }

    function renderPodium(sortedPlayers) {
        const podium = document.getElementById("day8Podium");

        if (!sortedPlayers.length) {
            podium.innerHTML = `
                <div class="day8-empty">
                    No players found for this category.
                </div>
            `;
            return;
        }

        // Display the first three players from the ranking.
        const topThree = sortedPlayers.slice(0, 3);

        const medalClasses = [
            "day8-first",
            "day8-second",
            "day8-third"
        ];

        const medals = ["🥇", "🥈", "🥉"];

        podium.innerHTML = topThree.map((player, index) => {
            const isYou = player.id === "you";

            return `
                <article class="day8-podium-card ${medalClasses[index]}">
                    <span class="day8-medal">
                        ${medals[index]}
                    </span>

                    <div class="day8-avatar">
                        ${escapeHTML(getInitials(player.name))}
                    </div>

                    <h3 class="day8-player-name">
                        ${escapeHTML(player.name)}
                        ${isYou
                            ? '<span class="day8-you-badge">YOU</span>'
                            : ""}
                    </h3>

                    <p class="day8-player-score">
                        ${escapeHTML(formatMetric(player))}
                    </p>

                    <div class="day8-player-label">
                        Rank #${index + 1}
                    </div>
                </article>
            `;
        }).join("");
    }

    function renderTable(sortedPlayers) {
        const tableBody = document.getElementById("day8TableBody");

        if (!sortedPlayers.length) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4">
                        <div class="day8-empty">
                            No players found. Try another category.
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = sortedPlayers.map((player, index) => {
            const isYou = player.id === "you";

            return `
                <tr class="${isYou ? "day8-current-user" : ""}">
                    <td class="day8-rank">
                        ${getRankLabel(index + 1)}
                    </td>

                    <td>
                        <strong>${escapeHTML(player.name)}</strong>
                        ${isYou
                            ? '<span class="day8-you-badge">YOU</span>'
                            : ""}
                    </td>

                    <td class="day8-xp">
                        ${escapeHTML(formatMetric(player))}
                    </td>

                    <td>
                        ${escapeHTML(player.category)}
                    </td>
                </tr>
            `;
        }).join("");
    }

    function renderSummary(sortedPlayers) {
        const summary = document.getElementById("day8Summary");
        const youIndex = sortedPlayers.findIndex(
            player => player.id === "you"
        );

        if (youIndex === -1) {
            summary.textContent =
                "The demo user is not listed in this category.";
            return;
        }

        summary.textContent =
            `Demo ranking: You are #${youIndex + 1} out of ` +
            `${sortedPlayers.length} players in this view.`;
    }

    function renderLeaderboard() {
        const sortedPlayers = getSortedPlayers();

        document.getElementById("day8MetricLabel").textContent =
            getMetricLabel();

        renderPodium(sortedPlayers);
        renderTable(sortedPlayers);
        renderSummary(sortedPlayers);
    }

    function createLeaderboard() {
        const panel = document.createElement("section");

        panel.id = "day8Leaderboard";
        panel.setAttribute("aria-labelledby", "day8Title");

        panel.innerHTML = `
            <header class="day8-header">
                <div>
                    <div class="day8-eyebrow">
                        Day 8 Feature
                    </div>

                    <h2 id="day8Title">
                        🏆 Leaderboard
                    </h2>

                    <p class="day8-subtitle">
                        Explore rankings, celebrate achievements,
                        and track your demo position.
                    </p>
                </div>

                <div class="day8-trophy" aria-hidden="true">
                    🏆
                </div>
            </header>

            <div class="day8-controls">
                <div class="day8-control">
                    <label for="day8RankingMode">
                        Ranking method
                    </label>

                    <select id="day8RankingMode">
                        <option value="xp">Total XP</option>
                        <option value="score">Best quiz score</option>
                    </select>
                </div>

                <div class="day8-control">
                    <label for="day8Category">
                        Quiz category
                    </label>

                    <select id="day8Category">
                        ${categories.map(category => `
                            <option value="${escapeHTML(category)}">
                                ${escapeHTML(category)}
                            </option>
                        `).join("")}
                    </select>
                </div>
            </div>

            <div
                id="day8Podium"
                class="day8-podium"
                aria-label="Top three players"
            ></div>

            <div class="day8-table-wrap">
                <table class="day8-table">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Player</th>
                            <th scope="col" id="day8MetricLabel">
                                XP points
                            </th>
                            <th scope="col">Category</th>
                        </tr>
                    </thead>

                    <tbody id="day8TableBody"></tbody>
                </table>
            </div>

            <footer class="day8-footer">
                <span id="day8Summary" aria-live="polite"></span>

                <button
                    type="button"
                    id="day8Refresh"
                    class="day8-refresh"
                >
                    ↻ Reset demo view
                </button>
            </footer>

            <div class="day8-demo-note">
                <strong>Demo mode:</strong>
                These rankings use sample players and scores.
                They are not connected to your actual quiz results,
                profile, XP, or existing leaderboard.
            </div>
        `;

        /*
          Prefer adding the panel after the existing main content.
          The panel uses its own ID and class names.
        */
        const main = document.querySelector("main");
        const container = document.querySelector(".container");

        if (main) {
            main.appendChild(panel);
        } else if (container) {
            container.appendChild(panel);
        } else {
            document.body.appendChild(panel);
        }

        const modeSelect = document.getElementById("day8RankingMode");
        const categorySelect = document.getElementById("day8Category");
        const refreshButton = document.getElementById("day8Refresh");

        modeSelect.value = preferences.mode;
        categorySelect.value = preferences.category;

        modeSelect.addEventListener("change", () => {
            preferences.mode = modeSelect.value;
            savePreferences();
            renderLeaderboard();
        });

        categorySelect.addEventListener("change", () => {
            preferences.category = categorySelect.value;
            savePreferences();
            renderLeaderboard();
        });

        refreshButton.addEventListener("click", () => {
            preferences.mode = "xp";
            preferences.category = "All Categories";

            modeSelect.value = preferences.mode;
            categorySelect.value = preferences.category;

            savePreferences();
            renderLeaderboard();
        });

        renderLeaderboard();
    }

    function initialize() {
        createLeaderboard();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();