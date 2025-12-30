import { useEffect } from "react"
import { useEditorStore } from "../store/editorStore"

export function useUndoRedo() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { undo, redo } = useEditorStore.getState()

      const isMac = navigator.platform.toUpperCase().includes("MAC")

      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === "z") {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }

      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === "y") {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])
}
