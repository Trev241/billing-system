import React from "react";

// import NewItem from "./NewItem"
import List from "./List"
import Summary from "./Summary"
import TransactionService from "./../services/transaction.service"

class Workspace extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            total: 0,
            tax: 0,
            discount: 0,
            selectedItem: null,
            selectedIndex: null,
        }

        // This line is important but I do not know what it does
        // Refer https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
        // and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
        // This line is necessary to bind the this keyword of updateList to this class. Without it, the function will 
        // not be able to access this class' state
        this.addItem = this.addItem.bind(this)
        this.setSelectedItem = this.setSelectedItem.bind(this)
        this.updateSelectedItem = this.updateSelectedItem.bind(this)
        this.updateTotals = this.updateTotals.bind(this)
        this.handleCheckout = this.handleCheckout.bind(this)
    }

    addItem() {
        // // Update item in list
        // this.setSelectedItem(item)
        // this.setState(prevState => ({items: [...prevState.items, item]}), 
        //     () => {
        //         // Calling multiple functions in a single callback
        //         this.updateTotals()
        //         this.setSelectedItem(item, this.state.items.length - 1)
        //     }
        // )
        this.setState(prevState => ({items: [...prevState.items, {id: '', name: '', price: '', qty: ''}]}),
            () => {
                this.updateTotals()
            }
        )
    }

    setSelectedItem(item, i) {
        // Set the selected item along with its index (useful for knowing which item is to be updated)
        this.setState({
            selectedItem: item,
            selectedIndex: i
        })
    }

    updateSelectedItem(field, value) {
        let newItemsList = this.state.items
        // Assign the new value to the designated field
        newItemsList[this.state.selectedIndex][field] = value
        this.setState({items: newItemsList}, this.updateTotals)
        
        // let newItemsList = this.state.items
        // newItemsList[this.state.selectedIndex] = item
        // this.setState({items: newItemsList}, this.updateTotals)
    }

    updateTotals() {
        let total = 0
        this.state.items.map(
            item => total += item.price * item.qty
        )
        this.setState({total: total})
    }

    handleCheckout() {
        TransactionService.create({
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            balance: this.state.total,
        }).then(
            response => {
                alert('Transaction recorded')
            }
        ).catch(
            e => console.log(e)
        )
    }

    render() {
        return (
            <>
                <div className="workspace-container workspace-grid">
                    <div>
                        {/* <fieldset className="rounded-border">
                            <legend><h1>INVOICE</h1></legend> */}
                            {/* <NewItem addItem={this.addItem} /> */}
                            <List 
                                items={this.state.items} 
                                addItem={this.addItem} 
                                updateSelectedItem={this.updateSelectedItem} 
                                selectedIndex={this.state.selectedIndex} 
                                setSelectedItem={this.setSelectedItem} 
                            />
                        {/* </fieldset> */}
                    </div>
                    <div>
                        <Summary total={this.state.total} tax={0} discount={0} handleCheckout={this.handleCheckout} />
                        {/* <Details item={this.state.selectedItem} updateSelectedItem={this.updateSelectedItem} /> */}
                    </div>
                </div>
            </>
        )
    }
}

export default Workspace