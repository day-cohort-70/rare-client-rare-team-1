import { useEffect, useState } from "react"
import { getAllPosts } from "../../managers/MyPostsManager.jsx"
import { useNavigate } from "react-router-dom"
import { updateApprovalStatus } from "../../managers/ApprovalManager.jsx"


export const AllPosts = () => {
    const [allPostsArray, setAllPostsArray] = useState([])
    // const [sortedPostsByApproval, setSortedPostsByApproval] = useState([])
    const [sortedPostsByDate, setSortedPostsByDate] = useState([])
    const navigate = useNavigate()


    const grabbingAllPosts = () => {
        getAllPosts().then(data => {
            setAllPostsArray(data)
        })
    }

    const sortByDate = () => {
        const dateListArray = [...allPostsArray].sort((a, b) => {
            if (a.publication_date > b.publication_date) {
                return -1
            }
            if (a.publication_date < b.publication_date) {
                return 1
            }
            return 0
        })
        setSortedPostsByDate(dateListArray)
    }

    /* First, grab all the posts from the database */
    useEffect(() => {
        grabbingAllPosts()
    }, [])


    /* Third, sort the posts by date. Newest first  */
    useEffect(() => {
        sortByDate()
    }, [allPostsArray])


    /* Handles Navigation to details of the post */
    const handleClick = (postId) => {
        navigate(`/posts/${postId}`)
    }

    const handleCheckBoxChange = (postId, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1
        updateApprovalStatus(postId, newStatus)
            .then(() => {grabbingAllPosts()
        })
    }


    return (
        <div className="container-admin-posts-page">
            <div className="button-new-post">
                <button className="button is-warning m-4" onClick = {()=>{navigate(`/newPost`)}}>New Post</button>
            </div>

            <div className="container-admin-posts">
                {sortedPostsByDate.map((post) => {
                    return (
                        <div className="container-post-info box m-4" style={{ backgroundColor: '#f0f0f0' }} key={post.id}>
                            <h3 className="container-post-title title has-text-primary">Title: {post.title}</h3>
                            <div className="container-post-date subtitle">Author: {post.user.username}</div>
                            <div className="container-post-category is-size-5 has-text-primary">Category: {post.category.label}</div>
                            <div className="container-post-author is-size-5 has-text-weight-semibold">Publication Date: {post.publication_date}</div>
                            <div className="container-buttons">
                                {/* <button className="button is-primary mb-4 ml-4" ><i className="fa-solid fa-gear"></i></button>
                                <button className="button"><i className="fa-solid fa-trash"></i></button> */}
                                <button className="button is-primary mb-4 ml-4" onClick={() => {handleClick(post.id)}}>Details</button>
                            </div>
                            <div className="columns is-left">
                                <div className="column is-narrow">
                                <span>Approved: </span>
                                <input 
                                    type="checkbox"
                                    checked={post.approved === 1}
                                    onChange={() => {handleCheckBoxChange(post.id, post.approved)}}
                                >
                                </input>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}