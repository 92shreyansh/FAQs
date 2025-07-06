# ONDC FAQs

A static, searchable FAQ library for ONDC, styled with ONDC brand colours and fonts. Powered by YAML data, Bootstrap 5, js-yaml, and Fuse.js for fast, typo-tolerant fuzzy search. No build tools required—just open `index.html` or deploy to GitHub Pages.

## Features

- ONDC branding (logo, colours, Poppins font)
- Instant fuzzy search by tag, question, or answer (Fuse.js)
- Accordion UI for FAQs
- Data in editable YAML (`data/faqs.yaml`)
- Responsive, works on any device
- Result count and no-match alert

## How it Works

- FAQs are stored in `data/faqs.yaml` (edit in plain text, supports markdown in answers).
- The app loads and parses the YAML file in the browser using js-yaml.
- Fuse.js provides typo-tolerant, ranked search across questions, answers, and tags.
- Results are shown in a Bootstrap accordion, with tags and markdown support.

## Local Preview

1. Run a local server (e.g. with [serve](https://npmjs.com/package/serve)):

   ```sh
   npx serve .
   ```

   Or use the VS Code Live Server extension.
2. Open the shown URL (e.g. `http://localhost:3000`) in your browser.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In repo Settings > Pages, set source to `main` branch and `/ (root)`.
3. Visit `https://<username>.github.io/<repo>`.

## Editing FAQs

- Edit `data/faqs.yaml`.
- Each FAQ:
  ```yaml
  - question: Your question here
    answer: |
      Your answer here (markdown allowed)
    tags: [tag1, tag2, tag3]
  ```
- Use 3–5 lowercase tags per FAQ.
- Save and refresh to see changes.

## Fuzzy Search

- Powered by [Fuse.js](https://fusejs.io/)
- Search matches question, answer, or tags (ranked by relevance, typo-tolerant)
- Result count shown below search box

© 2025 ONDC
