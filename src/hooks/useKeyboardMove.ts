import { useEffect } from "react"
import { useEditorStore } from "../store/editorStore"

export function useKeyboardMove() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { selectedIds, updateElement } =
        useEditorStore.getState()

      if (!selectedIds.length) return

      const delta = e.shiftKey ? 10 : 1

      let dx = 0
      let dy = 0

      if (e.key === "ArrowLeft") dx = -delta
      if (e.key === "ArrowRight") dx = delta
      if (e.key === "ArrowUp") dy = -delta
      if (e.key === "ArrowDown") dy = delta

      if (dx || dy) {
        e.preventDefault()
        selectedIds.forEach((id) => {
          const el = useEditorStore
            .getState()
            .elements.find((e) => e.id === id)

          if (!el) return

          updateElement(id, {
            x: el.x + dx,
            y: el.y + dy,
          })
        })
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])
}
