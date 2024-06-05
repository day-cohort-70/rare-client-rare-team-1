import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllTags, addNewTag, deleteTag } from "../../managers/TagManager.jsx"
import { deletePostTagsById } from "../../managers/PostTagManager.jsx"


export const TagList = () => {
    const [tagList, setTagList] = useState([])
    const [newTagName, setNewTagName] = useState("")
    const navigate = useNavigate()

    /* Need this here so I can call on it to refresh the page properly   */
    const retrieveTags = () => {
        getAllTags().then(tags =>{
            setTagList(tags)
        })
    }

    useEffect(() =>{
        retrieveTags()
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
            deleteTag(tagId).then(() => {
                retrieveTags()
            })
            
            deletePostTagsById(tagId)
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
                             <button className="button white m-1" onClick={() => {handleDelete(tag.id)}}>
                             <i className="fa-solid fa-trash" ></i>
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