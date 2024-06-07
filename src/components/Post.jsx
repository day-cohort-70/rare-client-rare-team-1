import { useNavigate } from "react-router-dom"

export const Post = ({post}) => {
const navigate = useNavigate()

    return (
        <section className="container-post-info box m-4" style={{ backgroundColor: '#f0f0f0' }}>
            <header className="container-post-title title has-text-primary">{post?.title}</header>
            <header className="container-post-date subtitle">{post?.publication_date}</header>
            <div className="columns is-left">
                <div className="column is-narrow">
                <figure className="image" style={{ maxWidth: '300px' }}>
                    <img src={post?.image_url} className="container-post-image" alt="Post Image" />
                </figure>
                </div>
            </div>
            <div className="container-post-author is-size-5 has-text-weight-semibold">{post?.user?.username}</div>
            <div className="container-post-category is-size-5 has-text-primary">Category: {post?.category?.label}</div>        
        </section>
    )
}