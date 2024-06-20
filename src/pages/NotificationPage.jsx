import { GoInbox } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import GlobalContext from "@/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import socket from "@/CustomComponets/Socket";
// import recipent from "../images/end-user.png";
import { IoIosCheckmark } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";


const NotificationPage = () => {
    const context = useContext(GlobalContext);
    const {open, localMessages, user, messages, setMessages, localUsers} = context;
    const [openWidget, setOpenWidget] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    // const [newAllUsers, setNewAllUsers] = useState([]);
    // const [isAllChecked, setIsAllChecked] = useState(false);
    const [newLocalMessages, setNewLocalMessages] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [isAllClicked, setIsAllClicked] = useState(false);
    
    console.log(user)

    
    useEffect(()=>{
        setNewLocalMessages(localMessages)
    }, [localMessages])

    // const [recipients, setRecipients] = useState(
    //     newAllUsers.reduce((acc, item) => {
    //         acc[item.user_name] = false;
    //         return acc;
    //     }, {})
    // );
    // useEffect(()=>{
    //     setNewAllUsers(allUsersData)
    // },[allUsersData])

    

    const uniquMessagesIds = messages.map(msg => (msg.id));
    console.log(uniquMessagesIds)

    const handleUniqueMessages = (id) => {
        const newArray = messages.filter(msg => msg.id !== id);
        setMessages(newArray)
    }

    
    let newDate = new Date();
    let date = newDate.toLocaleString()

    let maxValue =  Math.max(...newLocalMessages.map(obj => obj.id));
    

    // const handleCheckboxChange = (event) => {
    //     const { name, checked } = event.target;
    //     setRecipients((prevCheckedItems) => ({...prevCheckedItems, [name] : checked}));

    //     // If any checkbox is unchecked, uncheck "select all" checkbox
    // if (!checked) {
    //     setIsAllChecked(false);
    //   } else {
    //     // If all individual checkboxes are checked, check "select all" checkbox
    //     const allChecked = newAllUsers.every(user => recipients[user.user_name] || user.user_name === name);
    //     setIsAllChecked(allChecked);
    //   }
    //   };

      // Handle "select all" checkbox change
//   const handleSelectAllChange = (event) => {
//     const { checked } = event.target;
//     setRecipients(
//       newAllUsers.reduce((acc, item) => {
//         acc[item.user_name] = checked;
//         return acc;
//       }, {})
//     );
//     setIsAllChecked(checked);
//   };

    //   const selectedRecipients = newAllUsers
    //   .filter(user => recipients[user.user_name])
    //   .map(user => user.user_name);

    //   console.log(selectedRecipients)
    

    const handleSend = async (status) => {
        const data = {
            id: maxValue+1,
            sender: user,
            recipients: recipients,
            subject,
            body,
            date,
            status
        }

        const response = await fetch("http://localhost:3000/messages", {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });

        if (response.ok) {
            toast.success('message sent')
        } 

        socket.emit('sendMeassage', {
            id: maxValue+1,
            sender: user,
            recivers: recipients,
            subject,
            body,
            date,
            status
        })
        setRecipients([]);
        setSubject('');
        setBody('');
        setOpenWidget(false)
        setOpenList(false)
    }

    const handleClose = async (status) => {
        if(recipients.length === 0 || subject === '' || body === '') {
            setOpenWidget(false)
            return
        } else {
            const data = {
                id: maxValue+1,
                sender: user,
                recipients: recipients,
                subject,
                body,
                date,
                status
            }
    
            const response = await fetch("http://localhost:3000/messages", {
                method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
    
            if (response.ok) {
                toast.success('message saved to draft')
            } 
    
            setRecipients([]);
            setSubject('');
            setBody('');
            setOpenWidget(false)
            setOpenList(false)
        }

        
    }

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
    
    const handleReciever = (reciever) => {
        if(isAllClicked){
            const newArray = recipients.filter(rcvr => rcvr !== reciever)
            setRecipients(newArray)
            // setIsAllClicked(false)
            // setRecipients([])
            // setRecipients((prevArray) => [...prevArray, reciever])
        } 
        if(recipients.includes(reciever)) {
            return
        } else {
            setRecipients((prevArray) => [...prevArray, reciever])
        }
    }

    const handleRemoveReciever = (reciever) => {
        const newRecipients = recipients.filter(rcvr => rcvr !== reciever);
        setRecipients(newRecipients)
    }
    
    const handleSelectAll = ()=>{
        setIsAllClicked(true);
        const allusers = localUsers.map(user => (user.user_name));
        setRecipients(allusers)
    }

    let sentMessages = newLocalMessages.filter((msg) => {
      return  msg.status === "sent";
    })

    let actualMessages = sentMessages.filter((msg) => {
        return msg.recipients.includes(user)
    })

    let sortedMessages = actualMessages.sort((a, b) => {
        return b.id - a.id
    })

  return (
    <section className="pr-4 mb-6">
        <div className={open? 'pt-24 pl-24 max-w-[100vw] duration-1000 z-0': 'pt-24 pl-[16.5rem] max-w-[100vw] duration-1000 z-0'}>
            <h2 className="text-xl font-bold text-center">Messages</h2>
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

                <div className={`fixed bottom-4 ${open && "left-24"} left-68 duration-1000 flex gap-2 bg-black text-white px-4 py-1 rounded-md cursor-pointer`}
                    onClick={()=> setOpenWidget(true)}>
                    <CiEdit className="text-2xl"/>
                    <p>Compose New</p>
                </div>

                <div className="px-12 py-8 border shadow-md flex-grow ml-[10rem]">
                    <p className="text-2xl font-semibold my-6">Inbox</p>
                    <div className="grid grid-cols-9 gap-2 py-6 border-b border-gray-200">
                        <div className="col-start-1 col-end-2">
                            <p className="font-semibold">From</p>
                        </div>
                        <div className="col-start-3 col-end-5">
                            <p className="font-semibold">Subject </p>
                        </div>

                        <div className="col-start-5 col-end-8">
                            <p className="font-semibold">Body </p>
                        </div>
                        <div className="col-start-8 col-end-8">
                            <p className="font-semibold">Date</p>
                        </div>
                    </div>

                    {sortedMessages.map((msg) => (
                        <div key={msg.id} className={uniquMessagesIds.includes(msg.id) ? "grid grid-cols-9 gap-3 py-4 border-b border-gray-200 px-2 bg-slate-200 " : "grid grid-cols-9 gap-3 py-4 border-b border-gray-200"}
                            onClick={() => handleUniqueMessages(msg.id)}>
                            <Link to={`/notification/inbox/${msg.id}`} className="col-start-1 col-end-2">
                                <p>{msg.sender}</p>
                            </Link>
                            <Link to={`/notification/inbox/${msg.id}`} className="col-start-3 col-end-5 ">
                                <p>{msg.subject.slice(0,60)} {msg.subject.length > 60 ? (<span>...</span>) : null}</p>
                            </Link>
                            <Link  to={`/notification/inbox/${msg.id}`}  className="col-start-5 col-end-8 ">
                                <p>{msg.body.slice(0,60)} {msg.body.length > 60 ? (<span>...</span>) : null}</p>
                            </Link>
                            <Link to={`/notification/inbox/${msg.id}`} className="col-start-8 col-end-8">
                                <p>{msg.date}</p>
                            </Link>
                            <div className="col-start-9 col-end-9 self-center justify-self-end hover:scale-110 cursor-pointer"
                                onClick={() => handleDelete(msg.id)}>
                                <MdOutlineDelete className="text-xl"/>
                            </div>
                        </div>
                    ))}
                    
                </div>

                <div className={openWidget ? "absolute z-10 bg-white border-2 border-black w-[500px] h-[420px] rounded-t-xl right-60": 'hidden'}> 
                    <div className="h-12 w-full bg-black rounded-t-lg text-white p-4 flex justify-end">
                        <AiOutlineClose className="text-2xl cursor-pointer" onClick={()=> handleClose('draft')}/>
                    </div>
                    <div className="flex flex-col p-4 gap-4 relative">
                        <div className="flex flex-col gap-1">
                            <div className="bg-black text-white px-4 py-1 rounded-md w-[150px] cursor-pointer" onClick={()=> setOpenList(true)}>
                                <p>Select Recipients</p>
                            </div>

                            <div className={openList? "max-w-[250px] flex gap-2 max-h-[80px] overflow-auto flex-wrap": "max-w-[full] flex gap-2 max-h-[80px] overflow-auto flex-wrap"}>
                                {recipients.map((reciever) => (
                                    <div key={reciever} className="bg-black text-white px-2 py-1 rounded-full flex gap-1 items-center">
                                        <p>{reciever}</p>
                                        <AiOutlineClose className="text-sm text-white cursor-pointer" onClick={()=> handleRemoveReciever(reciever)}/>
                                    </div>
                                ))}
                                
                            </div>

                            <div className={openList ? "flex flex-col gap-1 bg-white absolute z-[2] h-[300px] w-[200px] overflow-y-auto right-4 border shadow-md pl-2 pt-2" : 'hidden'}>
                                <div className="flex justify-end cursor-pointer" onClick={()=> setOpenList(false)}>
                                    <AiOutlineClose className="text-2xl text-black"/>
                                </div>
                                <div className="flex gap-1 hover:bg-black/20 cursor-pointer" onClick={handleSelectAll}>
                                    <p>All</p>
                                </div>
                                {/* <div className="flex gap-1">
                                    <input type="checkbox"
                                            checked={isAllChecked}
                                            onChange={handleSelectAllChange} />
                                    <p>All</p>
                                </div> */}
                            {localUsers.map(user => (
                                <div key={user.id} className="flex items-center gap-1 hover:bg-black/20 cursor-pointer" onClick={() => handleReciever(user.user_name)}>
                                {/* <input type="checkbox"
                                        name={user.user_name}
                                        checked={recipients[user.user_name]}
                                        onChange={handleCheckboxChange}

                                /> */}
                                <p>{user.user_name}</p>
                                <IoIosCheckmark className={recipients.includes(user.user_name) ? "text-lg text-white bg-green-800 p-[0.05rem] rounded-full" : "hidden"}/>
                                </div>
                            ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Subject : </label>
                            <input type="text"
                                    value={subject}
                                    onChange={(e)=> setSubject(e.target.value)}
                                    className="w-full h-8 bg-transparent border border-black outline-none rounded-md pl-2" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Body : </label>
                            <textarea type="text"
                                        value={body}
                                        onChange={(e)=> setBody(e.target.value)}
                                        className="w-full h-16 bg-transparent border border-black outline-none rounded-md pl-2" />
                        </div>

                        <button onClick={() => handleSend('sent')} className={recipients.length === 0 || subject === '' || body === '' ?"opacity-0 duration-500" : "flex items-center gap-2 bg-black text-white outline-none px-4 py-1 rounded-md w-[20%] absolute -bottom-6 left-4 opacity-100 duration-500"}>
                            <BsSend className="text=2xl"/>
                            <p>Send</p>
                        </button>
                    </div>

                </div>
            </div>
        </div> 
    </section>
  )
}

export default NotificationPage
