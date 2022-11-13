import React from "react";

import { Link } from "react-router-dom";

import './errorpage.css'

export default function ErrorPage() {
    return (
        <div className="missing-page">
            <h1>Error</h1>
            <h2>Oops! Seems like something went wrong.</h2>
            <Link to="/">Return home</Link>
        </div>
    )
}