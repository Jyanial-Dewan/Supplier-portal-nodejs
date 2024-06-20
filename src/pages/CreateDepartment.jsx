import { useState, useContext } from "react"
import { supabase } from "@/client";
import { useNavigate } from "react-router-dom";
import GlobalContext from "@/context/GlobalContext";
import toast from "react-hot-toast";

const CreateDepartment = () => {
    const [department_id, setDepartment_id] = useState('')
    const [department_name, setDepartment_name] = useState('')
     
    
     const navigate = useNavigate()
     const context = useContext(GlobalContext)
     const { fetchDepartments } = context

     const createDepartment = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase
                                .from('departments')
                                .insert(
                                        { department_id: department_id, 
                                          department_name: department_name,
                                           },
                                        )
                                .select()
                if(data) {
                    console.log(data)
                }

                if(error) {
                    console.log(error)
                    toast.error('there is a problem creating department')
                } else {
                    toast.success('department has been created successfully')
                }

                fetchDepartments();
                navigate('/departments')
    }
  return (
    <div className='pt-24 pl-20 flex justify-center items-center'>
        
      <form className="w-[700px] px-6 py-4 mb-8 border border-gray-100 shadow-md flex flex-col justify-center items-center"
           onSubmit={createDepartment}>
        <h2 className="text-xl text-center">Create Department</h2>
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="firstName">Department ID</label>
            <input type="text"
                   value={department_id}
                   onChange={(e)=>setDepartment_id(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="middleName">Department Name</label>
            <input type="text"
                   value={department_name}
                   name="middle_name"
                   onChange={(e)=>setDepartment_name(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <button type="submit" className="py-2 px-8 rounded-md bg-black text-white">Submit</button>
      </form>
    </div>
  )
}

export default CreateDepartment
