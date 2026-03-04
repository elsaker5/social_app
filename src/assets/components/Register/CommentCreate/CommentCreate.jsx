import { Input } from '@heroui/react'
import axios from 'axios';
import { CgAirplane } from "react-icons/cg";
import { authContext } from '../context/Authcontext';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function CommentCreate({propId,queryKey}) {
    const {authToken}= useContext(authContext)
    const [createComment, setCreateComment] = useState("")
    function handleCreateComment(){
        const commentObj={
            content:createComment,            
        }
        return axios.post(`https://route-posts.routemisr.com/posts/${propId}/comments`,commentObj,{
            headers:{Authorization:`Bearer ${authToken}`}
        })
    }

  const useComment=  useQueryClient()
  const {mutate,isPending}=  useMutation({
    mutationFn:handleCreateComment,
    onSuccess:()=>{
        useComment.invalidateQueries({queryKey:queryKey})
        setCreateComment('')
    },
})
return (    
        <Input
          labelPlacement="outside"
          placeholder="Enter Your Comment..."
          endContent={
            <div onClick={isPending ? undefined: mutate} className='bg-blue-600 rounded-full p-2 text-white'>
                <CgAirplane />
            </div>
          }
          type="text"
          value={createComment}
          onChange={(e)=>setCreateComment(e.target.value)}
        />
    
  )
}
