/**
 * en.js — English locale strings.
 * Classic script. Attaches to window.__LOCALES__.en
 */
window.__LOCALES__ = window.__LOCALES__ || {};
window.__LOCALES__.en = {

  // Controls
  speed: "Speed",

  // Exam
  examMultiChoice: "Multi Choice",
  examTF: "T / F",
  examFillBlank: "Fill-in-Blank",
  examPrompt: "Exam Prompt",
  examCheck: "Check Answer",
  examNext: "Next",
  examYourAnswer: "Your Answer",
  examProposedAnswer: "Proposed Answer",
  examTrue: "True",
  examFalse: "False",
  examCorrect: "✅ Correct! Great job.",
  examIncorrect: "❌ Incorrect. Expected:",
  startTestHelper: "Ready to test?",
  startTestBtn: "Start Test",
  examBackBtn: "← Back",
  examListLabel: "List",
  examQuestionLabel: "Question",
  examTallyCorrect: "correct",
  examTallyAnswered: "answered",
  examComplete: "Test complete.",
  examMissed: "Missed items",
  examBackToList: "Back",
  dropdownLists: "Untitled List",
  dropdownNotes: "Untitled Note",
  examScoreOutOf: "out of",
  examCompleteHint: "Click Notes and select Test Results in the dropdown menu to see how you've scored.",
  analytics: "Analytics",
  analyticsTotalTests: "Total Tests",
  analyticsAvgAccuracy: "Average Accuracy",
  analyticsTopMissed: "Top 5 Missed Items",
  analyticsEmpty: "No analytics test data found. Complete an exam to see dashboard!",
  analyticsPerfect: "Perfect score! No missed items tracked.",
  dashboard:"Testing Analysis",
  questionBank:"Create Question Bank",

  // Footer
  timer: "Timer",
  resetTimer: "Reset",
  chars: "Chars",
  est: "Est",
  stopTime:"Timer",

  // Grid columns
  hideColA: "👁️ Col A",
  hideColB: "👁️ Col B",
  showColA: "🙈 Col A",
  showColB: "🙈 Col B",

  // Buttons
  account: "Account",
  addList: "New file",
  addRow: "+ Add Row",
  changeLanguage: "Change Language",
  clearContent: "Clear Content",
  deleteList: "Delete deck",
  editList: "Edit",
  expList: "Export file",
  exportList: "Export deck",
  forward: "Forward",
  importList: "Import deck",
  impList: "Import file",
  loop: "Loop",
  moreOptions: "More Options",
  newList: "New deck",
  openSideBar: "Open sidebar",
  playBackMenu: "Play Back Menu",
  read: "Read",
  renameList: "Rename deck",
  rename: "Rename file",
  rewind: "Rewind",
  sort: "Sort",
  stop: "Stop",
  theme: "Theme",  

  // Modal
  confirmTitle: "Confirm",
  confirmMessage: "Are you sure?",
  cancel: "Cancel",
  confirm: "Confirm",
  delete:"Delete 🗑",

  // Note buttons
  newNote: "New note",
  renameNote: "Rename note",
  deleteNote: "Delete note",

  // Onboarding
  onboardingTitle: "Welcome",
  onboardingBody: "Turn any two-column list into a memory deck. Hide a column, quiz yourself, and track what you missed.",
  onboardingSampleBadge: "Sample",
  onboardingDismiss: "Dismiss",
  onboardingBullet0: "First, add data to BOTH columns.",
  onboardingBullet1: "Click Hide Col A or Hide Col B to mask a column; click a masked cell(s) to unmask it.",
  onboardingBullet2: "To test your memory, click Start Test for a graded quiz with multiple-choice, T/F, or fill-in-blank modes.",
  onboardingBullet3: "Use the Decks / Notes toggle to organize multiple decks or keep notes.",
  onboardingBullet4: "Press ▶ to hear your content read aloud Notes or Decks.",
  onboardingBullet5: "Everything saves automatically to your browser.",
  showHint: "Show help",

  // nav sections
  decks: "Decks",
  lists: "Lists",
  notes: "Notes",
  controls: "Reading Controls",
  voices: "Voices",

  // Spreadsheet headers
  startTest: "Start Test",
  showColumn: "Show Column",

  // Stepper
  stepEnter: "Enter your data",
  stepPractice: "Practice with Hide",
  stepTest: "Take the test",

  // Voices
  allGenders: "All Genders",
  femaleOnly: "Female Only",
  maleOnly: "Male Only",
  searchVoices: "Search voices...",


  // Modal dialogs
  ok: "OK",
  noticeTitle: "Notice",
  deleteBtn: "Delete",
  clearBtn: "Clear",
  deleteConfirmMsg: 'Delete "{name}"? This cannot be undone.',
  clearConfirmMsg: "Clear all content from this deck? This cannot be undone.",
  promptNewList: "New deck name:",
  promptRenameList: "Rename deck:",
  promptNewNote: "New note name:",
  promptRenameNote: "Rename note:",
  errListExists: "A deck with that name already exists.",
  errNoteExists: "A note with that name already exists.",
  errSelectNote: "Select a note first.",
  errNeedOneList: "You need at least one deck.",
  errListEmpty: "This deck is empty — nothing to export.",
  errBadFileType: "Only .txt, .tsv, .md and .csv files are allowed.",
  errFileTooLarge: "File too large. Max 500 KB.",
  errFileEmpty: "That file is empty.",
  errFileRead: "Could not read that file.",


  // Results / notes
  resultDate: "Test Date",
  resultTitle: "Test Title",
  resultMode: "Test Mode",
  resultScore: "Score",
  resultIncorrect: "Incorrect Answers",
  examTotal: "Total questions",
  testResultsNote: "Test Results",
  errNoteLocked: "This note is locked and cannot be edited, renamed, or deleted.",
  saveMissedBtn: "Save missed as list",
  missedSuffix: "Missed",
  savedMissedMsg: 'Created list "{name}". Press Start Test to practice it.',


  // Skip / retest
  examSkip: "Skip",
  examRetest: "Retest",
  examRetestBtn: "Retest missed",
  resultSkipped: "Skipped",


  // Missed Questions / results screen / duplicates
  missedListName: "Missed Questions",
  errMissedListLocked: "The Missed Questions list cannot be renamed.",
  examTestMissedBtn: "Test Missed Questions",
  tileCorrect: "Correct",
  tileIncorrect: "Incorrect",
  resultPerfect: "Perfect score!",
  dupWarning: "Duplicate in this column",

  // Question Bank
  qbankBtn: "Q Bank",
  qbankTitle: "Question Bank",
  qbankSearch: "Search categories...",
  qbankLeft: "{left} of {total} left",
  qbankHowMany: "Questions",
  qbankUpTo: "Up to {n} available",
  qbankAllUsed: "All questions used. Reset to start over.",
  qbankReset: "Reset category",
  qbankResetConfirm: 'Reset "{name}"? Used questions can appear again.',
  qbankImport: "Create deck",
  qbankLoading: "Loading...",
  qbankLoadErr: "Could not load the question bank.",
  qbankNone: "No categories found.",
  qbankSelect: "Select a category.",

};
