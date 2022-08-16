import React, {useState} from 'react'
import { AiOutlineMenu, AiTwotoneShop, AiOutlineLogout } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import {HiDocumentReport} from "react-icons/hi"
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

const Sidebar = ({setShow, show}) => {

    const [isLoggedin, setIsLoggedin] = useState(true);
    console.log(isLoggedin)

    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.removeItem('EM-app-user');
        setIsLoggedin(false)
        navigate('/login')
    }

    const [collapsed, setCollapsed] = useState(false);
    // added styles 
    const styles = {
        sideBarHeight: {
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            overflowX: "hidden"
        },
        menuIcon: {
            float: "right",
            margin: "10px",
        },
    };
    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
        // event.currentTarget.classList.add('active');
        if(collapsed === true ){
            setShow(false);
        }
        else{
            setShow(true)
        }
    };
  return (
      <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
          <SidebarHeader>
              <div style={styles.menuIcon} onClick={onClickMenuIcon}>
                  <AiOutlineMenu />
              </div>
          </SidebarHeader>
          <Menu iconShape="square">
              <MenuItem icon={< FaMoneyBillAlt />}>
                Budget & Goods
                  <Link to='/dashboard'/>
            </MenuItem>
            <MenuItem icon={<AiTwotoneShop />}>
                Make Purchases
                  <Link to='/dashboard/makepurchase'/>
            </MenuItem>
              <MenuItem icon={<HiDocumentReport/>}>
                Track Report
                  <Link to='/dashboard/report'/>
            </MenuItem>
              <MenuItem icon={<AiOutlineLogout/>} onClickCapture={handleClick}>
                Logout
            </MenuItem>
          </Menu>
      </ProSidebar>
  )
}

export default Sidebar
