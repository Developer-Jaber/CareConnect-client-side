import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
        {
            path: '/',
            element: <h1>This is home page</h1>,
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
