# User Acceptance Testing (UAT) & Defect Tracking

This document outlines the test cases, execution methodology, and known platform limitations observed during cross-browser User Acceptance Testing for Vault Recall.

## 1. Cross-Platform Test Matrix

| Test ID | Functional Area | Test Steps | Expected Result | Desktop Status | Mobile Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | State Persistence | 1. Add custom data to columns.<br>2. Refresh the browser tab.<br>3. Close and reopen the browser. | Data remains intact across sessions via local storage. | ✅ Passed | ✅ Passed |
| **TC-002** | Localization | 1. Switch language toggle to 'VN'.<br>2. Verify interface vocabulary transforms.<br>3. Switch back to 'EN'. | UI vocabulary dynamically updates utilizing localized dictionaries. | ✅ Passed | ✅ Passed |
| **TC-003** | Core PWA Scope | 1. Access app via mobile browser.<br>2. Select 'Add to Home Screen'.<br>3. Launch app from home screen icon. | App installs smoothly and loads in a standalone browser window. | ✅ Passed | ✅ Passed |
| **TC-004** | Audio Engine Focus | 1. Initiate text-to-speech audio loop.<br>2. Minimize browser tab / switch application focus. | Audio playback continues smoothly without stalling. | ✅ Passed | ⚠️ Under Review (Focus Loss) |
| **TC-005** | Audio Screen Lock | 1. Launch a graded quiz with audio prompts.<br>2. Put device to sleep / lock the physical screen. | Text-to-speech engine continues to process and play audio. | — N/A | ❌ Active Mitigation |

## 2. Active Defect Logs & Technical Requirements

### Defect ID: DF-002 — Mobile Audio Focus Loss & Background Playback Lifecycle
* **Observed Behavior:** Native Web Speech API synthesis stalls immediately when the mobile browser tab loses focus, or when the mobile device screen locks.
* **Root Cause Analysis:** Mobile operating systems aggressively throttle background JavaScript execution loops and suspend native browser speech synthesis resources to conserve battery health.
* **Active Mitigations / Workarounds:** 
  1. Evaluating the integration of the **Screen Wake Lock API** to prevent target devices from auto-dimming or sleeping during active test cycles.
  2. Researching a migration requirement toward cloud-based audio stream chunking or alternative background worker loops.
