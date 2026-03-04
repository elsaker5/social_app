import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import * as zod from 'zod'
import { authContext } from "../context/Authcontext";

const zodValidation=zod.object({
    email: zod.email(),
    password:zod.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
})

export default function Login() {
   const navigate= useNavigate()
 const {setAuthFunction} =useContext(authContext)
    const [succes, setSucces] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { handleSubmit,register,formState}=useForm({
        defaultValues:{
            email:'',
            password:'',
        },
        resolver:zodResolver(zodValidation),
        mode:"onSubmit"
    })
    function myHandleSubmit(value){
        console.log('value....',value);
        setLoading(true)
        axios.post('https://route-posts.routemisr.com/users/signin',value)
        .then(function(data){
            // console.log(data.data.data.token);
            setAuthFunction(data.data.data.token)
            localStorage.setItem('tkn',data.data.data.token)
            setSucces(data.data.message)
            setTimeout(() => {
                setSucces(false)
                navigate('/home')
            }, 3000);
        })
        .catch(function(error){
            setError(error.response.data.message)
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
        .finally(function(){
            setLoading(false)
        })
    }
  return (
    
    <div className='h-screen pt-10 bg-linear-to-b flex items-center justify-center from-black to-gray-500'>
        <h1 className="text-6xl font-bold animate-bounce ms-6 mt-7 text-white absolute start-0 top-28">Login</h1>
        {succes &&<p className="bg-green-500 absolute top-0 mt-20 p-3 rounded-2xl">{succes}</p>}
        {error &&<p className="bg-danger-500 absolute top-0 mt-20 p-3 rounded-2xl">{error}</p>}
        <form  onSubmit={handleSubmit(myHandleSubmit)} className="bg-white w-100  p-7 rounded-medium">
    <div className="mb-5">
        <label htmlFor="email">Email</label>
    <input id="email" {...register("email")} className="border-2 w-full ml-4 p-2   rounded-3xl" type="email" />
    <p className="text-danger">{formState.errors.email?.message}</p>
    </div>
    <div className="mb-5">
        <label htmlFor="password">password</label>
    <input id="password" {...register("password")} className="border-2 w-full ml-4 p-2   rounded-3xl" type="password" />
    <p className="text-danger">{formState.errors.password?.message}</p>
    </div>
    <Button type="submit" disabled={loading} className="w-full mt-2" color="primary">
        {loading ? <SyncLoader size={8} />:'Login'}
    </Button>

          </form>
        </div>



  )
}
