import { useContext, useEffect, useState } from "react"
import GlobalContext from "@/context/GlobalContext"
import CreateTask from "@/CustomComponets/CreateTask";
import ListTasks from "@/CustomComponets/ListTasks";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const DragAndDrop = () => {
    const context = useContext(GlobalContext);
    const { open } = context;
    const [tasks, setTasks] = useState([])
    
    useEffect(()=>{
         setTasks(JSON.parse(localStorage.getItem("tasks")))
     }, [])
  return (
    <DndProvider backend={HTML5Backend}>
        <section className={open? "pt-16 pl-[7rem] pr-4 duration-1000" : "pt-16 pl-[17.5rem] pr-4 duration-1000"} >
            <div className="flex flex-col items-center mt-8 gap-16">
                <CreateTask tasks={tasks} setTasks={setTasks}/>
                <ListTasks tasks={tasks} setTasks={setTasks}/>
            </div>
        </section>
    </DndProvider>
  )
}

export default DragAndDrop
