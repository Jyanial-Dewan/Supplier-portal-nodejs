import { FiMinus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable"
import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import yes from "../images/yes.png"
import no from "../images/error.png"
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
// import toast from "react-hot-toast";
// import { CSS } from "@dnd-kit/utilities";

const Widget2 = (props) => {
    const context = useContext(GlobalContext);
    const {localDepartments} = context;
    const employee = props.id;
    const handleChange = props.handleChange;
    const handleMinimize = props.handleMinimize;
    const index = props.index;
    const deleteEmployee = props.deleteEmployee;
    
    // {employee, setMergedArray, mergedArray, index, deleteEmployee, departments}
    const {
        attributes,
        listeners,
        setNodeRef,
        // transform,
        // transition
    } = useSortable({id: props.id});

//    const style = {
//     transform: CSS.Transform.toString(transform),
//     transition
//    }
   return (
    <section>
        <div className={employee.widget_state ? "w-[300px] bg-gradient-to-b from-blue to-spblue rounded-xl text-black shadow-md shadow-blue p-4": "w-[600px] bg-gradient-to-b from-blue to-spblue rounded-xl text-black shadow-md shadow-black/50 p-4"} >
        <div className='flex justify-between items-center mb-4'>
            <div  ref={setNodeRef} {...attributes} {...listeners} className={employee.widget_state? "w-[250px] h-[30px] cursor-grab": "w-[500px] h-[30px] cursor-grab"}>
                
            </div>
            <div className="flex items-center gap-2">
                {employee.widget_state ? 
                <MdOutlineOpenInFull onClick={()=>handleMinimize(index)} className="text-xl hover:scale-110 cursor-pointer"/> :
                <FiMinus onClick={()=>handleMinimize(index)} className="text-2xl hover:scale-110 cursor-pointer"/>
                }
                <AlertDialog>
                    <AlertDialogTrigger>
                        <AiOutlineDelete className="text-2xl hover:scale-110 cursor-pointer"/>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                <img className="w-12 hover:scale-110" src={no} />
                            </AlertDialogCancel>
                            <AlertDialogAction>
                                <img className="w-12 hover:scale-110"  src={yes} onClick={()=>deleteEmployee(employee.emp_id)} />
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

        <form className="flex flex-col gap-4">
            <div className="flex gap-2">
                <label className="font-bold">UserName </label>
                <input type="text"
                value={employee.emp_name}
                onChange={e => handleChange(index, 'emp_name', e.target.value)}
                className="bg-transparent border-2 border-black/50 outline-none w-[130px] rounded-md pl-1"
                required/>
            </div>

            <div className={employee.widget_state ? "hidden" : "flex justify-between"}>
               <div className="flex flex-col gap-2">
                    <label className="font-bold">Job Title</label>
                    <input type="text"
                    value={employee.job_title}
                    onChange={e => handleChange(index, 'job_title', e.target.value)}
                    className="bg-transparent border-2 border-black/50 outline-none w-[200px] rounded-md pl-1"
                    required/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Email</label>
                    <input type="text"
                    value={employee.email}
                    onChange={e => handleChange(index, 'email', e.target.value)}
                    className="bg-transparent border-2 border-black/50 outline-none w-[200px] rounded-md pl-1"
                    required/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Department Name</label>
                    <select value={employee.dep_id}
                            onChange={e => handleChange(index, 'dep_id', e.target.value)}
                            className="bg-transparent border-2 border-black/50 outline-none w-[150px] rounded-md pl-1">
                        {localDepartments.map(dep => (
                            <option key={dep.dep_id} value={dep.dep_id}>{dep.dep_name}</option>
                        ))}

                    </select>
                </div>
            </div>
        </form>
      
    </div>
    </section>
  )
}

export default Widget2
