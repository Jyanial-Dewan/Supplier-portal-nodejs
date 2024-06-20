import { useDrag } from "react-dnd";

const SingleDepartment = ({item, index, onDropDep}) => {
    console.log(item)
    const [{isDraggable}, dragRef] = useDrag({
        type: "dep",
        item: ()=> ({...item, index }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();

            if( dropResult && item) {
                onDropDep(item)
            }
        },

        collect: (monitor) => ({
            isDraggin: monitor.isDragging()
        })

    })
  return (
    <div ref={dragRef} className="bg-spblue/30 shadow-md rounded-md px-4 py-1 cursor-pointer mt-2">
                {item.department_name}
    </div>
  )
}

export default SingleDepartment
