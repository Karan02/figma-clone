import type { TextElement } from "../../store/types"
import { useEditorStore } from "../../store/editorStore"

export function TextProperties({ element }: { element: TextElement }) {
  const update = useEditorStore((s) => s.updateTextElement)
  console.log("TEXT PROPS:", element.fontWeight, element.fontStyle, element.textDecoration)
  return (
    <div className="space-y-2">
      <label className="block text-xs">Text</label>
      <input
        className="w-full border px-2 py-1 text-sm"
        value={element.text}
        onChange={(e) =>
          update(element.id, { text: e.target.value })
        }
      />
      
      <label className="block text-xs">Font Size</label>
      <input
        type="number"
        className="w-full border px-2 py-1 text-sm"
        value={element.fontSize}
        onChange={(e) =>
          update(element.id, { fontSize: Number(e.target.value) })
        }
      />

      <label className="block text-xs">Color</label>
      <input
        type="color"
        value={element.color}
        onChange={(e) =>
          update(element.id, { color: e.target.value })
        }
      />
      <div className="flex gap-2 mt-2">
  {/* BOLD */}
  <button
    className={`px-2 py-1 border rounded ${
      element.fontWeight === "bold" ? "bg-gray-200" : ""
    }`}
    onClick={() =>
      update(element.id, {
        fontWeight:
          element.fontWeight === "bold" ? "normal" : "bold",
      })
    }
  >
    <b>B</b>
  </button>

  {/* ITALIC */}
  <button
    className={`px-2 py-1 border rounded ${
      element.fontStyle === "italic" ? "bg-gray-200" : ""
    }`}
    onClick={() =>
      update(element.id, {
        fontStyle:
          element.fontStyle === "italic" ? "normal" : "italic",
      })
    }
  >
    <i>I</i>
  </button>

  {/* UNDERLINE */}
  <button
    className={`px-2 py-1 border rounded ${
      element.textDecoration === "underline" ? "bg-gray-200" : ""
    }`}
    onClick={() =>
      update(element.id, {
        textDecoration:
          element.textDecoration === "underline" ? "" : "underline",
      })
    }
  >
    <u>U</u>
  </button>
</div>

    </div>
  )
}
