import { useState, useContext } from "react"
import { supabase } from "@/client";
import { useNavigate } from "react-router-dom";
import GlobalContext from "@/context/GlobalContext";
import toast from "react-hot-toast";

const AddEmployee = () => {
    const [email, setEmail] = useState('')
    const [employee_name, setEmployee_name] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [job_title, setJob_title] = useState('')
    const [department_id, setDepartment_id] = useState('')
     
    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    const { fetchEmployees, departments } = context

     const addEmployee = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase
                                .from('employees')
                                .insert(
                                        { 
                                          employee_name: employee_name, 
                                          first_name: first_name,
                                          last_name: last_name,
                                          email: email,
                                          job_title: job_title,
                                          department_id: department_id,
                                          },
                                        )
                                .select()
                if(data) {
                    console.log(data)
                }

                if(error) {
                    console.log(error)
                    toast.error('there is a problem adding employee')
                } else {
                    toast.success('employee has been added successfully')
                }

                fetchEmployees();
                navigate('/employees')



     }
  return (
    <div className='pt-24 pl-20 flex justify-center items-center'>
        
      <form className="w-[700px] px-6 py-4 mb-8 border border-gray-100 shadow-md flex flex-col justify-center items-center"
           onSubmit={addEmployee}>
        <h2 className="text-xl text-center">Add Employee</h2>
        
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="firstName">First Name</label>
            <input type="text"
                   value={first_name}
                   onChange={(e)=>setFirst_name(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="lastName">Last Name</label>
            <input type="text"
                   value={last_name}
                   name="last_name"
                   onChange={(e)=>setLast_name(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="email">Email</label>
            <input type="email"
                   value={email}
                   name="email"
                   onChange={(e)=>setEmail(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="userName">Employee Name</label>
            <input type="text"
                   value={employee_name}
                   name="user_name"
                   onChange={(e)=>setEmployee_name(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="jobTitle">Job Title</label>
            <input type="text"
                   value={job_title}
                   name="job_title"
                   onChange={(e)=>setJob_title(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="lastName">Department ID</label>
            <select value={department_id}
                    onChange={(e)=>setDepartment_id(e.target.value)}
                    className="border-2 border-gray-100 px-4 h-12 rounded-md">
              {departments.map((dep)=>(
                <>
                <option value={dep.department_id}>{`${dep.department_id}(${dep.department_name})`}</option>
                </>
              ))}
            </select>
        </div>
        <button type="submit" className="py-2 px-8 rounded-md bg-black text-white">Submit</button>
      </form>
    </div>
  )
}

export default AddEmployee
