import type { ImageElement } from "../../store/types"
import { useEditorStore } from "../../store/editorStore"

export function ImageProperties({ element }: { element: ImageElement }) {
  const update = useEditorStore((s) => s.updateImageElement)

  return (
    <div className="space-y-2">
      <label className="block text-xs">Opacity</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={element.opacity}
        onChange={(e) =>
          update(element.id, { opacity: Number(e.target.value) })
        }
      />
    </div>
  )
}
