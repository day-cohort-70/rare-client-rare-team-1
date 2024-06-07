import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPostId, postComment } from "../../managers/CommentManager.jsx"
import { getOnlyPostByPostId } from "../../managers/PostManager.jsx"
import { setDate } from "../utils/SetDate.jsx"


export const CommentForm = ({token}) => {
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


    const handleComment = (e) => {
        e.preventDefault()

        const newComment = {
            postId: parseInt(postId),
            date: setDate(),
            authorId: parseInt(token),
            content: comment
        }
        /* eventually this will need to navigate to the new comments list page for the related post*/
        postComment(newComment).then(() => {
            navigate(`/posts/${postId}/comments`)
        })
    }


    return (
        <div>
            <div>
                <button className="button" onClick={() => {navigate(`/posts/${postId}`)}}><i class="fa-solid fa-arrow-left"></i></button>
            </div>
            <form key="form-comment" className="container-form-comment">
                <div className="form-container">
                    <div className="form">
                        {postData.title}
                            <fieldset>
                                <div className="comment">
                                    <textarea type="text" name="comment" placeholder="Type your comments here.." onChange={(event) => {setComment(event.target.value)}} ></textarea>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div className="container-button">
                                    <button className="button btn-save" onClick={handleComment}>Submit</button>
                                </div>
                            </fieldset>
                    </div>
                </div>
            </form>
        </div>
    )
}