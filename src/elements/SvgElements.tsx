import { Path } from "react-konva"
import { useEditorStore } from "../store/editorStore"
import type { SvgElement } from "../store/types"

export function SvgElementView({ element }: { element: SvgElement }) {
  const select = useEditorStore((s) => s.selectElement)
  const update = useEditorStore((s) => s.updateElement)

  return (
    <Path
      id={element.id}
      data={element.path}
      x={element.x}
      y={element.y}
      scaleX={element.width / 24}
      scaleY={element.height / 24}
      fill={element.fill}
      rotation={element.rotation}
      opacity={element.opacity}
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
    />
  )
}
