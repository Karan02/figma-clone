import type { CanvasElement } from "../store/types"
import { ShapeElementView } from "../elements/ShapeElement"
import { TextElementView } from "../elements/TextElement"
import { ImageElementView } from "../elements/ImageElement"
import { SvgElementView } from "../elements/SvgElements"
import { GroupElementView } from "../elements/GroupElement"

interface Props {
  element: CanvasElement
}

export function ElementRenderer({ element }: Props) {
  switch (element.type) {
    case "text":
      return <TextElementView element={element} />
    case "shape":
      return <ShapeElementView  element={element} />
    case "image":
      return <ImageElementView element={element} />
    case "group":
      return <GroupElementView element={element} />
    case "svg":
      return <SvgElementView element={element} />    
    default:
      return null
  }
}
