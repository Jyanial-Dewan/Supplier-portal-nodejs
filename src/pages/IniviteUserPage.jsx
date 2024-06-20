import { useState } from "react";
import { supabase } from "@/client";
import toast from "react-hot-toast";



const IniviteUserPage = () => {
    const [email, setEmail] = useState('')
   

    const inviteUser = async (e)=> {
        e.preventDefault()
        let { data, error } = await supabase.auth.admin.inviteUserByEmail(email)
        if (data) {
            console.log(data)
        }

        if(error){
            console.log(error)
            toast.error('there is a problem inviting user')
        } else {
            toast.success('the user has been invited successfully')
        }
        
    }

  return (
    <div className="pt-24 pl-20 flex justify-center items-center h-[100vh]">
      <form className="w-[700px] px-6 py-4 mb-8 border border-gray-100 shadow-md flex flex-col justify-center items-center"
            onSubmit={inviteUser}>
      <h2 className="text-xl text-center">Invite User</h2>
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="firstName">Email</label>
            <input type="email"
                   placeholder="Email"
                   onChange={(e)=>setEmail(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>
        <button type="submit" className="py-2 px-8 rounded-md bg-black text-white">Submit</button>
      </form>
    </div>
  )
}

export default IniviteUserPage
