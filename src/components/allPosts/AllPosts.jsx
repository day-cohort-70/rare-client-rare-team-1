import { useEffect, useState } from "react"
import { getAllPosts } from "../../managers/MyPostsManager.jsx"


export const AllPosts = () => {
    const [allPostsArray, setAllPostsArray] = useState([])

    useEffect(() => {
        getAllPosts().then(data => {
            setAllPostsArray(data)
        })
    }, [])

    return (
        <>Hi</>
    )
}