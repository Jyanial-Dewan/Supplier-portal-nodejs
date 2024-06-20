import { useDraggable } from "@dnd-kit/core"

const DraggableInput = ({id}) => {
    const { attributes, listeners, setNodeRef, transform, transition} = useDraggable({id})
    const style = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
        transition,
        cursor: 'grab',
      };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-[200px] h-[80px] bg-gradient-to-b from-blue to-spblue rounded-xl text-black shadow-md shadow-blue p-4">
        <label className="font-bold">Student Name</label>
        <input type="text"
                value="Drag me over"
                readOnly
                className="bg-transparent border-2 border-black/50 outline-none w-[150px] rounded-md pl-1" />
    </div>
  )
}

export default DraggableInput
