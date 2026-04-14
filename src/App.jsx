import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "./components/ui/Navbar.jsx";
import EditorPanel from "./components/editor/EditorPanel.jsx";
import ResumePreview from "./components/preview/ResumePreview.jsx";
import { ToastContainer } from "./components/ui/index.jsx";
import {
  useResumeData,
  useToast,
  useAsyncAction,
} from "./hooks/useResumeData.js";
import {
  generateSummary,
  enhanceBullets,
  suggestSkills,
} from "./utils/aiUtils.js";
import { exportToPDF } from "./utils/pdfExport.js";
import { Eye, Zap } from "lucide-react";

export default function App() {
  const { data, jsonText, jsonError, updateField, updateFromJson, resetData } =
    useResumeData();
  const { toasts, showToast, dismissToast } = useToast();

  const [template, setTemplate] = useState("minimalist");
  const [editorMode, setEditorMode] = useState("form"); // "form" | "json" | "prompt"
  const [activeStep, setActiveStep] = useState(0);
  const [showATS, setShowATS] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [enhancing, setEnhancing] = useState(null); // expId | null
  const [suggesting, setSuggesting] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(true);

  const previewRef = useRef(null);

  // useEffect(() => {
  //   // important showMobilePreview is bicome true bicause added refresh change screen when showMobilePreview false pdf download blank
  //   // becase  ResumePreview above class  className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${showMobilePreview ? "flex" : "hidden"} lg:flex`}
  //   const handleResize = () => {
  //     // This forces the entire browser page to reload
  //     window.location.reload();
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Cleanup listener when component unmounts
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    // important showMobilePreview is bicome true bicause added refresh change screen when showMobilePreview false pdf download blank
    // becase  ResumePreview above class  className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${showMobilePreview ? "flex" : "hidden"} lg:flex`}
    // Track state change only at 1024px
    let wasLargeScreen = window.innerWidth >= 1024;
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      // Only reload if breakpoint is crossed
      if (isLargeScreen !== wasLargeScreen) window.location.reload();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── AI: Generate Summary ────────────────────────────────────────────────────
  const { execute: runGenerateSummary, loading: loadingSummary } =
    useAsyncAction(
      useCallback(async () => {
        const summary = await generateSummary(data);
        updateField("summary", summary);
        showToast("✨ Summary generated!", "success");
      }, [data, updateField, showToast]),
    );

  const handleGenerateSummary = async () => {
    try {
      await runGenerateSummary();
    } catch {
      showToast(
        "AI call failed — check VITE_ANTHROPIC_API_KEY in .env",
        "error",
      );
    }
  };

  // ── AI: Enhance Bullets ─────────────────────────────────────────────────────
  const handleEnhanceBullets = async (expId) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    setEnhancing(expId);
    try {
      const enhanced = await enhanceBullets(
        exp.bullet_points,
        exp.job_title,
        exp.company,
      );
      const newExp = data.experience.map((e) =>
        e.id === expId ? { ...e, bullet_points: enhanced } : e,
      );
      updateField("experience", newExp);
      showToast("🚀 Bullets enhanced!", "success");
    } catch {
      showToast("Enhancement failed — check your API key", "error");
    }
    setEnhancing(null);
  };

  // ── AI: Suggest Skills ──────────────────────────────────────────────────────
  const handleSuggestSkills = async () => {
    const jobTitle = data.experience[0]?.job_title || "Software Engineer";
    setSuggesting(true);
    try {
      const suggested = await suggestSkills(jobTitle, data.skills);
      // Merge without duplicates
      const merged = [...new Set([...data.skills, ...suggested])];
      updateField("skills", merged);
      showToast(`💡 Added ${suggested.length} skill suggestions!`, "success");
    } catch {
      showToast("Skill suggestion failed — check your API key", "error");
    }
    setSuggesting(false);
  };

  // ── PDF Download ─────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!previewRef.current) return;
    setDownloading(true);

    try {
      const name =
        data.personal_info?.name?.replace(/\s+/g, "-").toLowerCase() ||
        "resume";
      await exportToPDF(previewRef.current, `resume-${name}`);
      showToast("📄 PDF downloaded!", "success");
    } catch {
      showToast("PDF export failed. Please try again.", "error");
    }
    setDownloading(false);
  };

  // ── Reset ────────────────────────────────────────────────────────────────────
  const handleReset = () => {
    resetData();
    setActiveStep(0);
    setShowATS(false);
    showToast("Reset to sample data", "info");
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <ToastContainer toasts={toasts} dismiss={dismissToast} />

      {/* Top Navigation */}
      <Navbar
        template={template}
        onTemplateChange={setTemplate}
        editorMode={editorMode}
        onEditorModeChange={setEditorMode}
        showATS={showATS}
        onToggleATS={() => setShowATS((v) => !v)}
        onDownload={handleDownload}
        downloading={downloading}
        onReset={handleReset}
        setShowMobilePreview={setShowMobilePreview}
        showMobilePreview={showMobilePreview}
      />

      <div className="flex-1 flex overflow-hidden">
        <EditorPanel
          data={data}
          onUpdate={updateField}
          editorMode={editorMode}
          jsonText={jsonText}
          jsonError={jsonError}
          onJsonChange={updateFromJson}
          activeStep={activeStep}
          onStepChange={(i) => {
            setActiveStep(i);
            setShowATS(false);
          }}
          showATS={showATS}
          loadingSummary={loadingSummary}
          onGenerateSummary={handleGenerateSummary}
          enhancing={enhancing}
          onEnhanceBullets={handleEnhanceBullets}
          suggesting={suggesting}
          onSuggestSkills={handleSuggestSkills}
          showMobilePreview={showMobilePreview}
        />

        {/* ── Right: Live Preview Panel ── */}
        <main
          // className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${showMobilePreview ? "" : "hidden"}`}
          className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${
            showMobilePreview ? "flex" : "hidden"
          } lg:flex`}
        >
          {/* ── Right: Live Preview Panel ──────────────────────────────────────── */}

          {/* Preview header bar */}

          <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Eye size={13} className="text-slate-400" />
              Live Preview —
              <span className="font-bold text-brand-600 capitalize">
                {template}
              </span>{" "}
              Template
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Zap size={11} className="text-amber-400 fill-amber-400" />
              Auto-syncing
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Preview scroll area */}

            <ResumePreview
              data={data}
              templateKey={template}
              ref={previewRef}
            />
            {/* Bottom breathing room */}
            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  );
}

//  {/* Main Split-Screen Body */}
//     <div className="flex-1 flex overflow-hidden">
//       {/* ── Left: Editor Panel ─────────────────────────────────────────────── */}

//       <div
//         className={`flex-1 ${showMobilePreview ? "hidden" : "block"} lg:block`}
//       >
//         <EditorPanel
//           data={data}
//           onUpdate={updateField}
//           editorMode={editorMode}
//           jsonText={jsonText}
//           jsonError={jsonError}
//           onJsonChange={updateFromJson}
//           activeStep={activeStep}
//           onStepChange={(i) => {
//             setActiveStep(i);
//             setShowATS(false);
//           }}
//           showATS={showATS}
//           loadingSummary={loadingSummary}
//           onGenerateSummary={handleGenerateSummary}
//           enhancing={enhancing}
//           onEnhanceBullets={handleEnhanceBullets}
//           suggesting={suggesting}
//           onSuggestSkills={handleSuggestSkills}
//         />
//       </div>

// <main
//   // className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${showMobilePreview ? "" : "hidden"}`}
//   className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${
//     showMobilePreview ? "flex" : "hidden"
//   } lg:flex`}
// >
//   {/* ── Right: Live Preview Panel ──────────────────────────────────────── */}

