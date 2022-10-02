import React from 'react'

import './index.css'

import Header from './Header'
import Workspace from './Workspace'
import Footer from './Footer'

class Invoice extends React.Component {
    render() {
        return (
            <div className="root-container">
                <Header />
                <Workspace />
                <Footer />
            </div>
        )
    }
}

export default Invoice