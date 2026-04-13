import { CheckCircle2, AlertCircle, Info, X, Loader2 } from "lucide-react"

// ─── Toast Container ──────────────────────────────────────────────────────────
export function ToastContainer({ toasts, dismiss }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  )
}

function Toast({ toast, onDismiss }) {
  const styles = {
    success: { bg: "bg-emerald-600", icon: <CheckCircle2 size={15} /> },
    error:   { bg: "bg-red-600",     icon: <AlertCircle size={15} /> },
    info:    { bg: "bg-brand-600",   icon: <Info size={15} /> },
  }
  const s = styles[toast.type] || styles.info

  return (
    <div className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white animate-slide-up ${s.bg}`}>
      {s.icon}
      <span>{toast.message}</span>
      <button onClick={onDismiss} className="ml-1 opacity-70 hover:opacity-100 transition">
        <X size={13} />
      </button>
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 14, className = "" }) {
  return <Loader2 size={size} className={`animate-spin ${className}`} />
}

// ─── Section Divider ──────────────────────────────────────────────────────────
export function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-slate-200" />
      {label && <span className="text-xs text-slate-400 font-medium">{label}</span>}
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, message, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
        <Icon size={20} className="text-slate-400" />
      </div>
      <p className="text-sm text-slate-500">{message}</p>
      {action && (
        <button onClick={onAction} className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition">
          {action}
        </button>
      )}
    </div>
  )
}

// ─── Tip Banner ───────────────────────────────────────────────────────────────
export function TipBanner({ children, color = "amber" }) {
  const colors = {
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    blue:  "bg-brand-50 border-brand-200 text-brand-800",
    green: "bg-emerald-50 border-emerald-200 text-emerald-800"
  }
  return (
    <div className={`rounded-xl border p-3 text-xs leading-relaxed ${colors[color] || colors.amber}`}>
      {children}
    </div>
  )
}

// ─── Score Ring ───────────────────────────────────────────────────────────────
export function ScoreRing({ score }) {
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444"
  const label = score >= 70 ? "Strong" : score >= 40 ? "Fair" : "Weak"
  const circumference = 2 * Math.PI * 36
  const dash = (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg className="rotate-[-90deg]" viewBox="0 0 80 80" width="96" height="96">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#e2e8f0" strokeWidth="6" />
          <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.6s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      <span className="text-xs font-bold" style={{ color }}>{label} Match</span>
    </div>
  )
}
