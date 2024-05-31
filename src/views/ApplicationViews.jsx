import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { UserPosts } from "../components/UserPosts"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/"  />
        <Route path="allposts"  />
        <Route path="myPosts" element={<UserPosts token={token} />} >

                    <Route index  />
                    <Route path=":myPostId"  />
                    <Route path=":myPostId/edit"  />
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
element={<PostDetails />}
element={<EditPostDetails />}
element={<AddPost token={token} />}
element={<CategoryManager token={token} />}
element={<TagManager token={token} />}
element={<UserManager token={token} />}

*/
