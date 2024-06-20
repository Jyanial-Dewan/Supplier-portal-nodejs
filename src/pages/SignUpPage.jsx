import { useState } from "react"
import { supabase } from "@/client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//import {v4 as uuidv4} from 'uuid';


const SignUpPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
       email: '',
       password: '',
        
    });

    const handleChange = (e) =>{
        setUser(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    };

    async function addUser (e) {
        e.preventDefault();
        try {
          const { data, error } = await supabase.auth.signUp(
            {
              email: user.email,
              password: user.password,
            }
          )
          if(data){
            console.log(data)
          }
          if(error){
            console.log(error)
            toast.error('there is a problem signing up user')
          } else {
            toast.success('the user has been signed up successfully')
          }
          
          navigate('/')
      } catch (error) {
          alert(error)
        }
      }

  return (
    <div className='pt-24 pl-20 flex justify-center items-center'>
        
      <form className="w-3/5 px-6 py-4 mb-8 border border-gray-100 shadow-md flex flex-col justify-center items-center"
            onSubmit={addUser}>
        <h2 className="text-xl text-center">Sign Up</h2>
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="email">Email</label>
            <input type="email"
                   placeholder="Email"
                   name="email"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="password">Password</label>
            <input type="password"
                   placeholder="Password"
                   name="password"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <button type="submit" className="py-2 px-8 rounded-md bg-black text-white">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage
