export const Post = ({post}) => {
    return (
        <section className="container-post-info">
                <header className="container-post-title">{post?.title}</header>
                <header className="container-post-date">{post?.publication_date}</header>
                <img src={post?.image_url} className="container-post-image" />
                <div className="container-post-author">{post?.user?.username}</div>
                <div className="container-post-category">{post?.user?.category}</div>
              </section>
    )
}