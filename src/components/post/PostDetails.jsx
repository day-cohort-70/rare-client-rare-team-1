import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getAllTags } from "../../managers/TagManager.jsx"
import { getTagsByPostId } from "../../managers/PostTagManager.jsx"
import { settings } from "../utils/Settings.jsx"
import { deletePost, getPostByPostId } from "../../managers/PostManager.jsx"
import 'bulma/css/bulma.css'


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
        <div className="container mt-6">
            <div className="box" style={{ position: 'relative' }}>
                <div className="has-text-centered">
                    <h3 className="title is-3">{post.title}</h3>
                </div>

                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
                <button
                    className="button"
                    onClick={deletePostFromDatabase}
                ><i className="fa-solid fa-trash"></i></button>
                <button 
                    className="button" 
                    onClick={() => navigate(`/posts/${post.id}/edit`)}
                ><i className="fa-solid fa-gear"></i></button>
                </div>
                    
                <div className="is-flex is-justify-content-center mt-4">
                    <div style={{ width: '60%' }}>
                        <figure className="image is-3by1">
                            <img src={post.image_url} alt="Post" />
                        </figure>
                        <div className="is-flex is-justify-content-space-around mt-4" style={{ width: '100%' }}>
                            <p>By {post.user?.username}</p>
                            <button className="button is-link" onClick={() => navigate(`/posts/${post.id}/comments`)}>View Comments</button>
                            <button className="button is-link" onClick={() => navigate(`/posts/${post.id}/comment`)}>Add Comment</button>
                            <Link to={`/posts/${post.id}/tags`} postId={post.id}>
                                <button className="button is-link">Manage Tags</button>
                            </Link>
                        </div>
                        <div className="mt-4">
                            <p>{post.content}</p>
                        </div>
                    </div>

                    <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 'auto', marginRight: '20px' }}>
                        {postTags.map(tag => (
                            <span key={tag.id} className="tag is-info mt-1">{tag.tag?.label}</span>
                        ))}
                    </div>
                </div>

                <div className="has-text-right mt-4">
                    <p>{post.publication_date}</p>
                </div>
            </div>
        </div>
    );
};