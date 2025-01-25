import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'
import AvailableCampsPage from '../Pages/AvailableCampsPage/AvailableCampsPage '
import JoinUs from '../Pages/JoinUs/JoinUs'
import Register from '../Pages/Register/Register'
import CampDetails from '../Pages/CampDetails/CampDetails'
import Dashboard from '../Layout/Dashboard'
import OrganizerProfile from '../Pages/Dashboard/OrganizerProfile/OrganizerProfile'
import PrivetRouts from './PrivetRouts'

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
        },
        {
          path: '/camp-details/:id',
          element: <PrivetRouts><CampDetails></CampDetails></PrivetRouts>,
          loader: ({params})=>fetch(`http://localhost:5000/madical_camp/${params.id}`),
        }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
        {
          path: '/dashboard/organizer-profile',
          element: <OrganizerProfile></OrganizerProfile>
        }
    ]
  }
])
const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default Router
