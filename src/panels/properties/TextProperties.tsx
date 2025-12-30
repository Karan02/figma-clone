import type { TextElement } from "../../store/types"
import { useEditorStore } from "../../store/editorStore"

export function TextProperties({ element }: { element: TextElement }) {
  const update = useEditorStore((s) => s.updateTextElement)

  return (
    <div className="space-y-2">
      <label className="block text-xs">Text</label>
      <input
        className="w-full border px-2 py-1 text-sm"
        value={element.text}
        onChange={(e) =>
          update(element.id, { text: e.target.value })
        }
      />

      <label className="block text-xs">Font Size</label>
      <input
        type="number"
        className="w-full border px-2 py-1 text-sm"
        value={element.fontSize}
        onChange={(e) =>
          update(element.id, { fontSize: Number(e.target.value) })
        }
      />

      <label className="block text-xs">Color</label>
      <input
        type="color"
        value={element.color}
        onChange={(e) =>
          update(element.id, { color: e.target.value })
        }
      />
    </div>
  )
}
