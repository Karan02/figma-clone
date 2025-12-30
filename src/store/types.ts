export type ElementType = "text" | "shape" | "image" | "group"

export type ElementBaseUpdate = Partial<{
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
}>


export interface BaseElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  locked?: boolean
}

export interface TextElement extends BaseElement {
  type: "text"
  text: string
  fontSize: number
  fontFamily?: string
  fontWeight: "normal" | "bold"
  fontStyle: "normal" | "italic"
  textDecoration?: "" | "underline"
  color: string
}

export interface ShapeElement {
  id: string
  type: "shape"
  shape: "rect" | "circle" | "line"

  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number

  fill?: string
  stroke?: string
  strokeWidth?: number
}


export interface ImageElement extends BaseElement {
  id: string
  type: "image"
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  src: string
}

export interface GroupElement extends BaseElement {
  type: "group"
  children: CanvasElement[]
}

export type CanvasElement =
  | TextElement
  | ShapeElement
  | ImageElement
  | GroupElement


