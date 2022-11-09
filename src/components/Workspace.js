import React, { useState } from "react";

// import NewItem from "./NewItem"
import List from "./List"
import Summary from "./Summary"
import TransactionService from "./../services/transaction.service"
import DefaultLayout from "./DefaultLayout";

import "./workspace.css"
import { useNavigate } from "react-router-dom";
import CustomerService from "../services/customer.service";

const Workspace = () => {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)

    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')

    const numericIntFields = new Set(["id", "subtotal"]) 
    const numericDecFields = new Set(["rate", "discount", "tax", "qty", "subtotal"])
    const nonNumericFields = new Set(["name"])

    const numericIntRegex = /^[0-9]*$/
    const numericDecRegex = /^([0-9]+(\.[0-9]{0,2})?)?$/

    const navigate = useNavigate()

    // This line is important but I do not know what it does
    // Refer https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
    // and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    // This line is necessary to bind the this keyword of updateList to this class. Without it, the function will 
    // not be able to access this class' state
    // this.addItem = this.addItem.bind(this)
    // this.setSelectedItem = this.setSelectedItem.bind(this)
    // this.updateSelectedItem = this.updateSelectedItem.bind(this)
    // this.updateTotals = this.updateTotals.bind(this)
    // this.handleCheckout = this.handleCheckout.bind(this)

    const addItem = () => {
        let newItems = items
        newItems = [...items, {
            id: "", 
            name: "", 
            rate: "", 
            discount: 0, 
            tax: 0, 
            qty: "", 
            subtotal: 0
        }]
        setItems(newItems)
    }

    const updateSelectedItem = (i, field, value) => {
        // This former approach was bad, do not directly mutate state. Always make a copy of it
        // let newItemsList = items 
        let newItemsList = [...items]
        let item = newItemsList[i]
        
        // Assign the new value to the designated field if validation checks have passed
        if ((numericIntFields.has(field) && numericIntRegex.test(value)) || (numericDecFields.has(field) && numericDecRegex.test(value)) || 
        nonNumericFields.has(field)) 
            item[field] = value
        setItems(newItemsList)
        
        // Updating subtotal
        item['subtotal'] = Math.round(((+item.rate * +item.qty) * ((100 - +item.discount) / 100) * ((100 + +item.tax) / 100)) * 100) / 100
        updateTotals()
    }

    const updateTotals = () => {
        let total = 0
        items.map(item => total += +item.subtotal)
        setTotal(Math.round(total * 100) / 100)
    }

    const handleCheckout = () => {
        CustomerService.find({
            phone_no: phone
        }).then(
            response => {
                console.log("Customer already exists in database")
            }
        ).catch(
            e => {
                console.log("Could not find customer in database. Creating new entry")
                CustomerService.create({
                    phone_no: phone,
                    name: name,
                    email: null,
                }).then(
                    response => console.log("Customer added")
                ).catch(
                    e => console.log(e)
                )
            }
        )

        TransactionService.create({
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            customer_pno: phone,
            balance: total,
            products: items
        }).then(
            response => {
                // alert('Transaction recorded')
            }
        ).catch(
            e => console.log(e)
        )
        navigate("/history")
    }

    const handleInput = (e, field) =>{
        if (field === 'phone') {
            if (/^[0-9]{0,10}$/.test(e.target.value)) {
                CustomerService.find({
                    phone_no: e.target.value
                }).then(
                    response => {
                        console.log("Customer already exists in database")
                        setName(response.data.name)
                    }
                ).catch(
                    setName('')
                )
                setPhone(e.target.value)
            }
        }

        if (field === 'name') 
            setName(e.target.value)
    }

    return (
        <DefaultLayout>
            <div className="workspace-container workspace-grid">
                <div>
                    <div className="std-container">
                        <div className="head">
                            Customer Details
                        </div>
                        <div className="body">
                            <input type="text" name="phone" placeholder="Phone number" value={phone} onChange={(e) => handleInput(e, 'phone')}></input>
                            <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => handleInput(e, 'name')}></input>
                        </div>
                    </div>
                    <Summary total={total} tax={0} discount={0} handleCheckout={handleCheckout} />
                    {/* <Details item={this.state.selectedItem} updateSelectedItem={this.updateSelectedItem} /> */}
                </div>
                <div>
                    <List 
                        items={items} 
                        addItem={addItem} 
                        updateSelectedItem={updateSelectedItem} 
                    />
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Workspace