import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/getAllCategories.jsx"
import { getAllTags } from "../../managers/TagManager.jsx"
import { CreatePost } from "../../managers/PostManager.jsx"
import { useNavigate } from "react-router-dom"
import { addNewPostTag } from "../../managers/PostTagManager.jsx"

export const NewPost = ({token}) => {
    const [post, setPost] = useState(
        {
        user_id: parseInt(token),
        category_id: 0,
        title: "",
        publication_date: new Date(),
        image_url: "",
        content: "",
        approved: 1
        })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [newPostTags, setNewPostTags] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        getAllCategories().then((catArr)=> {
            const filteredCategories = catArr.filter(category => category.id !== 0)
            setCategories(filteredCategories)
        })
        },[])
    
        useEffect(()=>{
            getAllTags().then((tagArr)=>{
                setTags(tagArr)
            })
        },[])


        const handleSubmit = async (e) => {
            e.preventDefault()
            if (post.category_id ===0 || post.title === "" || post.image_url === "" || post.content === ""){
                window.alert("Please complete all fields of the New Post Form before submitting")
            } else {
            try {
                const response  = await CreatePost(post)
                
                if(newPostTags){
                newPostTags.forEach(async (tag) =>{
                    const tagObj ={
                        "post_id": parseInt(response),
                        "tag_id" : tag,
                    };
                    
                addNewPostTag(tagObj)
                })
                navigate(`/posts/${response}`)}
            } catch (error){
                console.error("Error creating post:", error)
            }
        } 
        }


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
                    onChange={(event) =>{
                    const selectedTagId = parseInt(event.target.value)
                    const copy = newPostTags
                    copy.push(selectedTagId)
                    setNewPostTags(copy)
                    }}
                     />   
                     <label htmlFor={tag.label}>{tag.label}</label>
                     </div>
                    ))}
                    </div>
            </fieldset>
            <button className="save-btn" onClick={handleSubmit}> Post </button>
        </form>
    )
}