import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Props {
  id: string
  label: string
  selected: boolean
  onClick: () => void
}

export function LayerRow({ id, label, selected, onClick }: Props) {
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
      className={`cursor-pointer px-2 py-1 rounded text-sm mb-1
        ${selected ? "bg-blue-100" : "hover:bg-gray-200"}`}
    >
      {label}
    </div>
  )
}
