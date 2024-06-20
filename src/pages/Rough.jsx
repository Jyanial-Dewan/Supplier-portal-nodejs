import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const Rough = () => {
  const [items1, setItems1] = useState([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
  ]);

  const [items2, setItems2] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If there's no destination (dropped outside any droppable), do nothing
    if (!destination) return;

    // If the item is dropped in the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceList = source.droppableId === 'droppable1' ? items1 : items2;
    const destList = destination.droppableId === 'droppable1' ? items1 : items2;
    const setSourceList = source.droppableId === 'droppable1' ? setItems1 : setItems2;
    const setDestList = destination.droppableId === 'droppable1' ? setItems1 : setItems2;

    const [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    setSourceList([...sourceList]);
    setDestList([...destList]);
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250,
    minHeight: 500, // Ensures the empty list is visible
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 16,
    margin: `0 0 8px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable1">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {items1.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {items2.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Rough;
