import { useEditorStore } from "../store/editorStore"
import { TextProperties } from "./properties/TextProperties.tsx"
import { ShapeProperties } from "./properties/ShapeProperties.tsx"
import { ImageProperties } from "./properties/ImageProperties.tsx"

export function PropertiesPanel() {
  const elements = useEditorStore((s) => s.elements)
  const selectedIds = useEditorStore((s) => s.selectedIds)

  if (selectedIds.length === 0) {
    return (
      <aside className="w-64 border-l p-4 text-sm text-gray-500">
        No selection
      </aside>
    )
  }

  if (selectedIds.length > 1) {
    return (
      <aside className="w-64 border-l p-4 text-sm">
        Multiple elements selected
      </aside>
    )
  }

  const element = elements.find((e) => e.id === selectedIds[0])
  if (!element) return null

  return (
    <aside className="w-64 border-l p-4 space-y-4">
      <h3 className="font-semibold">Properties</h3>

      {element.type === "text" && <TextProperties element={element} />}
      {element.type === "shape" && <ShapeProperties element={element} />}
      {element.type === "image" && <ImageProperties element={element} />}
    </aside>
  )
}
