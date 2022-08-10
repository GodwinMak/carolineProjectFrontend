import React from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    }
  return (
    <button onClick={() => handleClick}>
          <i className='bx bx-log-out-circle bx-rotate-180'></i>
          <span>Logout</span>
    </button>
  )
}

export default Logout