import MyCardHeader from "../../myCardHeader/MyCardHeader"


export default function CommentCard({topComment}) {
  const {commentCreator}=topComment
  const {name,photo}=commentCreator
  const comment=topComment?.content 
  return (
<>
      <MyCardHeader
      createdAt={topComment.createdAt}
      name={name}
      photo={photo}   
      cardId={topComment._id}
      />
      <p>{comment}</p>
      </>
  )
}

