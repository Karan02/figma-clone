import { nanoid } from "nanoid"
import type { TextElement, ShapeElement, ImageElement, SvgElement } from "./types"

export function createRectElement(): ShapeElement {
  return {
    id: nanoid(),
    type: "shape",
    shape: "rect",
    x: 100,
    y: 100,
    width: 120,
    height: 80,
    rotation: 0,
    opacity: 1,
    fill: "#e9d5ff",
  }
}

export function createCircleElement(): ShapeElement {
  return {
    id: nanoid(),
    type: "shape",
    shape: "circle",
    x: 150,
    y: 150,
    width: 80,
    height: 80,
    rotation: 0,
    opacity: 1,
    fill: "#bfdbfe",
  }
}

export function createLineElement(): ShapeElement {
  return {
    id: nanoid(),
    type: "shape",
    shape: "line",
    x: 150,
    y: 200,
    width: 120,
    height: 0,
    rotation: 0,
    opacity: 1,
    stroke: "#111827",
    strokeWidth: 2,
  }
}


export function createTextElement(): TextElement {
  return {
    id: nanoid(),
    type: "text",
    x: 100,
    y: 50,
    width: 200,
    height: 40,
    rotation: 0,
    opacity: 1,
    text: "Enter your text",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "",
    color: "#111827",
  }
}

export function createImageElement(src: string): ImageElement {
  return {
    id: nanoid(),
    type: "image",
    x: 120,
    y: 120,
    width: 150,
    height: 150,
    rotation: 0,
    opacity: 1,
    src,
  }
}

export function createSvgElement(path: string): SvgElement {
  return {
    id: nanoid(),
    type: "svg",
    x: 150,
    y: 150,
    width: 48,
    height: 48,
    rotation: 0,
    opacity: 1,
    path,
    fill: "#111827",
  }
}