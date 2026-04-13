import { useState, useCallback, useRef } from "react"
import { defaultResumeData } from "../data/defaults.js"

// ─── useResumeData ────────────────────────────────────────────────────────────
// Single source of truth for all resume data.
// Keeps the JSON editor text in sync with the parsed object.
export function useResumeData() {
  const [data, setData]       = useState(defaultResumeData)
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultResumeData, null, 2))
  const [jsonError, setJsonError] = useState("")

  // Update from form controls — rebuilds JSON text
  const updateField = useCallback((field, value) => {
    setData(prev => {
      const next = { ...prev, [field]: value }
      setJsonText(JSON.stringify(next, null, 2))
      return next
    })
  }, [])

  // Update from raw JSON editor — parses and syncs object
  const updateFromJson = useCallback((text) => {
    setJsonText(text)
    try {
      const parsed = JSON.parse(text)
      setData(parsed)
      setJsonError("")
    } catch (e) {
      setJsonError(e.message)
    }
  }, [])

  // Hard reset to sample data
  const resetData = useCallback(() => {
    setData(defaultResumeData)
    setJsonText(JSON.stringify(defaultResumeData, null, 2))
    setJsonError("")
  }, [])

  return { data, jsonText, jsonError, updateField, updateFromJson, resetData }
}

// ─── useToast ─────────────────────────────────────────────────────────────────
// Lightweight ephemeral notification system.
export function useToast() {
  const [toasts, setToasts] = useState([])
  const timerMap = useRef({})

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    timerMap.current[id] = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
      delete timerMap.current[id]
    }, duration)
    return id
  }, [])

  const dismissToast = useCallback((id) => {
    clearTimeout(timerMap.current[id])
    delete timerMap.current[id]
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, showToast, dismissToast }
}

// ─── useAsyncAction ───────────────────────────────────────────────────────────
// Wraps an async fn with loading + error state.
export function useAsyncAction(fn) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError("")
    try {
      const result = await fn(...args)
      return result
    } catch (e) {
      const msg = e?.message || "Something went wrong"
      setError(msg)
      throw e
    } finally {
      setLoading(false)
    }
  }, [fn])

  return { execute, loading, error, clearError: () => setError("") }
}
