import { useEditorStore } from "../store/editorStore"
import { DndContext, closestCenter } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { LayerRow } from "./LayerRow"

export function LayersPanel() {
  const elements = useEditorStore((s) => s.elements)
  const select = useEditorStore((s) => s.selectElement)
  const reorder = useEditorStore((s) => s.reorderElements)
  const selectedIds = useEditorStore((s) => s.selectedIds)

  // Reverse for UI (topmost first)
  const layers = [...elements].reverse()

  return (
    <aside className="w-64 border-r bg-gray-50 p-2 overflow-auto">
      <h3 className="font-semibold mb-2">Layers</h3>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
  const { active, over } = event

  if (!over || active.id === over.id) return

  const from = elements.findIndex((el) => el.id === active.id)
  const to = elements.findIndex((el) => el.id === over.id)

  reorder(from, to)
}}

      >
        <SortableContext
          items={layers.map(l => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {layers.map((el) => (
            <LayerRow
              key={el.id}
              id={el.id}
              label={el.type}
              selected={selectedIds.includes(el.id)}
              onClick={() => select(el.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </aside>
  )
}
