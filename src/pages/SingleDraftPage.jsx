import GlobalContext from "@/context/GlobalContext"
import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/CustomComponets/Spinner";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosCheckmark } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import socket from "@/CustomComponets/Socket";
import toast from "react-hot-toast";

const SingleDraftPage = () => {
    const context = useContext(GlobalContext);
    const { open, localUsers, user } = context;
    const navigate = useNavigate();
    const {id} = useParams()
   
    const [loading, setLoading] = useState(true);
    const [openList, setOpenList] = useState(false)
    const [isAllClicked, setIsAllClicked] = useState(false);
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [recipients, setRecipients] = useState([]);
    let newDate = new Date();
    let date = newDate.toLocaleString()

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/messages/${id}`);
            const data = await response.json();
            setBody(data.body)
            setRecipients(data.recipients)
            setSubject(data.subject)
            setLoading(false)
           
          } catch (error) {
            console.log(error)
          }
        };
    
        fetchData();
      }, [id]);

    const handleBack = () =>{
        navigate('/notification/draft')
    }

    const handleSend = async (status) => {
        const data = {
            id: Number(id),
            sender: user,
            recipients: recipients,
            subject,
            body,
            date,
            status
        }

        console.log(data)

        const response = await fetch(`http://localhost:3000/messages/${id}`, {
            method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });

        if (response.ok) {
            toast.success('message sent')
        } 

        socket.emit('sendMeassage', {
            id: Number(id),
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
        setOpenList(false)
        navigate('/notification/draft')
    }

    const handleReciever = (reciever) => {
        if(isAllClicked){
            // setIsAllClicked(false)
           const newArray = recipients.filter(rcvr => rcvr !== reciever)
           setRecipients(newArray)
            
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

  return (
    <section className={open? 'pt-24 pl-24 w-[100vw] h-[100vh] duration-1000 flex justify-center items-center ': 'pt-24 pl-[16.5rem] w-[100vw] h-[100vh] duration-1000 flex justify-center items-center'}>
      {loading? (<Spinner/>) : 
      <div className="w-[700px] h-[380px] border-2 border-black rounded-t-xl">
        <div className="h-12 w-full bg-black rounded-t-lg text-white p-4 flex justify-end">
            <IoMdClose className="text-2xl cursor-pointer" onClick={handleBack}/>
        </div>

        <div className="flex flex-col p-4 gap-4 relative">
            <div className="flex flex-col gap-1">
                <div className="bg-black text-white px-4 py-1 rounded-md w-[150px] cursor-pointer" onClick={()=> setOpenList(true)}>
                    <p>Select Recipients</p>
                </div>

                <div className={openList? "max-w-[450px] flex gap-2 max-h-[80px] overflow-auto flex-wrap": "max-w-[full] flex gap-2 max-h-[80px] overflow-auto flex-wrap"}>
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
                    
                {localUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-1 hover:bg-black/20 cursor-pointer" onClick={() => handleReciever(user.user_name)}>
                    
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

            <button onClick={() => handleSend('sent')} className={recipients.length === 0 || subject === '' || body === '' ?"opacity-0 duration-500" : "flex items-center gap-2 bg-black text-white outline-none px-4 py-1 rounded-md w-[100px] absolute -bottom-6 left-4 opacity-100 duration-500"}>
                <BsSend className="text=2xl"/>
                <p>Send</p>
            </button>
        </div>
      </div>}
    </section>
  )
}

export default SingleDraftPage
