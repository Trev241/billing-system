import React, { useEffect, useState } from "react";

import DefaultLayout from "./DefaultLayout";
import List from "./List";
import TransactionService from "../services/transaction.service";
import "./history.css"

const Transaction = ({
    transaction
}) => {
    const [expanded, setExpanded] = useState(false)
    const [products, setProducts] = useState([])

    return (
        <div 
            className="transaction" 
            onClick={(e) => { 
                setExpanded(!expanded)
                TransactionService.getDetails({id: transaction.transaction_id}).then(response => {
                    setProducts(response.data.map(row => ({
                        id: row.product_id,
                        name: row.name,
                        rate: row.p_rate,
                        discount: row.p_discount,
                        tax: row.p_tax,
                        qty: row.p_qty,
                        subtotal: Math.round(((+row.p_rate * +row.p_qty) * ((100 - +row.p_discount) / 100) * ((100 + +row.p_tax) / 100)) * 100) / 100
                    })))
                }).catch(e => console.log(e))
            }}
        >
            <h2>
                <span>{transaction.date.slice(11, 19)}</span>
                #{transaction.transaction_id}
                <span className="total">
                    <span className="currency">₹</span>
                    <span>{transaction.balance}</span>
                </span>
            </h2>
            {
                expanded ? (
                    <div className="list">
                        <div></div>
                        <div>
                            <List items={products} />
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

const Section = ({
    date,
    transactions
}) => {
    const [visible, setVisible] = useState(true)

    return (
        <div className="date-section">
            <h1>
                {date}
                <input type="button" value={visible ? "-" : "+"} onClick={(e) => setVisible(!visible)} />
            </h1>
            {
                visible 
                ? transactions.map(t => <Transaction transaction={t} />)
                : <></>
            }
        </div>
    )
}

const History = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        TransactionService.getAll().then(
            response => setTransactions(response.data.reverse())
        ).catch(
            e => console.log(e)
        )
    }, [])

    let history = {}
    transactions.forEach(t => {
        let date = t.date.slice(0, 10)
        history[date] = (date in history) ? [...history[date], t] : [t]
    })

    return (
        <DefaultLayout>
        <div className="history">
            {Object.keys(history).map(date => {
                return <Section date={date} transactions={history[date]} />
            })}
        </div>
        </DefaultLayout>
    )
}

export default History