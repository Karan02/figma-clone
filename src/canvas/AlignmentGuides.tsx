import { Line } from "react-konva"
import { useEditorStore } from "../store/editorStore"

export function AlignmentGuides() {
  const guides = useEditorStore((s) => s.alignmentGuides)

  return (
    <>
      {guides.vertical !== undefined && (
        <Line
          points={[guides.vertical, 0, guides.vertical, 350]}
          stroke="red"
          strokeWidth={1}
          dash={[4, 4]}
        />
      )}

      {guides.horizontal !== undefined && (
        <Line
          points={[0, guides.horizontal, 600, guides.horizontal]}
          stroke="red"
          strokeWidth={1}
          dash={[4, 4]}
        />
      )}
    </>
  )
}
