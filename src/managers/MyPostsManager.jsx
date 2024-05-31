export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?&_expand=user&_expand=categories`).then((res) => res.json()) 
}