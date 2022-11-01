import React from "react"
import DefaultLayout from "./DefaultLayout"
 import "./inventory.css"

class Inventory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:"",
            name: "",
            quantity:"",
            price:"",
            tax:"",
            products:[],


            
        }

        this.handleInput=this.handleInput.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleInput(e,field){
        this.setState({
            [field]:e.target.value
        })
    }

    handleSubmit(){
        // alert(this.state.id)
        const newitem = {
            id:this.state.id,
            name:this.state.name,
            tax:this.state.tax,
            price:this.state.price,
            quantity:this.state.quantity,


        }

        let duplicate = false

        this.state.products.forEach(product => {
            if (newitem.name ===  product.name || newitem.id === product.id)
                duplicate = true || duplicate
            
        })

        if(!duplicate){
            let newproducts = this.state.products
            newproducts = [...newproducts,newitem]
            this.setState({
                products:newproducts
            })
            console.log(this.state.products)
        }else alert("Cannot Add Duplicates")


        
    }


    render() {
        return (
        <DefaultLayout>
            <div className="inventory-container">
                <div className="new-product-box" > 
                    <div className="new-product-box-top-bar">Add New Product</div>
                    <div className="new-product-box-content">
                        <input className="id-inputbox"  value={this.state.id} onChange={(e)=>this.handleInput(e,"id")} type="text" placeholder="Enter Product ID" id="prdouctid" />
                        <input className="name-inputbox" value={this.state.name}  onChange={(e)=>this.handleInput(e,"name")} type="text" placeholder="Enter Product Name" id="productname" />
                        <input className="price-inputbox" value={this.state.price} onChange={(e)=>this.handleInput(e,"price")} type="text" placeholder="Enter Product Price" id="productprice" />
                        <input className="tax-inputbox" value={this.state.tax} onChange={(e)=>this.handleInput(e,"tax")} type="text" placeholder="Enter Product Tax" id="producttax" />
                        <input className="quantity-inputbox" value={this.state.quantity} onChange={(e)=>this.handleInput(e,"quantity")} type="text" placeholder="Enter Product Quantity" id="productquantity" />
                        <button  onClick={this.handleSubmit} className="add-button">Add</button>
                    </div>  
                </div>
                <div className="inventory-box">
                    <h1 className="inventorybox-header-title">Inventory</h1>
                        <table className="inventory-table">
                            <tr>
                                <th class="col1">ID</th>
                                <th class="col2">Name</th>
                                <th class="col3">Price</th>
                                <th class="col4">Tax</th>
                                <th class="col5">Quantity</th>
                            </tr>
                            {
                                this.state.products.map(product => (
                                    <tr>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.tax}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))
                            }
                        </table>
                </div>
            </div>
        </DefaultLayout>
        )
    }
}

export default Inventory