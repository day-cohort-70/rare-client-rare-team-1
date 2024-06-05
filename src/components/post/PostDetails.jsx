import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getAllTags } from "../../managers/TagManager.jsx"
import { getTagsByPostId } from "../../managers/PostTagManager.jsx"
import { settings } from "../utils/Settings.jsx"
import { deletePost, getPostByPostId } from "../../managers/PostManager.jsx"
import "./postDetails.css"



export const PostDetails = () => {
    const [post, setPost] = useState([])
    const [postTags, setPostTags] = useState([])
    const [availableTags, setAvailableTags] = useState([])
    const navigate = useNavigate()
    const {postId} = useParams()


    const getAndSetPost = () => {
        getPostByPostId(postId).then(postData => {
            setPost(postData)
        })
    }
    const getAndSetTags = () => {
        getAllTags().then(tagData => {
            setAvailableTags(tagData)
        })
    }
    const getTagsForPost = () => {
        getTagsByPostId(postId).then(tagData => {
            setPostTags(tagData)
        })
    }
    const deletePostFromDatabase = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?")
        if (confirmDelete) {
            try {
                await deletePost(post.id)
                    navigate(`/posts`)

            } catch (error) {
                console.error("Failed to delete post", error)
            }    
        }
    }

    useEffect(() => {
        getAndSetPost()
        getAndSetTags()
        getTagsForPost()
    }, [])


    return (
        <div className="container-post-details">
            <div className="post-details">
                <h3 className="title">{post.title}</h3>
                <button className="button-delete" onClick={deletePostFromDatabase}>Delete Post</button>
                <div className="container-image-and-tags">
                    <div className="div-image">
                        <img className="image" src={post.image_url} />
                    </div>
                    <div className="div-post-tags">
                        <div className="post-tags">
                            {postTags.map(tag => {
                                return (
                                    <div key={tag.id}>{tag.tag?.label}</div>
                                )
                            })}
                        </div>
                    </div>
                
                
                </div>

                <div className="container-post-info">
                    <div className="username">By {post.user?.username}</div>
                    <button className="button">View Comments</button>
                    <button onClick={() => navigate(`/posts/${post.id}/comment`)} className="button">Add Comment</button>
                    <Link to={`/posts/${post.id}/tags`} postId={postId}>
                        <button className="button">Manage Tags</button>
                    </Link>
                </div>
                <div className="content">{post.content}</div>
                <div className="publication">{post.publication_date}</div>
            </div>
        </div>
    )
}