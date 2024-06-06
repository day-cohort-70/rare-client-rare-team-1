import { useEffect, useState, useRef } from "react"
import { deleteCategory, getAllCategories, updateCategory, addNewCategory } from "../../managers/getAllCategories.jsx"
import 'bulma/css/bulma.css'


export const CategoryList = () => {
    const [listOfCategoriesArray, setListOfCategoriesArray] = useState([])
    const [alphabeticalArray, setAlphabeticalArray] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editedCategory, setEditedCategory] = useState("")
    const [newCatName, setNewCatName] = useState("")
    const inputRef = useRef()

    const fetchCategories = () => {
        getAllCategories().then(categories => {
            const filteredCategories = categories.filter(category => category.id !== 0)
            setListOfCategoriesArray(filteredCategories)
    })}

    const alphabeticalOrder = () => {
        const alphabeticalList = [...listOfCategoriesArray].sort((a, b) => {
            if (a.label.toLowerCase() < b.label.toLowerCase()) {
                return -1
            }
            if (a.label.toLowerCase() > b.label.toLowerCase()) {
                return 1
            }
            return 0
        })
        setAlphabeticalArray(alphabeticalList)
    }

    useEffect(() => {
        fetchCategories()
    }, [showModal])

    useEffect(() => {
        alphabeticalOrder()
    }, [listOfCategoriesArray])


    const handleDelete = (categoryId) => {
        const confirmed = window.confirm('Are you sure you want to delete this category?')
        if (confirmed) {
            deleteCategory(categoryId).then(() => {
                fetchCategories()
            })
        }
    }

    const handleSave = () => {
        if (newCatName !== "") {
            addNewCategory(newCatName).then(() => {
                fetchCategories()
                setNewCatName("")
            })
        }
        else {
            window.alert("Please Create a new Category")
        }
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter'){
          handleSave(inputRef.current.value)
        }
      }
      //move handle save & updateCategory from other module and delete routes
  
      //set modal as viewable or not
      const active = showModal ? ("is-active"): ("")


    return (
        <div className="container">
            <h2 className="title">List of Categories:</h2>
            <article className="box">
                {alphabeticalArray.map((categoryObj, index) => {
                    const colorClasses = [
                        'is-primary', 'is-link', 'is-info',
                        'is-success', 'is-warning', 'is-danger'
                    ]
                    const colorClass = colorClasses[index % colorClasses.length];
                    return (
                        <div key={categoryObj.id} className={`notification ${colorClass} category-item`}>
                            <button className="button white m-1"
                            onClick = {()=>{setShowModal(true)
                                setEditedCategory(categoryObj)
                            }}
                            >
                                <i className="fa-solid fa-gear"></i>
                            </button>
                            <button className="button white m-1" onClick={() => handleDelete(categoryObj.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>

                            {categoryObj.label}
                        </div>
                    )
                })}
                <div className={`modal ${active}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Category</p>
              <button
                onClick={()=>{setShowModal(false)}}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">New Category Label</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={editedCategory.label}
                    onChange={(event)=>{
                        const copy = {...editedCategory}
                        copy.label = event.target.value
                        setEditedCategory(copy)
                    }}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success"
                onClick={async ()=>{
                    //is this accepting an object
                await updateCategory(editedCategory).then(()=> {
                    setShowModal(false)
                    setEditedCategory({})
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
                    required
                    value={newCatName}
                    ref={inputRef}
                    onKeyDown={(event) => {handleEnter(event)}}
                    onChange={(event) =>{
                        setNewCatName(event.target.value)
                    }}
                />
            </form>
            <button onClick={handleSave}> Save </button>
             </aside>
        </div>      
    )
}