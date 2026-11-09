# Vault Recall

[Live Web Application Link via GitHub Pages]

## 1. Product Vision & Strategy
Vault Recall is a local-first, browser-based flashcard and micro-testing platform built for low-friction digital learning. The application solves a common user friction point: traditional flashcard apps require heavy setup, while spreadsheets are clumsy for self-testing. Vault Recall bridges this gap by turning any instant two-column list into an interactive, testable memory deck with localized layout parameters.

### Target Personas & Problem Statement
*   **The High-Velocity Learner:** Needs a zero-account setup to quickly paste, mask, and test themselves on vocabulary, codes, or terms.
*   **The Cross-Platform Mobile User:** Needs an offline-capable tool that lets them study or listen to their material while commuting, without relying on steady internet connectivity.

---

## 2. Product Management & AI Orchestration (Architecture)
As the Product Owner, I designed the product requirements, defined the technical constraints, and managed an AI engineering workflow to build a zero-dependency, modular Vanilla JS architecture.

*   **Modular Architecture Design:** Enforced strict file segregation (`grid.js`, `exam.js`, `storage.js`) and mapped out a explicit load-order dependency graph to ensure clean system state propagation via a pub/sub (`state.js`) model.
*   **Scope Optimization (MVP Management):** Actively managed feature creep. While investigating secondary testing methodologies, I deprecated the high-overhead "fill-in-the-blank" mode during the alpha cycle to focus development energy on bulletproof Multiple Choice and True/False engines.
*   **Internationalization (i18n):** Directed and validated the multi-language framework (`i18n.js`), launching core dictionary support for English (`en.js`) and conversational Vietnamese (`vi.js`) to expand geographic accessibility.

---

## 3. User Acceptance Testing (UAT) & Product Quality
Rather than just reviewing code, I acted as the lead UAT Tester, executing structured validation loops across multiple platforms (PC and Mobile browsers) to stabilize the application lifecycle.

### Critical Edge Cases Identified & Fixed
*   **Mobile Screen Lock Defect (Speech Synthesis):** Found that mobile web browsers paused native speech engine playback when screen timeout occurred. Directed a mitigation strategy focusing on chunked utterance blocks and state-checking heartbeat loops to retain system stability.
*   **UI Projection Constraints:** Identified navigation bottlenecks on smaller mobile viewports. Designed a layout override (700px breakpoint) that hides complex settings containers into localized popup modals, optimizing touch targets for active users.
*   **Data Validation Loops:** Outlined acceptance criteria to flag duplicate entries within user grids instantly, forcing an orange highlight notification rule to protect test grading integrity.

---

## 4. Feature Roadmap & Future Iterations
*   **Advanced Analytics Data Hydration:** Expand the current dashboard functionality to parse complex historical metadata trends from local storage strings.
*   **Cloud Audio Streaming Integration:** Transition the native speech module options toward an HTML5 stream option to fully bypass persistent OS background limitations on mobile.
