import { useEffect, useState } from "react"
import { settings } from "../utils/Settings.jsx"
import { getPostByPostId } from "../../managers/PostManager.jsx"
import "./postDetails.css"
import { useParams } from "react-router-dom"



export const PostDetails = () => {
    const [post, setPost] = useState([])
    const {routeId} = useParams()

    const getAndSetPostsById = () => {
        getPostByPostId(routeId).then(postData => {
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
                <div className="username">By {post.user['username']}</div>
                <div className="content">{post.content}</div>
                <div className="publication">{post.publication_date}</div>
            </div>
        </div>
    )
}