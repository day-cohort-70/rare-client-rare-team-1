
/* will need to pass in postId as an argument once this gets linked to posts modules */
/* will also need to pass in postId as an argument to the function on PostDetails.jsx*/
export const getPostByPostId = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_expand=user`).then((res) => res.json())
}

export const CreatePost = async (data) => {
   const response = await fetch(`http://localhost:8088/posts`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (response.status === 204 || response.ok){
        return response.json()
    } else {
    return Promise.reject(new Error("Network response was not ok"))
}
}