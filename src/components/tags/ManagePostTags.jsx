import { useState, useEffect } from "react"
import { getAllTags, getTagsByPostId } from "../../managers/getTags.jsx"
import { useNavigate, useParams } from "react-router-dom"


export const ManagePostTags = () => {
    const [availableTags, setAvailableTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const [selectedTags, setSelectedTags] = useState(new Set())
    const {postId} = useParams()
    const navigate = useNavigate()


    // const getAndSetTags = () => {
    //     getAllTags().then(tagData => {
    //         setAvailableTags(tagData)
    //     })
    // }
    // const getTagsForPost = () => {
    //     getTagsByPostId(postId).then(tagData => {
    //         setPostTags(tagData)
    //     })
    // }
    // useEffect(() => {
    //     getAndSetTags()
    //     getTagsForPost()
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const tagData = await getAllTags();
            setAvailableTags(tagData);
            const postTagData = await getTagsByPostId(postId);
            setPostTags(postTagData);
            setSelectedTags(new Set(postTagData.map(tag => tag.tag_id)))
        }
        fetchData();
    },[postId])

    const handleSelectedTags = (e) => {
        const tagId = parseInt(e.target.value)
        setSelectedTags((prevSelectedTags) => {
            const updatedSelectedTags = new Set(prevSelectedTags)
            if (updatedSelectedTags.has(tagId)) {
                updatedSelectedTags.delete(tagId)
            } else {
                updatedSelectedTags.add(tagId)
            }
            return updatedSelectedTags
        })
    }

    return (
    <form className="container-manage-tags">
        <h2>Manage Post Tags</h2>
        <div className="form-container">
            <div className="form">

                <fieldset>
                    <div className="tag-choices">
                        <h3>Tags:</h3>
                            {availableTags.map(tag => {
                                return (
                                    <div key={tag.id}>
                                        <input 
                                            type="checkbox" 
                                            name="tag" 
                                            id={`tag-${tag.id}`}
                                            value={tag.id} 
                                            checked={selectedTags.has(tag.id)}
                                            onChange={handleSelectedTags}
                                        />
                                        <label htmlFor={`tag-${tag.id}`}>{tag.label}</label>
                                    </div>
                                )
                            })}
                    </div>
                </fieldset>
                <button type="submit">Save</button>
            </div>
        </div>
    </form>
)
}