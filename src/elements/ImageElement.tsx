import { Image } from "react-konva"
import useImage from "use-image"
import type { ImageElement } from "../store/types"
import { useEditorStore } from "../store/editorStore"

export function ImageElementView({ element }: { element: ImageElement }) {
  const [image] = useImage(element.src)
  const select = useEditorStore((s) => s.selectElement)
  const update = useEditorStore((s) => s.updateElement)

  return (
    <Image
      id={element.id}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      opacity={element.opacity}
      draggable
      onClick={(e) => {
        e.cancelBubble = true
        select(element.id, e.evt.ctrlKey || e.evt.metaKey)
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
