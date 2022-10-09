import React from "react";
import Footer from "./Footer";
import Header from "./Header";

import "./header.css"

class DefaultLayout extends React.Component {
    render() {
        return (
            <>
                <Header />
                    {this.props.children}
                <Footer />
            </>
        )
    }
}

export default DefaultLayout