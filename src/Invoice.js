import React from 'react'

import './index.css'

import Header from './components/Header'
import Workspace from './components/Workspace'
import Footer from './components/Footer'

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