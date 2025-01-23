import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'
import AvailableCampsPage from '../Pages/AvailableCampsPage/AvailableCampsPage '
import JoinUs from '../Pages/JoinUs/JoinUs'

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
        }
    ]
  }
])
const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default Router
