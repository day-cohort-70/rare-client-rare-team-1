














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