export const getAllTags = () => {
    return fetch (`http://localhost:8088/tag`).then(res => res.json())
}




export const addNewTag = (newTag) => {
    return fetch(`http://localhost:8088/tag`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTag)
    }).then(res => {
        if (res.status === 204 || res.ok){
            return Promise.resolve()
        }
        return Promise.reject(new Error("Network response was not ok"))
    })
}


export const deleteTag = (tagId) => {
    return fetch(`http://localhost:8088/tag/${tagId}`, {
        method: "DELETE"
    })
}

export const updateTag = async (edittedTag) => {
    return await fetch(`http://localhost:8088/tags/${edittedTag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(edittedTag)
    })
}

