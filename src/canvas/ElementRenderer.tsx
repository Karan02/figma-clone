import type { CanvasElement } from "../store/types"
import { RectElement } from "../elements/ShapeElement"
import { TextElementView } from "../elements/TextElement"
import { ImageElementView } from "../elements/ImageElement"

interface Props {
  element: CanvasElement
}

export function ElementRenderer({ element }: Props) {
  switch (element.type) {
    case "text":
      return <TextElementView element={element} />
    case "shape":
      return <RectElement element={element} />
    case "image":
      return <ImageElementView element={element} />
    case "group":
        return element.children.map(child => (
            <ElementRenderer key={child.id} element={{
            ...child,
            x: child.x + element.x,
            y: child.y + element.y,
            }} />
        ))
    default:
      return null
  }
}
