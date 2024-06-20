import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";

const CreateTask = ({setTasks}) => {
    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo' //can also be in-progress or complete
    })

    const handleSubmit = (e)=> {
        e.preventDefault()

        setTasks((prevState)=> {
            const list = [...prevState, task]

            if(task.name.length < 3) return toast.error('the task must have more than 3 words')
            
            if(task.name.length > 100) return toast.error('the task must not have more than 100 words')

            localStorage.setItem("tasks", JSON.stringify(list))

            return list
            
        })

        toast.success('task has been added successfully')

        setTask({
            id: '',
            name: '',
            status: 'todo'
        })
}
  return (
    <form className="w-[450px] flex justify-between" onSubmit={handleSubmit}>
      <input type="text" 
      value={task.name}
      className="w-[70%] border border-gray-400 px-4 rounded-md" 
      onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value})} />
      <button type="submit" className="bg-black text-white px-6 py-2 rounded-md">Create</button>
    </form>
  )
}

export default CreateTask
