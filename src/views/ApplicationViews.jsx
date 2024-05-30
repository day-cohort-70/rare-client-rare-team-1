import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostDetails } from "../components/post/PostDetails.jsx"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/"  />
        <Route path="allposts"/>
        <Route path="myposts"/>
        <Route path="posts">
          <Route path=":postId" element={<PostDetails token={token}/>} />
          <Route path=":postId/edit" />
        </Route>
        <Route path="/addpost"  />
        <Route path="/categorymanager"  />
        <Route path="/tagmanager"  />
        <Route path="/usermanager"  />

      </Route>
    </Routes>
  </>
}

/* 
Elements for the routes
element={<Home />}
element={<AllPosts token={token} />}
element={<MyPosts token={token} />}

element={<EditPostDetails />}
element={<AddPost token={token} />}
element={<CategoryManager token={token} />}
element={<TagManager token={token} />}
element={<UserManager token={token} />}

*/
