import React, { useState } from "react";

// import NewItem from "./NewItem"
import List from "./List"
import Summary from "./Summary"
import TransactionService from "./../services/transaction.service"
import DefaultLayout from "./DefaultLayout";

import "./workspace.css"
import { useNavigate } from "react-router-dom";
import CustomerService from "../services/customer.service";

function Workspace() {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const inputFields = {
        'phone': setPhone,
        'name': setName,
    }

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
        newItems = [...items, {id: '', name: '', price: '', qty: ''}]
        setItems(newItems)

        updateTotals()
    }

    const select = (item, i) => {
        setSelectedItem(item)
        setSelectedIndex(i)
    }

    const updateSelectedItem = (i, field, value) => {
        // This former approach was bad, do not directly mutate state. Always make a copy of it
        // let newItemsList = items 
        let newItemsList = [...items]
        // Assign the new value to the designated field
        newItemsList[i][field] = value
        setItems(newItemsList)

        updateTotals()
    }

    const updateTotals = () => {
        let total = 0
        items.map(item => total += item.price * item.qty)
        setTotal(total)
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
        inputFields[field](e.target.value)

        if (field === 'phone') {
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
        }
    }

    return (
        <DefaultLayout>
            <div className="workspace-container workspace-grid">
                <div>
                    <div>
                        <List 
                            items={items} 
                            addItem={addItem} 
                            updateSelectedItem={updateSelectedItem} 
                            selectedIndex={selectedIndex} 
                            setSelectedItem={select} 
                        />
                    </div>
                </div>
                <div>
                    <div className="std-container">
                        <div className="head">
                            <h3>Customer Details</h3>
                        </div>
                        <div className="basic-details">
                            <label>Phone No.</label>
                            <input type="text" name="phone" value={phone} onChange={(e) => handleInput(e, 'phone')}></input>
                            <label>Name</label>
                            <input type="text" name="name" value={name} onChange={(e) => handleInput(e, 'name')}></input>
                        </div>
                    </div>
                    <Summary total={total} tax={0} discount={0} handleCheckout={handleCheckout} />
                    {/* <Details item={this.state.selectedItem} updateSelectedItem={this.updateSelectedItem} /> */}
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Workspace