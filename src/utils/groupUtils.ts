import type { CanvasElement } from "../store/types"

export function getBoundingBox(elements: CanvasElement[]) {
  const xs = elements.map(e => e.x)
  const ys = elements.map(e => e.y)
  const ws = elements.map(e => e.x + (e.width ?? 0))
  const hs = elements.map(e => e.y + (e.height ?? 0))

  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const maxX = Math.max(...ws)
  const maxY = Math.max(...hs)

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}
