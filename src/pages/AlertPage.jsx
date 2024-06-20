import GlobalContext from "@/context/GlobalContext";
import { useContext, useState } from "react";
import socket from "@/CustomComponets/Socket";
import toast from "react-hot-toast";

const AlertPage = () => {
  const context = useContext(GlobalContext);
  const { open, alertss } = context;
  const [alerts, setAlert] = useState('')

  let newDate = new Date();
  let date = newDate.toLocaleString();

  const uniquAlerts = alertss.filter((item, index) => 
    index === alertss.findIndex(obj => 
      obj.date === item.date
    )
  );

  console.log(uniquAlerts)

  const handleSend = () => {
    socket.emit('sendAlert', {
        alerts,
        date
    })
    toast.success('alert sent')
    setAlert('');
}
  return (
    <section className={open? "pt-24 pl-24 duration-1000 px-6" : "pt-24 pl-[16.5rem] duration-1000 px-6"}>
      <div className="w-full flex justify-center gap-4 mt-6">
        <input type="text"
                value={alerts}
                onChange={(e)=> setAlert(e.target.value)}
                className="w-[50%] border border-black h-8 rounded-md outline-none pl-2" />
        <button onClick={handleSend} className="bg-black text-white px-4 py-1 rounded-md">Send Alert</button>
      </div>

      <div className="px-12 py-8 border shadow-md mt-6">
        <p className="font-semibold text-xl">Alerts</p>
        <div className="grid grid-cols-7 gap-2 py-4 border-b border-gray-200">
          <div className="col-start-1 col-end-6">
              <p className="font-semibold">Alerts</p>
          </div>
          <div className="col-start-6 col-end-8">
              <p className="font-semibold">Date</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 py-2 border-b border-gray-200">
          {uniquAlerts.map((alrt) => (
            <>
              <div className="col-start-1 col-end-6">
                  <p>{alrt.alerts}</p>
              </div>
              <div className="col-start-6 col-end-8">
                  <p>{alrt.date}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AlertPage
