import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPostId, postComment, deleteComment } from "../../managers/CommentManager.jsx"
import { updateComment } from "../../managers/CommentManager.jsx"
import { getOnlyPostByPostId } from "../../managers/PostManager.jsx"


export const CommentList = ({token})=> {
    const [postData, setPostData] = useState([])
    const [postComments, setPostComments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editedComment, setEditedComment] = useState({})
    const active = showModal ? ("is-active"): ("")
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


const getAndSetAllComments = () =>{
    getCommentsByPostId(postId).then(commentArr => {
        setPostComments(commentArr)
    }) 
}

    useEffect(() => {
        getAndSetAllComments()
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

                                    
                                    <button className="button" onClick={() => {deleteCommentFromDatabase(comment.id)}}><i className="fa-solid fa-trash"></i></button>

                                    <button className="button"
                                    onClick = {() =>{
                                        setShowModal(true)
                                        setEditedComment(comment)}}
                                    ><i className="fa-solid fa-gear"></i></button>
                                    

                                </div>
                                <div>{comment?.content}</div>
                                <div>{comment.author?.username}</div>
                                <div>{comment?.date}</div>
                            </div>
                        )
                })}
            </div>
            <div className={`modal ${active}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Comment</p>
              <button
                onClick={()=>{setShowModal(false)}}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Edit This Comment:</label>
                <div className="control">
                  <textarea
                    rows="4"
                    className="textarea"
                    type="text"
                    value={editedComment.content}
                    onChange={(event)=>{
                        const copy = {...editedComment}
                        copy.content = event.target.value
                        setEditedComment(copy)
                    }}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success"
                onClick={async ()=>{
                await updateComment(editedComment).then(()=> {
                    setShowModal(false)
                    setEditedComment({})
                    getAndSetAllComments()
              })
              }}
              >Save changes</button>
              <button 
                onClick={()=>{setShowModal(false)}}
                className="button">
                Cancel
              </button>
            </footer>
          </div>
        </div> 
        </div>
    )
}