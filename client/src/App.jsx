import { createBrowserRouter, RouterProvider, Route, Link, Outlet } from "react-router-dom"
import SignIn from "./screens/SignIn"
import SignUp from "./screens/SignUp"
import Profile from "./screens/Profile"
import Explore from "./screens/Explore"
import Error from "./screens/Error"
import Home from "./components/Home"
import Navbar from "./components/Navbar"


const Layout = () => {
  return (
    <div className=" md:w-8/12 mx-auto ">
      <Navbar />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    errorElement:<Error/>,
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <SignIn />
      },
      {
        path: '/register',
        element: <SignUp />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/logout',
        element: <SignIn />
      }

    ]
  }
])


function App() {

  return (
    <>
      <RouterProvider router={router} >
      </RouterProvider>
    </>
  )
}

export default App