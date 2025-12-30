import { Text } from "react-konva"
import type { TextElement } from "../store/types"
import { useEditorStore } from "../store/editorStore"

import { snapPosition } from "../utils/snapping"



export function TextElementView({ element }: { element: TextElement }) {
  const select = useEditorStore(s => s.selectElement)
  const update = useEditorStore(s => s.updateElement)
  const clearGuides = useEditorStore((s) => s.clearAlignmentGuides)

  return (
    <Text
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      text={element.text}
      fontSize={element.fontSize}
      fill={element.color}
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
        clearGuides()
      }}
      onDragMove={(e) => {
  const { x, y } = snapPosition({
    x: e.target.x(),
    y: e.target.y(),
    width: element.width,
    height: element.height,
    canvasWidth: 600,
    canvasHeight: 350,
  })

  e.target.x(x!)
  e.target.y(y!)
}}

    />
  )
}
