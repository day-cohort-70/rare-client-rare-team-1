
/* will need to pass in postId as an argument once this gets linked to posts modules */
/* will also need to pass in postId as an argument to the function on PostDetails.jsx*/
export const getPostByPostId = () => {
    return fetch(`http://localhost:8088/posts/1?_expand=user`).then((res) => res.json())
}