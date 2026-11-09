# Vault Recall

[Live Web Application Link via GitHub Pages]

## 1. Product Goal
Vault Recall is a web app built to turn lists into quick memory tests. Flashcard apps usually force you to create an account, while spreadsheets are clumsy for self-testing. Vault Recall solves this by instantly converting any pasted two-column list into an interactive, testable deck directly in your browser.

### Who it is for
*   **The Quick Learner:** Wants to paste a list of terms, hide a column, and test themselves immediately without signing up.
*   **The Mobile User:** Wants an app that runs locally so they can study their material while moving, without needing a steady internet connection.

---

## 2. Product Setup & Scope
I defined the requirements, set the boundaries, and managed the work to build this modular JavaScript application.

*   **Modular Organization:** Split the code into clean, dedicated files (`grid.js`, `exam.js`, `storage.js`) to keep the app lightweight and ensure data saves to the browser instantly.
*   **MVP Management:** Stopped feature creep by cutting out all external server and database plans. Focused entirely on a local app to hit a fast launch date and ensure total user data privacy.
*   **Dual-Language Support:** Set up a translation system to launch the interface with full options for both English and Vietnamese.

---

## 3. User Acceptance Testing (UAT)
I acted as the lead tester, running manual test scripts across desktop and mobile browsers to find bugs and ensure the interface works on all screen sizes.

### Core Testing Issues Found
*   **Mobile Audio Interruption:** Found that mobile phones pause the text-to-speech engine when the browser tab is hidden or the screen locks. Wrote down the technical requirements and created test cases to find a workaround for background playback.
*   **Mobile Screen Layout:** Found navigation issues on smaller phone screens. Designed a layout rule that moves crowded settings buttons into clean mobile popup menus.
*   **Data Entry Validation:** Created a rule that highlights duplicate words in yellow instantly so users don't mess up their quiz scores.

---

## 4. Next Steps
*   **Progress Dashboard:** Update the app to read saved browser data and show users how their quiz scores improve over time.
*   **Alternative Audio Handling:** Look into cloud-based audio stream alternatives to bypass mobile phone sleep restrictions.
