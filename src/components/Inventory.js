import React from "react"

import DefaultLayout from "./DefaultLayout"
import ProductService from "../services/product.service"
import "./inventory.css"

class Inventory extends React.Component {
    constructor(props) {
        super(props)

        // Some of the property names were changed for consistency with the SQL table
        this.state = {
            name: "",
            rate: "",
            tax: "",
            stock: "",
            products: [],
            searchQuery: "",
        }

        // Fetching inventory from databse. Using %25 as the URL escape code for % which itself is a wildcard for all products
        ProductService.getByName("%25").then(response => {
            // Use this.setState to set the state, do not directly assign state as this function is called much later after the constructor has finished
            // This is because axios promises are callbacks and are not guaranteed to run in correct sequential order.
            this.setState({products: response.data})
        }).catch(e => console.log(e))

        this.handleInputQuery = this.handleInputQuery.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputQuery(e) {
        this.setState({searchQuery: e.target.value})
        
        // Filter products according to search query
        // ProductService.getByName(e.target.value === "" ? "%25" : e.target.value).then(response => {
        //     this.setState({products: response.data})
        // }).catch(e => console.log(e))
        // COMMENTED OUT BECAUSE OF PERFORMANCE ISSUES
        // Making a SQL call every time the search bar is modified can be quite taxing. Instead, retrieve the entire product list at once and
        // use regex to filter it
    }

    handleInput(e, field) {
        this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(){
        // alert(this.state.id)
        const newItem = {
            name: this.state.name,
            rate: this.state.rate,
            tax: this.state.tax,
            stock: this.state.stock,
        }

        // Searching for a duplicate entry. Can be slow. TODO: Change implementation?
        let duplicate = false
        this.state.products.forEach(product => {
            if (newItem.name === product.name)
                duplicate = true || duplicate
        })

        if (!duplicate) {
            let newproducts = this.state.products
            newproducts = [...newproducts, newItem]
            this.setState({
                products: newproducts
            })

            // Save in databse as well
            ProductService.create(newItem).then(response => {
                alert("Product added successfully")
                
                // Fetch data again to refresh list
                ProductService.getByName("%25").then(response => {
                    this.setState({products: response.data})
                }).catch(e => console.log(e))
            
            }).catch(e => console.log(e))

        } else alert("Cannot add duplicates")
    }

    render() {
        return (
            <DefaultLayout>
            <div className="inventory-container">
                <div className="new-product-box" > 
                    <div className="new-product-box-border">
                        <div className="new-product-box-top-bar">Expanding inventory?</div>
                        <div className="new-product-box-content">
                            <input className="name-inputbox" value={this.state.name} onChange={(e)=>this.handleInput(e,"name")} type="text" placeholder="Product Name" id="productname" />
                            <input className="price-inputbox" value={this.state.price} onChange={(e)=>this.handleInput(e,"rate")} type="text" placeholder="Product Rate" id="productprice" />
                            <input className="tax-inputbox" value={this.state.tax} onChange={(e)=>this.handleInput(e,"tax")} type="text" placeholder="Product Tax" id="producttax" />
                            <input className="quantity-inputbox" value={this.state.quantity} onChange={(e)=>this.handleInput(e,"stock")} type="text" placeholder="Product Stock" id="productquantity" />
                            <button  onClick={this.handleSubmit} className="add-button">Confirm</button>
                        </div>
                    </div>  
                </div>
                <div className="inventory-box">
                    {/* <h1 className="inventorybox-header-title">Inventory</h1> */}
                    <div className="search">
                        <input type="text" value={this.state.searchQuery} placeholder="Looking for something specific?" onChange={(e) => this.handleInputQuery(e)} />
                    </div>
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th className="id">ID</th>
                                <th className="name">NAME</th>
                                <th className="rate">RATE</th>
                                <th className="tax">TAX</th>
                                <th className="stock">STOCK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(product => (
                                    (new RegExp(`^${this.state.searchQuery}.*`, "i").test(product.name) || +this.state.searchQuery === product.product_id) ? (
                                        <tr>
                                            <td>{product.product_id}</td>
                                            <td>{product.name}</td>
                                            {/* Changed property name from price to rate. This is because the SQL table uses the name rate */}
                                            <td>{product.rate}</td>
                                            <td>{product.tax}</td>
                                            {/* Changed property name from quality to stock. This is because the SQL table uses the name stock */}
                                            <td>{product.stock}</td>
                                        </tr> 
                                    ) : <></> 
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </DefaultLayout>
        )
    }
}

export default Inventory