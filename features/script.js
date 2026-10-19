
/* ==========================================
   QUIZMASTER DAY 3 ENHANCEMENTS
   Features:
   1. Hint button
   2. Keyboard shortcuts (1-4)
   3. Enter to check or continue
========================================== */

(function () {
  "use strict";

  let hintUsed = false;

  function getAnswerButtons() {
    return [
      ...document.querySelectorAll(
        "#answerList [data-answer]"
      )
    ];
  }

  function useHint() {
    const nextButton =
      document.getElementById("nextQuestion");

    const buttons = getAnswerButtons();

    if (
      hintUsed ||
      !buttons.length ||
      !nextButton?.disabled
    ) {
      return;
    }

    // Identify the correct option using the
    // existing quiz's correct-answer data.
    const correctIndex =
      window.day3CorrectAnswerIndex;

    if (!Number.isInteger(correctIndex)) {
      showHintMessage(
        "Hint unavailable: connect the answer index first."
      );
      return;
    }

    const wrongButtons = buttons.filter(button => {
      return (
        Number(button.dataset.answer) !== correctIndex &&
        !button.disabled
      );
    });

    // Randomize incorrect choices.
    wrongButtons.sort(() => Math.random() - 0.5);

    wrongButtons.slice(0, 2).forEach(button => {
      button.disabled = true;
      button.classList.add("day3-hint-removed");
    });

    hintUsed = true;

    const hintButton =
      document.getElementById("day3HintButton");

    if (hintButton) hintButton.disabled = true;

    showHintMessage("💡 Two incorrect options removed!");
  }

  function showHintMessage(message) {
    const feedback =
      document.getElementById("day3HintFeedback");

    if (feedback) feedback.textContent = message;
  }

  function resetHint() {
    hintUsed = false;

    const hintButton =
      document.getElementById("day3HintButton");

    if (hintButton) hintButton.disabled = false;

    showHintMessage("");
  }

  function addHintControls() {
    const answerList =
      document.getElementById("answerList");

    if (!answerList || document.getElementById("day3HintButton")) {
      return;
    }

    const tools = document.createElement("div");
    tools.className = "day3-tools";

    tools.innerHTML = `
      <button
        id="day3HintButton"
        type="button"
        class="day3-hint-button">
        💡 Use Hint
      </button>

      <span
        id="day3HintFeedback"
        class="day3-hint-feedback"
        aria-live="polite">
      </span>
    `;

    answerList.insertAdjacentElement("afterend", tools);

    document
      .getElementById("day3HintButton")
      .addEventListener("click", useHint);
  }

  // Keyboard shortcuts use the existing quiz controls.
  document.addEventListener("keydown", function (event) {
    const quizModal = document.getElementById("quizModal");

    if (!quizModal?.classList.contains("open")) return;

    if (
      event.target instanceof HTMLElement &&
      (
        event.target.matches("input, textarea, select") ||
        event.target.isContentEditable
      )
    ) {
      return;
    }

    if (/^[1-4]$/.test(event.key)) {
      const button = document.querySelector(
        `#answerList [data-answer="${Number(event.key) - 1}"]`
      );

      if (button && !button.disabled) button.click();
    }

    if (event.key === "Enter") {
      const nextButton =
        document.getElementById("nextQuestion");

      if (nextButton && !nextButton.disabled) {
        nextButton.click();
      }
    }
  });

  // Run after the existing page loads.
  document.addEventListener("DOMContentLoaded", function () {
    addHintControls();

    // Reset the hint when the quiz moves to another question.
    const answerList =
      document.getElementById("answerList");

    if (answerList) {
      new MutationObserver(resetHint).observe(answerList, {
        childList: true
      });
    }
  });

  // Expose the reset method for the existing quiz if needed.
  window.day3ResetHint = resetHint;
})();
