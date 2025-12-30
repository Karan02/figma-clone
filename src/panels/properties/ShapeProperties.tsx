import type { ShapeElement } from "../../store/types"
import { useEditorStore } from "../../store/editorStore"

export function ShapeProperties({ element }: { element: ShapeElement }) {
  const update = useEditorStore((s) => s.updateShapeElement)

  return (
    <div className="space-y-2">
      <label className="block text-xs">Fill Color</label>
      <input
        type="color"
        value={element.fill}
        onChange={(e) =>
          update(element.id, { fill: e.target.value })
        }
      />

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
