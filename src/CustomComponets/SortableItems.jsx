import Widget from "./Widget"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"


const SortableItems = (props) => {
    console.log(props)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Widget emp={props.id} />
    </div>
  )
}

export default SortableItems
