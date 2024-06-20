import GlobalContext from "@/context/GlobalContext"
import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/CustomComponets/Spinner";

const SingleSentMessage = () => {
    const context = useContext(GlobalContext);
    const { open } = context;
    const navigate = useNavigate();
    const {id} = useParams()
   
    const [singleMessage, setSingleMessage] = useState({});
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/messages/${id}`);
            const data = await response.json();
            setSingleMessage(data)
            setLoading(false)
           
          } catch (error) {
            console.log(error)
          }
        };
    
        fetchData();
      }, [id]);

    const handleBack = () =>{
        navigate('/notification/sent')
    }
  return (
    <section className={open? 'pt-24 pl-24 w-[100vw] h-[100vh] duration-1000 flex justify-center items-center ': 'pt-24 pl-[16.5rem] w-[100vw] h-[100vh] duration-1000 flex justify-center items-center'}>
      {loading? (<Spinner/>) : 
      <div className="w-[700px] h-[auto] border-2 border-black rounded-t-xl">
        <div className="h-12 w-full bg-black rounded-t-lg text-white p-4 flex justify-end">
            <IoMdClose className="text-2xl cursor-pointer" onClick={handleBack}/>
        </div>

        <div className="p-4 flex flex-col gap-4">
            <div className="font-bold">{singleMessage.date}</div>
            <div><span className="text-rose-600">To:</span> {singleMessage.recipients.join(', ')}</div>
            <div><span className="text-rose-600">Subject: </span> {singleMessage.subject}</div>
            <div><span className="text-rose-600">Body: </span> {singleMessage.body}</div>
        </div>
      </div>}
    </section>
  )
}

export default SingleSentMessage
