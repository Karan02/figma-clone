import { useEditorStore } from "../store/editorStore"
import { DndContext, closestCenter } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { LayerRow } from "./LayerRow"

export function LayersPanel() {
  const elements = useEditorStore((s) => s.elements)
  const selectedIds = useEditorStore((s) => s.selectedIds)
  const selectElement = useEditorStore((s) => s.selectElement)
  const reorder = useEditorStore((s) => s.reorderElements)

  // Top-most element should appear first in the UI
  const layers = [...elements].reverse()

  // Prevent accidental drag when user just clicks
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // must move 5px before drag starts
      },
    })
  )

  return (
    <aside
      className="
        w-64 border-r flex flex-col
        bg-white text-gray-900
        dark:bg-gray-900 dark:text-gray-100
        border-gray-200 dark:border-gray-700
      "
    >
      {/* Header */}
      <div className="px-3 py-2 text-sm font-semibold border-b border-gray-200 dark:border-gray-700">
        Layers
      </div>

      {/* Layers list */}
      <div className="flex-1 overflow-auto p-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event
            if (!over || active.id === over.id) return

            // indices in reversed array
            const from = layers.findIndex((el) => el.id === active.id)
            const to = layers.findIndex((el) => el.id === over.id)

            if (from === -1 || to === -1) return

            // convert back to original elements order
            const originalFrom = elements.length - 1 - from
            const originalTo = elements.length - 1 - to

            reorder(originalFrom, originalTo)
          }}
        >
          <SortableContext
            items={layers.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {layers.map((el) => (
              <LayerRow
                key={el.id}
                id={el.id}
                label={el.type}
                selected={selectedIds.includes(el.id)}
                onClick={() => selectElement(el.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </aside>
  )
}

// import { useEditorStore } from "../store/editorStore"
// import { DndContext, closestCenter } from "@dnd-kit/core"
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable"
// import { LayerRow } from "./LayerRow"

// export function LayersPanel() {
//   const elements = useEditorStore((s) => s.elements)
//   const select = useEditorStore((s) => s.selectElement)
//   const reorder = useEditorStore((s) => s.reorderElements)
//   const selectedIds = useEditorStore((s) => s.selectedIds)

//   // Reverse for UI (topmost first)
//   const layers = [...elements].reverse()

//   return (
//     <aside   className="
//     w-64 border-r
//     bg-white text-gray-900
//     dark:bg-gray-900 dark:text-gray-100
//     border-gray-200 dark:border-gray-700
//   ">
//       <h3 className="font-semibold mb-2">Layers</h3>

//       <DndContext
//         collisionDetection={closestCenter}
//         onDragEnd={(event) => {
//   const { active, over } = event

//   if (!over || active.id === over.id) return

//   const from = elements.findIndex((el) => el.id === active.id)
//   const to = elements.findIndex((el) => el.id === over.id)

//   reorder(from, to)
// }}

//       >
//         <SortableContext
//           items={layers.map(l => l.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {layers.map((el) => (
//             <LayerRow
//               key={el.id}
//               id={el.id}
//               label={el.type}
//               selected={selectedIds.includes(el.id)}
//               onClick={() => select(el.id)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>
//     </aside>
//   )
// }
