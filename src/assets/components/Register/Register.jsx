import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import * as zod from 'zod'

const zodValidation=zod.object({
    name: zod.string().nonempty('name is required').min(4,'min name is 4').max(20,'max name is 20'),
    email: zod.email(),
    password:zod.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: zod.string().nonempty('rePassword is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    dateOfBirth: zod.coerce.date('error date').refine(function(valueDate){
       return new Date().getFullYear()-valueDate.getFullYear() >=18
    },'min year is 18').transform(function(Data){
        return `${Data.getFullYear()}-${Data.getMonth()+1}-${Data.getDate()}`
    }),
    gender:zod.enum(['male','female'])
}).refine(function(obj){
   return obj.password===obj.rePassword
},{path:'password',error:'repassword is error'})

export default function Register() {
   const navigate= useNavigate()
    const [succes, setSucces] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { handleSubmit,register,formState}=useForm({
        defaultValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            dateOfBirth:'',
            gender:'',
        },
        resolver:zodResolver(zodValidation),
        mode:"onSubmit"

    })


    function myHandleSubmit(value){
        console.log('value....',value);
        setLoading(true)
        axios.post('https://route-posts.routemisr.com/users/signup',value)
        .then(function(data){
            console.log(data.data);
            setSucces(data.data.message)
            setTimeout(() => {
                setSucces(false)
                navigate('/login')
            }, 3000);
        })
        .catch(function(error){
            console.log(error.response.data.error);
            setError(error.response.data.error)
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
        .finally(function(){
            setLoading(false)
        })
    }
  return (
    
    <div className='h-screen bg-linear-to-b  flex items-center justify-center from-black to-gray-500'>
        <h1 className="text-6xl  font-bold ms-6 mt-7 animate-pulse  text-white absolute start-0 top-28">Register</h1>
        {succes &&<p className="bg-green-500 absolute  top-0 mt-20 p-3 rounded-2xl">{succes}</p>}
        {error &&<p className="bg-danger-500 absolute top-0 mt-20 p-3 rounded-2xl">{error}</p>}
          <form  onSubmit={handleSubmit(myHandleSubmit)} className="bg-white w-100  p-7 rounded-medium">
    <div className="mb-5">
        <label htmlFor="name">Name</label>
    <input id="name" {...register("name")} className="border-2 w-full ml-4 p-2   rounded-3xl" type="text" />
    <p className="text-danger">{formState.errors.name?.message}</p>
    </div>
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
    <div className="mb-5">
        <label htmlFor="repassword">rePassword</label>
    <input id="repassword" {...register("rePassword")} className="border-2 w-full ml-4 p-2   rounded-3xl" type="password" />
    <p className="text-danger">{formState.errors.rePassword?.message}</p>
    </div>
    <div className="mb-5">
        <label htmlFor="Date">Date</label>
    <input id="Date" {...register('dateOfBirth')}  className="border-2 w-full ml-4 p-2   rounded-3xl" type="date" />
    <p className="text-danger">{formState.errors.dateOfBirth?.message}</p>
    </div>
    <div className=" flex">
        <label htmlFor="male">Male</label>
    <input className="ml-1.5" {...register("gender")} id="male" value={'male'} name="gender" type="radio" />
    <p className="text-danger">{formState.errors.gender?.message}</p>
    </div>
    <div className=" flex">
        <label htmlFor="female">Female</label>
    <input className="ml-1.5" {...register("gender")} id="female" value={'female'}  name="gender" type="radio" />
    </div>
    <Button type="submit" disabled={loading} className="w-full mt-2" color="primary">
        {loading ? <SyncLoader size={8} />:'Register'}
    </Button>

          </form>
        </div>


)
}
