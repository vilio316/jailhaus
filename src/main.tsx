import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from  './components/Landing.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard.js'
import Passwords from './components/Passwords.js'
import { SignIn } from './supabase/signUpIn.js'
import Error from './components/Error.js'
import { Provider } from 'react-redux'
import { persStore, redStore } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing/>,
    errorElement: <Error/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    errorElement: <Error/>
  },
  {
    path: '/dashboard/passwords',
    element: <Passwords/>,
    errorElement: <Error/>
  },
  {
    path: '/sign-up',
    element: <SignIn/>,
    errorElement: <Error/>,
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store = {redStore}>
    <PersistGate loading={null} persistor={persStore}>
      <RouterProvider router={routes}/>
    </PersistGate>
  </Provider>
)
