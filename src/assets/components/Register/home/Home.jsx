import axios from 'axios'
import  { useContext} from 'react'
import PostCard from '../PostCard/PostCard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useQuery } from '@tanstack/react-query';
import PostCreate from '../PostCreate/PostCreate';
import { authContext } from '../context/Authcontext';





export default function Home() {
const {authToken}= useContext(authContext)
function getApiHome(){
  return axios.get('https://route-posts.routemisr.com/posts',{
    headers:{Authorization:`Bearer ${authToken}`}
  })
}
const {data,isLoading}=useQuery(
  {
    queryKey:['getPosts'],
    queryFn : getApiHome ,
  }
)
const allPosts=data?.data.data.posts

  return (
    <div className=' bg-gray-500 overflow-hidden '>
      <div className='flex flex-col gap-10 w-1/2 mb-10 mt-9 mx-auto  '>
      <PostCreate/>
      {isLoading && <LoadingScreen/>}
      {allPosts?.map(api => <PostCard key={api.id} props={api} queryKey={['getPosts']}/>)}
    </div>
    </div>
    
  )
}