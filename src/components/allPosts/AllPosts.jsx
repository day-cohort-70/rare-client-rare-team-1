import { useEffect, useState } from "react"
import { getAllPosts } from "../../managers/MyPostsManager.jsx"


export const AllPosts = () => {
    const [allPostsArray, setAllPostsArray] = useState([])
    const [sortedPostsByApproval, setSortedPostsByApproval] = useState([])
    const [sortedPostsByApprovalAndDate, setSortedPostsByApprovalAndDate] = useState([])


    const grabbingAllPosts = () => {
        getAllPosts().then(data => {
            setAllPostsArray(data)
        })
    }

    const sortingByApproval = () => {
        let newArray = []
        for (const post of allPostsArray) {
            if (post.approved === 1) {
                newArray.push(post)
            }
        }
        setSortedPostsByApproval(newArray)
    }

    const sortByDate = () => {
        const dateListArray = [...sortedPostsByApproval].sort((a, b) => {
            if (a.publication_date > b.publication_date) {
                return -1
            }
            if (a.publication_date < b.publication_date) {
                return 1
            }
            return 0
        })
        setSortedPostsByApprovalAndDate(dateListArray)
    }

    /* First, grab all the posts from the database */
    useEffect(() => {
        grabbingAllPosts()
    }, [])

    /* Second, sort the posts by if they are approved */
    useEffect(() => {
        sortingByApproval()
    }, [allPostsArray])

    /* Third, sort the posts by date. Newest first  */
    useEffect(() => {
        sortByDate()
    }, [sortedPostsByApproval])

    return (
        <div className="container">
            <div className="allposts-container">
                {sortedPostsByApprovalAndDate.map((object) => {
                    return <div className="notification category-item" key={object.id}>
                        <div>Title: {object.title}</div>
                        <div>Author: {object.user.username}</div>
                        <div>Category: {object.category.label}</div>
                        <div><button>Edit</button><button>Delete</button></div>
                    </div>
                })}
            </div>
        </div>
    )
}