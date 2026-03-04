import { Avatar, Textarea } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { TfiClose } from "react-icons/tfi";
import { authContext } from "../context/Authcontext";
import { toast } from "react-toastify";

export default function PostCreate() {
  const {isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();
  const [image, setImage] = useState(null)
  const imageInputRef = useRef(null)
  const captionRef = useRef(null)
  const {authToken}= useContext(authContext)
  function myChangeImage(e){
setImage(URL.createObjectURL(e.target.files[0]))
  }
  function handleClearImage(){
    setImage(null)
imageInputRef.current.value=''
  }
  function myHandleCreatePost(){
    const postobj=new FormData
  if(captionRef.current.value){
    postobj.append('body',captionRef.current.value)
  }
  if(imageInputRef.current.value){
    postobj.append('image',imageInputRef.current.files[0])
  }
   return axios.post(`https://route-posts.routemisr.com/posts`,postobj,{
    headers:{Authorization:`Bearer ${authToken}`}
   })
   
  }


const query=useQueryClient()

 const {mutate ,isPending}= useMutation({
    mutationFn:myHandleCreatePost,
onSuccess:()=>{
    handleClearImage()
captionRef.current.value=""
onClose()
query.invalidateQueries({queryKey:['getPosts']})
toast.success("Success",{autoClose:2000})
},
onError:()=>{
    toast. error("Error",{autoClose:2000})
}
  })
  return (
    <div>
        <div className=" my-2 p-3">
        <div className="flex flex-row">
        <Avatar size="md" src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4" />
        <div onClick={onOpen} className="bg-white cursor-pointer w-full ms-2 flex p-2.5 rounded-3xl items-center">
    <p>What's your mind, omar</p>
        </div>
        </div>

    </div>

     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-2">
                    <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <h2>omar</h2>
                </div>
                <Textarea ref={captionRef} placeholder="Whats your mind, omar"/>
                {image&&  <div className="relative">
                    <img 
          alt="Card background"
          className=" rounded-lg w-full "
          src={image}
          width={270}
        />
        <TfiClose  onClick={handleClearImage} className="absolute cursor-pointer top-0 end-0 "/>
                </div>}               
              </ModalBody>
              <ModalFooter className="flex items-center">
                <label className="cursor-pointer">
                    <GrGallery />
                    <input type="file" ref={imageInputRef} hidden onChange={myChangeImage}/>
                </label>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" disabled={isPending} onPress={mutate}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>




  )
}
