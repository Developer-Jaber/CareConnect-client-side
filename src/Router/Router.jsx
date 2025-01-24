import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'
import AvailableCampsPage from '../Pages/AvailableCampsPage/AvailableCampsPage '
import JoinUs from '../Pages/JoinUs/JoinUs'
import Register from '../Pages/Register/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/available-camps-page',
            element: <AvailableCampsPage></AvailableCampsPage>,
        },
        {
          path: '/join-us',
          element: <JoinUs></JoinUs>
        },
        {
          path: '/register',
          element: <Register></Register>
        }
    ]
  }
])
const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default Router
