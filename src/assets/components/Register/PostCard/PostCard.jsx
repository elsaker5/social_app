import {Card, CardHeader, CardBody, CardFooter, Divider} from "@heroui/react";
import { Link } from "react-router-dom";
import CommentCard from "../commentCard/commentCard";
import CommentCreate from "../CommentCreate/CommentCreate";
import MyCardHeader from "../../myCardHeader/MyCardHeader";
export default function PostCard({props,singleComments ,queryKey}) {
    const {body,image,user,createdAt,topComment,id,commentsCount}=props
    const {photo,name,_id }=user
    

  return (
    <Card >
      <MyCardHeader name={name} createdAt={createdAt} photo={photo} postId={id} cardId={_id}/>
      <Divider />
      <CardBody>
        <p>{body}</p>
        {image ?<img src={image} alt={body} />:""}
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between">
        <p>Like</p>
        <p>Comment</p>
        <p>Share</p>
      </CardFooter>
      <CardFooter className="flex flex-col items-start">
        <CommentCreate propId={id} queryKey={queryKey}/>
    {!singleComments&& commentsCount > 0 && <CommentCard topComment={topComment}/>}
      {!singleComments&&commentsCount > 1 && <Link to={`/allcomments/${id}`} className="mx-auto text-blue-500"> Veiw Comments....</Link>}
    { singleComments?.length &&singleComments.map((e)=> <CommentCard topComment={e}/>) } 
      </CardFooter>
    </Card>
  );
}

