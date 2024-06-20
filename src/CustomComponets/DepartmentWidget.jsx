import { FiMinus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const DepartmentWidget = ({newDepartments}) => {
  return (
    <div className="w-[700px] bg-gradient-to-b from-blue to-spblue rounded-xl text-otherblue shadow-lg p-4">
      <div className="flex justify-end gap-2">
            <FiMinus className="text-2xl cursor-pointer"/>
            <IoMdClose className="text-2xl cursor-pointer"/>
        </div>
        <div>
            <label className="font-bold" htmlFor="employeeName">Department Name </label>
            <select className="bg-transparent border-2 border-otherblue/50 outline-none w-[300px] rounded-md ml-4" >
                <option value="departmentname">{newDepartments[0].department_name}</option>
            </select>
        </div>
    </div>
  )
}

export default DepartmentWidget
