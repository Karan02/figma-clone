import { Transformer } from "react-konva"
import { useEffect, useRef } from "react"
import { useEditorStore } from "../store/editorStore"

export function TransformerLayer({ stageRef }: { stageRef: any }) {
  const trRef = useRef<any>(null)

  // 🔴 subscribe ONLY to selectedIds
  const selectedIds = useEditorStore((s) => s.selectedIds)

  useEffect(() => {
    const stage = stageRef.current
    const tr = trRef.current
    if (!stage || !tr) return

    const nodes = selectedIds
      .map((id) => stage.findOne(`#${id}`))
      .filter(Boolean)

    // ⚡ only update if changed
    tr.nodes(nodes)
    tr.getLayer()?.batchDraw()
  }, [selectedIds]) // 🔴 DO NOT depend on stageRef

  return <Transformer ref={trRef} />
}

// import { Transformer } from "react-konva"
// import { useEffect, useRef } from "react"
// import { useEditorStore } from "../store/editorStore"

// interface Props {
//   stageRef: React.RefObject<any>
// }

// export function TransformerLayer({ stageRef }: Props) {
//   const transformerRef = useRef<any>(null)
//   const selectedIds = useEditorStore((s) => s.selectedIds)

//   useEffect(() => {
//     const stage = stageRef.current
//     const transformer = transformerRef.current

//     if (!stage || !transformer) return

//     const nodes = selectedIds
//       .map((id) => stage.findOne(`#${id}`))
//       .filter(Boolean)

//     transformer.nodes(nodes)
//     transformer.getLayer()?.batchDraw()
//   }, [selectedIds, stageRef])

//   return (
//     <Transformer
//       ref={transformerRef}
//       rotateEnabled
//       enabledAnchors={[
//         "top-left",
//         "top-right",
//         "bottom-left",
//         "bottom-right",
//       ]}
//     />
//   )
// }
