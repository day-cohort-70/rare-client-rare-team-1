import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllTags, addNewTag } from "../../managers/TagManager.jsx"


export const TagList = () => {
    const [tagList, setTagList] = useState([])
    const [newTagName, setNewTagName] = useState("")
    const navigate = useNavigate()

    useEffect(() =>{
        getAllTags().then(tags =>{
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
        <div className="tagListContainer">
            <h2> Tags </h2>
            <article className="tags">
                <ul className="tagList">
                {tagList.map((tag) => {
                    return (
                        <li key={tag.id}> {tag.label} </li>
                    )
                })}
                </ul>
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