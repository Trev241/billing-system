import React from "react";

import { useRouteError, Link } from "react-router-dom";

import './errorpage.css'

export default function ErrorPage() {
    const error = useRouteError()

    return (
        <div className="error">
            <h1>Error | <span className="details">{error.statusText || error.message}</span></h1>
            <h2>Oops! Seems like something went wrong...</h2>
            <p></p>
            <Link to="/">Take me home</Link>
        </div>
    )
}