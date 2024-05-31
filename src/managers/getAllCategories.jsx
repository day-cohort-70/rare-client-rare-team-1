export const getAllCategories = () => {
    return fetch(`http://localhost:8088/category`).then(res => res.json())
}

export const addNewCategory = (name) => {
    return fetch(`http://localhost:8088/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(name)
    }).then(res => {
        if (res.status === 204 || res.ok) {
          return Promise.resolve() // Return a resolved promise if status is 204 or request is successful
        }
        return Promise.reject(new Error("Network response was not ok"))
      })
}