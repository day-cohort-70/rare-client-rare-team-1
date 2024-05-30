import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/getAllCategories.jsx"
import { useNavigate } from "react-router-dom"


export const CategoryList = () => {
    const [listOfCategoriesArray, setListOfCategoriesArray] = useState([])
    const navigate = useNavigate()

    const fetchCategories = () => {
        getAllCategories().then(data => {
            setListOfCategoriesArray(data)
    })}

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleClick = () => {
        navigate("/categorymanager/addCategory", { state: { fetchCategories } } )
    }

    return (
        <div className="categoryListContainer">
            <h2>List of Categories:</h2>
            <article className="categories">
                {listOfCategoriesArray.map((categoryObj) => {
                    return <div key={categoryObj.id}>{categoryObj.label}</div>
                })}
            </article>
            <button onClick={handleClick}>Create Category</button>
        </div>
    )
}