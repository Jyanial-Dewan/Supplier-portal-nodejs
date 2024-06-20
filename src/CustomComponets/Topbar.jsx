// import { FiHome } from "react-icons/fi";
// import { FaRegBell } from "react-icons/fa";
// import { FaTasks } from "react-icons/fa";
// import { FaRegEnvelope } from "react-icons/fa6";
import { IoMdPower } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/client";
import { useContext, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import logo from "../images/Supplier-Portal.jpg"

const Topbar = () => {
  const context = useContext(GlobalContext);
  const {setToken, messages} = context;
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const uniquMessages = messages.filter((item, index) => 
    index === messages.findIndex(obj => 
      obj.date === item.date
    )
  );

const menus = [
    { name: "Home", to: 'homepage', icon: "home-outline", dis: "translate-x-[0.5rem]" },
    { name: "Alert", to: 'alert', icon: "notifications-outline", dis: "translate-x-[4.5rem]", counter: 0},
    { name: "Tasks", to: 'tasks', icon: "list-outline", dis: "translate-x-[8.5rem]", counter: 0 },
    { name: "Messages", to: 'notification/inbox', icon: "chatbox-outline", dis: "translate-x-[12.5rem]", counter: uniquMessages.length },
  ];

  const handleLogOut = async () => {
    
    let { error } = await supabase.auth.signOut()

    setToken('')

    console.log(error)
    navigate('/')
    
  }
  return (
    <div className="fixed z-50 bg-white h-20 w-full shadow-xl flex justify-between items-end">
      <div>
        <img src={logo} alt='Logo' className="w-20" />
      </div>
      <div className="bg-newblack max-h-[4.4rem] px-6 flex rounded-t-xl relative">
      <span className={`bg-newblack absolute border-[4px] border-white h-12 w-12 -top-3  rounded-full duration-500 ${menus[active].dis}`}>
        <span className="w-[14px] h-[14px] bg-transparent absolute top-[0.5rem] -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
        <span className="w-[14px] h-[14px] bg-transparent absolute top-[0.5rem] -right-[18px] rounded-tl-[11px] shadow-myShadow2"></span>
          
      </span>
        
          
        {menus.map((menu, i) => (
          <Link to={`/${menu.to}`} key={i} className="flex flex-col text-center pt-6 w-16 relative"
          onClick={() => {setActive(i); 
                          
          }}>
           <span
                className={`text-xl cursor-pointer duration-500 relative ${
                  i === active && "-mt-6 text-white"
                }`}
          >
            <ion-icon name={menu.icon}></ion-icon>
          </span>
          <span className={menu.counter > 0 ? `w-[13px] h-[13px] bg-rose-600 text-white flex justify-center items-center text-[0.5rem] rounded-full absolute right-[1.2rem] top-[1.5rem] duration-500 ${i === active && "-mt-6"}`: 'hidden'}>{menu.counter}</span>

          <span
                className={` ${
                  active === i
                    ? "translate-y-3 duration-500 opacity-100 text-[0.8rem]"
                    : "opacity-0 translate-y-10 text-[0.8rem]"
                } `}
              >
                {menu.name}
          </span>

          </Link>
        ))}

        <button className="">
          <IoMdPower onClick={handleLogOut} className="text-[2.5rem] p-2 mx-6 cursor-pointer rounded-full hover:border-2 hover:border-white"/>
        </button>
      </div>
    </div>
  )
}

export default Topbar
