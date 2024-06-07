import { useEffect, useState } from "react"
import { deleteCategory, getAllCategories } from "../../managers/getAllCategories.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import 'bulma/css/bulma.css'


export const CategoryList = () => {
    const [listOfCategoriesArray, setListOfCategoriesArray] = useState([])
    const [alphabeticalArray, setAlphabeticalArray] = useState([])
    const navigate = useNavigate()

    const fetchCategories = () => {
        getAllCategories().then(categories => {
            const filteredCategories = categories.filter(category => category.id !== 0)
            setListOfCategoriesArray(filteredCategories)
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

    const handleEdit = (categoryId) => {
        navigate(`/categorymanager/${categoryId}/edit`)
    }

    const handleDelete = (categoryId) => {
        const confirmed = window.confirm('Are you sure you want to delete this category?')
        if (confirmed) {
            deleteCategory(categoryId).then(() => {
                fetchCategories()
            })
        }
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
                            <div className="is-flex is-align-items-center">
                                <button className="button white m-1" onClick={() => handleEdit(categoryObj.id)}>
                                    <i className="fa-solid fa-gear"></i>
                                </button>
                                <button className="button white m-1 " onClick={() => handleDelete(categoryObj.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                                <div className="ml-2">
                                    {categoryObj.label}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </article>
            <button className="button is-primary mb-6" onClick={handleClick}>Create Category</button>
        </div>
    )
}