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
import ManageRegisteredCamps from '../Pages/Dashboard/Organizer/ManageRegisteredCamps'
import AnalyticsPage from '../Pages/Dashboard/Participent/AnalyticsPage'
import ParticipantProfile from '../Pages/Dashboard/Participent/ParticipantProfile'
import RegisteredCamps from '../Pages/Dashboard/Participent/RegisteredCamps'
import PaymentHistory from '../Pages/Dashboard/Participent/PaymentHistory'
import DashbordMain from '../Layout/DashbordMain'
import SuccessStorySubmission from '../Pages/Dashboard/Participent/SuccessStorySubmission'
import AboutUsPage from '../Pages/AboutUsPage/AboutUsPage'

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
        path: '/about-us',
        element: <AboutUsPage></AboutUsPage>
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
        element: <CampDetails></CampDetails>,
        loader: ({ params }) =>
          fetch(
            `https://b10a12-server-side-developer-jaber.vercel.app/madical_camp/${params.id}`
          )
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
        path: '/dashboard',
        element: (
          <PrivetRouts>
            <DashbordMain></DashbordMain>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/organizer-profile',
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
            <ManageRegisteredCamps></ManageRegisteredCamps>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/analytics',
        element: (
          <PrivetRouts>
            <AnalyticsPage></AnalyticsPage>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/prticipant-profile',
        element: (
          <PrivetRouts>
            <ParticipantProfile></ParticipantProfile>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/registered-camps',
        element: (
          <PrivetRouts>
            <RegisteredCamps></RegisteredCamps>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/pyment-history',
        element: (
          <PrivetRouts>
            <PaymentHistory></PaymentHistory>
          </PrivetRouts>
        )
      },
      {
        path: '/dashboard/success-story-submission',
        element: (
          <PrivetRouts>
            <SuccessStorySubmission></SuccessStorySubmission>
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
