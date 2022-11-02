import React from "react";

import "./summary.css"

class Summary extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            amountPaid: 0,
            expanded: true,
        }

        this.handleAmountInput = this.handleAmountInput.bind(this)
        this.handleExpand = this.handleExpand.bind(this)
    }

    handleAmountInput(e) {
        this.setState({amountPaid: e.target.value})
    }

    handleExpand() {
        this.setState({expanded: !this.state.expanded})
    }

    render() {
        const { total, tax, discount } = this.props
        const balance = total - tax - discount
        const change = Math.round((this.state.amountPaid - total) * 100) / 100 

        return (
            <>
                <div className="std-container">
                    <div className="head">
                        Balance due
                        <h1>{total}</h1>
                    </div>
                    <div className="body">
                        <div>
                            Received:
                            <input value={this.state.amountPaid} onChange={this.handleAmountInput} />
                        </div>
                        {
                            change < 0
                            ? "Amound paid is insufficient!"
                            : <>Change: {change}</>
                        }
                    </div>
                </div>
                <div className="checkout">
                    <input type="button" value="CHECKOUT" disabled={balance <= 0 || this.state.amountPaid < balance} onClick={this.props.handleCheckout} />
                </div>
            </>
        )
    }
}

export default Summary