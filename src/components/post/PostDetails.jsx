import { useEffect, useState } from "react"
import { settings } from "../utils/Settings.jsx"
import { getPostByPostId } from "../../managers/PostManager.jsx"
import { useNavigate, useParams } from "react-router-dom"
import "./postDetails.css"



export const PostDetails = () => {
    const [post, setPost] = useState([])
    const navigate = useNavigate()
    const {postId} = useParams()

    const getAndSetPostsById = () => {
        getPostByPostId().then(postData => {
            setPost(postData)
        })
    }

    useEffect(() => {
        getAndSetPostsById() 
    }, [])


    return (
        <div className="container-post-details">
            <div className="post-details">
                <h3 className="title">{post.title}</h3>
                <div className="container-image">
                    <img className="image" src={post.image_url} />
                </div>
                <div className="container-post-info">
                    {/* <div className="username">By {post.user['username']}</div> */}
                    <button className="button">View Comments</button>
                    <button onClick={() => navigate(`/posts/${post.id}/comment`)} className="button">Add Comment</button>
                </div>
                <div className="content">{post.content}</div>
                <div className="publication">{post.publication_date}</div>
            </div>
        </div>
    )
}