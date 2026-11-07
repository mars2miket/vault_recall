# Vault Recall — Application Design Document

## 1. Core Concept
A local-first, browser-based flashcard and testing application. It turns any two-column list into a memory deck, allowing users to hide columns for self-testing, take graded exams, and track missed items.

---

## 2. Architecture & Tech Stack
*   **Vanilla JavaScript:** No frameworks, no build step (Classic IIFE modules).
*   **State Management:** Centralized `window.state` singleton with a pub/sub `subscribe` model.
*   **Storage:** `localStorage` namespaced under `recallrx:` (data persistence).
*   **Styling:** Custom CSS with design tokens for Dark, Light, and Cybersecurity themes.
*   **Offline:** PWA Service Worker caching core assets.

---

## 3. File Directory & Dependencies

```text
Vault Recall/
│
├── index.html                     # Entry point. Loads all CSS/JS.
├── manifest.json                  # PWA metadata.
├── sw.js                          # Service Worker (offline cache).
│
├── /styles/
│   ├── base-layout.css            # CSS reset, design tokens, app shell layout.
│   ├── components.css             # UI components (modals, grid, exam, privacy).
│   ├── responsive.css             # Mobile/desktop layout overrides.
│   └── qbank.css                  # Question bank modal styling.
│
└── /js/
    ├── storage.js                 # LocalStorage wrapper + migration.
    ├── state.js                   # Central data store + pub/sub.
    │
    ├── /locales/
    │   ├── en.js                  # English dictionary.
    │   └── vi.js                  # Vietnamese dictionary.
    │
    ├── i18n.js                    # Applies translations to DOM.
    ├── main.js                    # Bootstraps everything, persists state to storage.
    │
    ├── nav.js                     # Sidebar, themes, language, launcher modal.
    ├── workspace-toggle.js        # Switches views (Decks/Notes/Privacy/Analytics).
    │
    ├── grid.js                    # Spreadsheet editor (masking, paste, rows).
    ├── sorting.js                 # Alphabetical sorting + duplicate highlighting.
    │
    ├── modal.js                   # Custom confirm/prompt/alert dialogs.
    ├── lists.js                   # Deck CRUD, import/export.
    ├── notes.js                   # Note CRUD, textarea autosave, resizing.
    ├── onboarding.js              # First-run seed data, hint card logic.
    │
    ├── speech.js                  # Text-to-speech engine, playback controls.
    ├── qbank.js                   # Question bank importer (CSV fetch).
    │
    ├── exam.js                    # Testing engine (grading, scoring, results).
    └── analytics.js               # Parses results notes to render dashboard.
3.1 File Descriptions
storage.js: Wraps localStorage with a recallrx: prefix. Contains a one-time migration for legacy keys.

state.js: The single source of truth. Exposes getState, setState, and subscribe. Handles UI state, grid rows, lists, notes, and exam status.

main.js: Bootstraps the app. Hydrates state from storage, applies initial theme, and calls all init* functions. Persists state slices to storage on change.

i18n.js: Applies locale dictionaries to DOM elements with data-i18n attributes. Exposes t() for JS strings.

nav.js: Manages sidebar open/close (desktop + mobile), playback bar placement, theme toggles, language toggles, and the Launcher modal.

workspace-toggle.js: Drives the [data-view-mode] layout switching (Lists, Notes, Analytics, Privacy). Manages the custom dropdown of decks/notes.

grid.js: The spreadsheet editor. Handles contenteditable cells, paste events, auto-adding rows, mask/unmask toggling, and row deletion.

sorting.js: Contains column sorting logic and a MutationObserver that highlights duplicate cells in orange.

modal.js: Provides custom showConfirm, showPrompt, and showAlert modals to replace native browser dialogs.

lists.js: Handles deck creation, renaming, deletion, and .txt import/export.

notes.js: Manages note creation, renaming, deletion, textarea autosave, and the draggable resizer bar.

onboarding.js: Seeds sample data on first run, handles the dismissible hint card, and exposes __onboardingShow__ for the launcher menu.

speech.js: The TTS engine. Splits text into chunks, handles playback controls, speed slider, voice enumeration, and Android watchdog workarounds.

qbank.js: Fetches CSV question banks, lets the user generate a new deck from selected categories, and tracks used questions to prevent repeats.

exam.js: The testing engine. Builds decks, handles Multiple Choice / T/F / Fill-in-the-blank modes, grades answers, tracks skipped/missed items, and renders the results screen.

analytics.js: Reads the locked __TEST_RESULTS__ note, parses the scores, and renders the dashboard (total tests, average accuracy, top 5 missed items).

3.2 Dependency Graph (Load Order Matters)
text
storage.js   ──▶ (Provides window.storage)
state.js     ──▶ (Provides window.setState, getState, subscribe)
   │
   ├── locales/en.js ──▶ (Attaches to window.__LOCALES__)
   ├── locales/vi.js ──▶ (Attaches to window.__LOCALES__)
   │       │
   │       ▼
   ├── i18n.js        ──▶ Requires: __LOCALES__, getState, setState
   │
   ├── nav.js         ──▶ Requires: getState, setState, storage, i18n
   ├── onboarding.js  ──▶ Requires: storage, setState, window.SAMPLE_DATA (from main.js)
   │
   ├── grid.js        ──▶ Requires: getState, setState, storage
   ├── sorting.js     ──▶ Requires: getState, setState, grid (for rerender)
   │
   ├── modal.js       ──▶ Requires: i18n
   ├── lists.js       ──▶ Requires: getState, setState, modal, grid
   ├── qbank.js       ──▶ Requires: getState, setState, storage, modal, grid
   ├── notes.js       ──▶ Requires: getState, setState, storage, modal
   │
   ├── speech.js      ──▶ Requires: getState, setState, storage, i18n
   │
   ├── exam.js        ──▶ Requires: getState, setState, storage, i18n, grid, qbank
   ├── analytics.js   ──▶ Requires: getState, subscribe, i18n
   ├── workspace-toggle.js ──▶ Requires: getState, setState, i18n, listActions, noteActions
   │
   └── main.js        ──▶ Requires: ALL of the above (calls init functions)

sw.js ──▶ Independent. Caches all files above.
4. Views & Workspaces (data-view-mode)
Lists (Decks): The primary view. Contains the editable spreadsheet grid.

Notes: A textarea workspace for taking notes. Autosaves to state.

Analytics: Read-only dashboard parsing past test results.

Privacy: Internal static view for the Privacy Policy.

5. Key Features
Data Management
Spreadsheet Grid: Two-column editable layout, auto-appending rows, paste support, column masking (Hide A/B).

Deck Management: Create, rename, delete, export/import.

Notes: Create, rename, delete, resizable textarea, autosave.

Question Bank: Modal to fetch pre-made categories, pick a number of questions, and generate a new Deck.

Testing Engine
Modes: Multiple Choice, True/False, Fill-in-the-blank.

Scoring: Tracks correct, incorrect, and skipped answers.

Missed Items: Automatically compiles a __MISSED_QUESTIONS__ deck.

Results: Generates a score ring and writes a summary to the locked Test Results note.

Audio (TTS)
Chunked speech synthesis, Play/Pause/Stop/Rewind/Forward, speed control, looping, and voice selection.

UI & Navigation
Launcher Modal: Accessed via the top-left hamburger. Contains links to Dashboard, Help, Notes, and a dynamic Sidebar toggle.

Sidebar: Contains Voices, Speed controls, and the Playback bar.

View Toggle: Decks / Notes / Q Bank segment control.

6. Key User Flows
Create & Test: Enter data in Grid → Hide a column to self-test → Click "Start Test" for a graded exam → Review Missed Questions.

Notes: Click "Notes" tab → Type in textarea → Switch to another deck and back (auto-saves).

Launcher: Click hamburger → Open Dashboard to view analytics OR Show Help to re-read onboarding instructions.

Privacy: Scroll to the bottom of the workspace → Click "Privacy Policy" link → View policy → Click "Back".