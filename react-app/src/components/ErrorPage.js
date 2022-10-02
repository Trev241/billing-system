import React from "react";

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()

    return (
        <div>
            <h1>Are you lost?</h1>
            <p>You seem to have redirected to an unknown page!</p>
            <p>Error: {error.statusText || error.message}</p>
        </div>
    )
}