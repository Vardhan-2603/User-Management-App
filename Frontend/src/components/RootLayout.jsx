import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
   <div>
    <Header/>
    <div className='min-h-screen'>
        <Outlet/>
    </div>
    <Footer/>
   </div>
  )
}

export default RootLayout