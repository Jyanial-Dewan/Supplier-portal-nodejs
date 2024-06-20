import GlobalContext from "@/context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import Widget2 from "@/CustomComponets/Widget2"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable"
// import { supabase } from "@/client"
import update from '../images/update.png'
import toast from "react-hot-toast"
import { AiOutlineSave } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import Spinner from "@/CustomComponets/Spinner"

const WidgetTwo = () => {
    const context = useContext(GlobalContext)
    const { open, localEmployees, localAttributes } = context;
    
    const [mergedArray, setMergedArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    
    console.log(updating)
    console.log(mergedArray)

    const idInteger = Math.floor(Math.random()*100000);
    const [dragArray, setDragArray] = useState([{emp_id: idInteger, emp_name: '', job_title: '', email: '', dep_id: 1, widget_state: true, positions: 0}])
    console.log(dragArray)

    const [activeId, setActiveId] = useState(null);
    
    const mergeArrays = (newEmployees, newWidgetAttributes) => {
      const newWidgetAttributesMap = newWidgetAttributes.reduce((acc, attribute) => {
        acc[attribute.emp_id] = attribute;
        return acc;
      }, {});
  
      return newEmployees.map(employee => ({
        ...employee,
        ...newWidgetAttributesMap[employee.emp_id],
        
      }));
    };
  
      // Merge arrays on component mount
      useEffect(() => {
        try {
          const merged = mergeArrays(localEmployees, localAttributes);
          const sortedMerged = merged.sort((a,b)=>a.positions - b.positions)
          setMergedArray(sortedMerged);
        
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }, [localEmployees, localAttributes, ]);

      

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

    const handleDragStart = (event) => {
      const { active } = event;
      setActiveId(active.id.emp_id);
      };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);
    
        if (!over) return;
    
        if (active.id !== over.id) {
          const activeIndexInLeft = dragArray.findIndex(widget => widget.emp_id === active.id.emp_id);
          const activeIndexInRight = mergedArray.findIndex(widget => widget.emp_id === active.id.emp_id);
          const overIndexInLeft = dragArray.findIndex(widget => widget.emp_id === over.id.emp_id);
          const overIndexInRight = mergedArray.findIndex(widget => widget.emp_id === over.id.emp_id);
          const names = mergedArray.map(emp => emp.emp_name)
          const jobs = mergedArray.map(emp => emp.job_title)
          const emails = mergedArray.map(emp => emp.email)

          const condition1 = names.filter((name)=> (
            name === ''
          ));
    
         const condition2 = jobs.filter((job)=> (
          job === ''
          ));
        
          const condition3 = emails.filter((email)=> (
            email === ''
            ))

          setMergedArray((prevArray)=> {
            return arrayMove(prevArray, activeIndexInRight, overIndexInRight)
          })
          
          if(condition1.length > 0 || condition2.length > 0 || condition3.length> 0 && activeIndexInLeft === -1){
            toast.error('Input field can not be empty')
            setMergedArray(mergedArray)
            return
          }
    
          if (activeIndexInLeft !== -1) {
            const newDragArray = [...dragArray];
            let movedItem = newDragArray.splice(activeIndexInLeft, 1)[0];
            movedItem.widget_state = false;
            
            if (overIndexInRight !== -1) {
              const newMergedArray = [...mergedArray];
              newMergedArray.splice(overIndexInRight, 0, movedItem); // Insert after the hovered item
              setMergedArray(newMergedArray);
            } else if (overIndexInLeft !== -1) {
              newDragArray.splice(overIndexInLeft, 0, movedItem);
            } else {
              const newMergedArray = [...mergedArray, movedItem]; // Insert at the bottom if no specific position
              setMergedArray(newMergedArray);
            }
    
            setDragArray(newDragArray);
            if (newDragArray.length === 0) {
              setDragArray([{emp_id: idInteger, emp_name: '', job_title: '', email: '', dep_id: 1, widget_state: true, positions: 0}]);
            }
          } 
          // else if (activeIndexInRight !== -1) {
          //   const newMergedArray = [...mergedArray];
          //   const movedItem = newMergedArray.splice(activeIndexInRight, 1)[0];
    
          //   if (overIndexInLeft !== -1) {
          //     const newDragArray = [...dragArray];
          //     newDragArray.splice(overIndexInLeft + 1, 0, movedItem); // Insert after the hovered item
          //     setDragArray(newDragArray);
          //   } else if (overIndexInRight !== -1) {
          //     newMergedArray.splice(overIndexInRight, 0, movedItem);
          //   } else {
          //     const newDragArray = [...dragArray, movedItem]; // Insert at the bottom if no specific position
          //     setDragArray(newDragArray);
          //   }
    
          //   setMergedArray(newMergedArray);
          //   if (dragArray.length === 0) {
          //     setDragArray([{id: idInteger, name: '', department: '', is_minimized: true, position: 0, student_id: idInteger}]);
          //   }
          // }
        }
      };

    const handleAddInput = ()=> {
      const names = mergedArray.map(emp => emp.emp_name)
      const jobs = mergedArray.map(emp => emp.job_title)
      const emails = mergedArray.map(emp => emp.email)

      const condition1 = names.filter((name)=> (
        name === ''
      ));

      const condition2 = jobs.filter((job)=> (
      job === ''
      ));
    
      const condition3 = emails.filter((email)=> (
        email === ''
      ))

      if(condition1.length > 0 || condition2.length > 0 || condition3.length> 0 ){
        toast.error('Input field can not be empty')
        setMergedArray(mergedArray)
        return
      } else {
        setMergedArray(prevInputs => [...prevInputs, {emp_id: idInteger, emp_name: '', job_title: '', email: '', dep_id: 1, widget_state: false, positions: 0}]);
      }
        
    }

    const renderActiveItem = () => {
      const activeWidget =
        dragArray.find(widget => widget.emp_id === activeId) ||
        mergedArray.find(widget => widget.emp_id === activeId);
  
      return activeWidget.widget_state ? (
        <div className="w-[300px] h-[100px] bg-blue/30 p-4 rounded-lg"></div>
      ) : <div className="w-[600px] h-[180px] bg-blue/30 p-4 rounded-lg"></div>;
    };

    // const upsertMultipleTables  = async (updates, attributesUpdate) => {
    //     try {
    //       // Upsert Students
    //       const { data: studentData, error: studentsError } = await supabase
    //         .from('employees')
    //         .upsert(updates, { onConflict: ['employee_id'] }); // Ensure 'id' is a unique constraint
    
    //       if (studentsError) {
    //         toast.error(studentsError.message)
    //       } else {
    //         toast.success("students data has been updated successfully")
    //       }
    
    //       // Upsert Attributes
    //       const { data: attributesData, error: attributesError } = await supabase
    //         .from('employee_widget_attributes')
    //         .upsert(attributesUpdate, { onConflict: ['employee_id'] }); // Ensure 'id' is a unique constraint
    
    //       if (attributesError) {
    //         toast.error(attributesError.message)
    //       } else {
    //         toast.success('widget attributes has been updated successfully')
    //       }
    
    //     } catch (error) {
    //       console.log(error)
    //     } 
    //   };

    const handleChange = (index, field, value) => {
      const updatedStudents = [...mergedArray];
      updatedStudents[index][field] = value;
      setMergedArray(updatedStudents);
      
    };

    const handleSave = () => {
      
      const employeeUpdates = mergedArray.map((employee) => ({
        emp_id: employee.emp_id,
        emp_name: employee.emp_name,
        job_title:employee.job_title,
        dep_id: employee.dep_id,
        email: employee.email
          
        }));

        const attribUtesUpdate = mergedArray.map((employee, index)=> ({
          emp_id:employee.emp_id,
          positions: index,
          widget_state: employee.widget_state
      }))

      const names = mergedArray.map(emp => emp.emp_name)
      const jobs = mergedArray.map(emp => emp.job_title)
      const emails = mergedArray.map(emp => emp.email)
      const result = names.map((name)=> (
        /\d/.test(name)
      ))

      const result1 = jobs.map((job)=> (
        /\d/.test(job)
      ))

      const condition1 = names.filter((name)=> (
        name === ''
     ));

     const condition2 = jobs.filter((job)=> (
      job === ''
    ))

    const condition3 = emails.filter((email)=> (
    email === ''
    ))

   if(condition1.length > 0 || condition2.length > 0 || condition3.length > 0) {
        toast.error('Input field can not be empty')
        return
      } else if(result.includes(true) || result1.includes(true)) {
        toast.error('Number is not accepted in Employee Name and Job Title')
        return
      } else {
        // upsertMultipleTables(employeeUpdates, attribUtesUpdate);
        setUpdating(true)
        const handleEmployeeUpsert = async () => {
          try {
            const response = await fetch('http://localhost:3000/upsert-employees', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(employeeUpdates)
            });
      
            if (response.ok) {
              toast.success('Employees records has been upserted successfully')
            } else {
              toast.error('There is a problem upserting employees records')
            }
          } catch (error) {
            console.log(`Error: ${error.message}`);
          } finally {
            setUpdating(false)
          }
        };

        handleEmployeeUpsert();

        const handleAttributesUpsert = async () => {
          try {
            const response = await fetch('http://localhost:3000/upsert-attributes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(attribUtesUpdate)
            });
      
            if (response.ok) {
              toast.success('Attributes records has been upserted successfully')
            } else {
              toast.error('There is a problem upserting attributes records')
            }
          } catch (error) {
            console.log(`Error: ${error.message}`);
          }
        };

        handleAttributesUpsert();
        setUpdating(false);


      }
      
    };

    const deleteEmployee = async (id) => {
      if(localEmployees.length < mergedArray.length) {
        const newArray = mergedArray.filter(employee => employee.emp_id !== id);
        setMergedArray(newArray)
      } 

      if(localEmployees.length >= mergedArray.length) {
        // const { error } = await supabase
        //       .from('employees')
        //       .delete()
        //       .eq('employee_id', id)
      
        //       if(error) {
        //         toast.error(error.message)
        //         console.log(error)
        //       } else {
        //         toast.success('employee has been deleted successfully')
        //       }
        // const { error: err } = await supabase
        //       .from('employee_widget_attributes')
        //       .delete()
        //       .eq('employee_id', id)
      
        //       if(err) {
        //         toast.error(err.message)
        //       } else {
        //         toast.success('employee attributes has been deleted successfully')
        //       } 
        const employeeResponse = await fetch(`http://localhost:3000/employees/${id}`, {
              method: 'DELETE'
            });
      
            if (employeeResponse.ok) {
              toast.success('Emloyee record has been deleted')
            } else {
              toast.error('there is a problem deleting employee')
            }

        const response = await fetch(`http://localhost:3000/attributes/${id}`, {
          method: 'DELETE'
        });
  
            if (response.ok) {
              toast.success('Emloyee attribute record has been deleted')
            } else {
              toast.error('there is a problem deleting attribute')
            }
              
        const newArray = mergedArray.filter(employee => employee.emp_id !== id);
        setMergedArray(newArray)
      }
        
      }

     const handleMinimize = (index) => {
        const updatedMinimized = [...mergedArray];
        updatedMinimized[index].widget_state = !updatedMinimized[index].widget_state
        setMergedArray(updatedMinimized)
     }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} onDragStart={handleDragStart} sensors={sensors}>
    {loading? <Spinner/> :
    <section className={open? "pt-28 pl-[32rem] pr-4 duration-1000 flex gap-6 justify-center mb-8" : "pt-28 pl-[42.5rem] pr-4 duration-1000 flex gap-6 justify-center mb-8"}>
    <div className={open? "fixed left-32 top-[1rem] duration-1000": "fixed left-[18.5rem] top-[1rem] duration-1000"}> 
    <SortableContext items={dragArray} strategy={verticalListSortingStrategy}>
      <div className="flex flex-col items-center gap-6 mt-24">
        {dragArray.map((employee)=> (
          <div key={employee.id} className="mt-0">
            <Widget2 id={employee}/>
          </div>
          ))}
      </div>
    </SortableContext>
    </div>
    <div className="border-2 border-dashed border-blue rounded-lg w-[650px] p-6">
        <div className="flex gap-4 justify-end fixed">
            <button type="submit" onClick={handleSave} className="bg-blue p-3 rounded-full hover:scale-105">
                <AiOutlineSave className="text-2xl"/> 
            </button>
            <button onClick={()=> handleAddInput()} className="bg-blue p-3 rounded-full hover:scale-105">
                <BiAddToQueue className="text-2xl"/>
            </button>
            {updating ? <img src={update} className="w-12" /> : ''}
            
        </div>

        <SortableContext items={mergedArray} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col items-center gap-6 mt-20">
              {mergedArray.map((employee, index)=> (
                <div key={employee.id} className="mt-0">
                    <Widget2 id={employee} index={index} deleteEmployee={deleteEmployee} handleChange={handleChange} handleMinimize={handleMinimize}/>
                </div>
                ))}
                </div>
        </SortableContext>
            
        <DragOverlay>{activeId ? renderActiveItem() : null}</DragOverlay>    
    </div>
</section>}
    </DndContext>
  )
}

export default WidgetTwo
