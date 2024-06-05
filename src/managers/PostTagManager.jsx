
export const getTagsByPostId = (postId) => {
    return fetch (`http://localhost:8088/posttag/${postId}?_expand=tag`).then(res => res.json())
}

export const updatePostTags = async (postId, updatedTags) => {
    return fetch(`http://localhost:8088/posttag/${postId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({updatedTags})
    })
}

export const addNewPostTag = (postTag) => {
    return fetch (`http://localhost:8088/postTags`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postTag)
    }).then(res => {
        if (res.status === 204 || res.ok){
            return Promise.resolve()
        }
        return Promise.reject(new Error("Network response was not ok"))
    })
}

export const deletePostTagsById = (tagId) => {
    return fetch(`http://localhost:8088/postTags/${tagId}`, {
        method: "DELETE"
    })
}