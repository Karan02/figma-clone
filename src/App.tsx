import { useRef } from "react"
import { CardCanvas } from "./canvas/CardCanvas"
import { LayersPanel } from "./panels/LayersPanel"
import { PropertiesPanel } from "./panels/PropertiesPanel"
import { useEditorStore } from "./store/editorStore"
import { createTextElement, createRectElement, createCircleElement, createLineElement } from "./store/elementFactory"
import { useKeyboardMove } from "./hooks/useKeyboardMove"
import { useUndoRedo } from "./hooks/useUndoRedo"
import { exportCanvas } from "./utils/export"
import { createImageElement } from "./store/elementFactory"
import { useDeleteKey } from "./hooks/useDeleteKey"

export default function App() {
  useKeyboardMove()
  useUndoRedo()
  useDeleteKey()
  const stageRef = useRef<any>(null)
  const uiLayerRef = useRef<any>(null)

  const addElement = useEditorStore((s) => s.addElement)
  const group = useEditorStore((s) => s.groupSelected)
  const ungroup = useEditorStore((s) => s.ungroupSelected)
  const selectedIds = useEditorStore((s) => s.selectedIds)

  const btn =
    "px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100 disabled:opacity-40"

  return (
    <div className="h-screen w-screen flex bg-gray-100">

      {/* LEFT SIDEBAR — Layers */}
      <aside className="w-64 border-r bg-white flex-shrink-0">
        <LayersPanel />
      </aside>

      {/* CENTER — Toolbar + Canvas */}
      <main className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 px-3 flex items-center gap-2 border-b bg-white">
          <button
            className={btn}
            onClick={() => addElement(createTextElement())}
          >
            Add Text
          </button>

        <button className={btn} onClick={() => addElement(createRectElement())}>
          Add Rectangle
        </button>

        <button className={btn} onClick={() => addElement(createCircleElement())}>
          Add Circle
        </button>

        <button className={btn} onClick={() => addElement(createLineElement())}>
          Add Line
        </button>
<button
  className={btn}
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
            className={btn}
            disabled={selectedIds.length < 2}
            onClick={group}
          >
            Group
          </button>

          <button
            className={btn}
            disabled={selectedIds.length !== 1}
            onClick={ungroup}
          >
            Ungroup
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button
            className={btn}
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
            className={btn}
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
      <aside className="w-64 border-l bg-white flex-shrink-0">
        <PropertiesPanel />
      </aside>
    </div>
  )
}
// function useDeleteKey() {
//   throw new Error("Function not implemented.")
// }

