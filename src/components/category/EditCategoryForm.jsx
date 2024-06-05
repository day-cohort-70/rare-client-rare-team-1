import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategoryById, updateCategory } from "../../managers/getAllCategories.jsx"


export const EditCategory = () => {
    const [category, setCategory] = useState({})
    const [input, setInput] = useState("")

    const {categoryId} = useParams()
    const navigate = useNavigate()

  
    const getAndSetCategory = () => {
        getCategoryById(categoryId).then(categoryObject => {
            setCategory(categoryObject)
        })
    }

    useEffect(() => {
        getAndSetCategory()
    }, [categoryId])

    const handleInputChange = (e) => {
        const categoryCopy = {...category}
        categoryCopy[e.target.name] = e.target.value
        setCategory(categoryCopy)
    }

    const handleEditCategory = (e) => {
        e.preventDefault()

        const editedCategory = {
            id: category.id,
            label: category.label
        }
        updateCategory(editedCategory).then(()=> {
            navigate(`/categorymanager`)
        })
    }





    return (
        <form>
            <h2>Edit Category</h2>
            <div>
                <div>

                    <fieldset>
                        <div>
                            <input type="text" name="label" value={category?.label} onChange={handleInputChange}></input>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div>
                            <button className="button" onClick={handleEditCategory}>Save</button>
                            <button className="button" onClick={() => navigate(`/categorymanager`)}>Cancel</button>
                        </div>
                    </fieldset>

                </div>
            </div>
        </form>
    )

}