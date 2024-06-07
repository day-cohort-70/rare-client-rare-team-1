

export const updateApprovalStatus = (postId, newStatus) => {
    return fetch(`http://localhost:8088/posts/${postId}`,{
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ approved: newStatus })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message);
            });
        }
        // Handle the case where response body is empty
        return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .catch(error => {
        console.error("Error updating post approval status:", error);
        throw error;
    });
};