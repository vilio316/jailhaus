import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from  './components/Landing.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard.js'
import Passwords from './components/Passwords.js'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing/>,
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
  },
  {
    path: '/dashboard/passwords',
    element: <Passwords/>
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes}>
  </RouterProvider>
)
