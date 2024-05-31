import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/getAllCategories.jsx"
import { getAllTags } from "../../managers/getTags.jsx"


export const NewPost = ({token}) => {
    const [post, setPost] = useState(
        {
        user_id: parseInt(token),
        category_id: 0,
        title: "",
        publication_date: new Date(),
        image_url: "",
        content: "",
        approved: 0
        })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [newPostTags, setNewPostTags] = useState([])

    useEffect(() =>{
        getAllCategories().then((catArr)=> {
            setCategories(catArr)
        })
        },[])
        useEffect(()=>{
            getAllTags().then((tagArr)=>{
                setTags(tagArr)
            })
        },[])

        // const handleSubmit = async (e) => {
        //     //add window alert
        //     e.preventDefault()
        //     console.log("order submitted")
        //     await createPost(post).then(response => {
        //         {newPostTags.map(tag => {
        //         const tagObj = {
        //             "post_id": response.id,
        //             "tag_id": tag.id,
        //         }
        //      addNewPostTag(tagObj)
        //     })}
        //     }).then(navigate(`/posts/:response.id`))
            
        // }
    

    return (
        <form className="newPost">
            <h2> New Post </h2>
            <fieldset>
                <div className="form-group">
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    onChange={(event) => {
                        const copy = {...post}
                        copy.title = event.target.value
                        setPost(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Image URL"
                    onChange={(event) =>{
                        const copy = {...post}
                        copy.image_url = event.target.value
                        setPost(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea 
                    type="text"
                    className="form-control"
                    placeholder="Article Content"
                    rows="10"
                    onChange={(event) => {
                        const copy = {...post}
                        copy.content = event.target.value
                        setPost(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select id="category" 
                    onChange = {(event)=>{
                        const copy = {...post}
                        copy.category_id = parseInt(event.target.value)
                        setPost(copy)
                        }}>
                    <option value="" disabled selected> Choose a Category </option>
                    {categories.map((category) =>{
                        return(
                            <option value={category.id}>
                                {category.label}
                            </option> 
                        )
                    })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {tags.map(tag => (
                    <div key={tag.id}>
                    <input
                    type="checkbox"
                    value={tag.id}
                    id={tag.label}
                    //need an onchange here
                     />   
                     <label htmlFor={tag.label}>{tag.label}</label>
                     </div>
                    ))}
                    </div>
            </fieldset>
        </form>
    )
}