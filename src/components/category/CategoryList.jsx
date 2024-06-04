import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/getAllCategories.jsx"
import { useNavigate } from "react-router-dom"
import 'bulma/css/bulma.css'


export const CategoryList = () => {
    const [listOfCategoriesArray, setListOfCategoriesArray] = useState([])
    const [alphabeticalArray, setAlphabeticalArray] = useState([])
    const navigate = useNavigate()

    const fetchCategories = () => {
        getAllCategories().then(data => {
            setListOfCategoriesArray(data)
    })}

    const alphabeticalOrder = () => {
        const alphabeticalList = [...listOfCategoriesArray].sort((a, b) => {
            if (a.label.toLowerCase() < b.label.toLowerCase()) {
                return -1
            }
            if (a.label.toLowerCase() > b.label.toLowerCase()) {
                return 1
            }
            return 0
        })
        setAlphabeticalArray(alphabeticalList)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        alphabeticalOrder()
    }, [listOfCategoriesArray])

    const handleClick = () => {
        navigate("/categorymanager/addCategory", { state: { fetchCategories } } )
    }

    return (
        <div className="container">
            <h2 className="title">List of Categories:</h2>
            <article className="box">
                {alphabeticalArray.map((categoryObj, index) => {
                    const colorClasses = [
                        'is-primary', 'is-link', 'is-info',
                        'is-success', 'is-warning', 'is-danger'
                    ]
                    const colorClass = colorClasses[index % colorClasses.length];
                    return (
                        <div key={categoryObj.id} className={`notification ${colorClass} category-item`}>
                            <button className="button white m-1">
                            <i className="fa-solid fa-gear"></i>
                            </button>
                            <button className="button white m-1">
                            <i className="fa-solid fa-trash"></i>
                            </button>
                            {categoryObj.label}
                        </div>
                    )
                })}
            </article>
            <button className="button is-primary mb-6" onClick={handleClick}>Create Category</button>
        </div>
    )
}