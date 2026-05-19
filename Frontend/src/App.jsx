import React from 'react'
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import UsersList from './components/UsersList'
import AddUser from './components/AddUser'
import User from './components/User'
import EditUser from './components/Edituser'
function App() {
  const routerObj=createBrowserRouter(
    [
      {
        path:"/",
        element:<RootLayout/>,
        children:[
          {
            path:"",
            element:<Navigate to="users-list"/>
          },
          {
          path:"add-user",
          element:<AddUser/>
          },
          {
            path:"users-list",
            element:<UsersList/>
          },
          {
            path:"user",
            element:<User/>
          },
          {
            path:"edit-user",
            element:<EditUser/>
          }
        ]
      }
    ]
  )
  return (
    <div>
      <RouterProvider router={routerObj}/>
    </div>
  )
}

export default App