import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useContext, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import yes from "../images/yes.png"
import no from "../images/error.png"
import { supabase } from "@/client";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";


const EmployeesPage = () => {
  const [isChecked, setIsChecked] = useState(false)

    //Employee State
    const [employee_id, setEmployee_id] = useState('')
    const [email, setEmail] = useState('')
    const [employee_name, setEmployee_name] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [job_title, setJob_title] = useState('')
    const [emp_department_id, setEmp_Department_id] = useState('101')
    const [showAddEmployee, setShowAddEmployee] = useState(false)
    const [showUpdateEmployee, setShowUpdateEmployee] = useState(false)
    const [emp_department_name, setEmp_Department_name] = useState('')

    //Department State
    const [department_id, setDepartment_id] = useState('')
    const [department_name, setDepartment_name] = useState('')
    const [showAddDepartment, setShowAddDepartment] = useState(false)
    const [showUpdateDepartment, setShowUpdateDepartment] = useState(false)
    
    const context = useContext(GlobalContext);
    const { open, departments, employees, deleteDepartment, fetchDepartments, fetchEmployees } = context;
    const [newEmployees, setNewEmployees] = useState(employees)

    const fetchSingleDepartment = async (departmentId) => {
      setShowUpdateDepartment(!showUpdateDepartment)
      let { data, error } = await supabase
                              .from('departments')
                              .select("*")
                              .eq('department_id', departmentId)
                                                  
      if(error) {
          console.log(error)
      }

      if(data) {
          console.log(data)
          setDepartment_id(data[0].department_id)
          setDepartment_name(data[0].department_name)
      }
    }
  

    const sortedDepartments = departments.sort(function(a,b){
      return a.department_id - b.department_id
    });

    const sortedEmployees = employees.sort(function(a,b){
      return a.employee_id - b.employee_id
    });

    const filterEmplpoyee = (depID)=> {
      const newEmployeesList = sortedEmployees.filter((employee)=> employee.department_id === depID);
      setNewEmployees(newEmployeesList)
      setIsChecked(depID)
      setEmp_Department_name(depID)
      setEmp_Department_id(depID)
     }

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
              setDepartment_id('')
              setDepartment_name('')
              setShowAddDepartment(!showAddDepartment)
              fetchDepartments();
    }

    const updateDepartment = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
                            .from('departments')
                            .update({ department_id: department_id, 
                                department_name: department_name,
                                },)
                            .eq('department_id', department_id)
                            .select()
            if(data) {
                console.log(data)
            }

            if(error) {
                console.log(error)
                toast.error('there is a problem updating department')
            } else {
                toast.success('department has been updated successfully')
            }
            setShowUpdateDepartment(!showUpdateDepartment)
            fetchDepartments();
            
    }

    const cancelAddDepartment = ()=> {
  setDepartment_id('')
  setDepartment_name('')
  setShowAddDepartment(!showAddDepartment)
    }

    const cancelUpdateDepartment = ()=>{
  setDepartment_id('')
  setDepartment_name('')
  setShowUpdateDepartment(!showUpdateDepartment)
    }

//Employee Functions
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
          setFirst_name('')
          setLast_name('')
          setEmail('')
          setJob_title('')
          setEmp_Department_id('101')
          setShowAddEmployee(!showAddEmployee)
          fetchEmployees()
          setNewEmployees(employees)
          setIsChecked(false)
}

    const cancelAddEmployee = ()=> {
      setEmployee_name('')
      setFirst_name('')
      setLast_name('')
      setEmail('')
      setJob_title('')
      //setEmp_Department_id('101')
      setShowAddEmployee(!showAddEmployee)
    }

    const cancelUpdateEmployee = ()=> {
      setEmployee_name('')
      setFirst_name('')
      setLast_name('')
      setEmail('')
      setJob_title('')
      //setEmp_Department_id('101')
      setShowUpdateEmployee(!showUpdateEmployee)
    }

    const fetchSingleEmployee = async (employeeId) => {
      setShowUpdateEmployee(!showUpdateEmployee)
      let { data, error } = await supabase
                              .from('employees')
                              .select("*")
                              .eq('employee_id', employeeId)
                                                  
      if(error) {
          console.log(error)
      }

      if(data) {
          console.log(data)
          setEmployee_id(data[0].employee_id)
          setFirst_name(data[0].first_name)
          setLast_name(data[0].last_name)
          setEmployee_name(data[0].employee_name)
          setJob_title(data[0].job_title)
          setEmp_Department_id(data[0].department_id)
          setEmail(data[0].email)
          
      }
  }

  const updateEmployee = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
                            .from('employees')
                            .update({ employee_name: employee_name, 
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                job_title: job_title,
                                department_id: emp_department_id,
                                 },)
                            .eq('employee_id', employee_id)
                            .select()
            if(data) {
                console.log(data)
            }

            if(error) {
                console.log(error)
                toast.error('there is a problem updating employee')
            } else {
                toast.success('employee has been updated successfully')
            }

            setEmployee_name('')
            setFirst_name('')
            setLast_name('')
            setEmail('')
            setJob_title('')
            setEmp_Department_id('101')
            setShowUpdateEmployee(!showUpdateEmployee)
            fetchEmployees()
            setNewEmployees(employees)
            setIsChecked(false)
            
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
        }
        fetchEmployees();
        setNewEmployees(employees)
        setIsChecked(false)
}
   
