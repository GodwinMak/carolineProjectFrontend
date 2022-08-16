import React,{useState, useEffect} from 'react'

import "./dashboard.css"



import { Outlet} from 'react-router-dom'


import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import './dashboard.css'
import { useNavigate } from 'react-router-dom';




const DashBoard = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate();


  const [currentUser, setCurrentUser] = useState({})



  useEffect(() => {
    const fetchItem = async () => {
      if (!localStorage.getItem("EM-app-user")) {
        navigate("/")


      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("EM-app-user")))
      }
    }

    fetchItem();
  }, [navigate])
  
  
    return (

      <div className='main'>
        <Sidebar setShow={setShow} show={show} />
        <div className={show === true ? "maincontent active" : "maincontent"}>
          <TopNav currentUser={currentUser} />
          <Outlet />
        </div>
      </div>

    );

}

export default DashBoard