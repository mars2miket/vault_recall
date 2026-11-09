# Product Backlog & Feature Roadmap

This document outlines the planned enhancements and prioritized feature backlog for Vault Recall. These items are structured to expand enterprise utility, simulate data governance, and optimize user experience.

## 1. Prioritized Feature Backlog

### 🔴 Must Have (Highest Priority - Next Sprint)
*   **Epic-04: Role-Based Access Control (RBAC) Simulation**
    *   *Goal:* Create a mock login experience to demonstrate enterprise user governance. 
    *   *Workflow:* A landing page modal appears on initial load for role selection (Analyst, Manager, Sys Admin). The top-right header features three cumulative badge indicators. 
    *   *Permissions Hierarchy:*
        *   **Analyst Selected:** Only 'Analyst' badge turns green. Access is restricted; data destruction and system tools are greyed out.
        *   **Manager Selected:** Both 'Analyst' and 'Manager' badges turn green. Advanced management controls unlock.
        *   **Sys Admin Selected:** All three badges turn green. Complete system and destructive tool permissions are unlocked.

*   **Epic-05: Connected Drag-and-Drop Row Reordering**
    *   *Goal:* Allow users to manually reorganize their study decks.
    *   *Workflow:* Users can grab any cell in a row (Column A or Column B) and drag it vertically to a new position.
    *   *Rules:* The row pair must move in unison as a coupled unit. Upon release, the new list order must save to the browser's local storage instantly without requiring a manual save button click.

### 🟡 Should Have (Medium Priority)
*   **Epic-06: Third-Party Data Importers (Quizlet & Anki Migration)**
    *   *Goal:* Eliminate data entry friction by allowing direct copy-paste migrations from legacy platforms.
    *   *Rules:* Build text parsers that automatically read standard text exports from Quizlet and Anki. The logic must recognize custom delimiters (Tabs, Commas, or Line Breaks) and split the data into paired grid columns accurately.

### 🟢 Could Have (Low Priority / Enhancement)
*   **Epic-07: Metrics Dashboard & Progress Tracking**
    *   *Goal:* Add user analytics to track performance over time.
    *   *Workflow:* Read saved history strings from local storage to calculate quiz score trends, average testing speed, and flag heavily missed terms.

---

## 2. Technical Spikes & Future Research
*   **SPIKE-003: Mobile Background Audio Workarounds**
    *   Research ways to maintain native browser text-to-speech audio loops when mobile browser tabs lose focus or devices enter sleep mode.
