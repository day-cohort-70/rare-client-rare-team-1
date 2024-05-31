import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { postComment } from "../../managers/CommentManager.jsx"


export const CommentForm = ({token}) => {
    const [comment, setComment] = useState("")

    const {postId} = useParams()
    const navigate = useNavigate()

    const setDate = () => {
        const today = new Date()
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        return `${month}/${day}/${year}`
    }

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
            navigate(`/`)
        })
    }


    return (
        <form key="form-comment" className="container-form-comment">
            <h2>Leave a Comment</h2>
            <div className="form-container">
                <div className="form">

                    <fieldset>
                        <div className="comment">
                            <textarea type="text" name="comment" onChange={(event) => {setComment(event.target.value)}} ></textarea>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="container-button">
                            <button className="button btn-save" onClick={handleComment}>Save</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </form>
    )
}