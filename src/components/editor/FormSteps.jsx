import { useState } from "react"
import { Plus, Trash2, X, Wand2, Sparkles, Loader2 } from "lucide-react"
import { Spinner, TipBanner } from "../ui/index.jsx"

// ─── Personal Info Form ───────────────────────────────────────────────────────
export function PersonalForm({ data, onChange }) {
  const fields = [
    { key: "name",      label: "Full Name",       placeholder: "JOHN DOE",             type: "text" },
    { key: "email",     label: "Email",           placeholder: "john@example.com",      type: "email" },
    { key: "phone",     label: "Phone",           placeholder: "+1 234 567 8900",       type: "tel" },
    { key: "location",  label: "Location",        placeholder: "City, State/Country",   type: "text" },
    { key: "linkedin",  label: "LinkedIn URL",    placeholder: "linkedin.com/in/you",   type: "text" },
    { key: "portfolio", label: "Portfolio / Site", placeholder: "yoursite.com",         type: "text" },
  ]

  return (
    <div className="space-y-4">
      {fields.map(f => (
        <div key={f.key}>
          <label className="label-base">{f.label}</label>
          <input
            className="input-base"
            type={f.type}
            value={data[f.key] || ""}
            placeholder={f.placeholder}
            onChange={e => onChange({ ...data, [f.key]: e.target.value })}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Summary Form ─────────────────────────────────────────────────────────────
export function SummaryForm({ data, onChange, onGenerate, loading }) {
  return (
    <div className="space-y-4">
      {/* <TipBanner color="blue">
        <strong>Pro tip:</strong> Fill in your Experience first, then use <em>AI Generate</em> for the best results.
      </TipBanner> */}

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="label-base">Professional Summary</label>
          {/* <button
            onClick={onGenerate}
            disabled={loading}
            className="btn-ai"
          >
            {loading ? <Spinner size={12} /> : <Sparkles size={12} />}
            {loading ? "Generating..." : "AI Generate"}
          </button> */}
        </div>
        <textarea
          rows={7}
          className="input-base resize-none"
          value={data}
          placeholder="Write a professional summary or click AI Generate to create one automatically based on your experience..."
          onChange={e => onChange(e.target.value)}
        />
        <p className="text-xs text-slate-400 mt-1">{data.length} characters</p>
      </div>
    </div>
  )
}

// ─── Experience Form ──────────────────────────────────────────────────────────
export function ExperienceForm({ data, onChange, onEnhance, enhancing }) {
  const add = () =>
    onChange([
      ...data,
      {
        id: `e_${Date.now()}`,
        job_title: "",
        company: "",
        location: "",
        duration: "",
        bullet_points: [""],
      },
    ])

  const remove = id => onChange(data.filter(e => e.id !== id))
  const update = (id, field, val) =>
    onChange(data.map(e => (e.id === id ? { ...e, [field]: val } : e)))

  const updateBullet = (id, i, val) =>
    onChange(
      data.map(e =>
        e.id === id
          ? { ...e, bullet_points: e.bullet_points.map((b, j) => (j === i ? val : b)) }
          : e
      )
    )

  const addBullet = id =>
    onChange(data.map(e => (e.id === id ? { ...e, bullet_points: [...e.bullet_points, ""] } : e)))

  const removeBullet = (id, i) =>
    onChange(
      data.map(e =>
        e.id === id ? { ...e, bullet_points: e.bullet_points.filter((_, j) => j !== i) } : e
      )
    )

  return (
    <div className="space-y-5">
      {data.map((exp, idx) => (
        <div key={exp.id} className="section-card animate-fade-in">
          {/* Card header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Position {idx + 1}
            </span>
            <div className="flex items-center gap-2">
              {/* <button
                onClick={() => onEnhance(exp.id)}
                disabled={enhancing === exp.id}
                className="btn-violet"
                title="Rewrite bullets with AI"
              >
                {enhancing === exp.id ? <Spinner size={11} /> : <Wand2 size={11} />}
                {enhancing === exp.id ? "Enhancing..." : "AI Enhance Bullets"}
              </button> */}
              <button
                onClick={() => remove(exp.id)}
                className="text-slate-300 hover:text-red-500 transition p-1"
                title="Remove position"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["job_title", "Job Title",  "Software Engineer"],
              ["company",   "Company",    "Acme Corp"],
              ["location",  "Location",   "City, State"],
              ["duration",  "Duration",   "Jan 2023 – Present"],
            ].map(([k, l, p]) => (
              <div key={k}>
                <label className="block text-xs text-slate-500 mb-0.5 font-medium">{l}</label>
                <input
                  className="input-sm"
                  value={exp[k] || ""}
                  placeholder={p}
                  onChange={e => update(exp.id, k, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Bullets */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5 font-medium">
              Bullet Points
            </label>
            <div className="space-y-1.5">
              {exp.bullet_points.map((b, i) => (
                <div key={i} className="flex gap-2 items-center group">
                  <span className="text-slate-300 text-xs shrink-0">▸</span>
                  <input
                    className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    value={b}
                    placeholder="Describe an achievement or responsibility..."
                    onChange={e => updateBullet(exp.id, i, e.target.value)}
                  />
                  <button
                    onClick={() => removeBullet(exp.id, i)}
                    className="text-slate-200 group-hover:text-red-400 transition shrink-0"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addBullet(exp.id)}
                className="text-xs text-brand-500 hover:text-brand-700 flex items-center gap-1 mt-1 transition"
              >
                <Plus size={11} /> Add bullet point
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-brand-400 hover:text-brand-600 transition flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={15} /> Add Experience
      </button>
    </div>
  )
}

// ─── Education Form ───────────────────────────────────────────────────────────
export function EducationForm({ data, onChange }) {
  const add = () =>
    onChange([
      ...data,
      { id: `ed_${Date.now()}`, degree: "", school: "", location: "", duration: "" },
    ])

  const remove = id => onChange(data.filter(e => e.id !== id))
  const update = (id, field, val) =>
    onChange(data.map(e => (e.id === id ? { ...e, [field]: val } : e)))

  return (
    <div className="space-y-4">
      {data.map((ed, idx) => (
        <div key={ed.id} className="section-card animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Education {idx + 1}
            </span>
            <button
              onClick={() => remove(ed.id)}
              className="text-slate-300 hover:text-red-500 transition p-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["degree",   "Degree / Certification", "B.S. Computer Science"],
              ["school",   "School / Institution",   "MIT"],
              ["location", "Location",               "Cambridge, MA"],
              ["duration", "Year / Duration",        "2020"],
            ].map(([k, l, p]) => (
              <div key={k}>
                <label className="block text-xs text-slate-500 mb-0.5 font-medium">{l}</label>
                <input
                  className="input-sm"
                  value={ed[k] || ""}
                  placeholder={p}
                  onChange={e => update(ed.id, k, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-brand-400 hover:text-brand-600 transition flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={15} /> Add Education
      </button>
    </div>
  )
}

// ─── Skills Form ──────────────────────────────────────────────────────────────
export function SkillsForm({ data, onChange, onSuggest, suggesting }) {
  const [input, setInput] = useState("")

  const add = () => {
    const s = input.trim()
    if (s && !data.includes(s)) {
      onChange([...data, s])
      setInput("")
    }
  }

  const remove = s => onChange(data.filter(x => x !== s))

  const handleKey = e => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      add()
    }
  }

  return (
    <div className="space-y-4">
      {/* <TipBanner color="green">
        Press <strong>Enter</strong> or <strong>,</strong> after each skill to add it. Use <em>AI Suggest</em> to get recommendations based on your job title.
      </TipBanner> */}

      <div className="flex gap-2">
        <input
          className="input-base"
          value={input}
          placeholder="Type a skill (e.g. Docker, GraphQL, TypeScript)..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={add} className="btn-primary shrink-0">
          <Plus size={13} /> Add
        </button>
      </div>

      {/* {onSuggest && (
        <button onClick={onSuggest} disabled={suggesting} className="btn-secondary w-full justify-center">
          {suggesting ? <Spinner size={13} /> : <Sparkles size={13} />}
          {suggesting ? "Finding suggestions..." : "AI Suggest Skills"}
        </button>
      )} */}

      <div className="flex flex-wrap gap-2">
        {data.map(s => (
          <span key={s} className="skill-chip">
            {s}
            <button
              onClick={() => remove(s)}
              className="text-brand-400 hover:text-red-500 transition"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        {data.length === 0 && (
          <p className="text-xs text-slate-400 py-2">No skills added yet.</p>
        )}
      </div>

      <p className="text-xs text-slate-400">{data.length} skills added</p>
    </div>
  )
}
