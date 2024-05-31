import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { addNewCategory } from "../../managers/getAllCategories.jsx"



export const AddCategoryForm = () => {
    const [newCategoryName, setNewCategoryName] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const fetchCategories = location.state?.fetchCategories

    const handleSave = () => {
        if (newCategoryName != "") {
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
        <div className="addCategoryFormContainer">
            <form>
            <input 
                type="text"
                name="newCategory"
                required
                value={newCategoryName}
                onChange={(event) => {
                    setNewCategoryName(event.target.value)
                }}
            />
            </form>
            <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
    )
}