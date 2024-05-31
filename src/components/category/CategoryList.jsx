import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/getAllCategories.jsx"
import { useNavigate } from "react-router-dom"
import 'bulma/css/bulma.css'


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
        <div className="container">
            <h2 className="title">List of Categories:</h2>
            <article className="box">
                {listOfCategoriesArray.map((categoryObj, index) => {
                    const colorClasses = [
                        'is-primary', 'is-link', 'is-info',
                        'is-success', 'is-warning', 'is-danger'
                    ];
                    const colorClass = colorClasses[index % colorClasses.length];
                    return (
                        <div key={categoryObj.id} className={`notification ${colorClass} category-item`}>
                            {categoryObj.label}
                        </div>
                    );
                })}
            </article>
            <button className="button is-primary" onClick={handleClick}>Create Category</button>
        </div>
    )
}