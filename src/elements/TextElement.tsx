import { Text } from "react-konva"
import { useEditorStore } from "../store/editorStore"
import type { TextElement } from "../store/types"

export function TextElementView({ element }: { element: TextElement }) {
  const select = useEditorStore((s) => s.selectElement)
  const update = useEditorStore((s) => s.updateElement)

  const fontStyle = [
    element.fontWeight === "bold" ? "bold" : "",
    element.fontStyle === "italic" ? "italic" : "",
  ]
    .filter(Boolean)
    .join(" ") || "normal"

  return (
    <Text
      id={element.id}
      x={element.x}
      y={element.y}
      width={element.width}
      text={element.text}
      fontSize={element.fontSize}
      fill={element.color}

      /* 🔴 REQUIRED */
      fontFamily="Arial"
      fontStyle={fontStyle}
      textDecoration={element.textDecoration}

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
