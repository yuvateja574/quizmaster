/* ==========================================
   QUIZMASTER DAY 9
   Testing & Quality Control Dashboard

   Independent diagnostic add-on.
   Does not repair or modify existing files.
========================================== */

(() => {
    "use strict";

    // Avoid inserting the dashboard more than once.
    if (document.getElementById("day9Testing")) {
        return;
    }

    const state = {
        results: [],
        runtimeErrors: [],
        startedAt: new Date(),
        isRunning: false
    };

    // Listen for errors occurring after this script initializes.
    // These listeners observe errors; they do not suppress them.
    window.addEventListener("error", event => {
        if (event.target && event.target !== window) {
            const target = event.target;
            const tag = target.tagName
                ? target.tagName.toLowerCase()
                : "resource";

            const source = target.src || target.href || "";

            state.runtimeErrors.push({
                type: "Resource error",
                message: `${tag} failed to load${source ? `: ${source}` : "."}`,
                time: new Date().toISOString()
            });

            return;
        }

        state.runtimeErrors.push({
            type: "JavaScript error",
            message: event.message || "An unknown JavaScript error occurred.",
            file: event.filename || "",
            line: event.lineno || null,
            time: new Date().toISOString()
        });
    }, true);

    window.addEventListener("unhandledrejection", event => {
        let message = "An unhandled Promise rejection occurred.";

        try {
            message = String(
                event.reason && event.reason.message
                    ? event.reason.message
                    : event.reason
            );
        } catch (_) {
            // Keep the default message if the reason cannot be read.
        }

        state.runtimeErrors.push({
            type: "Unhandled Promise rejection",
            message,
            time: new Date().toISOString()
        });
    });

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

    function addResult(title, status, message) {
        state.results.push({
            title,
            status,
            message,
            time: new Date().toISOString()
        });
    }

    function checkDocumentBasics() {
        if (document.title.trim()) {
            addResult(
                "Page title",
                "pass",
                `The page title is "${document.title}".`
            );
        } else {
            addResult(
                "Page title",
                "warn",
                "The document title is empty. Consider adding a descriptive title."
            );
        }

        if (document.querySelector("main")) {
            addResult(
                "Main content landmark",
                "pass",
                "A <main> element was found."
            );
        } else {
            addResult(
                "Main content landmark",
                "warn",
                "No <main> element was found. Check whether your page uses another suitable layout."
            );
        }

        const viewport = document.querySelector(
            'meta[name="viewport"]'
        );

        if (viewport) {
            addResult(
                "Mobile viewport",
                "pass",
                "A viewport meta tag was found."
            );
        } else {
            addResult(
                "Mobile viewport",
                "warn",
                "No viewport meta tag was found. Mobile scaling may need attention."
            );
        }

        if (document.querySelector('meta[charset]')) {
            addResult(
                "Character encoding",
                "pass",
                "A character-encoding declaration was found."
            );
        } else {
            addResult(
                "Character encoding",
                "warn",
                "No character-encoding declaration was found."
            );
        }
    }

    function checkDuplicateIDs() {
        const idMap = new Map();

        document.querySelectorAll("[id]").forEach(element => {
            const id = element.id;

            if (!idMap.has(id)) {
                idMap.set(id, []);
            }

            idMap.get(id).push(element);
        });

        const duplicates = [...idMap.entries()].filter(
            ([id, elements]) => id && elements.length > 1
        );

        if (duplicates.length === 0) {
            addResult(
                "Duplicate HTML IDs",
                "pass",
                "No duplicate, non-empty HTML IDs were detected."
            );
            return;
        }

        duplicates.forEach(([id, elements]) => {
            addResult(
                "Duplicate HTML ID",
                "fail",
                `The ID "${id}" appears ${elements.length} times. IDs should be unique.`
            );
        });
    }

    function checkImages() {
        const images = [...document.images];

        if (images.length === 0) {
            addResult(
                "Image loading",
                "info",
                "No images were found on the page."
            );
            return;
        }

        let broken = 0;
        let pending = 0;

        images.forEach((image, index) => {
            if (!image.getAttribute("src") &&
                !image.getAttribute("srcset")) {
                broken++;

                addResult(
                    "Image without source",
                    "fail",
                    `Image ${index + 1} has no src or srcset attribute.`
                );

                return;
            }

            if (!image.complete) {
                pending++;
                return;
            }

            if (image.naturalWidth === 0) {
                broken++;

                const source = image.currentSrc ||
                    image.getAttribute("src") ||
                    image.getAttribute("srcset") ||
                    "(unknown source)";

                addResult(
                    "Broken image",
                    "fail",
                    `Image ${index + 1} could not be loaded: ${source}`
                );
            }
        });

        if (broken === 0 && pending === 0) {
            addResult(
                "Image loading",
                "pass",
                `All ${images.length} images currently report successful loading.`
            );
        } else if (pending > 0) {
            addResult(
                "Image loading",
                "warn",
                `${pending} image(s) are still loading. Run the test again after the page finishes loading.`
            );
        }

        if (broken > 0) {
            addResult(
                "Image summary",
                "fail",
                `${broken} image(s) appear to have missing sources or failed loading.`
            );
        }
    }

    function checkLinks() {
        const links = [...document.querySelectorAll("a")];
        const emptyLinks = links.filter(link => {
            const href = link.getAttribute("href");

            return href === null || href.trim() === "";
        });

        if (emptyLinks.length === 0) {
            addResult(
                "Link destinations",
                "pass",
                `All ${links.length} links have a non-empty href attribute.`
            );
        } else {
            addResult(
                "Link destinations",
                "warn",
                `${emptyLinks.length} link(s) have an empty or missing href. Check whether they are intended to be interactive.`
            );
        }

        const missingNames = links.filter(link => {
            const label = [
                link.innerText,
                link.getAttribute("aria-label"),
                link.querySelector("img")?.getAttribute("alt"),
                link.getAttribute("title")
            ].filter(Boolean).join(" ").trim();

            return label.length === 0;
        });

        if (missingNames.length === 0) {
            addResult(
                "Link accessible names",
                "pass",
                "No links with obviously missing accessible names were detected."
            );
        } else {
            addResult(
                "Link accessible names",
                "warn",
                `${missingNames.length} link(s) may not have an accessible name. Review icon-only links and image links.`
            );
        }

        const unsafeNewTabs = links.filter(link => {
            return link.target === "_blank" &&
                !/\bnoopener\b/i.test(link.rel);
        });

        if (unsafeNewTabs.length > 0) {
            addResult(
                "New-tab link security",
                "warn",
                `${unsafeNewTabs.length} link(s) open in a new tab without an explicit noopener rel value. Review these links.`
            );
        }
    }

    function checkButtons() {
        const buttons = [
            ...document.querySelectorAll(
                'button, input[type="button"], input[type="submit"], input[type="reset"]'
            )
        ];

        const unnamedButtons = buttons.filter(button => {
            const text = button.innerText ||
                button.value ||
                button.getAttribute("aria-label") ||
                button.getAttribute("title") ||
                "";

            return text.trim().length === 0;
        });

        if (unnamedButtons.length === 0) {
            addResult(
                "Button labels",
                "pass",
                `No obviously unnamed buttons were detected among ${buttons.length} controls.`
            );
        } else {
            addResult(
                "Button labels",
                "warn",
                `${unnamedButtons.length} button(s) may need a visible label or accessible name.`
            );
        }

        const disabledButtons = buttons.filter(button => button.disabled);

        if (disabledButtons.length > 0) {
            addResult(
                "Disabled controls",
                "info",
                `${disabledButtons.length} button control(s) are currently disabled. Check whether this is intentional.`
            );
        }
    }

    function checkForms() {
        const forms = [...document.forms];

        if (forms.length === 0) {
            addResult(
                "Form checks",
                "info",
                "No HTML forms were found on this page."
            );
            return;
        }

        let missingLabels = 0;

        const inputs = [
            ...document.querySelectorAll(
                'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea'
            )
        ];

        inputs.forEach(input => {
            if (input.disabled) {
                return;
            }

            const hasLabel = (
                input.labels && input.labels.length > 0
            ) || input.hasAttribute("aria-label") ||
                input.hasAttribute("aria-labelledby");

            if (!hasLabel) {
                missingLabels++;
            }
        });

        if (missingLabels === 0) {
            addResult(
                "Form labels",
                "pass",
                "No form controls with obviously missing labels were detected."
            );
        } else {
            addResult(
                "Form labels",
                "warn",
                `${missingLabels} form control(s) may need accessible labels.`
            );
        }

        addResult(
            "Form presence",
            "info",
            `Found ${forms.length} form(s) and ${inputs.length} relevant input control(s). This check does not submit forms or validate backend behavior.`
        );
    }

    function checkRuntimeErrors() {
        if (state.runtimeErrors.length === 0) {
            addResult(
                "Runtime error monitor",
                "info",
                "No JavaScript or resource errors have been captured by this dashboard since its monitor started. Earlier errors may not be included."
            );
            return;
        }

        state.runtimeErrors.forEach(error => {
            addResult(
                error.type,
                "fail",
                `${error.message}${error.file ? ` File: ${error.file}` : ""}${error.line ? ` Line: ${error.line}` : ""}`
            );
        });
    }

    function runChecks() {
        if (state.isRunning) {
            return;
        }

        state.isRunning = true;

        const runButton = document.getElementById("day9RunChecks");
        const status = document.getElementById("day9Status");

        runButton.disabled = true;
        status.textContent = "Running checks…";

        state.results = [];

        try {
            checkDocumentBasics();
            checkDuplicateIDs();
            checkImages();
            checkLinks();
            checkButtons();
            checkForms();
            checkRuntimeErrors();

            renderResults();

            status.textContent =
                `Last checked: ${new Date().toLocaleTimeString()}`;
        } catch (error) {
            state.results.push({
                title: "Dashboard check failure",
                status: "fail",
                message: error.message || "A diagnostic check could not complete.",
                time: new Date().toISOString()
            });

            renderResults();
            status.textContent = "Some checks could not complete.";
        } finally {
            state.isRunning = false;
            runButton.disabled = false;
        }
    }

    function renderResults() {
        const resultsContainer = document.getElementById("day9Results");

        const counts = {
            pass: state.results.filter(item => item.status === "pass").length,
            warn: state.results.filter(item => item.status === "warn").length,
            fail: state.results.filter(item => item.status === "fail").length,
            info: state.results.filter(item => item.status === "info").length
        };

        document.getElementById("day9PassCount").textContent = counts.pass;
        document.getElementById("day9WarnCount").textContent = counts.warn;
        document.getElementById("day9FailCount").textContent = counts.fail;
        document.getElementById("day9TotalCount").textContent =
            state.results.length;

        if (state.results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="d9-empty">
                    No checks have been run yet.
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = state.results.map(result => {
            const icon = {
                pass: "✓",
                warn: "!",
                fail: "×",
                info: "i"
            }[result.status] || "i";

            return `
                <article class="d9-result">
                    <div class="d9-result-icon" aria-hidden="true">
                        ${icon}
                    </div>

                    <div>
                        <h3>${escapeHTML(result.title)}</h3>
                        <p>${escapeHTML(result.message)}</p>
                    </div>

                    <span class="d9-badge ${escapeHTML(result.status)}">
                        ${escapeHTML(result.status.toUpperCase())}
                    </span>
                </article>
            `;
        }).join("");
    }

    function downloadReport() {
        const report = {
            project: "QuizMaster",
            reportType: "Day 9 Quality Check",
            generatedAt: new Date().toISOString(),
            page: window.location.href,
            note: "Diagnostic checks only. This report does not guarantee that all app features work correctly.",
            summary: {
                passed: state.results.filter(item => item.status === "pass").length,
                warnings: state.results.filter(item => item.status === "warn").length,
                failures: state.results.filter(item => item.status === "fail").length,
                information: state.results.filter(item => item.status === "info").length
            },
            checks: state.results,
            capturedRuntimeErrors: state.runtimeErrors
        };

        const blob = new Blob(
            [JSON.stringify(report, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "quizmaster-day9-test-report.json";

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function createDashboard() {
        const panel = document.createElement("section");

        panel.id = "day9Testing";
        panel.setAttribute("aria-labelledby", "day9Title");

        panel.innerHTML = `
            <header class="d9-header">
                <div>
                    <div class="d9-eyebrow">
                        Day 9 Feature
                    </div>

                    <h2 id="day9Title">
                        🧪 Testing Dashboard
                    </h2>

                    <p class="d9-description">
                        Run basic page diagnostics, review potential
                        problems, and export a test report.
                        This tool observes your page without repairing it.
                    </p>
                </div>

                <div class="d9-icon" aria-hidden="true">
                    🛠️
                </div>
            </header>

            <div class="d9-summary">
                <div class="d9-stat">
                    <span class="d9-stat-label">Passed</span>
                    <strong id="day9PassCount" class="d9-stat-value d9-pass">0</strong>
                </div>

                <div class="d9-stat">
                    <span class="d9-stat-label">Warnings</span>
                    <strong id="day9WarnCount" class="d9-stat-value d9-warn">0</strong>
                </div>

                <div class="d9-stat">
                    <span class="d9-stat-label">Failures</span>
                    <strong id="day9FailCount" class="d9-stat-value d9-fail">0</strong>
                </div>

                <div class="d9-stat">
                    <span class="d9-stat-label">Total checks</span>
                    <strong id="day9TotalCount" class="d9-stat-value">0</strong>
                </div>
            </div>

            <div class="d9-toolbar">
                <button
                    type="button"
                    id="day9RunChecks"
                    class="d9-button"
                >
                    ▶ Run checks
                </button>

                <button
                    type="button"
                    id="day9Download"
                    class="d9-button d9-secondary"
                >
                    ↓ Download report
                </button>

                <span
                    id="day9Status"
                    class="d9-status"
                    aria-live="polite"
                >
                    Ready to test
                </span>
            </div>

            <div
                id="day9Results"
                class="d9-results"
                aria-live="polite"
            >
                <div class="d9-empty">
                    Click “Run checks” to inspect the current page.
                </div>
            </div>

            <div class="d9-note">
                <strong>What this tool checks:</strong>
                page metadata, duplicate IDs, image loading,
                link attributes, button names, form labels,
                and errors captured after the monitor starts.

                <br><br>

                <strong>What it cannot confirm:</strong>
                correct quiz scoring, login authentication,
                database operations, actual button functionality,
                or whether every interaction works as intended.
                Test those features manually.
            </div>
        `;

        const main = document.querySelector("main");
        const container = document.querySelector(".container");

        if (main) {
            main.appendChild(panel);
        } else if (container) {
            container.appendChild(panel);
        } else {
            document.body.appendChild(panel);
        }

        document.getElementById("day9RunChecks")
            .addEventListener("click", runChecks);

        document.getElementById("day9Download")
            .addEventListener("click", downloadReport);

        // Perform the first set of checks after creating the dashboard.
        runChecks();
    }

    function initialize() {
        if (!document.body) {
            return;
        }

        createDashboard();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();