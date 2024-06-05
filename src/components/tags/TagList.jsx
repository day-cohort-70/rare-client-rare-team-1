import { useEffect, useState } from "react"
import { getAllTags, addNewTag, updateTag } from "../../managers/TagManager.jsx"
import "bulma/css/bulma.css"

export const TagList = () => {
    const [tagList, setTagList] = useState([])
    const [newTagName, setNewTagName] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editedTag, setEditedTag] = useState({})

    useEffect(() =>{
        getAndSetAllTags()
    }, [])
 
    const getAndSetAllTags = () => {
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
    }

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
    const active = showModal ? ("is-active"): ("")

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
                            <button
                            onClick = {()=>{setShowModal(true)
                                setEditedTag(tag)
                            }}
                            className="button white m-1">
                            <i className="fa-solid fa-gear"></i>
                            </button>
                            <button className="button white m-1">
                            <i className="fa-solid fa-trash"></i>
                            </button>
                            {tag.label}
                        </div>
                    )
                })}
        <div className={`modal ${active}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Tag</p>
              <button
                onClick={()=>{setShowModal(false)}}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">New Tag Label</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder={editedTag.label}
                    onChange={(event)=>{
                        const copy = {...editedTag}
                        copy.label = event.target.value
                        setEditedTag(copy)
                    }}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success"
                onClick={async ()=>{
                await updateTag(editedTag).then(()=> {
                    setShowModal(false)
                    getAndSetAllTags()
              })
              }}
              >Save changes</button>
              <button 
                onClick={()=>{setShowModal(false)}}
                className="button">
                Cancel
              </button>
            </footer>
          </div>
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