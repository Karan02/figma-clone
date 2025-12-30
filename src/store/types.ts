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
  fontWeight: "normal" | "bold"
  fontStyle: "normal" | "italic"
  color: string
}

export interface ShapeElement extends BaseElement {
  type: "shape"
  shape: "rect" | "circle" | "line"
  fill: string
}

export interface ImageElement extends BaseElement {
  type: "image"
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


