import { CiEdit } from "react-icons/ci";
import {  MdOutlineDeleteOutline } from "react-icons/md";
import {CardHeader,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authContext } from "../Register/context/Authcontext";
export default function MyCardHeader({name,photo,createdAt,cardId,postId}) {
  const {userId,authToken}= useContext(authContext)
const findUser=cardId === userId
function myHandleDelete(){
return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`,{
  headers:{Authorization:`Bearer ${authToken}`}
})
}
const queryClient=useQueryClient()
const {mutate }=useMutation({
  mutationFn:myHandleDelete,
  onSuccess:()=>{
queryClient.invalidateQueries({queryKey:['getPosts']})
toast.success("Success Delete",{autoClose:2000})
  },
  onError:()=>{
    toast.error("Error Delete",{autoClose:2000})
  }
})
  return (
    <CardHeader className="flex gap-3">
        <img
          alt="heroui logo"
          height={40}
          radius="sm"
          src={photo}
          width={40}
          onError={function(e){e.target.src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'}}
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500">{createdAt}</p>
        </div>
        <div className='absolute end-3 cursor-pointer'>

    {findUser&& <Dropdown>
      <DropdownTrigger>
        <BsThreeDotsVertical /> 
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" onClick={mutate}><MdOutlineDeleteOutline /></DropdownItem>
        <DropdownItem key="copy"><CiEdit /></DropdownItem>
      </DropdownMenu>
    </Dropdown>
    }
        </div>
        
      </CardHeader>
  )
}
