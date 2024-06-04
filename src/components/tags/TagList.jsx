import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllTags, addNewTag } from "../../managers/TagManager.jsx"
import 'bulma/css/bulma.css'

export const TagList = () => {
    const [tagList, setTagList] = useState([])
    const [newTagName, setNewTagName] = useState("")
    const navigate = useNavigate()

    useEffect(() =>{
        getAllTags().then(tags =>{
            [...tags].sort((a,b) => {
                if (a.label.toLowerCase() < b.label.toLowerCase()){
                    return -1
                }
                if (a.label.toLowerCase() > b.label.toLowerCase()){
                    return 1
                }
                return 0
            })
            setTagList(tags)
        })
    }, [])

    const handleSave = () => {
       if (newTagName !== "") {
        addNewTag(newTagName).then(()=>{
            getAllTags().then(tags =>{
                setTagList(tags)
                setNewTagName("")
            })
        })
       }
       else{
        window.alert("Please enter a tag name")
       }
    }

    return(
        <div className="container">
            <h2 className="title"> Tags </h2>
            <article className="box">
                {tagList.map((tag, index) => {
                    const colorClasses = [
                        'is-primary', 'is-link', 'is-info',
                        'is-success', 'is-warning', 'is-danger'
                    ]
                    const colorClass = colorClasses[index % colorClasses.length];
                    return (
                        <div key={tag.id} className={`notification ${colorClass} category-item`}>
                            {/* add ternary for admin user later */}
                            <button className="button white m-1">
                            <i className="fa-solid fa-gear"></i>
                            </button>
                             <button className="button white m-1">
                             <i className="fa-solid fa-trash"></i>
                             </button>
                            {tag.label}
                        </div>
                    )
                })}
            </article>
            <aside className="newTagForm"> 
            <h3>Create a New Tag </h3>
            <form>
                <input
                    type="text"
                    name="newTag"
                    required
                    value={newTagName}
                    onChange={(event) =>{
                        setNewTagName(event.target.value)
                    }}
                />
            </form>
            <button className="save-btn" onClick={handleSave}> Save </button>
             </aside>
        </div>
    )
}