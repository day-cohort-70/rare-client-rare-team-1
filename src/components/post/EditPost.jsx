// add button on post list to navigate to this page - :postId/edit
import { useState, useEffect } from "react"
import { getAllCategories } from "../../managers/getAllCategories.jsx"
import { getOnlyPostByPostId, updatePost } from "../../managers/PostManager.jsx"
import { useNavigate, useParams } from "react-router-dom"

export const EditPost = () => {
    const [transientPost, setTransientPost] = useState({})
    const [categories, setCategories] = useState([])
    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        getAllCategories().then((catArr)=> {
            setCategories(catArr)
        })
        },[])

    useEffect(() => {
        getOnlyPostByPostId(parseInt(postId)).then((post)=>{
            setTransientPost(post)
        })
    }, [postId])

    const handleSave = async (event) => {
        event.preventDefault()
        await updatePost(transientPost).then(()=>{
            navigate(`/posts/${postId}`)
        }) 
    }

    return(
        <form className="editPost">
            <h2> Edit Post </h2>
            <fieldset>
                <div className="form-group">
                    <input 
                    type="text"
                    className="form-control"
                    placeholder={transientPost?.title}
                    onChange={(event) => {
                        const copy = {...transientPost}
                        copy.title = event.target.value
                        setTransientPost(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input 
                    type="text"
                    className="form-control"
                    placeholder={transientPost?.image_url}
                    onChange={(event) =>{
                        const copy = {...transientPost}
                        copy.image_url = event.target.value
                        setTransientPost(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea 
                    type="text"
                    className="form-control"
                    placeholder={transientPost?.content}
                    rows="10"
                    onChange={(event) => {
                        const copy = {...transientPost}
                        copy.content = event.target.value
                        setTransientPost(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select id="category" 
                    onChange = {(event)=>{
                        const copy = {...transientPost}
                        copy.category_id = parseInt(event.target.value)
                        setTransientPost(copy)
                        }}>
                    {categories.find(cat => cat.id === transientPost.category_id)? (
                    <option value="" disabled selected> 
                            {categories.find(cat => cat.id === transientPost.category_id).label}
                     </option>
                    ): null}
                    {categories.map((category) =>{
                        return(
                            <option value={category.id} key={category.id}>
                                {category.label}
                            </option> 
                        )
                    })}
                    </select>
                </div>
            </fieldset>
            <button className="save-btn"
            onClick = {handleSave}
            > Save Post </button>
            <button
            onClick={()=>{navigate(`/posts`)}}
            > Cancel </button>
        </form>
    )
}