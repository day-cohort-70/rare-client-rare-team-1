import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPostId, postComment, deleteComment } from "../../managers/CommentManager.jsx"
import { getOnlyPostByPostId } from "../../managers/PostManager.jsx"


export const CommentList = ({token})=> {
    const [comment, setComment] = useState("")
    const [postData, setPostData] = useState([])
    const [postComments, setPostComments] = useState([])

    const {postId} = useParams()
    const navigate = useNavigate()

    const deleteCommentFromDatabase = async (commentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?")
        if (confirmDelete) {
            try {
                await deleteComment(commentId)
                setPostComments(prevComments => prevComments.filter(comment => comment.id !== commentId))

            } catch (error) {
                console.error("Failed to delete comment", error)
            }    
        }
    }

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
                <button className="button" onClick={() => {navigate(`/posts/${postId}`)}}><i className="fa-solid fa-arrow-left"></i></button>
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
                                    <button className="button" onClick={() => {deleteCommentFromDatabase(comment.id)}}><i className="fa-solid fa-trash"></i></button>
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