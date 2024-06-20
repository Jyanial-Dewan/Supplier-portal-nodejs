import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useContext } from "react";
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

import { Link } from "react-router-dom";
import yes from "../images/yes.png"
import no from "../images/error.png"

const DepartmentsPage = () => {
    const context = useContext(GlobalContext);
    const { open, departments, deleteDepartment } = context;
   
    const sortedDepartments = departments.sort(function(a,b){
        return a.department_id - b.department_id
      });


  return (
    <section className={open? "pt-24 pl-[7rem] pr-4 duration-1000" : "pt-24 pl-[17.5rem] pr-4 duration-1000"}>
        <h2 className="text-2xl font-bold text-center mb-6 p-1 border border-gray-100">Departments</h2>
      <Table className="border border-gray-100 z-0 bg-transparent">
        <TableHeader className="bg-gray-100">
            <TableRow>
                <TableHead className="w-[105px]">Department ID</TableHead>
                <TableHead className="w-[250px]">Department Name</TableHead>
                
                <TableHead className="w-[200px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {sortedDepartments.map((data)=>(
                <>
                <TableRow key={data.id}>
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

                      <Link to={`/update-department/${data.department_id}`}>
                        <button className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                      </Link>
                    </TableCell>
                </TableRow>
            </>
            ))}
        </TableBody>
      </Table>

     </section>
  )
}

export default DepartmentsPage
