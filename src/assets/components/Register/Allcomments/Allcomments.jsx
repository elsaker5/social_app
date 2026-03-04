
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { authContext } from "../context/Authcontext"
import PostCard from "../PostCard/PostCard"
import LoadingScreen from "../LoadingScreen/LoadingScreen"

export default function Allcomments() {
 const {id}= useParams()
const {authToken}= useContext(authContext)
  function getApiComments(){
   return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
      headers:{Authorization:`Bearer ${authToken}`}
    })
  }

  function getSinglePosts(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`,{
      headers:{Authorization:`Bearer ${authToken}`}
    })
  }
 const {data:commentsData,isLoading:commentsLoading}= useQuery({
    queryKey:["getSingleComments",id],
    queryFn:getSinglePosts,
  })
 const apiComments=commentsData?.data.data.comments

 const {data,isLoading}= useQuery({
    queryKey:["getComments",id],
    queryFn:getApiComments,
  })




  const commentsDetails=data?.data.data.post
  return (
    <>
  {isLoading ?<LoadingScreen/>||commentsLoading:<PostCard props={commentsDetails} singleComments={apiComments} queryKey={["getSingleComments",id]}/>}
    
    </>
  )
}
