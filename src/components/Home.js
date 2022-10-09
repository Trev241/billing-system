import React from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
// import { Outlet } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <div>Home Placeholder</div>
                <ul>
                    <li><Link to={'/create-invoice'}>Create a new invoice</Link></li>
                </ul>
                {/* <Outlet /> */}
            </DefaultLayout>
        )
    }
}

export default Home