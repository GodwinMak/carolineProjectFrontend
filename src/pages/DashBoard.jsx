import React, { useState} from 'react'

import "./dashboard.css"



import { Outlet} from 'react-router-dom'


import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import './dashboard.css'


const DashBoard = ({currentUser}) => {
  const [show, setShow] = useState(false)
  
  return (
          
      <div className='main'>
        <Sidebar setShow= {setShow} show={show}/>
        <div className={show === true ? "maincontent active" : "maincontent"}>
          <TopNav currentUser={currentUser}/>
          <Outlet/>
        </div>
      </div>
      
  )
}

export default DashBoard