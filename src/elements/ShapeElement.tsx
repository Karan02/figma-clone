import { Rect, Circle, Line } from "react-konva"
import type { ShapeElement } from "../store/types"
import { useEditorStore } from "../store/editorStore"

export function ShapeElementView({ element }: { element: ShapeElement }) {
  const select = useEditorStore((s) => s.selectElement)
  const update = useEditorStore((s) => s.updateElement)

  const commonProps = {
    id: element.id,
    x: element.x,
    y: element.y,
    rotation: element.rotation,
    opacity: element.opacity,
    draggable: true,
    onClick: (e: any) => {
      e.cancelBubble = true
      select(element.id, e.evt.ctrlKey || e.evt.metaKey)
    },
    onDragEnd: (e: any) =>
      update(element.id, {
        x: e.target.x(),
        y: e.target.y(),
      }),
  }

  switch (element.shape) {
    case "rect":
      return (
        <Rect
          {...commonProps}
          width={element.width}
          height={element.height}
          fill={element.fill}
        />
      )

    case "circle":
      return (
        <Circle
          {...commonProps}
          radius={element.width / 2}
          fill={element.fill}
        />
      )

    case "line":
      return (
        <Line
          {...commonProps}
          points={[0, 0, element.width, 0]}
          stroke={element.stroke ?? "#111827"}
          strokeWidth={element.strokeWidth ?? 2}
        />
      )

    default:
      return null
  }
}
