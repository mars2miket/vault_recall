```markdown
Adding a New Question Bank CSV
==============================

Files To Change
├── <NewName>.csv                  (project root, same folder as index.html)
│   ├── Header row: Category,Q,A,W1,W2,W3
│   ├── Filename becomes the Level 1 label (underscores → spaces)
│   │   └── Business_Analysis.csv → "Business Analysis"
│   └── Match filename case exactly (hosts are case-sensitive)
│
├── js/qbank.js
│   └── CSV_URLS = ['Business_Analysis.csv', 'AI.csv', '<NewName>.csv'];
│
└── sw.js
    ├── FILES list → add '<NewName>.csv'
    ├── CACHE      → bump version (e.g. 'vault-recall-v1.8' → 'v1.9')
    └── Fetch rule → confirm it matches '.csv' (not a specific filename)

Files NOT To Change
├── index.html
├── js/state.js, grid.js, lists.js, exam.js
├── styles/qbank.css
└── js/locales/*.js

Verify
├── Q Bank modal shows the new file at Level 1
├── Clicking it shows only its categories
├── Create deck works, Reset works
└── Offline: reload once online, then test with network off
```