import jsPDF from "jspdf"
import type { Stage } from "konva/lib/Stage"

interface ExportOptions {
  format: "png" | "jpeg" | "pdf"
  stage: Stage
  uiLayer?: any
}

export function exportCanvas({ format, stage, uiLayer }: ExportOptions) {
  // 1. Hide UI layer
  if (uiLayer) {
    uiLayer.visible(false)
    uiLayer.getStage()?.draw()
  }

  // 2. Export image
  const dataUrl = stage.toDataURL({
    pixelRatio: 3, // high-res
    mimeType:
      format === "jpeg" ? "image/jpeg" : "image/png",
  })

  // 3. Restore UI layer
  if (uiLayer) {
    uiLayer.visible(true)
    uiLayer.getStage()?.draw()
  }

  // 4. Download
  if (format === "pdf") {
    exportPDF(dataUrl)
  } else {
    downloadImage(dataUrl, format)
  }
}

function downloadImage(dataUrl: string, format: string) {
  const link = document.createElement("a")
  link.download = `card.${format}`
  link.href = dataUrl
  link.click()
}

function exportPDF(dataUrl: string) {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [600, 350],
  })

  pdf.addImage(dataUrl, "PNG", 0, 0, 600, 350)
  pdf.save("card.pdf")
}
