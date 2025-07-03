# YAML Tag Search

A simple, static website that allows users to search through YAML-based content using tags. Built with vanilla JavaScript, Bootstrap 5, and js-yaml.

## Features

- Load and parse YAML data at runtime
- Instant tag-based search filtering
- Responsive card layout
- No build tools required
- GitHub Pages ready

## Local Development

You can preview the site locally using one of these methods:

1. Using `npx serve`:
   ```bash
   npx serve .
   ```

2. Using VS Code Live Server extension:
   - Install the "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

## Deploying to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select the main branch as the source
4. Your site will be available at `https://<username>.github.io/<repository>`

## Editing Content

To add or modify content, edit the `data/dataset.yaml` file. Each record should follow this format:

```yaml
- title: Your Title
  description: Your description
  tags: [tag1, tag2, tag3]
```

Guidelines:
- Keep tags lowercase and hyphen-separated if multiple words
- Use 3-5 relevant tags per item
- Make descriptions concise but informative

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.