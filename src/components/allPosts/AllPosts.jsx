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
        <div className="container">
            <div className="button-new-post">
                <button className="button" onClick = {()=>{navigate(`/newPost`)}}>New Post</button>
            </div>

            <div className="allposts-container">
                {sortedPostsByDate.map((post) => {
                    return (
                        <div className="notification category-item" key={post.id}>
                            <h3>Title: {post.title}</h3>
                            <div>Author: {post.user.username}</div>
                            <div>Category: {post.category.label}</div>
                            <div>Publication Date: {post.publication_date}</div>
                            <div className="container-buttons">
                                <button className="button"><i className="fa-solid fa-gear"></i></button>
                                <button className="button"><i className="fa-solid fa-trash"></i></button>
                                <button className="button" onClick={() => {handleClick(post.id)}}>Details</button>
                            </div>
                            <div className="container-approved">
                                <span>Approved: </span>
                                <input 
                                    type="checkbox"
                                    checked={post.approved === 1}
                                    onChange={() => {handleCheckBoxChange(post.id, post.approved)}}
                                >
                                </input>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}