// script.js
// This script handles the countdown timer for the "time remaining" label and
// toggles the completed state when the checkbox is clicked.

/**
 * Format a duration in milliseconds into a human readable string.
 * Outputs values such as "Due now!", "Due in 2 days", "Overdue by 3 hours".
 * @param {number} ms - The difference in milliseconds between the due date and now.
 * @returns {string}
 */
function formatRemaining(ms) {
  const absMs = Math.abs(ms);
  const sec = Math.floor(absMs / 1000) % 60;
  const min = Math.floor(absMs / (1000 * 60)) % 60;
  const hr = Math.floor(absMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(absMs / (1000 * 60 * 60 * 24));

  if (ms > 0) {
    // Not overdue
    if (days > 0) {
      return `Due in ${days} day${days === 1 ? "" : "s"}`;
    }
    if (hr > 0) {
      return `Due in ${hr} hour${hr === 1 ? "" : "s"}`;
    }
    if (min > 0) {
      return `Due in ${min} minute${min === 1 ? "" : "s"}`;
    }
    return "Due now!";
  } else {
    // Overdue
    if (days > 0) {
      return `Overdue by ${days} day${days === 1 ? "" : "s"}`;
    }
    if (hr > 0) {
      return `Overdue by ${hr} hour${hr === 1 ? "" : "s"}`;
    }
    if (min > 0) {
      return `Overdue by ${min} minute${min === 1 ? "" : "s"}`;
    }
    return `Overdue by ${sec} second${sec === 1 ? "" : "s"}`;
  }
}

/**
 * Update the "remaining time" display. Calculates the difference between
 * the current time and the due date specified in the <time> element.
 */
function updateRemainingTime() {
  const timeEl = document.querySelector('time[data-testid="test-todo-due-date"]');
  const remainingEl = document.getElementById("remaining-time");
  if (!timeEl || !remainingEl) return;
  const dueDate = new Date(timeEl.getAttribute("datetime"));
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();
  remainingEl.textContent = formatRemaining(diff);
}

/**
 * Toggle the completed state on the card when the checkbox is clicked.
 */
function initCompletionToggle() {
  const checkbox = document.getElementById("complete-checkbox");
  const card = document.querySelector(".todo-card");
  if (!checkbox || !card) return;
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      card.classList.add("completed");
    } else {
      card.classList.remove("completed");
    }
  });
}

// Initialize countdown and completion toggle when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  updateRemainingTime();
  // Refresh the remaining time every minute to keep it accurate
  setInterval(updateRemainingTime, 60 * 1000);
  initCompletionToggle();
});