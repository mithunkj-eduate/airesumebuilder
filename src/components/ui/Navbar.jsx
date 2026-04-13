import {
  Download,
  Sparkles,
  LayoutTemplate,
  Target,
  Code2,
  Settings,
  Loader2,
  RefreshCw,
  Eye,
  Edit3,
} from "lucide-react";
import { TEMPLATES } from "../../data/defaults.js";

export default function Navbar({
  template,
  onTemplateChange,
  editorMode,
  onEditorModeChange,
  showATS,
  onToggleATS,
  onDownload,
  downloading,
  onReset,
  setShowMobilePreview,
  showMobilePreview,
}) {
  // return (
  //   <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0 z-20 shadow-sm">
  //     {/* Logo */}
  //     <div className="flex items-center gap-2.5 shrink-0">
  //       <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm shadow-brand-200">
  //         <Sparkles size={15} className="text-white" />
  //       </div>
  //       <div className="leading-tight">
  //         <div className="text-sm font-bold text-slate-800">ResumeAI</div>
  //         <div className="text-xs text-slate-400 hidden sm:block">AI-Powered Builder</div>
  //       </div>
  //     </div>

  //     <div className="w-px h-6 bg-slate-200 mx-1 shrink-0" />

  //     {/* Template Switcher */}
  //     <div className="flex items-center gap-1 shrink-0">
  //       <LayoutTemplate size={13} className="text-slate-400 mr-1" />
  //       <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-1">
  //         {Object.values(TEMPLATES).map(t => (
  //           <button
  //             key={t.key}
  //             onClick={() => onTemplateChange(t.key)}
  //             title={t.description}
  //             className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
  //               template === t.key
  //                 ? "bg-white text-slate-800 shadow-sm"
  //                 : "text-slate-400 hover:text-slate-700"
  //             }`}
  //           >
  //             {t.name}
  //           </button>
  //         ))}
  //       </div>
  //     </div>

  //     <div className="w-px h-6 bg-slate-200 mx-0.5 shrink-0 hidden md:block" />

  //     {/* Editor Mode Toggle */}
  //     <div className="hidden md:flex items-center gap-0.5 bg-slate-100 rounded-lg p-1 shrink-0">
  //       <button
  //         onClick={() => onEditorModeChange("form")}
  //         className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
  //           editorMode === "form"
  //             ? "bg-white text-slate-800 shadow-sm"
  //             : "text-slate-400 hover:text-slate-700"
  //         }`}
  //       >
  //         <Settings size={11} /> Form
  //       </button>
  //       <button
  //         onClick={() => onEditorModeChange("json")}
  //         className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
  //           editorMode === "json"
  //             ? "bg-white text-slate-800 shadow-sm"
  //             : "text-slate-400 hover:text-slate-700"
  //         }`}
  //       >
  //         <Code2 size={11} /> JSON
  //       </button>
  //     </div>

  //     {/* ATS Check */}
  //     <button
  //       onClick={onToggleATS}
  //       className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
  //         showATS
  //           ? "bg-amber-500 text-white shadow-sm shadow-amber-200"
  //           : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
  //       }`}
  //     >
  //       <Target size={12} />
  //       <span className="hidden sm:inline">ATS Check</span>
  //     </button>

  //     {/* Spacer */}
  //     <div className="flex-1" />

  //     {/* Reset */}
  //     <button
  //       onClick={onReset}
  //       className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition px-2 py-1.5 rounded-lg hover:bg-slate-100 shrink-0"
  //       title="Reset to sample data"
  //     >
  //       <RefreshCw size={12} />
  //       <span className="hidden sm:inline">Reset</span>
  //     </button>

  //     {/* Download */}
  //     <button
  //       onClick={onDownload}
  //       disabled={downloading}
  //       className="btn-primary shrink-0"
  //     >
  //       {downloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
  //       <span>{downloading ? "Exporting..." : "Download PDF"}</span>
  //     </button>
  //   </header>
  // )

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-2 sm:px-4 gap-2 sm:gap-3 shrink-0 z-20 shadow-sm overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
          <img
            src="/favicon.svg"
            alt="Logo"
            className="w-full h-full p-1.5 object-contain"
          />
        </div>

        <div className="leading-tight hidden xs:block">
          <div className="text-sm font-bold text-slate-800">ResumeAI</div>
          <div className="text-[10px] text-slate-400 hidden lg:block">
            AI-Powered Builder
          </div>
        </div>
      </div>

      <div className="w-px h-6 bg-slate-200 mx-1 shrink-0" />

      {/* Template Switcher - Scrolls horizontally on very small screens */}
      <div className="flex items-center gap-1 shrink-0 overflow-x-auto">
        <LayoutTemplate
          size={13}
          className="text-slate-400 mr-1 hidden sm:block"
        />
        <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-1">
          {Object.values(TEMPLATES).map((t) => (
            <button
              key={t.key}
              onClick={() => onTemplateChange(t.key)}
              className={`px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
                template === t.key
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Mode Toggle - Now visible on mobile */}

      <div
        className={`flex items-center gap-0.5 bg-slate-100 rounded-lg p-1 shrink-0`}
      >
        <button
          onClick={() => onEditorModeChange("form")}
          className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            editorMode === "form"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-700"
          }`}
        >
          <Settings size={11} />
          <span className="hidden sm:inline">Form</span>{" "}
          {/* Text hides on mobile */}
        </button>

        <button
          onClick={() => onEditorModeChange("json")}
          className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            editorMode === "json"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-700"
          }`}
        >
          <Code2 size={11} />
          <span className="hidden sm:inline">JSON</span>{" "}
          {/* Text hides on mobile */}
        </button>
        <button
          onClick={() => onEditorModeChange("prompt")}
          className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            editorMode === "prompt"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-700"
          }`}
        >
          <Sparkles size={11} />
          <span className="hidden sm:inline">Prompt</span>{" "}
          {/* Text hides on mobile */}
        </button>
      </div>

      {/* ATS Check - Icon only on mobile */}
      {/* <button
        onClick={onToggleATS}
        className={`flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
          showATS
            ? "bg-amber-500 text-white shadow-sm"
            : "bg-amber-50 text-amber-700 border border-amber-200"
        }`}
      >
        <Target size={14} />
        <span className="hidden md:inline">ATS Check</span>
      </button> */}

      <div className="flex-1" />

      {/* Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Reset - Icon only on mobile */}
        <button
          onClick={onReset}
          className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition sm:px-2 sm:py-1.5 rounded-lg hover:bg-slate-100"
          title="Reset"
        >
          <RefreshCw size={14} />
          <span className="hidden xl:inline">Reset</span>
        </button>

        {/* Preview Toggle Button */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold shrink-0"
        >
          {showMobilePreview ? (
            <>
              <Edit3 size={14} /> <span>Edit</span>
            </>
          ) : (
            <>
              <Eye size={14} /> <span>Preview</span>
            </>
          )}
        </button>

        {/* Download Button - Modified to hide on mobile editor */}
        <button
          onClick={onDownload}
          disabled={downloading}
          className={`bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold items-center gap-2 hover:bg-brand-700 disabled:opacity-50 shrink-0 
    ${!showMobilePreview ? "hidden lg:flex" : "flex"}`} // Logic: Hide on mobile if not previewing, but always show on desktop (lg)
        >
          {downloading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Download size={13} />
          )}
          <span className="hidden xs:inline">
            {downloading ? "..." : "Download"}
          </span>
          <span className="xs:hidden">PDF</span>
        </button>

        {/* Download - Text collapses to "PDF" on small screens */}
        {/* <button
          onClick={onDownload}
          disabled={downloading}
          className="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-brand-700 disabled:opacity-50 shrink-0"
        >
          {downloading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Download size={13} />
          )}
          <span className="hidden xs:inline">
            {downloading ? "..." : "Download"}
          </span>
          <span className="xs:hidden">PDF</span>
        </button> */}
      </div>
    </header>
  );
}
