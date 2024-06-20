import logo from "../images/Supplier-Portal.jpg"
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { LuUserPlus } from "react-icons/lu";
import { LuDot } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import GlobalContext from "@/context/GlobalContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const context = useContext(GlobalContext);
    const {open, setOpen, token} = context;
    const [show, setShow] = useState(false);
    const handleClick = ()=> {
        setOpen((prevState) => !prevState) ;
        
    }
  return (
    <div className={open? "bg-gray-50 fixed z-10 w-60 flex flex-col items-center h-[100vh] mt-12 border-r border-gray-200 duration-1000": "bg-gray-50 fixed z-10 w-20 flex flex-col items-center h-[100vh] mt-12 border-r border-gray-200 duration-1000"}>
      <img src={logo} />
      <div className={open?"hidden" : "text-[1.5rem] mt-4 p-2 duration-500 bg-gray-100 cursor-pointer hover:rotate-[360deg]"}
           onClick={handleClick}>
        <IoMenu/>
      </div>
      <div className={open? "text-[1.5rem] mt-4 p-2 duration-500 bg-gray-100 cursor-pointer hover:rotate-[360deg]" : "hidden"}
           onClick={()=>setOpen(!open)}>
        <IoMdClose/>
      </div>

      <div>
        <div className="mt-4 flex items-center cursor-pointer" onClick={()=>setShow(!show)}>
            <LuUserPlus className="text-[1.5rem] "/>
            <div className={open? "flex items-center": "hidden"}>
             <p className="text-lg mx-2">User Management</p>
             
            </div>
        </div>

        {show? <FaAngleDown className={open ? "absolute top-[233px] right-[10px] cursor-pointer" : "hidden"} onClick={()=>setShow(!show)}/> : <FaAngleRight className={open ? "absolute top-[233px] right-[10px] cursor-pointer" : "hidden"} onClick={()=>setShow(!show)}/>}
        
        

        <ul className={open && show ? "block p-1" : "hidden"}>
            <li >
                <Link to={'/adduser'} className="flex mt-4 ml-4 p-1 cursor-pointer hover:bg-black/10">
                    <LuUserPlus className="text-[1.5rem] "/>
                    <p className="text-lg ml-4">Add User </p>
                </Link>
            </li>
            <li >
                <Link to={'/allusers'} className="flex mt-4 ml-4 p-1 cursor-pointer hover:bg-black/10">
                    <FiUsers className="text-[1.5rem] "/>
                    <p className="text-lg ml-4">All Users </p>
                </Link>
            </li>
            <li className="flex mt-4 ml-4 p-1 cursor-pointer hover:bg-black/10">
                <FiSend className="text-[1.5rem] "/>
                <p className="text-lg ml-4">Invite User </p>
            </li>
        </ul>

        <ul className={!open && show ? "block absolute bg-gray-100 shadow-md p-4 w-56 left-20 top-12" : "hidden"} 
            onClick={()=>setShow(!show)}>
            <li>
                <Link to={'/adduser'} className="flex mt-4 ml-4 p-1 cursor-pointer hover:bg-black/10">
                    <LuUserPlus className="text-[1.5rem] "/>
                    <p className="text-lg ml-4">Add User </p>
                </Link>
            </li>
            
            <li >
                <Link to={'/allusers'} className="flex mt-4 ml-4 p-1 cursor-pointer hover:bg-black/10">
                    <FiUsers className="text-[1.5rem] "/>
                    <p className="text-lg ml-4">All Users </p>
                </Link>
            </li>
            <li className="flex mt-4 ml-4 p-1 cursor-pointer hover:bg-black/10">
                <FiSend className="text-[1.5rem] "/>
                <p className="text-lg ml-4">Invite User </p>
            </li>
        </ul>

        <div>
            <div>
                <LuDot className={open? "hidden" : "text-[1.5rem] absolute top-[130px] right-[10px]"}/>
            </div>
        </div>

        <div className="mt-4 flex items-center cursor-pointer">
            <FaList className="text-[1.2rem]"/>
            <p className={open? "text-lg ml-2": "hidden"}>Items</p>
        </div>

        <div>
            <Link to='/profile' className="mt-4 flex items-center cursor-pointer">
                <FaRegUser className="text-[1.2rem]"/>
                <p className={open? "text-lg ml-2": "hidden"}>{token.user.email}</p>
            </Link>
        </div>
      </div>

    </div>
  )
}

export default Sidebar
