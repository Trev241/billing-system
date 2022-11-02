import React from "react";

import "./list.css"

import ProductService from "../services/product.service";

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // Select first item in the list by default if it exists
            selectedItem: (props.items.length > 0) ? props.items[0] : '',
            options: []
        }

        this.handleSelected = this.handleSelected.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleAddItem() {
        this.props.addItem()
    }

    handleSelected(e, item, i) {
        this.props.setSelectedItem(item, i)
    }

    handleInput(e, i, field) {
        this.props.updateSelectedItem(i, field, e.target.value)

        if (field === "id") {
            ProductService.get(e.target.value).then(
                response => this.autofill(i, response.data)
            ).catch(
                e => {
                    console.log(e)
                    this.autofill(i, {
                        id: '',
                        name: '',
                        rate: '',
                        discount: 0,
                        tax: 0,
                        qty: '',
                    })
                }
            )
        } else if (field === "name") {
            // Fetch products beginning with the name entered
            ProductService.getByName(e.target.value).then(
                response => {
                    this.setState({options: [...response.data]})
                    
                    // Autofill details if exact name is given
                    if (e.target.value === response.data[0].name) 
                        this.autofill(i, response.data[0])
                }
            ).catch(
                e => console.log(e)
            )
        }
    }

    autofill(i, item) {
        this.props.updateSelectedItem(i, "id", item.product_id)
        this.props.updateSelectedItem(i, "name", item.name)
        this.props.updateSelectedItem(i, "rate", item.rate)
        this.props.updateSelectedItem(i, "discount", 0)
        this.props.updateSelectedItem(i, "tax", item.tax)
    }

    render () {
        const rows = []
        
        for (let i = 0; i < this.props.items.length; i++) { 
            const item = this.props.items[i];

            rows.push(
                // TODO: Change key for tr once rows can be reordered
                <tr className={this.props.selectedIndex === i ? "selected" : ""} onClick={(e) => this.handleSelected(e, item, i)} key={i}>
                    {Object.keys(item).map( 
                        prop => (
                            <td key={prop}>
                            {
                                (prop === "name") ? ( <>
                                    <input list="names" name="name" value={item[prop]} onChange={(e) => this.handleInput(e, i, prop)} />
                                    <datalist id="names">
                                        {this.state.options.map(option => <option key={option} value={option.name} />)}
                                    </datalist></>
                                ) : <input placeholder={prop.toUpperCase()} value={item[prop]} onChange={(e) => this.handleInput(e, i, prop)} />
                            }
                            </td>
                        )
                    )}
                </tr>
            )
        }

        return (
            <table className="invoice">
                <thead>
                    <tr>
                        {/* {Object.keys(this.props.items[0]).map(
                            prop => <th>{prop.toUpperCase()}</th>
                        )} */}
                        <th className="id">ID</th>
                        <th className="name">NAME</th>
                        <th className="price">PRICE</th>
                        <th className="discount">DISCOUNT %</th>
                        <th className="tax">TAX RATE %</th>
                        <th className="qty">QTY (Units)</th>
                        <th className="subtotal">SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr key="add">
                        <td className="noselect" colSpan={7} onClick={this.handleAddItem}>Add Item</td>
                    </tr>
                </tbody>
            </table>
        ) 
    }
}

export default List