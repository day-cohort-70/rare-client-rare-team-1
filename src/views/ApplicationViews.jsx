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
import { ManagePostTags } from "../components/tags/ManagePostTags.jsx"
import { AllPosts } from "../components/allPosts/AllPosts.jsx"
import { EditCategory } from "../components/category/EditCategoryForm.jsx"
import { EditPost } from "../components/post/EditPost.jsx"
import { CommentForm } from "../components/comments/CommentForm.jsx"
import { CommentList } from "../components/comments/CommentList.jsx"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<UserPosts token={token} />} />

        <Route path="/allposts" element={<AllPosts />} />
        
        <Route path="posts" >
          <Route index element={<UserPosts token={token} />} />       
          <Route path=":postId" element={<PostDetails token={token}/>} />
          <Route path=":postId/edit" element={<EditPost />} />
          <Route path=":postId/comment" element={<CommentForm token={token}/>} />
          <Route path=":postId/comments" element={<CommentList token={token}/>} />
          <Route path=":postId/tags" element={<ManagePostTags token={token}/>} />
        </Route>

        <Route path="/newPost" element={<NewPost token={token} />}/>
        <Route path="/categorymanager">
          <Route index element={<CategoryList />} />
          <Route path="addCategory" element={<AddCategoryForm />} />
          <Route path=":categoryId/edit" element={<EditCategory />} />
        </Route>
        <Route path="/tagmanager" element={<TagList />} />
        <Route path="/usermanager"  />

      </Route>
    </Routes>
  </>
}

/* 
6/5/24: continued naming convention notes:

Posts
Routes for a "post" story (view, add comment, manage tags) are functional and named appropriately 
Let's use strict lowercase for all route names: ie tagmanager, with the exception of postId since that is an int
Still need Route for view comments on a post. Naming: /posts/postId/viewcomments
Still need an edit option from the post details view. The route and element is established, we just need a button.

posts by author view is navigated to from the user profile view, see below 

Categories: 

/categorymanager with an index element of CategoryList
/categorymanager/categoryId When a category name is clicked, the user will be taken to a view that shows all posts with that categoryId

users: 

/usermanager with an index element of UserList
/usermanager/userId When a user name is clicked, the user will be taken to a view that shows that users profile

Elements for the routes
element={<Home />}
element={<CategoryManager token={token} />}
element={<TagManager token={token} />}
element={<UserManager token={token} />}

*/
