import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Code2,
} from "lucide-react";
import {
  PersonalForm,
  SummaryForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
} from "./FormSteps.jsx";
import ATSPanel from "../ai/ATSPanel.jsx";
import ManualJsonFlow from "./ManualJsonFlow.jsx";

const STEP_ICONS = { User, FileText, Briefcase, GraduationCap, Wrench };
const STEPS = [
  { id: "personal", label: "Personal", icon: "User" },
  { id: "summary", label: "Summary", icon: "FileText" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "skills", label: "Skills", icon: "Wrench" },
];

export default function EditorPanel({
  data,
  onUpdate,
  editorMode,
  jsonText,
  jsonError,
  onJsonChange,
  activeStep,
  onStepChange,
  showATS,
  loadingSummary,
  onGenerateSummary,
  enhancing,
  onEnhanceBullets,
  suggesting,
  onSuggestSkills,
showMobilePreview
}) {
  return (
    <aside className={`${showMobilePreview ? "hidden lg:flex" : ""} w-[420px] shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-hidden`}>
      {editorMode === "form" ? (
        <>
          {/* Step Tabs */}
          <nav className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto shrink-0">
            {STEPS.map((s, i) => {
              const Icon = STEP_ICONS[s.icon];
              const isActive = activeStep === i && !showATS;
              return (
                <button
                  key={s.id}
                  onClick={() => onStepChange(i)}
                  className={`step-tab ${isActive ? "step-tab-active" : "step-tab-inactive"}`}
                >
                  <Icon size={13} />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4">
            {showATS ? (
              <ATSPanel resumeData={data} />
            ) : (
              <>
                {activeStep === 0 && (
                  <PersonalForm
                    data={data.personal_info}
                    onChange={(v) => onUpdate("personal_info", v)}
                  />
                )}
                {activeStep === 1 && (
                  <SummaryForm
                    data={data.summary}
                    onChange={(v) => onUpdate("summary", v)}
                    onGenerate={onGenerateSummary}
                    loading={loadingSummary}
                  />
                )}
                {activeStep === 2 && (
                  <ExperienceForm
                    data={data.experience}
                    onChange={(v) => onUpdate("experience", v)}
                    onEnhance={onEnhanceBullets}
                    enhancing={enhancing}
                  />
                )}
                {activeStep === 3 && (
                  <EducationForm
                    data={data.education}
                    onChange={(v) => onUpdate("education", v)}
                  />
                )}
                {activeStep === 4 && (
                  <SkillsForm
                    data={data.skills}
                    onChange={(v) => onUpdate("skills", v)}
                    onSuggest={onSuggestSkills}
                    suggesting={suggesting}
                  />
                )}
              </>
            )}
          </div>

          {/* Prev / Next navigation */}
          {!showATS && (
            <footer className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50 shrink-0">
              <button
                onClick={() => onStepChange(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-30 transition"
              >
                <ChevronLeft size={14} /> Prev
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onStepChange(i)}
                    className={`rounded-full transition-all ${
                      i === activeStep
                        ? "w-4 h-1.5 bg-brand-600"
                        : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  onStepChange(Math.min(STEPS.length - 1, activeStep + 1))
                }
                disabled={activeStep === STEPS.length - 1}
                className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 disabled:opacity-30 transition"
              >
                Next <ChevronRight size={14} />
              </button>
            </footer>
          )}
        </>
      )
       : editorMode === "prompt" ? (
        <>
          <ManualJsonFlow onJsonChange={onJsonChange}/>
        </>
      )
      
      : (
        /* JSON Editor Mode */
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <div className="flex flex-col flex-1 min-h-screen overflow-hidden bg-white"> */}

          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <Code2 size={13} className="text-slate-400" />
              JSON Editor
            </div>
            <span
              className={`badge ${jsonError ? "badge-error" : "badge-success"}`}
            >
              {jsonError ? "Invalid JSON" : "✓ Valid"}
            </span>
          </div>

          <textarea
            className="flex-1 p-4 font-mono text-xs text-slate-700 bg-slate-50 resize-none focus:outline-none leading-relaxed"
            value={jsonText}
            onChange={(e) => onJsonChange(e.target.value)}
            spellCheck={false}
          />

          {jsonError && (
            <div className="flex items-start gap-2 px-4 py-2.5 bg-red-50 border-t border-red-200 text-xs text-red-600 shrink-0">
              <AlertCircle size={12} className="shrink-0 mt-0.5" />
              <span className="font-mono">{jsonError}</span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
