import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllTags, addNewTag, deleteTag } from "../../managers/TagManager.jsx"
import { deletePostTagsById } from "../../managers/PostTagManager.jsx"


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

    /* Function to handle the deleting of a tag. Also needs to delete each instance in the PostTags joiner table */
    const handleDelete = (tagId) => {
        if (window.confirm("Are you sure you want to delete the tag?")) {
            console.log("deleted")
            deleteTag(tagId)
            deletePostTagsById(tagId)
        }
    }

    return(
        <div className="tagListContainer">
            <h2 className="title has-text-centered"> Tags </h2>
            <article className="tags">
                <div className="tagList">
                {tagList.map((tag) => {
                    return (
                        <div key={tag.id}>
                            <div key={tag.id}> {tag.label} </div>
                            <button className="button is-warning" onClick={() => {handleDelete(tag.id)}}>Delete</button>
                        </div>
                    )
                })}
                </div>
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