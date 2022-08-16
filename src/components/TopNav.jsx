import React, {useState} from 'react'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'

import user_menu from '../assests/json/user_menus.json'
import './topnav.css'

const TopNav = ({currentUser}) => {
  

  const Clock = ()=>{
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time)

    const updateTime = ()=>{
      let time = new Date().toLocaleTimeString();
      setCurrentTime(time);
    }
    setInterval(updateTime,1000);
    return (
      <div>
        <span><strong>{currentTime}</strong></span>
      </div>
    )

  }

  const curr_user = {
    display_name: currentUser.firstName,
    image: currentUser.picture
  }
  const renderUserToggle = (user)=>{
    return(
      <div className="topnav__right-user">
        <div className="topnav__right-user__image">
          <img src= {curr_user.image} alt=''/>
        </div>
        <div className="topnav__right-user__name">
          {curr_user.display_name}
        </div>
      </div>
    )
  }
  
  const renderUserMenu = (item, index) => {
    return (
      <Link to='/' key={index}>
        <div className='notification-item'>
          <i className={item.icon}></i>
          <span>{item.content}</span>
        </div>
      </Link>
    )
  }

  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="top__right-item">
          <Clock/>
        </div>
      </div>
    </div>
    
  )
}

export default TopNav