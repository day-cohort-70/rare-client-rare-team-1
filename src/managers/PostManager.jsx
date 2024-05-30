export const getPostByPostId = (routeId) => {
    return fetch(`http://localhost:8088/posts/${routeId}?_expand=user`).then((res) => res.json())
}