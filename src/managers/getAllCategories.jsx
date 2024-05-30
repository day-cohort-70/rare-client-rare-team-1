export const getAllCategories = () => {
    return fetch(`http://localhost:8088/category`).then(res => res.json())
}