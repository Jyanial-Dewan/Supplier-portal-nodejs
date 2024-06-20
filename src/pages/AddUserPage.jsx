import { useState, useContext } from "react"
import { supabase } from "@/client";
import { useNavigate } from "react-router-dom";
import GlobalContext from "@/context/GlobalContext";
import toast from "react-hot-toast";
//import {v4 as uuidv4} from 'uuid';


const AddUserPage = () => {
    //let myuuid = uuidv4();
    
    const context = useContext(GlobalContext);
    const { fetchAllUsers } = context;
    
    const navigate = useNavigate()
    const [user, setUser] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        user_name: '',
        password: '',
        job_title: '',
        domain_name: '',
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
              options: {
                data: {
                    first_name: user.first_name,
                    middle_name: user.middle_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                    job_title: user.job_title,
                    domain_name: user.domain_name,
                }
              }
            }
          )
          if(data){
            console.log(data)
          }
          if(error){
            console.log(error)
            toast.error('there is a problem adding user')
          } else {
            toast.success('the user has been added successfully')
          }
          fetchAllUsers();
          navigate('/allusers')
      } catch (error) {
          alert(error)
        }
      }

  return (
    <div className='pt-24 pl-20 flex justify-center items-center'>
        
      <form className="w-3/5 px-6 py-4 mb-8 border border-gray-100 shadow-md flex flex-col justify-center items-center"
            onSubmit={addUser}>
        <h2 className="text-xl text-center">Add User</h2>
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="firstName">First Name</label>
            <input type="text"
                   placeholder="First Name"
                   name="first_name"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="middleName">Middle Name</label>
            <input type="text"
                   placeholder="Middle Name"
                   name="middle_name"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="lastName">Last Name</label>
            <input type="text"
                   placeholder="Last Name"
                   name="last_name"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="email">Email</label>
            <input type="email"
                   placeholder="Email"
                   name="email"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="userName">User Name</label>
            <input type="text"
                   placeholder="User Name"
                   name="user_name"
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

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="jobTitle">Job Title</label>
            <input type="text"
                   placeholder="Job Title"
                   name="job_title"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="domainName">Domain Name</label>
            <input type="text"
                   placeholder="Domain Name"
                   name="domain_name"
                   onChange={handleChange}
                   className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
        </div>

        <button type="submit" className="py-2 px-8 rounded-md bg-black text-white">Submit</button>
      </form>
    </div>
  )
}

export default AddUserPage
