import GlobalContext from "@/context/GlobalContext"
import { useContext, useState, useEffect } from "react"
import DepartmentWidget from "@/CustomComponets/DepartmentWidget"
import { supabase } from "@/client";
import toast from "react-hot-toast";
import { AiOutlineSave } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WidgetContext from "@/context/WidgetContext";
import Widget from "@/CustomComponets/Widget";

const WidgetPage = () => {
    const context = useContext(GlobalContext)
    const { open, employees, departments, fetchEmployees } = context
    const [newEmployees, setNewEmployees] = useState(employees)
    const [isClicked, setIsClicked] = useState('');
    const [isMinimized, setIsMinimized] = useState([])
    const [isDeleted, setIsDeleted] = useState([])
    const [employee_id, setEmployee_id] = useState('Auto')
    const [email, setEmail] = useState('')
    const [employee_name, setEmployee_name] = useState('')
    const [emp_department_id, setEmp_Department_id] = useState('101')
    const [job_title, setJob_title] = useState('')
    const [showAddEmployee, setShowAddEmployee] = useState(false)
    const [newDepartments, setNewDepartments] = useState([])
    const [dropDepartments, setDropDepartments] = useState([])
    
    useEffect(()=>{
        setNewDepartments(departments)
    }, [departments])

    const sortedEmployee = employees.sort(function(a,b){
        return a.employee_id - b.employee_id
    })

    useEffect(()=>{
        setIsMinimized(JSON.parse(localStorage.getItem("isMinimized")))
    },[])
    
    
    
   const filterEmplpoyee = (depID)=> {
        const newEmployeesList = sortedEmployee.filter((employee)=> employee.department_id === depID);
        setNewEmployees(newEmployeesList)
        const newDepartmentList = departments.filter((dep)=> dep.department_id === depID);
        setNewDepartments(newDepartmentList)
        setIsClicked(depID)
       }

    const deleteEmployee = async (employeeID)=> {
    
        const { error } = await supabase
              .from('employees')
              .delete()
              .eq('employee_id', employeeID)
      
              if(error) {
                console.log(error)
                toast.error('there is a problem deleting employee')
              } else {
                toast.success('employee has been deleted successfully')
                setIsDeleted((prev) => [...prev, employeeID])
              }
      }

    const handleCancel = ()=> {
        setShowAddEmployee(!showAddEmployee)
        setEmp_Department_id('101')
    }

    const addEmployee = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase
                            .from('employees')
                            .insert(
                                    { 
                                      employee_name: employee_name, 
                                      email: email,
                                      job_title: job_title,
                                      department_id: emp_department_id,
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
                setEmployee_name('')
                setEmail('')
                setJob_title('')
                fetchEmployees()
                setNewEmployees(employees)
                setEmp_Department_id('101')
                setShowAddEmployee(!showAddEmployee)
                setIsClicked('')
  }

  const handleDragEnd =(event)=>{
    const {active: draggedItem, over: tragetItem} = event;

    setNewEmployees(()=>{
        const oldIndex = newEmployees.findIndex((emp)=> emp.employee_id === draggedItem.id.employee_id);
        const newIndex = newEmployees.findIndex((emp)=> emp.employee_id === tragetItem.id.employee_id);

        return arrayMove(newEmployees, oldIndex, newIndex)
    })

  }

  return (
    <WidgetContext.Provider value={{isMinimized: isMinimized, setIsMinimized: setIsMinimized, deleteEmployee: deleteEmployee}}>
        <div className={open? "pt-24 pl-[7rem] pr-4 duration-1000" : "pt-24 pl-[17.5rem] pr-4 duration-1000"}>
      <div className="fixed flex flex-col gap-2 w-[200px]">
        {departments.map((dep) =>(
            <div onClick={()=>filterEmplpoyee(dep.department_id)} className={isClicked === dep.department_id ? "bg-blue/80 shadow-md rounded-md px-4 py-1 cursor-pointer": "bg-spblue/30 shadow-md rounded-md px-4 py-1 cursor-pointer "} key={dep.department_id}>
                {dep.department_name}
            </div>
        ))}
      </div>
      <div className="ml-[230px] flex flex-col bg-spblue/30 py-6 rounded-lg w-[750px] items-center">
        {isClicked? <div>
                        <DepartmentWidget newDepartments={newDepartments}/>
                    </div> : 
                    <div>
                        <div className="w-[200px] h-[200px] border border-dotted border-blue flex justify-center items-center">
                            <div>Drag Here</div>
                        </div>
                    </div>}

        <div className="w-[90%] mx-auto bg-blue h-[2px] my-8"></div>

        <div className="flex flex-col items-center gap-6">
            <div className="w-[700px] flex flex-col gap-4 items-end">
                <BiAddToQueue onClick={()=>setShowAddEmployee(!showAddEmployee)} className="text-2xl hover:scale-110 cursor-pointer mx-4"/>
                <div className={showAddEmployee? "w-[700px] bg-gradient-to-b from-blue to-spblue text-otherblue shadow-lg p-4 rounded-lg": 'hidden'}>
                    <div className="flex justify-end gap-2">
                        <AiOutlineSave type="submit" onClick={addEmployee} className="text-2xl hover:scale-110 cursor-pointer"/>
                        <AiOutlineClose onClick={handleCancel} className="text-2xl hover:scale-110 cursor-pointer"/>
                    </div>
                    <div>
                        <label className="font-bold" htmlFor="employeeName">Employee Name </label>
                        <input type="text"
                               value={employee_name}
                               onChange={(e)=> setEmployee_name(e.target.value)}
                               className="bg-transparent border-2 border-otherblue/50 outline-none w-[200px] rounded-md pl-1" />
                    </div>
                    <div className="flex justify-between mt-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="employeeid">Employee Id</label>
                                <input type="text"
                                        value={employee_id}
                                        className="bg-transparent border-2 border-otherblue/50 outline-none w-[100px] rounded-md pl-1" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="jobtitle">Job Title</label>
                                <input type="text"
                                value={job_title}
                                onChange={(e)=>setJob_title(e.target.value)}
                                className="bg-transparent border-2 border-otherblue/50 outline-none w-[200px] rounded-md pl-1"/>
                            </div>
        
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="employeeid">Email</label>
                                <input type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="bg-transparent border-2 border-otherblue/50 outline-none w-[180px] rounded-md pl-1"/>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="employeeid">Department Id</label>
                                <select className="bg-transparent border-2 border-otherblue/50 outline-none w-[100px] rounded-md"
                                        value={emp_department_id}
                                        onChange={(e)=>setEmp_Department_id(e.target.value)} >
                                    {departments.map((dep)=> (
                                        <option key={dep.department_id} value={dep.department_id}>{`${dep.department_id}(${dep.department_name})`}</option>
                                    ))}
                                </select>
                            </div>
                    </div>
                </div>
            </div>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                <SortableContext items={newEmployees}
                                 strategy={verticalListSortingStrategy}>
                    {isClicked? newEmployees.map((emp)=> (
                    <div key={emp.employee_id} className={isDeleted.includes(emp.employee_id) ? 'hidden' : 'p-0'}>
                        <Widget key={emp.employee_id} id={emp} />
                    </div>
                    )): ''}
                </SortableContext>
            
            </DndContext>
        </div>
      </div>
    </div>
    </WidgetContext.Provider>
  )
}

export default WidgetPage
