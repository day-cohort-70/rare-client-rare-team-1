import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/getAllCategories.jsx"


export const CategoryList = () => {
    const [listOfCategoriesArray, setListOfCategoriesArray] = useState([])

    useEffect(() => {
        getAllCategories().then(data => {
            setListOfCategoriesArray(data)
        })
    }, [])

    return (
        <div className="categoryListContainer">
            <h2>List of Categories:</h2>
            <article className="categories">
                {listOfCategoriesArray.map((categoryObj) => {
                    return <div>{categoryObj.label}</div>
                })}
            </article>

        </div>
    )
}