import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'
import AvailableCampsPage from '../Pages/AvailableCampsPage/AvailableCampsPage '
import JoinUs from '../Pages/JoinUs/JoinUs'
import Register from '../Pages/Register/Register'
import CampDetails from '../Pages/CampDetails/CampDetails'
import Dashboard from '../Layout/Dashboard'
import OrganizerProfile from '../Pages/Dashboard/Organizer/OrganizerProfile'
import PrivetRouts from './PrivetRouts'
import AddCamp from '../Pages/Dashboard/Organizer/AddCamp'
import ManageCamps from '../Pages/Dashboard/Organizer/ManageCamps'

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
        element: <AvailableCampsPage></AvailableCampsPage>
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
        element: (
          <PrivetRouts>
            <CampDetails></CampDetails>
          </PrivetRouts>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/madical_camp/${params.id}`)
      }
    ]
  },
  {
    path: 'dashboard',
    element: (
      <PrivetRouts>
        <Dashboard></Dashboard>
      </PrivetRouts>
    ),
    children: [
      {
        path: '/dashboard/',
        element: (
          <PrivetRouts>
            <OrganizerProfile></OrganizerProfile>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/add-camp',
        element: (
          <PrivetRouts>
            <AddCamp></AddCamp>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/manage-camps',
        element: (
          <PrivetRouts>
            <ManageCamps></ManageCamps>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/manage-registered-camps',
        element: (
          <PrivetRouts>
            <AddCamp></AddCamp>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/analytics',
        element: (
          <PrivetRouts>
            <AddCamp></AddCamp>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/prticipant-profile',
        element: (
          <PrivetRouts>
            <AddCamp></AddCamp>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/registered-camps',
        element: (
          <PrivetRouts>
            <AddCamp></AddCamp>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/pyment-history',
        element: (
          <PrivetRouts>
            <AddCamp></AddCamp>
          </PrivetRouts>
        )
      }
    ]
  }
])
const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default Router