//   {/* Preview header bar */}

//   <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-slate-200 shrink-0">
//     <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
//       <Eye size={13} className="text-slate-400" />
//       Live Preview —
//       <span className="font-bold text-brand-600 capitalize">
//         {template}
//       </span>{" "}
//       Template
//     </div>
//     <div className="flex items-center gap-1.5 text-xs text-slate-400">
//       <Zap size={11} className="text-amber-400 fill-amber-400" />
//       Auto-syncing
//     </div>
//   </div>

//   <div className="flex-1 overflow-y-auto p-6">
//     {/* Preview scroll area */}

//     <ResumePreview
//       data={data}
//       templateKey={template}
//       ref={previewRef}
//     />
//     {/* Bottom breathing room */}
//     <div className="h-8" />
//   </div>
// </main>
//     </div>

// <main
//         className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${
//           showMobilePreview ? "flex" : "hidden"
//         } lg:flex`}
//       >
//         {/* ... Header stays the same ... */}

//         {/* 1. Added overflow-x-hidden here to stop the horizontal scroll */}
//         <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-slate-200/50">
//           {/* 2. Wrapper to handle the scaling transformation center-aligned */}
//           <div className="flex justify-center w-full">
//             <div
//               className="bg-white shadow-2xl transition-transform origin-top
//                  /* Mobile Scaling */
//                  scale-[0.5] xs:scale-[0.6] sm:scale-[0.8] lg:scale-100
//                  /* Fixed A4 Dimensions */
//                  min-h-[1123px] w-[794px] shrink-0"
//               style={{
//                 /* 3. This math corrects the "empty space" caused by scaling down */
//                 marginBottom: showMobilePreview ? "-500px" : "0",
//               }}
//             >
//               <ResumePreview
//                 data={data}
//                 templateKey={template}
//                 ref={previewRef}
//               />
//             </div>
//           </div>

//           {/* 4. Bottom spacer to allow scrolling to the very end of the page */}
//           <div className="h-[600px] lg:h-8" />
//         </div>
//       </main>

// <main
//       className={`flex-1 flex flex-col overflow-hidden bg-slate-100 ${
//         showMobilePreview ? "flex" : "hidden"
//       } lg:flex`}
//     >
//       {/* Preview header bar */}
//       <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-slate-200 shrink-0">
//         <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
//           <Eye size={13} className="text-slate-400" />
//           <span className="hidden xs:inline">Live Preview —</span>
//           <span className="font-bold text-brand-600 capitalize">
//             {template}
//           </span>
//         </div>

//         {/* Mobile-only Close Button */}
//         <button
//           onClick={() => setShowMobilePreview(false)}
//           className="lg:hidden flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded"
//         >
//           ✕ Close
//         </button>

//         <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
//           <Zap size={11} className="text-amber-400 fill-amber-400" />
//           Auto-syncing
//         </div>
//       </div>

//       {/* Preview scroll area */}
//       {/* <div className="flex-1 overflow-y-auto p-4 sm:p-6">

//       IMPORTANT: This wrapper ensures the resume doesn't break on mobile.
//       It scales the 794px A4 resume to fit small phone screens.

//         <div className="max-w-fit mx-auto shadow-2xl origin-top scale-[0.6] xs:scale-[0.75] sm:scale-[0.9] lg:scale-100 transition-transform">
//           <ResumePreview
//             data={data}
//             templateKey={template}
//             ref={previewRef}
//           />
//         </div>
//         <div className="h-8" />
//       </div> */}

//       <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200/50">
//         {" "}
//         {/* Slightly darker bg makes the white sheet "pop" */}
//         {/* ── A4 Sheet Container ── */}
//         <div
//           className="mx-auto bg-white shadow-2xl transition-transform origin-top
//            /* Mobile Scaling */
//            scale-[0.55] xs:scale-[0.7] sm:scale-[0.85] lg:scale-100
//            /* Force A4 Aspect Ratio Look */
//            min-h-[1123px] w-[794px]"
//           style={{
//             // This ensures that even when scaled down, the layout reserves the full height
//             marginBottom: showMobilePreview ? "-450px" : "0",
//           }}
//         >
//           <ResumePreview
//             data={data}
//             templateKey={template}
//             ref={previewRef}
//           />
//         </div>
//         {/* Extra space at bottom so the scaled sheet doesn't get cut off */}
//         <div className="h-[500px] lg:h-8" />
//       </div>
//     </main>
