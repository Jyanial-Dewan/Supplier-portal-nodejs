import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const context = useContext(GlobalContext);
    const { token, open } = context;
    
  return (
    <section className={open? "pt-24 flex flex-col items-center pl-[7rem] pr-4 duration-1000" : "pt-24 flex flex-col items-center pl-[17.5rem] pr-4 duration-1000"} >
      <h2 className="font-semibold text-lg text-center mb-6">Profile</h2>
      <div className="px-6 flex gap-6">
        <div className="px-6 py-4 border border-gray-100 shadow-sm flex-shrink">
            <p>Name: {token.user.user_metadata.first_name}</p>
            <p>Email: {token.user.email}</p>
            <p>User Name: {token.user.user_metadata.user_name}</p>
            <p>Job Title: {token.user.user_metadata.job_title}</p>
        </div>

        <div className="bg-gray-100 h-auto w-[2px] my-2"></div>
        
        <div className="flex flex-col gap-4 items-center px-6 py-4 border border-gray-100 shadow-sm">
          <Link className="px-2 py-2 bg-black rounded-md text-white text-center mr-6 hover:bg-black/80" to={'/user-qr-code'}>Generate User id + Org_id Qr Code</Link>

          <Link className="px-2 py-2 bg-black rounded-md text-white hover:bg-black/80" to={'/token-qr-code'}>Generate Access Token + Org_id Qr Code</Link>
        </div>

       
      </div>
    </section>
  )
}

export default ProfilePage
