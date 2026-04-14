import { useState } from "react";
import { Code2, AlertCircle, Copy, Check, Send } from "lucide-react";
import { Prompt } from "../../data/defaults";
import { useToast } from "../../hooks/useResumeData";
import { ToastContainer } from "../ui";

export default function ManualJsonFlow({ onJsonChange }) {
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [copied, setCopied] = useState(false);
  const { toasts, showToast, dismissToast } = useToast();

  const MASTER_PROMPT = Prompt;

  const validateJSON = (text) => {
    try {
      JSON.parse(text);
      setJsonError("");
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(MASTER_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onHandleChange = (value) => {
    setJsonText(value);

    validateJSON(value);
  };

  return (
    <div className="flex flex-col h-screen gap-4 p-3 sm:p-4 bg-white">
      <ToastContainer toasts={toasts} dismiss={dismissToast} />
      {/* LEFT PANEL */}
      <div className="w-full  flex flex-col border rounded-xl overflow-hidden min-h-[300px]">
        <div className="px-3 sm:px-4 py-2 border-b bg-slate-50 text-[10px] sm:text-xs font-bold uppercase text-slate-500">
          Step 1: Copy Prompt → Paste in ChatGPT
        </div>

        <textarea
          className="flex-1 p-3 sm:p-4 text-[11px] sm:text-xs font-mono bg-slate-50 resize-none outline-none"
          value={MASTER_PROMPT}
          readOnly
        />

        <button
          onClick={handleCopyPrompt}
          className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-black text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Prompt"}
        </button>

        <div className="px-3 sm:px-4 py-2 text-[10px] sm:text-xs text-slate-500 border-t">
          👉 Paste in ChatGPT → Copy JSON response
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full  flex flex-col border rounded-xl overflow-hidden min-h-[300px]">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b bg-slate-50">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Code2 size={12} />
            Step 2: Paste JSON Here
          </div>

          <span
            className={`px-2 py-1 text-[9px] sm:text-[10px] font-bold rounded ${
              jsonError
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {jsonError ? "Invalid" : "✓ Valid"}
          </span>
        </div>
        <textarea
          className="flex-1 p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-slate-700 bg-slate-50 resize-none focus:outline-none leading-relaxed"
          placeholder="Paste ChatGPT JSON response here..."
          value={jsonText}
          onChange={(e) => onHandleChange(e.target.value)}
          spellCheck={false}
        />
        {jsonError && (
          <div className="flex items-start gap-2 px-3 sm:px-4 py-2 bg-red-50 border-t text-[10px] sm:text-xs text-red-600">
            <AlertCircle size={12} />
            <span className="font-mono break-all">{jsonError}</span>
          </div>
        )}
        {!jsonError && jsonText && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 w-fit">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium text-green-700">
                JSON is valid
              </span>
            </div>

            <button
              type="submit"
              onClick={() =>{
                showToast("✨ Resume generated!", "success");
                onJsonChange(jsonText)}}
              className="flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all w-full sm:w-auto rounded-md shadow-md"
            >
              <Send size={14} />
              <span>Generate Resume</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
