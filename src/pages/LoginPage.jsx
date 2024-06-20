import { useState, useContext } from "react";
// import { supabase } from "@/client";
import { useNavigate } from "react-router-dom"
import GlobalContext from "@/context/GlobalContext";

const LoginPage = () => {
  const context = useContext(GlobalContext)
    const {setUser} = context;
    // const [formData, setFormData] = useState({email: '', password: ''});
    const [userName, setUserName] = useState('')
    const navigate = useNavigate();

    const handleSubmit = () => {
      setUser(userName)
      navigate('/')
    }

    // const handleChange = (e)=> {
    //   setFormData((prevFormData)=>{
    //     return{
    //       ...prevFormData,
    //       [e.target.name] : e.target.value
    //     }
    //   })
    // }

    // async function handleSubmit (e) {
    //   e.preventDefault();
    //   try {
        
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //         email: formData.email,
    //         password: formData.password,
    //       })
    //       if(error) throw error;
    //       console.log(data);
    //       setToken(data);
    //       navigate('/')
          
    // } catch (error) {
    //     alert(error)
    //   }
    // }
  return (
    <div className="flex flex-col gap-6 items-center mt-20">
      <form className="w-[700px] px-6 py-4 mb-8 border border-gray-100 shadow-md flex flex-col justify-center items-center"
            onSubmit={handleSubmit}>
        <h2 className="text-xl text-center">Log In</h2>
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="firstName">User Name</label>
            <input type="text"
                  //  placeholder="Email"
                  //  name="email"
                  value={userName}
                   onChange={(e) => setUserName(e.target.value)}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        {/* <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="middleName">Password</label>
            <input type="password"
                   placeholder="Password"
                   name="password"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div> */}

        <button type="submit" className="py-2 px-8 rounded-md bg-black text-white">Log In</button>
      </form>

      <div className="flex flex-col">
        <p>nepolionchakma</p>
        <p>jyanialdewan</p>
        <p>diponchakma</p>
        <p>alponachakma</p>
      </div>
    </div>
  )
}

export default LoginPage
