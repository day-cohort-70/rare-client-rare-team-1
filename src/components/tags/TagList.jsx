import { useEffect, useState, useRef } from "react"
import { getAllTags, addNewTag, deleteTag, updateTag } from "../../managers/TagManager.jsx"
import { deletePostTagsById } from "../../managers/PostTagManager.jsx"
import 'bulma/css/bulma.css'


export const TagList = () => {
    const [tagList, setTagList] = useState([])
    const [newTagName, setNewTagName] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editedTag, setEditedTag] = useState({})
    const inputRef = useRef()

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

    /* Function to handle the deleting of a tag. Also needs to delete each instance in the PostTags joiner table */
    const handleDelete = (tagId) => {
        if (window.confirm("Are you sure you want to delete the tag?")) {
            console.log("deleted")
            deleteTag(tagId).then(() => {
                getAndSetAllTags()
            })
            
            deletePostTagsById(tagId)
        }
    }

    //handles form if enter is pressed instead of save button
    const handleEnter = (event) => {
      if (event.key === 'Enter'){
        handleSave(inputRef.current.value)
      }
    }

    //set modal as viewable or not
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
                            <div className="is-flex is-align-items-center">
                              <button
                                onClick = {()=>{setShowModal(true)
                                    setEditedTag(tag)
                                }}
                                className="button white m-1">
                                <i className="fa-solid fa-gear"></i>
                              </button>
                              <button className="button white m-1" onClick={() => {handleDelete(tag.id)}}>
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            
                            <div className="ml-2">
                              {tag.label}
                            </div>
                          </div>
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
                    value={editedTag.label}
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
                    setEditedTag({})
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
            <aside className="newTagForm container"> 
              <h3 className="title">Create a New Tag </h3>
              <form>
                <div className="field">
                  <div className="control">
                    <input
                        type="text"
                        className="input mb-4"
                        required
                        value={newTagName}
                        ref={inputRef}
                        onKeyDown={(event) => {handleEnter(event)}}
                        onChange={(event) =>{
                            setNewTagName(event.target.value)
                        }}
                    />
                  </div>
                </div>
                  
              </form>
              <button onClick={handleSave} className="button is-primary mb-6"> Save </button>
            </aside>
        </div>
    )
}