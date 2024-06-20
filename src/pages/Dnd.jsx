import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { supabase } from '@/client';
import { v4 as uuidv4 } from 'uuid';

const Widget = ({ id, name, department, handleRemove, handleChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="widget bg-white p-4 shadow-md rounded-md mb-2">
      <div className="flex justify-between items-center">
        <div>
          <label className="block font-bold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange(id, 'name', e.target.value)}
            className="border p-1 rounded mb-2 w-full"
          />
          <label className="block font-bold">Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => handleChange(id, 'department', e.target.value)}
            className="border p-1 rounded w-full"
          />
        </div>
        {handleRemove && <button onClick={() => handleRemove(id)} className="ml-4 text-red-500">Remove</button>}
      </div>
    </div>
  );
};

const StudentsDND2 = () => {
  const [leftWidgets, setLeftWidgets] = useState([{ id: uuidv4(), name: 'Default Student', department: 'Default Department' }]);
  const [rightWidgets, setRightWidgets] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchRightWidgets = async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setRightWidgets(data.map((widget) => ({ ...widget, id: uuidv4() })));
      }
    };

    fetchRightWidgets();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (active.id !== over.id) {
      const activeIndexInLeft = leftWidgets.findIndex(widget => widget.id === active.id);
      const activeIndexInRight = rightWidgets.findIndex(widget => widget.id === active.id);
      const overIndexInLeft = leftWidgets.findIndex(widget => widget.id === over.id);
      const overIndexInRight = rightWidgets.findIndex(widget => widget.id === over.id);

      if (activeIndexInLeft !== -1) {
        const newLeftWidgets = [...leftWidgets];
        const movedItem = newLeftWidgets.splice(activeIndexInLeft, 1)[0];

        if (overIndexInRight !== -1) {
          const newRightWidgets = [...rightWidgets];
          newRightWidgets.splice(overIndexInRight + 1, 0, movedItem); // Insert after the hovered item
          setRightWidgets(newRightWidgets);
        } else if (overIndexInLeft !== -1) {
          newLeftWidgets.splice(overIndexInLeft, 0, movedItem);
        } else {
          const newRightWidgets = [...rightWidgets, movedItem]; // Insert at the bottom if no specific position
          setRightWidgets(newRightWidgets);
        }

        setLeftWidgets(newLeftWidgets);
        if (newLeftWidgets.length === 0) {
          setLeftWidgets([{ id: uuidv4(), name: 'Default Student', department: 'Default Department' }]);
        }
      } else if (activeIndexInRight !== -1) {
        const newRightWidgets = [...rightWidgets];
        const movedItem = newRightWidgets.splice(activeIndexInRight, 1)[0];

        if (overIndexInLeft !== -1) {
          const newLeftWidgets = [...leftWidgets];
          newLeftWidgets.splice(overIndexInLeft + 1, 0, movedItem); // Insert after the hovered item
          setLeftWidgets(newLeftWidgets);
        } else if (overIndexInRight !== -1) {
          newRightWidgets.splice(overIndexInRight, 0, movedItem);
        } else {
          const newLeftWidgets = [...leftWidgets, movedItem]; // Insert at the bottom if no specific position
          setLeftWidgets(newLeftWidgets);
        }

        setRightWidgets(newRightWidgets);
        if (newLeftWidgets.length === 0) {
          setLeftWidgets([{ id: uuidv4(), name: 'Default Student', department: 'Default Department' }]);
        }
      }
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleChange = (id, field, value) => {
    setLeftWidgets(leftWidgets.map(widget => widget.id === id ? { ...widget, [field]: value } : widget));
    setRightWidgets(rightWidgets.map(widget => widget.id === id ? { ...widget, [field]: value } : widget));
  };

  const handleAddRightWidget = () => {
    setRightWidgets([...rightWidgets, { id: uuidv4(), name: 'New Student', department: 'New Department' }]);
  };

  const handleSave = async () => {
    const updates = [...leftWidgets, ...rightWidgets].map(widget => ({
      id: widget.id,
      name: widget.name,
      department: widget.department
    }));

    try {
      await supabase.from('students').upsert(updates, { onConflict: ['id'] });
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  const renderActiveItem = () => {
    const activeWidget =
      leftWidgets.find(widget => widget.id === activeId) ||
      rightWidgets.find(widget => widget.id === activeId);

    return activeWidget ? (
      <Widget id={activeWidget.id} name={activeWidget.name} department={activeWidget.department} handleChange={handleChange} />
    ) : null;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between p-4">
        <div className="w-1/2">
          <SortableContext items={leftWidgets} strategy={verticalListSortingStrategy}>
            {leftWidgets.map(widget => (
              <Widget key={widget.id} id={widget.id} name={widget.name} department={widget.department} handleChange={handleChange} />
            ))}
          </SortableContext>
        </div>
        <div className="w-1/2">
          <div className="flex justify-end mb-4">
            <button onClick={handleAddRightWidget} className="bg-blue-500 text-white p-2 rounded mr-2">Add Widget</button>
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">Save</button>
          </div>
          <SortableContext items={rightWidgets} strategy={verticalListSortingStrategy}>
            {rightWidgets.map(widget => (
              <Widget key={widget.id} id={widget.id} name={widget.name} department={widget.department} handleChange={handleChange} />
            ))}
          </SortableContext>
        </div>
      </div>
      <DragOverlay>{activeId ? renderActiveItem() : null}</DragOverlay>
    </DndContext>
  );
};

export default StudentsDND2;