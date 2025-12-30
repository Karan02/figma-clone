const SNAP_THRESHOLD = 5

export interface SnapResult {
  x?: number
  y?: number
  guides: {
    vertical?: number
    horizontal?: number
  }
}

export function snapPosition({
  x,
  y,
  width,
  height,
  canvasWidth,
  canvasHeight,
}: {
  x: number
  y: number
  width: number
  height: number
  canvasWidth: number
  canvasHeight: number
}): SnapResult {
  const guides: SnapResult["guides"] = {}

  const centerX = canvasWidth / 2 - width / 2
  const centerY = canvasHeight / 2 - height / 2

  let snappedX = x
  let snappedY = y

  if (Math.abs(x - centerX) < SNAP_THRESHOLD) {
    snappedX = centerX
    guides.vertical = canvasWidth / 2
  }

  if (Math.abs(y - centerY) < SNAP_THRESHOLD) {
    snappedY = centerY
    guides.horizontal = canvasHeight / 2
  }

  return { x: snappedX, y: snappedY, guides }
}
