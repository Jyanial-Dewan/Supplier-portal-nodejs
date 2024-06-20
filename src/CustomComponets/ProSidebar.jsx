import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { LuUserPlus } from "react-icons/lu";
import { BiSpreadsheet } from "react-icons/bi";
import { MdOutlineWidgets } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoIosPerson } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import { RiDragDropFill } from "react-icons/ri";
import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ProSidebar = () => {
    const context = useContext(GlobalContext);
    const {open, setOpen, user} = context;
    
    const handleClick = ()=> {
         setOpen((prevState) => !prevState) ;
    }
  return (
    <Sidebar collapsed={open} transitionDuration={1000} style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', paddingTop: '5rem', scrollBehavior: 'none', zIndex: '20'}} >
        
        {open ? <IoMenu className='text-4xl p-2 duration-500 bg-gray-100 rounded-md flex justify-center mx-auto my-2 cursor-pointer hover:rotate-[360deg]'
                onClick={handleClick}/> :
        <IoMdClose className='text-4xl p-2 duration-500 bg-gray-100 rounded-md flex justify-center mx-auto my-2 cursor-pointer hover:rotate-[360deg]'
        onClick={handleClick}/>}
        <Menu>
            <SubMenu label="User Management" icon={<LuUserPlus className='text-2xl'/>}>
                <MenuItem component={<Link to={'/adduser'}/>} icon={<LuUserPlus className='text-2xl'/>}> Add User </MenuItem>
                <MenuItem component={<Link to={'/allusers'}/>} icon={<FiUsers className='text-2xl'/>}> All Users </MenuItem>
                <MenuItem component={<Link to={'/invite-user'}/>} icon={<FiSend className='text-2xl'/>}> Invite User </MenuItem>
            </SubMenu>
            <SubMenu label="Departments" icon={<BiSpreadsheet className='text-3xl'/>}>
                <MenuItem component={<Link to={'/departments'}/>} icon={<BiSpreadsheet className='text-3xl'/>}>Departments </MenuItem>
                <MenuItem component={<Link to={'/create-department'}/>} icon={<LuFileSpreadsheet className='text-3xl'/>}>Create Department </MenuItem>
            </SubMenu>
            <SubMenu label="Employees" icon={<IoIosPerson className='text-3xl'/>}>
                <MenuItem component={<Link to={'/employees'}/>} icon={<IoIosPerson className='text-3xl'/>}>Employees</MenuItem>
                <MenuItem component={<Link to={'/add-employee'}/>} icon={<IoIosPersonAdd className='text-3xl'/>}>Add Employee </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to={'/dragndrop'}/>} icon={<RiDragDropFill className='text-2xl'/>}>Drag and Drop </MenuItem>
            <MenuItem component={<Link to={'/widget'}/>} icon={<MdOutlineWidgets className='text-2xl'/>}>Widget </MenuItem>
            <MenuItem component={<Link to={'/profile'}/>} icon={<FaRegUser className='text-2xl'/>}> {user} </MenuItem>
        </Menu>
    </Sidebar>
  )
}

export default ProSidebar
