// import React from 'react'
// import { Link } from 'react-router'
// import './Navbar.css';
// const Navbar = () => {
//     return (
//         <div className='navabar-top'>
//             <div className='todo-name'>Todo Demo Application</div>
//             <div className='link-style'>
//                 <Link to="/addTask"> Add Tssk</Link>
//                 <Link to="/completed">Completed</Link>
//                 <Link to="/application">Application</Link>
//             </div>
//         </div>
//     )
// }
// export default Navbar

import React from 'react'
import "./Navbar.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }
  return (
    <div>
        <div className='nav-pluse-side'>
            <div className='nav-bar'>Todo Project
            <button className="hamburger" onClick={toggleSidebar}>
            &#9776;
          </button>
            </div>
            <div className={`side-bar ${isSidebarVisible ? 'show' : ''}`}>
              
             <div className='side-flex'>
              <Link to="/addTask" className='add-add' onClick={toggleSidebar}> Add Task</Link>
              <Link to="/application" className='add-add' onClick={toggleSidebar}>Application</Link>
             <button>Add TAsk</button>  <button>Add TAsk</button>  <button>Add TAsk</button>  <button>Add TAsk</button>
             
             </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;