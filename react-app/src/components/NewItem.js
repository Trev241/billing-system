import React from "react";

class NewItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            qty: '',
        }

        this.handleIdChange = this.handleIdChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleQtyChange = this.handleQtyChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // TODO: Must query database

    handleIdChange(e) {
        // e is the event object
        // e.target returns the element that triggered the event
        // In this case, value is the attribute of the element that triggered the event
        this.setState({id: e.target.value})
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleQtyChange(e) {
        this.setState({qty: e.target.value})
    }

    handleSubmit(e) {
        // Use the property function received from the Invoice component to update its items array. The Invoice
        // component will then pass the updated array as a property to List for rendering 
        this.props.addItem({
            id: this.state.id,
            name: this.state.name,
            price: 50,  // TODO: Must remove this placeholder price value
            qty: this.state.qty
        })

        // Reset state for the next item to be added
        this.setState({
            id: '',
            name: '',
            qty: ''
        })
    }
 
    render() {
        return (
            <div className='add-item-container'>
                {/* <h2>{this.state.name === '' ? 'Add Item' : this.state.name + ' | ' + this.state.id}</h2> */}
                <h2>Add Item</h2>
                <input type='text' placeholder='Product ID' value={this.state.id} onChange={this.handleIdChange} required />
                <input type='text' placeholder='Product Name' value={this.state.name} onChange={this.handleNameChange} required />
                <input type='text' placeholder='Quantity' value={this.state.qty} onChange={this.handleQtyChange}/>
                <input type='submit' value='Add' className='add' onClick={this.handleSubmit}/>
            </div>
        )
    }
}

export default NewItem