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