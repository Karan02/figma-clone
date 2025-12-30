import { nanoid } from "nanoid"
import type { TextElement, ShapeElement } from "./types"

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
    text: "Your text",
    fontSize: 18,
    color: "#111827",
    fontWeight: "normal",
  fontStyle: "normal",
  }
}
