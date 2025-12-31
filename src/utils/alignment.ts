import type { CanvasElement } from "../store/types"

const SNAP_THRESHOLD = 5

export function getAlignmentGuides(
  moving: CanvasElement,
  others: CanvasElement[],
  canvas: { width: number; height: number }
) {
  let vertical: number | undefined
  let horizontal: number | undefined

  const mxCenter = moving.x + moving.width / 2
  const myCenter = moving.y + moving.height / 2

  // canvas center
  if (Math.abs(mxCenter - canvas.width / 2) < SNAP_THRESHOLD) {
    vertical = canvas.width / 2
  }

  if (Math.abs(myCenter - canvas.height / 2) < SNAP_THRESHOLD) {
    horizontal = canvas.height / 2
  }

  // element-to-element alignment
  for (const el of others) {
    const exCenter = el.x + el.width / 2
    const eyCenter = el.y + el.height / 2

    if (Math.abs(mxCenter - exCenter) < SNAP_THRESHOLD) {
      vertical = exCenter
    }

    if (Math.abs(myCenter - eyCenter) < SNAP_THRESHOLD) {
      horizontal = eyCenter
    }
  }

  return { vertical, horizontal }
}
