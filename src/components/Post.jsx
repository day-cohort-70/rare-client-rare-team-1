import { useNavigate } from "react-router-dom"

export const Post = ({post}) => {
const navigate = useNavigate()

    return (
        <section className="container-post-info">
                <header className="container-post-title">{post?.title}</header>
                <header className="container-post-date">{post?.publication_date}</header>
                <img src={post?.image_url} className="container-post-image" />
                <div className="container-post-author">{post?.user?.username}</div>
                <div className="container-post-category">{post?.category?.label}</div>
                <button onClick = { () =>{
                    navigate(`/${post.id}/edit`)
                }} > Edit </button>
              </section>
    )
}