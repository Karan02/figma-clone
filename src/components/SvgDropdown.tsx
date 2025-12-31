import { useState } from "react"
import { useEditorStore } from "../store/editorStore"
import { createSvgElement } from "../store/elementFactory"
import { ICONS } from "../store/svgIcons"
import { toolbarBtn } from "../utils/utilityBtn"

export function SvgDropdown() {
  const [open, setOpen] = useState(false)
  const addElement = useEditorStore((s) => s.addElement)

  const addSvg = (path: string) => {
    addElement(createSvgElement(path))
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        className={toolbarBtn}
        onClick={() => setOpen((o) => !o)}
      >
        Add SVG ▾
      </button>

      {open && (
        <div
  className="
    absolute top-full mt-1 w-40 rounded shadow z-50
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    border border-gray-200 dark:border-gray-700
  "
>

          <button
              className="
    w-full px-3 py-2 text-left text-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
  "
            onClick={() => addSvg(ICONS.star)}
          >
             Star
          </button>

          <button
              className="
    w-full px-3 py-2 text-left text-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
  "
            onClick={() => addSvg(ICONS.heart)}
          >
             Heart
          </button>

          <button
              className="
    w-full px-3 py-2 text-left text-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
  "
            onClick={() => addSvg(ICONS.check)}
          >
            Check
          </button>
        </div>
      )}
    </div>
  )
}
