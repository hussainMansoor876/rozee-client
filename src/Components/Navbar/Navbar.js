import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
class Navbar extends Component {
    render() {
        return (
            <nav role="navigation">
                <ul className="main">
                    <li className="dashboard"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="users">{/* <a href="#"> */}<Link to="/alljobs">Manage Users</Link>{/* </a> */}</li>
                    {/* <li className="write"><a href="#">Write Post</a></li>
              <li className="edit"><a href="#">Edit Posts</a></li>
              <li className="comments"><a href="#">Comments</a></li> */}
                </ul>
            </nav>
        )
    }
}

export default Navbar
