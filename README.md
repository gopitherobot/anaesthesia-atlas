# Anaesthesia Atlas

An interactive preparation manual for **EDAIC Part II**, the four Structured Oral Examinations.

- **Part II Trainer**
  - **Exam blueprint:** the four SOEs, timing, marking and a pass-mark simulator
  - **One-on-one tutor:** item by item, recall first, asking more each time you return
  - **Mock SOE:** 10 minutes' preparation, five questions in 25 minutes, the examiner bell, self-marking on the 0/1/2 scale, and a full exam day
  - **Repetition tracker:** how many times you have seen each of about 3,000 items, with dates and ratings
  - **Manual:** must-draw diagrams, must-know formulas and model answers for each SOE
- **15 stages** of applied basic science and clinical anaesthesia, by section or top to bottom
- **Study by type**, **Cases**, **Drugs A–Z** (175 monographs), **Equipment**, **Techniques** with a 52-block regional atlas, and **System hubs**
- Spaced-repetition flashcards and per-user progress

> Educational resource for trained clinicians and trainees. Not clinical guidance: always follow current local and national guidelines.

## Run locally
Open `index.html` through any static server (e.g. `python3 -m http.server`) — or build the standalone site:

```bash
python3 build.py        # writes ./docs (GitHub Pages ready)
```

## Accounts and progress
- **Device profiles** (default): name + PIN, progress kept per profile in the browser.
- **Cloud accounts** (optional): create a Supabase project, run `supabase_setup.sql`, and add the URL and anon key to `config.js`. Users then sign in with email and progress syncs across devices (row-level security keeps each user's data private).
- On claude.ai the atlas uses the viewer's claude.ai account automatically.

## Publish on GitHub Pages
1. `python3 build.py`
2. Commit, push, then in the repository settings → Pages, serve from the `docs/` folder on the main branch.
