import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'

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
            path: '/about',
            element: <h1>This is about page</h1>,
        }
    ]
  }
])
const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default Router
