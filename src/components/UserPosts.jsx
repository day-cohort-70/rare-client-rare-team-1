import { useEffect, useState } from "react"
import { getAllPosts } from "../managers/MyPostsManager"
import { Post } from "./Post"
import { Link } from "react-router-dom"


export const UserPosts = ({ token }) => {
    const [adminPosts, setAdminPosts] = useState([])

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
                <Link to={`/posts/${postObj.id}`} className="container-post" key={postObj.id} postId={postObj.id}>
                  <Post post={postObj} token={token} />
                </Link>
              ))
            )}
          </section>
        </section>
      )
    }