import { Rect } from "react-konva"
import type { ShapeElement } from "../store/types"
import { useEditorStore } from "../store/editorStore"

export function RectElement({ element }: { element: ShapeElement }) {
  const select = useEditorStore(s => s.selectElement)
  const update = useEditorStore(s => s.updateElement)

  return (
    <Rect
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      fill={element.fill}
      rotation={element.rotation}
      opacity={element.opacity}
      draggable
      onClick={(e) => {
        e.cancelBubble = true
        select(element.id, e.evt.ctrlKey || e.evt.metaKey)
      }}
      onDragEnd={(e) => {
        update(element.id, {
          x: e.target.x(),
          y: e.target.y(),
        })
      }}
    />
  )
}
