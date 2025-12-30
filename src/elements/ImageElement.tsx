import { Image } from "react-konva"
import useImage from "use-image"
import type { ImageElement } from "../store/types"

export function ImageElementView({ element }: { element: ImageElement }) {
  const [image] = useImage(element.src)

  return (
    <Image
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      opacity={element.opacity}
    />
  )
}
