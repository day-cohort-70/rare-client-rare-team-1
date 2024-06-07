
export const getCommentsByPostId = (postId) => {
    return fetch(`http://localhost:8088/comments/${postId}?_expand=user`).then((res) => res.json())
}


export const postComment = (commentObj) => {
    return fetch('http://localhost:8088/comments', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    }).then(res => {
        if (res.status === 204 || res.ok) {
          return Promise.resolve() // Return a resolved promise if status is 204 or request is successful
        }
        return Promise.reject(new Error("Network response was not ok"))
      })
}


export const deleteComment = async (id) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    return await fetch(`http://localhost:8088/comments/${id}`, deleteOptions).then((res) => {
        if (res.status === 204) {
            return true;
        } else {
            throw new Error("Failed to delete comment");
        }   
    })
}

export const updateComment = async (editedComment) => {
    return await fetch(`http://localhost:8088/comments/${editedComment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedComment)
    })
}

