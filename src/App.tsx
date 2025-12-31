import { useRef } from "react"
import { CardCanvas } from "./canvas/CardCanvas"
import { LayersPanel } from "./panels/LayersPanel"
import { PropertiesPanel } from "./panels/PropertiesPanel"
import { useEditorStore } from "./store/editorStore"
import { createTextElement } from "./store/elementFactory"
import { useKeyboardMove } from "./hooks/useKeyboardMove"
import { useUndoRedo } from "./hooks/useUndoRedo"
import { exportCanvas } from "./utils/export"
import { useDeleteKey } from "./hooks/useDeleteKey"
import { SvgDropdown } from "./components/SvgDropdown"
import { ShapeDropdown } from "./components/ShapeDropdown"
import { useTheme } from "./hooks/useTheme"
import {  toolbarBtn } from "./utils/utilityBtn"
import { createImageElement } from "./store/elementFactory"


export default function App() {
  useKeyboardMove()
  useUndoRedo()
  useDeleteKey()
  const stageRef = useRef<any>(null)
  const uiLayerRef = useRef<any>(null)
  const { theme, toggleTheme } = useTheme()

  const addElement = useEditorStore((s) => s.addElement)
  const group = useEditorStore((s) => s.groupSelected)
  const ungroup = useEditorStore((s) => s.ungroupSelected)
  const selectedIds = useEditorStore((s) => s.selectedIds)

  const btn =
    "px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100 disabled:opacity-40"

  return (
    <div className="
      h-screen flex
  bg-gray-100 text-gray-900
  dark:bg-gray-900 dark:text-gray-100
    ">


      {/* LEFT SIDEBAR — Layers */}
      <aside className="w-64 border-r
                bg-white dark:bg-gray-800
                border-gray-200 dark:border-gray-700">
        <LayersPanel />
      </aside>

      {/* CENTER — Toolbar + Canvas */}
      <main className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-2 border-b flex gap-2 items-center
                bg-white dark:bg-gray-800
                border-gray-200 dark:border-gray-700">

          <button
            className={toolbarBtn}
            onClick={() => addElement(createTextElement())}
          >
            Add Text
          </button>


  

  <ShapeDropdown />

  <SvgDropdown />

  <button
  className={toolbarBtn}
  onClick={() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        addElement(createImageElement(reader.result as string))
      }
      reader.readAsDataURL(file)
    }

    input.click()
  }}
>
  Add Image
</button>


          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button
            className={toolbarBtn}
            disabled={selectedIds.length < 2}
            onClick={group}
          >
            Group
          </button>

          <button
            className={toolbarBtn}
            disabled={selectedIds.length !== 1}
            onClick={ungroup}
          >
            Ungroup
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button
            className={toolbarBtn}
            onClick={() =>
              exportCanvas({
                format: "png",
                stage: stageRef.current,
                uiLayer: uiLayerRef.current,
              })
            }
          >
            Export PNG
          </button>

          <button
            className={toolbarBtn}
            onClick={() =>
              exportCanvas({
                format: "pdf",
                stage: stageRef.current,
                uiLayer: uiLayerRef.current,
              })
            }
          >
            Export PDF
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-200">
          <div className="bg-white p-4 shadow-lg rounded">
            <CardCanvas
              stageRef={stageRef}
              uiLayerRef={uiLayerRef}
            />
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR — Properties */}
      <aside className="w-64 border-r
                bg-white dark:bg-gray-800
                border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="px-2 py-1 text-sm border rounded
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <PropertiesPanel />
      </aside>
    </div>
  )
}
// function useDeleteKey() {
//   throw new Error("Function not implemented.")
// }

