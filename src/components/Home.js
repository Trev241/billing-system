import React from "react";
import { Link } from "react-router-dom";
// import { Outlet } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <>
                <div>Home Placeholder</div>
                <ul>
                    <li><Link to={'/create-invoice'}>Create a new invoice</Link></li>
                </ul>
                {/* <Outlet /> */}
            </>
        )
    }
}

export default Home