import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import Widget2 from './Widget2';

const DroppableSortable = ({id, items, setItems, deleteStudent, num, handleChange, handleMinimize}) => {
  
    const { setNodeRef } = useDroppable({id});

    const handleDragEnd = (event) => {
      const { active, over } = event;
  
      if (!over) return;
  
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
  
      if (oldIndex !== -1) {
        // Add new item to the list
        setItems((items) => arrayMove(items, oldIndex, newIndex));
        
      } else {
        // Sort items within the list
        setItems((items) => [...items, {id: num, name: '', department: '', is_minimized: false, position: 0, student_id: num}]);
      }
    };
  
    return (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div ref={setNodeRef} >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className='flex flex-col items-center mt-20 gap-6'>
            {items.map((student, index) => (
              <Widget2
                key={student.id}
                student={student}
                deleteStudent={deleteStudent}
                index={index}
                handleChange={handleChange}
                handleMinimize={handleMinimize}
              />
            ))}
            </div>
          </SortableContext>
        </div>
      </DndContext>
    );
  };

export default DroppableSortable
