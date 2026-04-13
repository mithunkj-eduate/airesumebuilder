// ─── AI Utility — All Claude API calls live here ─────────────────────────────
// Set your Anthropic API key in .env as VITE_ANTHROPIC_API_KEY
// For production use a backend proxy to protect the key.

const API_URL = "https://api.anthropic.com/v1/messages"
const MODEL   = "claude-sonnet-4-20250514"
const HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "",
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true"
}

async function claudeRequest(userPrompt, systemPrompt, maxTokens = 1000) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }]
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${res.status}`)
  }

  const data = await res.json()
  return data.content?.map(b => b.text || "").join("") || ""
}

// ─── Generate Professional Summary ───────────────────────────────────────────
// Takes the full resume data and returns a concise 3-sentence summary string.
export async function generateSummary(resumeData) {
  const expText = resumeData.experience
    .map(e => `${e.job_title} at ${e.company} (${e.duration}):\n${e.bullet_points.join("\n")}`)
    .join("\n\n")

  const prompt = `
Write a compelling 3-sentence professional summary for this candidate.
It must be ATS-optimized, start with years of experience and title, include key technologies, and end with a value statement.

Skills: ${resumeData.skills.join(", ")}

Experience:
${expText}

Return ONLY the summary paragraph — no labels, no quotes, no markdown.
`.trim()

  return claudeRequest(
    prompt,
    "You are an expert resume writer. Write concise, powerful, ATS-optimized professional summaries. No preamble, no explanation — just the summary."
  )
}

// ─── Enhance Bullet Points ────────────────────────────────────────────────────
// Rewrites basic duty bullets into metric-driven, action-verb-led bullets.
// Returns a parsed string[] — throw-safe, caller should catch.
export async function enhanceBullets(bullets, jobTitle, company) {
  const prompt = `
Rewrite these job bullets for the role "${jobTitle}" at "${company}".
Rules:
- Start each bullet with a strong past-tense action verb (Led, Built, Reduced, Increased, Engineered, etc.)
- Add quantified metrics where plausible (%, x faster, N users, $M saved)
- Keep each bullet under 20 words
- Make them ATS-friendly and impact-driven
- Return ONLY a valid JSON array of strings — no markdown fences, no explanation

Input bullets:
${JSON.stringify(bullets)}
`.trim()

  const raw = await claudeRequest(
    prompt,
    "You are an expert resume writer. Return ONLY a valid JSON array of strings. No markdown, no code fences, no preamble.",
    800
  )

  const clean = raw.replace(/```json|```/g, "").trim()
  return JSON.parse(clean)
}

// ─── ATS Keyword Matching ─────────────────────────────────────────────────────
// Compares resume text against a job description.
// Returns: { score: number, missing: string[], present: string[], suggestions: string[] }
export async function matchATS(resumeData, jobDescription) {
  const resumeText = [
    resumeData.summary || "",
    ...resumeData.experience.flatMap(e => [
      e.job_title, e.company, ...e.bullet_points
    ]),
    ...resumeData.education.map(e => `${e.degree} ${e.school}`),
    ...resumeData.skills
  ].join(" ")

  const prompt = `
Compare this resume to the job description and return a JSON object with these exact keys:
- "score": integer 0-100 (ATS keyword match percentage)
- "missing": array of up to 10 important keywords/skills from the job NOT found in the resume
- "present": array of up to 10 keywords from the job that ARE found in the resume
- "suggestions": array of 3 short actionable tips to improve the resume for this role

Resume text:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON — no markdown fences, no explanation.
`.trim()

  const raw = await claudeRequest(
    prompt,
    "You are an ATS expert. Return ONLY valid JSON with keys: score, missing, present, suggestions.",
    900
  )

  const clean = raw.replace(/```json|```/g, "").trim()
  return JSON.parse(clean)
}

// ─── Generate Cover Letter ────────────────────────────────────────────────────
// Generates a short tailored cover letter for a job description.
export async function generateCoverLetter(resumeData, jobDescription) {
  const prompt = `
Write a professional 3-paragraph cover letter for this candidate applying to the following job.

Candidate:
Name: ${resumeData.personal_info.name}
Summary: ${resumeData.summary}
Key Skills: ${resumeData.skills.slice(0, 10).join(", ")}
Most Recent Role: ${resumeData.experience[0]?.job_title} at ${resumeData.experience[0]?.company}

Job Description:
${jobDescription}

Format: 3 paragraphs — opening hook, relevant experience, closing call to action.
Return only the letter body, no salutation or signature.
`.trim()

  return claudeRequest(
    prompt,
    "You are an expert career coach writing targeted, personalized cover letters. Be concise, confident, and specific.",
    700
  )
}

// ─── Suggest Skills ───────────────────────────────────────────────────────────
// Suggests additional skills based on job title and existing skills.
export async function suggestSkills(jobTitle, currentSkills) {
  const prompt = `
Suggest 8-12 additional technical skills commonly required for a "${jobTitle}" role
that are NOT already in this list: ${currentSkills.join(", ")}

Return ONLY a valid JSON array of short skill name strings.
No markdown, no explanation, no duplicates from the input list.
`.trim()

  const raw = await claudeRequest(
    prompt,
    "Return ONLY a valid JSON array of strings.",
    400
  )

  const clean = raw.replace(/```json|```/g, "").trim()
  return JSON.parse(clean)
}
