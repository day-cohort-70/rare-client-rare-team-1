import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { UserPosts } from "../components/UserPosts"
import { PostDetails } from "../components/post/PostDetails.jsx"
import { CategoryList } from "../components/category/CategoryList.jsx"
import { AddCategoryForm } from "../components/category/AddCategoryForm.jsx"
import { TagList } from "../components/tags/TagList.jsx"
import { NewPost } from "../components/post/NewPost.jsx"
import { CommentForm } from "../components/post/CommentForm.jsx"
import { ManagePostTags } from "../components/tags/ManagePostTags.jsx"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/"  />

        <Route path="allposts"/>
        <Route path="myposts"/>
        
        <Route path="posts" >
          <Route index element={<UserPosts token={token} />} />
          <Route path=":postId" element={<PostDetails token={token}/>} />
          <Route path=":postId/edit" />
          <Route path=":postId/comment" element={<CommentForm token={token}/>} />
          <Route path=":postId/tags" element={<ManagePostTags token={token}/>} />
        </Route>

        <Route path="/newPost" element={<NewPost token={token} />}/>
        <Route path="/categorymanager">
          <Route index element={<CategoryList />} />
          <Route path="addCategory" element={<AddCategoryForm />} />
        </Route>
        <Route path="/tagmanager" element={<TagList />} />
        <Route path="/usermanager"  />

      </Route>
    </Routes>
  </>
}

/* 
Elements for the routes
element={<Home />}
element={<AllPosts token={token} />}
element={<PostDetails />}
element={<MyPosts token={token} />}
element={<EditPostDetails />}
element={<AddPost token={token} />}
element={<CategoryManager token={token} />}
element={<TagManager token={token} />}
element={<UserManager token={token} />}

*/
