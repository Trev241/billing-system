import React, { useEffect, useState } from "react";

import TransactionService from "../services/transaction.service";
import DefaultLayout from "./DefaultLayout";
import "./history.css"

const Transaction = ({
    transaction
}) => {
    return (
        <div className="transaction">
            ID: {transaction.transaction_id} Balance: {transaction.balance} Customer: {transaction.customer_pno}
        </div>
    )
}

const CollapsableSection = ({heading, data}) => {
    return (
        <div className="collapsable-section">
            <h1>{heading}</h1>
            {data}
        </div>
    )
}

function History() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        TransactionService.getAll().then(
            response => setTransactions(response.data.reverse())
        ).catch(
            e => console.log(e)
        )
    })

    const dates = new Set()
    let rows = []

    transactions.forEach(t => {
        let date = t.date.slice(0, 10)
        if (!dates.has(date)) { 
            dates.add(date)
            rows.push(
                <h1>{date}</h1>
            )
        }

        rows.push(
            <Transaction transaction={t} />
        )
    })

    return (
        <DefaultLayout>
            <div className="history">
                {rows}
            </div>
        </DefaultLayout>
    )
}

export default History