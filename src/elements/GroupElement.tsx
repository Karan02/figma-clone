import { Group } from "react-konva"
import type { GroupElement as GroupType } from "../store/types"
import { ElementRenderer } from "../canvas/ElementRenderer"
import { useEditorStore } from "../store/editorStore"

export function GroupElementView({ element }: { element: GroupType }) {
  const select = useEditorStore(s => s.selectElement)
  const update = useEditorStore(s => s.updateElement)

  return (
    <Group
      id={element.id}
      x={element.x}
      y={element.y}
      draggable
      onClick={(e) => {
        e.cancelBubble = true
        select(element.id)
      }}
      onDragEnd={(e) =>
        update(element.id, {
          x: e.target.x(),
          y: e.target.y(),
        })
      }
    >
      {element.children.map(child => (
        <ElementRenderer key={child.id} element={child} />
      ))}
    </Group>
  )
}
