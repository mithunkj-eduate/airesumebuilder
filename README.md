# ResumeAI — AI-Powered Resume Builder

A full-stack SaaS-style resume builder with AI features, live preview, 3 templates, and ATS keyword matching.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Icons | lucide-react |
| PDF Export | jsPDF + html2canvas |
| AI | Anthropic Claude API |

## Project Structure

```
ai-resume-builder/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ai/
│   │   │   └── ATSPanel.jsx          # ATS keyword matching UI
│   │   ├── editor/
│   │   │   ├── EditorPanel.jsx       # Left panel container
│   │   │   └── FormSteps.jsx         # All 5 form step components
│   │   ├── preview/
│   │   │   └── ResumePreview.jsx     # Live resume renderer (all templates)
│   │   └── ui/
│   │       ├── index.jsx             # Toast, Spinner, ScoreRing, etc.
│   │       └── Navbar.jsx            # Top navigation bar
│   ├── data/
│   │   └── defaults.js               # Default resume data + template configs
│   ├── hooks/
│   │   └── useResumeData.js          # useResumeData, useToast, useAsyncAction
│   ├── utils/
│   │   ├── aiUtils.js                # All Claude API calls
│   │   └── pdfExport.js              # html2canvas + jsPDF export
│   ├── styles/
│   │   └── index.css                 # Tailwind + custom component classes
│   ├── App.jsx                       # Root component — split-screen layout
│   └── main.jsx                      # React DOM entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
└── .gitignore
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your API key

```bash
cp .env.example .env
# Edit .env and add your Anthropic API key:
# VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run build
npm run preview
```

## Features

### Split-Screen Workspace
- **Left Panel** — 5-step guided form (Personal, Summary, Experience, Education, Skills) or raw JSON editor with live validation
- **Right Panel** — pixel-perfect live preview that updates as you type

### AI Features (powered by Claude)

| Feature | Where | What it does |
|---|---|---|
| AI Generate Summary | Summary step | Writes a 3-sentence professional summary from your experience + skills |
| AI Enhance Bullets | Each experience card | Rewrites basic duties into metric-driven, action-verb-led bullets |
| AI Suggest Skills | Skills step | Recommends missing skills based on your job title |
| ATS Keyword Match | "ATS Check" button | Scores your resume against a job description and lists missing keywords |

### Template Switcher
Three ATS-safe single-column templates:
- **Minimalist** — Georgia serif, stark black section rules
- **Executive** — Navy header, Times New Roman, corporate polish
- **Tech** — Monospace font, green accent, terminal aesthetic

### PDF Export
High-resolution (2×) A4 PDF export via jsPDF + html2canvas with multi-page support.

## Security Notes

> ⚠️ The API key is included in the browser bundle in dev/client-side mode.

For production, add a simple backend proxy:

```js
// Example: Express proxy (server.js)
app.post('/api/ai', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY, // server-side only
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  })
  const data = await response.json()
  res.json(data)
})
```

Then update `API_URL` in `src/utils/aiUtils.js` to `"/api/ai"`.

## Customization

### Add a new template
In `src/data/defaults.js`, add a new entry to `TEMPLATES`:

```js
export const TEMPLATES = {
  // ...existing templates
  modern: {
    key: "modern",
    name: "Modern",
    description: "Clean sans-serif with blue accents",
    accent: "#2563eb",
    headerBg: "#eff6ff",
    headerText: "#1e40af",
    // ...rest of style props
  }
}
```

The template switcher in the navbar picks it up automatically.

### Swap AI provider
All AI calls are isolated in `src/utils/aiUtils.js`. Replace the `claudeRequest` function with any OpenAI/Gemini compatible call — the rest of the app is unchanged.
