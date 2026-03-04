
import {HeroUIProvider} from "@heroui/react";
import Register from "./assets/components/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./assets/components/Register/Login/Login";
import Layout from "./assets/components/Register/Layout/Layout";
import Home from "./assets/components/Register/home/Home";
import AuthcontextProvider from "./assets/components/Register/context/Authcontext";
import ProtectRoutes from "./assets/components/Register/Protect/ProtectRoutes";
import ProtectRoutesLogin from "./assets/components/Register/Protect/ProtectRoutesLogin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Allcomments from "./assets/components/Register/Allcomments/Allcomments";
import { ToastContainer } from "react-toastify";

const router=createBrowserRouter([

  {path:"",element:<Layout/>,children:[
    {path:"home",element: <ProtectRoutes>
      <Home/>
    </ProtectRoutes>
      },
    {path:"register",element:<ProtectRoutesLogin>
      <Register/>
    </ProtectRoutesLogin>},
    {path:"",element:<ProtectRoutesLogin>
      <Register/>
    </ProtectRoutesLogin>},
  {path:"login",element:<ProtectRoutesLogin>
      <Login/>
    </ProtectRoutesLogin>},
  {path:"allcomments/:id",element:<Allcomments/>},
  {path:"*",element: <h2>Error Page</h2>},
  ]}
])

const  myQuery= new QueryClient()
export default function App() {
  return (
    <>
    <QueryClientProvider client={myQuery}>
    <AuthcontextProvider>
        <HeroUIProvider>
        <RouterProvider router={router}/>
        <ToastContainer />
        </HeroUIProvider>
    </AuthcontextProvider>
    </QueryClientProvider>
    </>
  )
}
