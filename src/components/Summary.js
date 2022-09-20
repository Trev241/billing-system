import React from "react";

import "./summary.css"

class Summary extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            amountPaid: 0,
            expanded: false,
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
        const change = this.state.amountPaid - total

        return (
            <div>
                <div className="total">
                    <div>Balance due</div>
                    <h1>{total}</h1>
                </div>
                {
                    this.state.expanded ?
                    <ul className="details">
                        <li>
                            <label>Gross Total</label>
                            <b>{total}</b>
                        </li>
                        <li>
                            <label>+ Tax</label>
                            <b>{tax}</b>
                        </li>
                        <li>
                            <label>- Discount</label>
                            <b>{discount}</b>
                        </li>
                        <li>
                            <label><b>NET BALANCE</b></label>
                            <b>{balance}</b>
                        </li>
                        <li>
                            <label>Amount Paid</label>
                            <input value={this.state.amountPaid} onChange={this.handleAmountInput} />
                        </li>
                        <li>
                            <label>Return Change</label>
                            <b>
                                {
                                    change < 0
                                    ? "Amound paid is insufficient!"
                                    : change
                                }
                            </b>
                        </li>
                    </ul>
                    : ""
                }
                <div className="expand" onClick={this.handleExpand}><div>{this.state.expanded ? "Hide" : "Show"} details</div></div>
            </div>
        )
    }
}

export default Summary