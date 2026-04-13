import { useState, useCallback } from "react"
import { Target, Loader2, AlertCircle, ChevronDown, ChevronUp, Lightbulb } from "lucide-react"
import { matchATS } from "../../utils/aiUtils.js"
import { ScoreRing, TipBanner } from "../ui/index.jsx"

export default function ATSPanel({ resumeData }) {
  const [jd, setJd]         = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState("")
  const [expanded, setExpanded] = useState(true)

  const analyze = useCallback(async () => {
    if (!jd.trim()) return
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await matchATS(resumeData, jd)
      setResult(res)
    } catch (e) {
      setError(e.message || "Analysis failed. Check your API key in .env")
    }
    setLoading(false)
  }, [jd, resumeData])

  return (
    <div className="space-y-4 animate-fade-in">
      <TipBanner color="amber">
        <strong>How it works:</strong> Paste a job description and AI will calculate an ATS keyword match score, identify missing keywords, and give improvement tips.
      </TipBanner>

      <div>
        <label className="label-base">Job Description</label>
        <textarea
          rows={8}
          className="input-base resize-none"
          value={jd}
          onChange={e => setJd(e.target.value)}
          placeholder="Paste the full job description here..."
        />
      </div>

      <button
        onClick={analyze}
        disabled={loading || !jd.trim()}
        className="w-full py-2.5 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 disabled:opacity-50 transition flex items-center justify-center gap-2 active:scale-98"
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Target size={15} />}
        {loading ? "Analyzing with AI..." : "Analyze ATS Match"}
      </button>

      {error && (
        <div className="flex items-start gap-2.5 text-red-700 text-xs bg-red-50 border border-red-200 rounded-xl p-3">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-4 animate-slide-up">
          {/* Score */}
          <div className="card p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-700 text-sm mb-1">ATS Match Score</h3>
              <p className="text-xs text-slate-500">Based on keyword overlap with job description</p>
            </div>
            <ScoreRing score={result.score ?? 0} />
          </div>

          {/* Missing Keywords */}
          {result.missing?.length > 0 && (
            <KeywordSection
              title="Missing Keywords"
              subtitle="Add these to boost your score"
              keywords={result.missing}
              chipClass="bg-red-50 border border-red-200 text-red-800"
              icon="⚠"
              iconColor="text-red-600"
            />
          )}

          {/* Present Keywords */}
          {result.present?.length > 0 && (
            <KeywordSection
              title="Matched Keywords"
              subtitle="Already present in your resume"
              keywords={result.present}
              chipClass="bg-emerald-50 border border-emerald-200 text-emerald-800"
              icon="✓"
              iconColor="text-emerald-600"
            />
          )}

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={14} className="text-amber-500" />
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  AI Improvement Tips
                </h4>
              </div>
              <ul className="space-y-2">
                {result.suggestions.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-xs text-slate-600">
                    <span className="text-brand-500 font-bold shrink-0">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function KeywordSection({ title, subtitle, keywords, chipClass, icon, iconColor }) {
  return (
    <div className="card p-4">
      <div className="mb-3">
        <h4 className={`text-xs font-bold uppercase tracking-wide ${iconColor} flex items-center gap-1.5`}>
          <span>{icon}</span> {title}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map(k => (
          <span key={k} className={`px-2.5 py-1 rounded-full text-xs font-medium ${chipClass}`}>
            {k}
          </span>
        ))}
      </div>
    </div>
  )
}
