import { GoInbox } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";

const DraftPage = () => {
    const context = useContext(GlobalContext);
    const {open, user, localMessages} = context;

    const handleDelete = async (id) => {
        const Response = await fetch(`http://localhost:3000/messages/${id}`, {
            method: 'DELETE'
          });
    
          if (Response.ok) {
            toast.success('Message has been deleted')
          } else {
            toast.error('there is a problem deleting message')
          }
    }

    let sentMessages = localMessages.filter((msg) => {
        return msg.status === "draft";
       })
 
     const actualMessages = sentMessages.filter(obj => obj.sender === user);
     
     const sortedMessages = actualMessages.sort((a,b) => {
         return b.id - a.id
     })
    
  return (
    <section className="pr-4 mb-6">
        <div className={open? 'pt-24 pl-24 max-w-[100vw] duration-1000 z-0': 'pt-24 pl-[16.5rem] max-w-[100vw] duration-1000 z-0'}>
            <h2 className="text-xl font-bold text-center">Notifications</h2>
            <div className="flex mt-6">
                <div className="flex flex-col bg-gray-100 px-4 py-2 fixed">
                    <NavLink to={'/notification/inbox'} className={({isActive}) => isActive? "flex gap-4 px-4 py-2 cursor-pointer bg-black text-white": "flex gap-4 px-4 py-2 cursor-pointer hover:bg-black/10"}>
                        <GoInbox className="text-2xl"/>
                        <p className="font-semibold">Inbox</p>
                    </NavLink>
                    <NavLink to={'/notification/sent'} className={({isActive}) => isActive? "flex gap-4 px-4 py-2 cursor-pointer bg-black text-white": "flex gap-4 px-4 py-2 cursor-pointer hover:bg-black/10"}>
                        <BsSend className="text-2xl"/>
                        <p className="font-semibold">Sent</p>
                    </NavLink>
                    <NavLink to={'/notification/draft'} className={({isActive}) => isActive? "flex gap-4 px-4 py-2 cursor-pointer bg-black text-white": "flex gap-4 px-4 py-2 cursor-pointer hover:bg-black/10"}>
                        <RiDraftLine className="text-2xl"/>
                        <p className="font-semibold">Draft</p>
                    </NavLink>
                </div>

                <div className="px-12 py-8 border shadow-md flex-grow ml-[10rem]">
                        <p className="text-2xl font-semibold my-6">Sent</p>
                        <div className="grid grid-cols-9 gap-2 py-6 border-b border-gray-200">
                            <div className="col-start-1 col-end-2">
                                <p className="font-semibold">To</p>
                            </div>
                            <div className="col-start-3 col-end-5">
                                <p className="font-semibold">Subject </p>
                            </div>
                            <div className="col-start-5 col-end-8">
                                <p className="font-semibold">Body</p>
                            </div>
                            <div className="col-start-8 col-end-8">
                                <p className="font-semibold">Date</p>
                            </div>
                        </div>
    
                        {sortedMessages.map((msg) => (
                            <div  key={msg.id} className="grid grid-cols-9 gap-2 py-6 border-b border-gray-200">
                                <Link to={`/notification/draft/${msg.id}`} className="col-start-1 col-end-2">
                                    <p>{msg.recipients.join(', ')}</p>
                                </Link>
                                <Link to={`/notification/draft/${msg.id}`} className="col-start-3 col-end-5">
                                    <p>{msg.subject.slice(0,60)} {msg.subject.length > 60 ? (<span>......</span>) : null}</p>
                                </Link>
                                <Link to={`/notification/draft/${msg.id}`} className="col-start-5 col-end-8">
                                    <p>{msg.body.slice(0,60)} {msg.body.length > 60 ? (<span>......</span>) : null}</p>
                                </Link>
                                <Link to={`/notification/draft/${msg.id}`} className="col-start-8 col-end-8">
                                    <p>{msg.date}</p>
                                </Link>
                                <div className="col-start-9 col-end-9 self-center justify-self-end hover:scale-110 cursor-pointer"
                                    onClick={() => handleDelete(msg.id)}>
                                    <MdOutlineDelete className="text-xl"/>
                                </div>
                            </div>
                        ))}
    
                    </div>
            </div>
        </div>
    </section>
  )
}


export default DraftPage
