import { Stage, Layer, Rect } from "react-konva"
import { useRef } from "react"
import { useEditorStore } from "../store/editorStore"
import { ElementRenderer } from "./ElementRenderer"
import { TransformerLayer } from "./TransformerLayer"
import { AlignmentGuides } from "./AlignmentGuides"

const CARD_WIDTH = 600
const CARD_HEIGHT = 350

interface Props {
  stageRef: React.RefObject<any>
  uiLayerRef: React.RefObject<any>
}

export function CardCanvas({ stageRef, uiLayerRef }: Props) {
  const elements = useEditorStore((s) => s.elements)
  const clearSelection = useEditorStore((s) => s.clearSelection)

  // optional: useful later for templates / clipping
  const contentLayerRef = useRef<any>(null)

  return (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <Stage
        ref={stageRef}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        onMouseDown={(e) => {
          // click on empty canvas → clear selection
          if (e.target === e.target.getStage()) {
            clearSelection()
          }
        }}
      >
        {/* CONTENT LAYER (exported) */}
        <Layer ref={contentLayerRef}>
          <Rect
            x={0}
            y={0}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            fill="#ffffff"
          />

          {elements.map((el) => (
            <ElementRenderer key={el.id} element={el} />
          ))}
        </Layer>

        {/* UI LAYER (NOT exported) */}
        <Layer ref={uiLayerRef}>
          <AlignmentGuides />
          <TransformerLayer stageRef={stageRef} />
        </Layer>
      </Stage>
    </div>
  )
}
