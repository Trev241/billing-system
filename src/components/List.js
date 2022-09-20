import React from "react";

import "./list.css"

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // Select first item in the list by default if it exists
            selectedItem: (props.items.length > 0) ? props.items[0] : '',
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

    handleInput(e, field) {
        this.props.updateSelectedItem(field, e.target.value)
    }

    render () {
        const rows = []//, empty = this.props.items.length === 0
        // let total = 0
        
        for (let i = 0; i < this.props.items.length; i++) { 
            const item = this.props.items[i];
            const subtotal = item.price * item.qty
            // total += subtotal

            rows.push(
                // TODO: Change key for tr once rows can be reordered
                <tr className={this.props.selectedIndex === i ? "selected" : ""} onClick={(e) => this.handleSelected(e, item, i)} key={i}>
                    {Object.keys(item).map( 
                        prop => (
                            <td key={prop}><input placeholder={prop.toUpperCase()} value={item[prop]} onChange={(e) => this.handleInput(e, prop)} /></td>
                        )
                    )}
                    <td>{subtotal}</td>
                </tr>
            )
        }

        // if (!empty) 
        //     rows.push(
        //         <tr key="last-row">
        //             <td colSpan="4">FINAL TOTAL</td>
        //             <td>{total}</td>
        //         </tr>
        //     )

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {/* {Object.keys(this.props.items[0]).map(
                                prop => <th>{prop.toUpperCase()}</th>
                            )} */}
                            <th className="id">ID</th>
                            <th className="name">NAME</th>
                            <th className="price">PRICE</th>
                            <th className="qty">QUANTITY</th>
                            <th className="subtotal">SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                        <tr key="add">
                            <td colSpan={5} onClick={this.handleAddItem}>Add Item</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ) 
    }
}

export default List