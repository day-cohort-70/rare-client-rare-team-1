import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPostId, postComment } from "../../managers/CommentManager.jsx"
import { getOnlyPostByPostId } from "../../managers/PostManager.jsx"


export const CommentList = ({token})=> {
    const [comment, setComment] = useState("")
    const [postData, setPostData] = useState([])
    const [postComments, setPostComments] = useState([])

    const {postId} = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        getCommentsByPostId(postId).then(commentArr => {
            setPostComments(commentArr)
        }) 
    },[postId])

    useEffect(() => {
         getOnlyPostByPostId(postId).then(postObj => {
            setPostData(postObj)
         })
    },[postId])



    return (
        <div>
            <div>
                <button className="button" onClick={() => {navigate(`/posts/${postId}`)}}><i class="fa-solid fa-arrow-left"></i></button>
            </div>
            <div>
                {postData.title}
            </div>
            <div className="container-post-comments">
                {postComments
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(comment => {
                        return (
                            <div className="comment" key={comment.id}>
                                <div>
                                    <button className="button"><i className="fa-solid fa-gear"></i></button>
                                    <button className="button"><i className="fa-solid fa-trash"></i></button>
                                </div>
                                <div>{comment?.content}</div>
                                <div>{comment.author?.username}</div>
                                <div>{comment?.date}</div>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}