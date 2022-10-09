import React, { useState } from "react";

// import NewItem from "./NewItem"
import List from "./List"
import Summary from "./Summary"
import TransactionService from "./../services/transaction.service"
import DefaultLayout from "./DefaultLayout";

import "./workspace.css"
import { useNavigate } from "react-router-dom";

function Workspace() {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)

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
        // // Update item in list
        // this.setSelectedItem(item)
        // this.setState(prevState => ({items: [...prevState.items, item]}), 
        //     () => {
        //         // Calling multiple functions in a single callback
        //         this.updateTotals()
        //         this.setSelectedItem(item, this.state.items.length - 1)
        //     }
        // )

        // this.setState(prevState => ({items: [...prevState.items, {id: '', name: '', price: '', qty: ''}]}),
        //     () => {
        //         this.updateTotals()
        //     }
        // )

        // setItems(prevState => ({items: [...prevState.items, {id: '', name: '', price: '', qty: ''}]}))
        let newItems = items
        newItems = [...items, {id: '', name: '', price: '', qty: ''}]
        setItems(newItems)

        updateTotals()
    }

    const select = (item, i) => {
        // this.setState({
        //     selectedItem: item,
        //     selectedIndex: i
        // })
        
        // Set the selected item along with its index (useful for knowing which item is to be updated)
        setSelectedItem(item)
        setSelectedIndex(i)
    }

    const updateSelectedItem = (i, field, value) => {
        // console.log(i + " " + field + " " + value)

        // This former approach was bad, do not directly mutate state. Always make a copy of it
        // let newItemsList = items 
        let newItemsList = [...items]
        // Assign the new value to the designated field
        newItemsList[i][field] = value
        setItems(newItemsList)

        updateTotals()
        
        // let newItemsList = this.state.items
        // newItemsList[this.state.selectedIndex] = item
        // this.setState({items: newItemsList}, this.updateTotals)
    }

    const updateTotals = () => {
        let total = 0
        items.map(item => total += item.price * item.qty)
        setTotal(total)
    }

    const handleCheckout = () => {
        TransactionService.create({
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            balance: total,
        }).then(
            response => {
                // alert('Transaction recorded')
        }).catch(
            e => console.log(e)
        )
        navigate("/")
    }

    return (
        <DefaultLayout>
            <div className="workspace-container workspace-grid">
                <div>
                    {/* <fieldset className="rounded-border">
                        <legend><h1>INVOICE</h1></legend> */}
                        {/* <NewItem addItem={this.addItem} /> */}
                        <List 
                            items={items} 
                            addItem={addItem} 
                            updateSelectedItem={updateSelectedItem} 
                            selectedIndex={selectedIndex} 
                            setSelectedItem={select} 
                        />
                    {/* </fieldset> */}
                </div>
                <div>
                    <Summary total={total} tax={0} discount={0} handleCheckout={handleCheckout} />
                    {/* <Details item={this.state.selectedItem} updateSelectedItem={this.updateSelectedItem} /> */}
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Workspace