return (
    <section className={open? "pt-16 pl-[7rem] pr-4 duration-1000" : "pt-16 pl-[17.5rem] pr-4 duration-1000"}>
     
      <div className="max-h-[220px] overflow-auto flex-grow mb-6">
          <h2 className="text-xl font-bold text-center mb-4">Departments</h2>
          <Table className="border border-gray-100 z-0 bg-transparent">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[105px]">Check</TableHead>
                <TableHead className="w-[105px]">Department ID</TableHead>
                <TableHead className="w-[250px]">Department Name</TableHead>
                <TableHead className="w-[200px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex">
                      Action 
                      <IoIosArrowDown className="text-xl"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <button onClick={()=>setShowAddDepartment(!showAddDepartment)}>Add Department</button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
              <TableRow className={showAddDepartment? 'mt-0': 'hidden'}>
                <TableCell></TableCell>
                <TableCell>
                    <input type="text"
                      value={department_id}
                      onChange={(e)=>setDepartment_id(e.target.value)}
                      className="border border-gray-200 px-4 h-8 rounded-md"/>
                </TableCell>
                <TableCell>
                    <input type="text"
                          value={department_name}
                          onChange={(e)=>setDepartment_name(e.target.value)}
                          className="border-2 border-gray-200 px-4 h-8 rounded-md"/>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <button type="button" onClick={cancelAddDepartment} className="bg-red-600 px-4 py-2 mr-4 rounded-md">Cancel</button>
                    <button type="submit" onClick={createDepartment} className="bg-gray-200 px-4 py-2 rounded-md">Add</button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow className={showUpdateDepartment? 'mt-0': 'hidden'}>
                <TableCell></TableCell>
                <TableCell>
                    <input type="text"
                      value={department_id}
                      className="border border-gray-200 px-4 h-8 rounded-md"/>
                </TableCell>
                <TableCell>
                    <input type="text"
                          value={department_name}
                          onChange={(e)=>setDepartment_name(e.target.value)}
                          className="border-2 border-gray-200 px-4 h-8 rounded-md"/>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <button type="button" onClick={cancelUpdateDepartment} className="bg-red-600 px-4 py-2 mr-4 rounded-md">Cancel</button>
                    <button type="submit" onClick={updateDepartment} className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                  </div>
                </TableCell>
              </TableRow>
            {sortedDepartments.map((data)=>(
                <>
                <TableRow key={data.department_name} >
                    <TableCell>
                      <input type="checkbox" className="w-4 h-4" onClick={()=>filterEmplpoyee(data.department_id)} checked={isChecked===data.department_id && true} />
                    </TableCell>
                    <TableCell  className="w-[150px]">{data.department_id}</TableCell>
                    <TableCell  className="w-[250px]">{data.department_name}</TableCell>
                    
                    <TableCell  className="w-[200px] flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger className="bg-gray-200 px-4 py-2 rounded-md">Delete</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              <img className="w-12 hover:scale-110" src={no} />
                            </AlertDialogCancel>
                            <AlertDialogAction>
                            <img className="w-12 hover:scale-110"  src={yes} onClick={()=>deleteDepartment(data.department_id)} />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      
                      <button onClick={()=>fetchSingleDepartment(data.department_id)} className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                      
                    </TableCell>
                </TableRow>
            </>
            ))}
            </TableBody>
          </Table>
      </div>
        
      <div className="bg-black w-[100%] h-[2px] mx-auto"></div>

      <div className="mt-4 max-h-[280px] overflow-auto">
        <h2 className="text-xl font-bold text-center mb-4">{emp_department_name} Employees</h2>
        <Table className="border border-gray-100 z-0">
          <TableHeader className="bg-gray-100">
            <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead className="w-[100px]">Employee Name</TableHead>
                <TableHead className="w-[100px]">First Name</TableHead>
                <TableHead className="w-[100px]">Last Name</TableHead>
                <TableHead className="w-[120px]">Email</TableHead>
                <TableHead className="w-[50px]">Job Title</TableHead>
                <TableHead className="w-[100px]">Department ID</TableHead>
                <TableHead className="w-[200px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex">
                      Action 
                      <IoIosArrowDown className="text-xl"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <button onClick={()=>setShowAddEmployee(!showAddEmployee)}>Add Employee</button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                <TableRow className={showAddEmployee? 'mt-0' : 'hidden'}>
                  <TableCell>Auto Generated</TableCell>
                  <TableCell>
                  <input type="text"
                   value={employee_name}
                   onChange={(e)=>setEmployee_name(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="text"
                   value={first_name}
                   onChange={(e)=>setFirst_name(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="text"
                   value={last_name}
                   onChange={(e)=>setLast_name(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[120px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="text"
                   value={job_title}
                   onChange={(e)=>setJob_title(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <select value={emp_department_id}
                    onChange={(e)=>setEmp_Department_id(e.target.value)}
                    className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md">
                    {departments.map((dep)=>(
                    <>
                      <option value={dep.department_id}>{`${dep.department_id}(${dep.department_name})`}</option>
                    </>
                    ))}
                  </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                    <button type="button" onClick={cancelAddEmployee} className="bg-red-600 px-4 py-2 mr-2 rounded-md">Cancel</button>
                    <button type="submit" onClick={addEmployee} className="bg-gray-200 px-4 py-2 rounded-md">Add</button>
                    </div>
                  </TableCell>
                  
                </TableRow>
                <TableRow className={showUpdateEmployee? 'mt-0' : 'hidden'}>
                  <TableCell>
                  <input type="text"
                  value={employee_id}
                  className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md" />
                  </TableCell>
                  <TableCell>
                  <input type="text"
                   value={employee_name}
                   onChange={(e)=>setEmployee_name(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="text"
                   value={first_name}
                   onChange={(e)=>setFirst_name(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="text"
                   value={last_name}
                   onChange={(e)=>setLast_name(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[120px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <input type="text"
                   value={job_title}
                   onChange={(e)=>setJob_title(e.target.value)}
                   className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md"/>
                  </TableCell>
                  <TableCell>
                  <select value={emp_department_id}
                    onChange={(e)=>setEmp_Department_id(e.target.value)}
                    className="border-2 border-gray-100 px-1 h-8 w-[100px] rounded-md">
                    {departments.map((dep)=>(
                    <>
                      <option value={dep.department_id}>{`${dep.department_id}(${dep.department_name})`}</option>
                    </>
                    ))}
                  </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                    <button type="button" onClick={cancelUpdateEmployee} className="bg-red-600 px-4 py-2 mr-2 rounded-md">Cancel</button>
                    <button type="submit" onClick={updateEmployee} className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                    </div>
                  </TableCell>
                  
                </TableRow>
            {isChecked ? newEmployees.map((data)=>(
                <>
                <TableRow key={data.id}>
                    <TableCell  className="w-[50px]">{data.employee_id}</TableCell>
                    <TableCell  className="w-[100px]">{data.employee_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.first_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.last_name}</TableCell>
                    <TableCell  className="w-[120px]">{data.email}</TableCell>
                    <TableCell  className="w-[50px]">{data.job_title}</TableCell>
                    <TableCell  className="w-[100px]">{data.department_id}</TableCell>
                    <TableCell  className="w-[200px] flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger className="bg-gray-200 px-4 py-2 rounded-md">Delete</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              <img className="w-12 hover:scale-110" src={no} />
                            </AlertDialogCancel>
                            <AlertDialogAction>
                            <img className="w-12 hover:scale-110"  src={yes} onClick={()=>deleteEmployee(data.employee_id)} />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <button onClick={()=> fetchSingleEmployee(data.employee_id)} className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                      
                    </TableCell>
                </TableRow>
            </>
            )) : sortedEmployees.map((data)=>(
              <>
              <TableRow key={data.id}>
                  <TableCell  className="w-[100px]">{data.employee_id}</TableCell>
                  <TableCell  className="w-[100px]">{data.employee_name}</TableCell>
                  <TableCell  className="w-[100px]">{data.first_name}</TableCell>
                  <TableCell  className="w-[100px]">{data.last_name}</TableCell>
                  <TableCell  className="w-[120px]">{data.email}</TableCell>
                  <TableCell  className="w-[50px]">{data.job_title}</TableCell>
                  <TableCell  className="w-[100px]">{data.department_id}</TableCell>
                  <TableCell  className="w-[200px] flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-gray-200 px-4 py-2 rounded-md">Delete</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            <img className="w-12 hover:scale-110" src={no} />
                          </AlertDialogCancel>
                          <AlertDialogAction>
                          <img className="w-12 hover:scale-110"  src={yes} onClick={()=>deleteEmployee(data.employee_id)} />
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <button onClick={()=>fetchSingleEmployee(data.employee_id)} className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                  </TableCell>
              </TableRow>
          </>
          )) }
          </TableBody>
        </Table>
      </div>

     </section>
  )
}

export default EmployeesPage
