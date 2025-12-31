import { useState } from "react"
import { useEditorStore } from "../store/editorStore"
import {
  createRectElement,
  createCircleElement,
  createLineElement,
} from "../store/elementFactory"
import { toolbarBtn } from "../utils/utilityBtn"

export function ShapeDropdown() {
  const [open, setOpen] = useState(false)
  const addElement = useEditorStore((s) => s.addElement)

  const addShape = (shape: "rect" | "circle" | "line") => {
    if (shape === "rect") addElement(createRectElement())
    if (shape === "circle") addElement(createCircleElement())
    if (shape === "line") addElement(createLineElement())
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        className={toolbarBtn}
        onClick={() => setOpen((o) => !o)}
      >
        Add Shape ▾
      </button>

      {open && (
        <div   className="
    absolute top-full mt-1 w-40 rounded shadow z-50
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    border border-gray-200 dark:border-gray-700
  ">
          <button
              className="
    w-full px-3 py-2 text-left text-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
  "
            onClick={() => addShape("rect")}
          >
             Rectangle
          </button>

          <button
            className="
    w-full px-3 py-2 text-left text-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
  "
            onClick={() => addShape("circle")}
          >
             Circle
          </button>

          <button
             className="
    w-full px-3 py-2 text-left text-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
  "
            onClick={() => addShape("line")}
          >
            Line
          </button>
        </div>
      )}
    </div>
  )
}
