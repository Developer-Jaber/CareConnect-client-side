import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'
import AvailableCampsPage from '../Pages/AvailableCampsPage/AvailableCampsPage '

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
        }
    ]
  }
])
const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default Router
