# Advanced Card Editor

A browser-based design editor (similar to a simplified Canva/Figma) for creating business cards.

## Features

- Fixed-size canvas (600×350px)
- Add text, shapes, and images
- Drag, resize, rotate elements
- Multi-select, group / ungroup
- Layer panel with drag-to-reorder
- Context-aware properties panel
- Alignment snapping & guides
- Full undo / redo (20 steps)
- Export as PNG / PDF (high resolution)
- Keyboard shortcuts
- Clean, minimal UI

---

## Tech Stack

- **React + TypeScript**
- **Konva / react-konva** for canvas rendering
- **Zustand** for state management
- **Tailwind CSS** for UI styling
- **@dnd-kit** for layer reordering
- **jsPDF** for PDF export

---

## State Management

Zustand is used to manage editor state (elements, selection, history).

Reasons:
- Fine-grained subscriptions reduce unnecessary re-renders
- Simple mental model for canvas-heavy UIs
- Easy undo/redo implementation using immutable snapshots

Derived state (e.g. selected elements) is handled via selectors, not stored directly.

---

## Undo / Redo

Undo/redo is implemented using **state snapshot history**.

- Before any mutation of canvas elements, the previous state is saved
- History is capped at 20 steps to limit memory usage
- Redo stack is cleared on any new action

This approach is reliable and easy to reason about for a single-user editor.

---

## Snapping & Alignment

- Elements snap to canvas center and edges using threshold-based comparisons
- Temporary alignment guides are rendered on a UI-only canvas layer
- Guides and selection outlines are excluded from export

---

## Export

- Canvas is exported using `stage.toDataURL()`
- Export uses a higher pixel ratio (3×) for sharp output
- UI layers (selection, guides) are temporarily hidden during export
- Supported formats:
  - PNG
  - JPEG
  - PDF (exact canvas dimensions)

---

## Performance Optimizations

- Single shared Konva Transformer instance
- Zustand selectors prevent full canvas re-renders
- UI-only layers separated from content layers
- Minimal DOM usage (canvas-first rendering)
- Scales smoothly with 50+ elements

---

## Keyboard Shortcuts

- Arrow keys: move selected element (1px)
- Shift + Arrow: move selected element (10px)
- Ctrl/Cmd + Z: Undo
- Ctrl/Cmd + Shift + Z / Ctrl + Y: Redo
- Delete: remove selected element(s)

---

## Running Locally

```bash
npm install
npm run dev
