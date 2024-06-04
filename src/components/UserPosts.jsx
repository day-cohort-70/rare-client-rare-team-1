import { useEffect, useState } from "react"
import { getAllPosts } from "../managers/MyPostsManager"
import { Post } from "./Post"
import { Link, useNavigate } from "react-router-dom"


export const UserPosts = ({ token }) => {
    const [adminPosts, setAdminPosts] = useState([])
    const navigate = useNavigate()

    const getAndSetAdminPosts = () => {
        getAllPosts().then(allPosts => {
          const filteredPosts = allPosts.filter(post => parseInt(post.user.id) === parseInt(token))
          setAdminPosts(filteredPosts)
        })
      }
  
    useEffect(() => {
      getAndSetAdminPosts()
    }, [token])

    return (
        <section className="container-admin-posts-page">
          <div className="title">Posts</div>
          <section className="container-admin-posts">
            {adminPosts.length === 0 ? (
              <p>you currently have zero posts</p>
            ) : (
              adminPosts.map((postObj) => (
                <div>
                <Link to={`/posts/${postObj.id}`} className="container-post" key={postObj.id} postId={postObj.id}>
                  <Post post={postObj} token={token} />
                </Link>
                <button onClick = { () =>{
                  navigate(`/posts/${postObj.id}/edit`)
              }} > Edit </button>
              </div>
              ))
            )}
          </section>
        </section>
      )
    }