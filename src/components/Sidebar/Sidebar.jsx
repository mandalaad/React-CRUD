import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebarstyle.css'
import { MdOutlinePayments } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { AiFillDatabase } from 'react-icons/ai';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const closeBtn = document.querySelector("#btn");

    if (isOpen) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  const navLinkStyles = ({isActive}) => {
    return{
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'none',
    }
  }

  return (
    <>
       <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-details">
        <div className="logo_name">Test Nutech</div>
        <i className={`buka bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`} id="btn" onClick={toggleSidebar}><AiFillDatabase/></i>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink style={navLinkStyles} to="/input" >
            <i><MdOutlinePayments/></i>
            <span className="links_name">Input</span>
          </NavLink>
          <span className="tooltip">Input</span>
        </li>
        <li>
          <NavLink style={navLinkStyles} to="/data">
            <i><HiOutlineDocumentReport/></i>
            <span className="links_name">Data table</span>
          </NavLink>
          <span className="tooltip">Data table</span>
        </li>
      </ul>
    </div>
    </>
  );
}

export default Sidebar;
