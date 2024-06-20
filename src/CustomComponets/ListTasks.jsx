import { useEffect, useState } from "react"
import { IoRemoveCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDrag, useDrop } from 'react-dnd'

const ListTasks = ({tasks, setTasks}) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(()=>{
        const filteredTodos = tasks.filter((task)=> task.status === 'todo')
        const filteredInProgress = tasks.filter((task)=> task.status === 'inprogress')
        const filteredCompleted = tasks.filter((task)=> task.status === 'completed')

        setTodos(filteredTodos);
        setInProgress(filteredInProgress);
        setCompleted(filteredCompleted);
    }, [tasks])

    const statuses = ['todo', 'inprogress', 'completed']
    return (
      <div className="flex gap-16">
        {statuses.map((status, index) => <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} completed={completed}/>)}
      </div>
    )
  }
  
  export default ListTasks

  const Section = ({status, tasks, setTasks, todos, inProgress, completed})=> {
    const [{ isOver }, drop ] = useDrop(() => ({
        accept: 'task',
        drop: (item)=>addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
      }))

    let text = 'Todo'
    let bg = 'bg-slate-500'
    let tasksToMap = todos; 

    if(status === 'inprogress'){
        text = 'In Progress'
        bg = 'bg-purple-500'
        tasksToMap = inProgress
    }

    if(status === 'completed'){
        text = 'Completed'
        bg = 'bg-green-500'
        tasksToMap = completed
    }

    const addItemToSection =(id) => {
        setTasks((prev)=> {
            const modifiedtasks = prev.map((t) => {
                if(t.id === id) {
                    return {...t, status: status};
                } 

                return t;
            })

            localStorage.setItem("tasks", JSON.stringify(modifiedtasks))

            return modifiedtasks;
        })
    }
    return(
        <div className={`w-64 rounded-md p-2 ${isOver? 'bg-slate-200': ''}`} ref={drop}>
            <Header text={text} bg={bg} count={tasksToMap.length}/>
            {tasksToMap.map(task=> <Task key={task.id} tasks={tasks} task={task} setTasks={setTasks}/>)}
        </div>
    )
  }

  const Header = ({text, bg, count})=> {
    return(
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text} 
            <div className="bg-white text-black ml-2 w-5 h-5 rounded-full flex justify-center items-center">{count}</div>
        </div>
    )
  }

  const Task = ({task, tasks, setTasks})=> {
    const [{ isDragging }, drag ] = useDrag(() => ({
        type: 'task',
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
      }))

    const handleRemove = (id)=> {
        console.log(id)
         const filteredTasks = tasks.filter((t) => t.id !== id)
         localStorage.setItem('tasks', JSON.stringify(filteredTasks))
         setTasks(filteredTasks)
         toast.success('task removed successfully')
    }
    return(
        <div ref={drag} className={`px-4 py-2 mt-4 shadow-md flex justify-between items-center cursor-grab ${isDragging? 'opacity-25': 'opacity-100'}`}>
            <p>{task.name}</p>
            <IoRemoveCircleOutline className="text-lg cursor-pointer" onClick={()=> handleRemove(task.id)} />
        </div>
    )
  }
  
  