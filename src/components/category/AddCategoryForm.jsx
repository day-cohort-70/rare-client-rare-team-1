import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { addNewCategory } from "../../managers/getAllCategories.jsx"



export const AddCategoryForm = () => {
    const [newCategoryName, setNewCategoryName] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const fetchCategories = location.state?.fetchCategories

    const handleSave = () => {
        if (newCategoryName !== "") {
            addNewCategory(newCategoryName).then(() => {
                if (fetchCategories) {
                    fetchCategories()
                }
                navigate("/categorymanager")
            })
        }
        else {
            window.alert("Please Create a new Category")
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={(e) => e.preventDefault()}>
                <h2 className="title has-text-centered">Add New Category</h2>
                <div className="field">
                    <label className="label">Category Name</label>
                </div>
                <div className="control">
                    <input 
                        className="input"
                        type="text"
                        name="newCategory"
                        required
                        value={newCategoryName}
                        onChange={(event) => {
                            setNewCategoryName(event.target.value)
                        }}
                    />
                </div>
            </form>
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-primary mt-5" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}