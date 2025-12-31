import { create } from "zustand"
import type {
  CanvasElement,
  ElementBaseUpdate,
  GroupElement,
  ImageElement,
  ShapeElement,
  TextElement,
} from "./types"
import { getBoundingBox } from "../utils/groupUtils"
import { nanoid } from "nanoid"

const HISTORY_LIMIT = 20

interface EditorState {
  elements: CanvasElement[]
  selectedIds: string[]

  // alignment guides
  alignmentGuides: {
    vertical?: number
    horizontal?: number
  }

  setAlignmentGuides: (g: { vertical?: number; horizontal?: number }) => void
  clearAlignmentGuides: () => void

  // core actions
  addElement: (el: CanvasElement) => void
  updateElement: (id: string, updates: ElementBaseUpdate) => void
  removeElement: (id: string) => void
  selectElement: (id: string, multi?: boolean) => void
  clearSelection: () => void
  reorderElements: (from: number, to: number) => void

  // type-specific updates
  updateTextElement: (id: string, updates: Partial<TextElement>) => void
  updateShapeElement: (id: string, updates: Partial<ShapeElement>) => void
  updateImageElement: (id: string, updates: Partial<ImageElement>) => void

  // grouping
  groupSelected: () => void
  ungroupSelected: () => void

  // undo / redo
  past: CanvasElement[][]
  future: CanvasElement[][]
  undo: () => void
  redo: () => void

  deleteSelected: () => void

}

export const useEditorStore = create<EditorState>((set) => ({
  elements: [],
  selectedIds: [],
  alignmentGuides: {},
  past: [],
  future: [],

  /* ---------- alignment ---------- */

  setAlignmentGuides: (guides) => set({ alignmentGuides: guides }),
  clearAlignmentGuides: () => set({ alignmentGuides: {} }),

  /* ---------- core actions ---------- */

  addElement: (el) =>
    set((state) => ({
      past: [...state.past, state.elements].slice(-HISTORY_LIMIT),
      future: [],
      elements: [...state.elements, el],
      selectedIds: [el.id],
      alignmentGuides: {},
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      past: [...state.past, state.elements].slice(-HISTORY_LIMIT),
      future: [],
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      past: [...state.past, state.elements].slice(-HISTORY_LIMIT),
      future: [],
      elements: state.elements.filter((el) => el.id !== id),
      selectedIds: [],
    })),

  selectElement: (id, multi = false) =>
    set((state) => ({
      selectedIds: multi
        ? state.selectedIds.includes(id)
          ? state.selectedIds
          : [...state.selectedIds, id]
        : [id],
    })),

  clearSelection: () => set({ selectedIds: [] }),

  deleteSelected: () =>
  set((state) => {
    if (state.selectedIds.length === 0) return state

    return {
      past: [...state.past, state.elements].slice(-20),
      future: [],
      elements: state.elements.filter(
        (el) => !state.selectedIds.includes(el.id)
      ),
      selectedIds: [],
    }
  }),


  reorderElements: (from, to) =>
    set((state) => {
      const updated = [...state.elements]
      const [moved] = updated.splice(from, 1)
      updated.splice(to, 0, moved)

      return {
        past: [...state.past, state.elements].slice(-HISTORY_LIMIT),
        future: [],
        elements: updated,
      }
    }),

  /* ---------- type-specific updates ---------- */

  updateTextElement: (id, updates) =>
    set((state) => ({
      past: [...state.past, state.elements].slice(-HISTORY_LIMIT),
      future: [],
      elements: state.elements.map((el) =>
        el.id === id && el.type === "text" ? { ...el, ...updates } : el
      ),
    })),

  updateShapeElement: (id, updates) =>
    set((state) => ({
      past: [...state.past, state.elements].slice(-HISTORY_LIMIT),
      future: [],
      elements: state.elements.map((el) =>
        el.id === id && el.type === "shape" ? { ...el, ...updates } : el
      ),
    })),

  updateImageElement: (id, updates) =>
    set((state) => ({
      past: [...state.past, state.elements].slice(-HISTORY_LIMIT),
      future: [],
      elements: state.elements.map((el) =>
        el.id === id && el.type === "image" ? { ...el, ...updates } : el
      ),
    })),

  /* ---------- grouping ---------- */

groupSelected: () =>
  set((state) => {
    if (state.selectedIds.length < 2) return state

    const selected = state.elements.filter(el =>
      state.selectedIds.includes(el.id)
    )

    if (selected.length < 2) return state

    const bounds = getBoundingBox(selected)

    const children = selected.map(el => ({
      ...el,
      x: el.x - bounds.x,
      y: el.y - bounds.y,
    }))

    const group = {
      id: nanoid(),
      type: "group" as const,
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      rotation: 0,
      opacity: 1,
      children,
    }

    return {
      past: [...state.past, state.elements].slice(-20),
      future: [],
      elements: [
        ...state.elements.filter(el => !state.selectedIds.includes(el.id)),
        group,
      ],
      selectedIds: [group.id],
    }
  }),
ungroupSelected: () =>
  set((state) => {
    const group = state.elements.find(
      (el): el is GroupElement =>
        el.id === state.selectedIds[0] && el.type === "group"
    )

    if (!group) return state

    const restored: CanvasElement[] = group.children.map((child) => ({
      ...child,
      x: child.x + group.x,
      y: child.y + group.y,
    }))

    return {
      past: [...state.past, state.elements].slice(-20),
      future: [],
      elements: [
        ...state.elements.filter((el) => el.id !== group.id),
        ...restored,
      ],
      selectedIds: restored.map((el) => el.id),
    }
  }),


  /* ---------- undo / redo ---------- */

  undo: () =>
    set((state) => {
      if (!state.past.length) return state
      const previous = state.past[state.past.length - 1]

      return {
        elements: previous,
        past: state.past.slice(0, -1),
        future: [state.elements, ...state.future],
        selectedIds: [],
      }
    }),

  redo: () =>
    set((state) => {
      if (!state.future.length) return state
      const next = state.future[0]

      return {
        elements: next,
        past: [...state.past, state.elements],
        future: state.future.slice(1),
        selectedIds: [],
      }
    }),
}))
