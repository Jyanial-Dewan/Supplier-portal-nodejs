import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useContext } from "react";
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
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

import GlobalContext from "@/context/GlobalContext";
import { Link } from "react-router-dom";
import yes from "../images/yes.png"
import no from "../images/error.png"
 
const AllUsersPage = () => {
  const context = useContext(GlobalContext)
  const {open, allUsersData, deleteUser} = context

  const sortedAllusers = allUsersData.sort(function(a,b){
    return a.user_id - b.user_id
  })

  return (
    <section className={open? "pt-24 pl-[7rem] pr-4 duration-1000" : "pt-24 pl-[17.5rem] pr-4 duration-1000"}>
        <h2 className="text-2xl font-bold text-center mb-6 p-1 border border-gray-100">All Users</h2>
      <Table className="border border-gray-100 z-0 bg-transparent">
        <TableHeader className="bg-gray-100">
            <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[250px]">User ID</TableHead>
                <TableHead className="w-[100px]">User Name</TableHead>
                <TableHead className="w-[100px]">First Name</TableHead>
                <TableHead className="w-[100px]">Middle Name</TableHead>
                <TableHead className="w-[100px]">Last Name</TableHead>
                <TableHead className="w-[150px]">Email</TableHead>
                <TableHead className="w-[50px]">Job Title</TableHead>
                <TableHead className="w-[100px]">Organization Type</TableHead>
                <TableHead className="w-[100px]">Organization ID</TableHead>
                <TableHead className="w-[100px]">Organization ID Column Name</TableHead>
                <TableHead className="w-[100px]">Organization ID Table Name</TableHead>
                <TableHead className="w-[100px]">Domain Name</TableHead>
                <TableHead className="w-[100px]">GUID</TableHead>
                <TableHead className="w-[200px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {sortedAllusers.map((data)=>(
                <>
                <TableRow key={data.id}>
                    <TableCell  className="w-[100px]">{data.id}</TableCell>
                    <TableCell  className="w-[250px]">{data.user_id}</TableCell>
                    <TableCell  className="w-[100px]">{data.user_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.first_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.middle_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.last_name}</TableCell>
                    <TableCell  className="w-[150px]">{data.email}</TableCell>
                    <TableCell  className="w-[50px]">{data.job_title}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_type}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_id}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_id_column_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_id_table_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.domain_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.guid}</TableCell>
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
                            <img className="w-12 hover:scale-110"  src={yes} onClick={()=>deleteUser(data.user_id)} />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Link to={`/updateuser/${data.id}`}>
                        <button className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                      </Link>
                    </TableCell>
                </TableRow>
            </>
            ))}
        </TableBody>
      </Table>

      {/* <Pagination className='my-6'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/allusers" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/allusers/2">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/allusers/3">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/allusers/4">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="/allusers/2" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}


    </section>
  )
}

export default AllUsersPage
