import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import AuthContext from "../AuthProvider";
// import { Outlet } from 'react-router-dom'


function Home() {
    const { auth } = useContext(AuthContext)

    return (
        <DefaultLayout>
            <p>Currently logged in as {auth.email}</p>
            <Link to={'/create-invoice'}>Create a new invoice</Link>
            {/* <Outlet /> */}
        </DefaultLayout>
    )
}

export default Home