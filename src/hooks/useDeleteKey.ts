import { useEffect } from "react"
import { useEditorStore } from "../store/editorStore"

export function useDeleteKey() {
  const deleteSelected = useEditorStore((s) => s.deleteSelected)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ignore typing inside inputs / textareas
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault()
        deleteSelected()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [deleteSelected])
}
