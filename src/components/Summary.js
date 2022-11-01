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
                        <div>Balance due</div>
                        <h1>{total}</h1>
                    </div>
                    <div className="body">
                        <label>Gross Total</label>
                        <b>{total}</b>
                        <label>+ Tax</label>
                        <b>{tax}</b>
                        <label>- Discount</label>
                        <b>{discount}</b>
                        <label><b>NET BALANCE</b></label>
                        <b>{balance}</b>
                        <label>Amount Paid</label>
                        <input value={this.state.amountPaid} onChange={this.handleAmountInput} />
                        <label>Return Change</label>
                        <b>
                            {
                                change < 0
                                ? "Amound paid is insufficient!"
                                : change
                            }
                        </b>
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