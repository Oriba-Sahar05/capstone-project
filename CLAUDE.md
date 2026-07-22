# Capstone Project — AI Conventions

## Project overview
This is my Web Development capstone project. The goal is to [describe your app in 1–2 sentences].

## Tech stack
- **Runtime:** Node.js (LTS)
- **Language:** JavaScript / TypeScript (pick one)
- **Frontend:** [e.g. React, HTML/CSS, or Next.js]
- **Backend:** [e.g. Express, or "none for now"]
- **Database:** [e.g. MongoDB, PostgreSQL, or "TBD"]
- **Package manager:** npm
- **Version control:** Git + GitHub

## Repository
- **Repo:** https://github.com/Oriba-Sahar05/capstone-project
- **Branch:** `main` for stable work; feature branches for larger changes

## Coding conventions
- Use clear, descriptive file and variable names
- Prefer small, focused functions
- Keep components/modules in logical folders (`src/`, `public/`, etc.)
- Use consistent formatting (Prettier or editor format-on-save)
- Comment only where logic is not obvious

## Commit conventions
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `chore:` setup, config, tooling

Example: `docs: update README with setup instructions`

## AI assistant instructions
When helping on this project:
1. Read this file before suggesting changes
2. Match existing project structure and naming
3. Prefer minimal, focused diffs
4. Explain breaking changes before applying them
5. Do not add secrets (API keys, `.env` values) to the repo
6. Suggest Conventional Commit messages for each change

## Environment setup
```bash
cd /c/Users/adeel/onedrive/desktop/webdev/github/capstone-project
npm install          # when package.json exists
npm run dev          # when dev script exists

## Project Rules (learned from prompting comparison drill)

1. Forms must validate on both the field level (inline errors) and
   on submit — never rely only on submit-time validation.
2. Every form input must have a real <label for="..."> element —
   placeholder text is not an acceptable substitute for a label.
3. Any password/text validation must explicitly reject
   whitespace-only input, not just empty-string input.
4. When asking AI to build a feature involving validation, always
   include a verification step ("write tests, run them, show me
   the output") — skipping this let a bug through in testing.
