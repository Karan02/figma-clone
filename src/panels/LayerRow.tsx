import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import React from "react"

interface Props {
  id: string
  label: string
  selected: boolean
  onClick: () => void
}

export const LayerRow = React.memo(function LayerRow({ id, label, selected, onClick }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      onClick={onClick}
       className={`
    px-2 py-1 rounded cursor-pointer
    text-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
    ${
      selected
        ? "bg-blue-100 text-blue-900 dark:bg-blue-600 dark:text-white"
        : ""
    }
  `}
    >
      {label}
    </div>
  )
})
