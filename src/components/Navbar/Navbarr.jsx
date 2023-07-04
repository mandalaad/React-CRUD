import React from 'react'
import './navbarstyle.css'
import { Dropdown, Navbar } from 'react-bootstrap'
import {MdOutlineAccountCircle} from 'react-icons/md'
import { Link } from 'react-router-dom'
const style1 = {fontSize: "1.5em" }
const style2 = {color: "orange"}
function Navbarr() {
  return (
    <section className="home-section">
      <Navbar className='custom-navbar'>
        <div className='left-side'>
           <h4 style={style2}>Test Nutech</h4>
        </div>
        <div className='right-side flex'>
            <Dropdown className='dropdown'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className='me-2'><MdOutlineAccountCircle style={style1}/></i>
                <h6 className='mt-1'>Tri Mandala Adi Dalem</h6>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/login">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
      </Navbar>
    </section>
    
  )
}

export default Navbarr