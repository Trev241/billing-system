import React from "react";

import "./inventory.css"

class Inventory extends React.Component {
    render() {
        return (
            <div className="maindiv">
                <form className="addnewproduct-form">
                    <div className="new-product-box" > 
                        <div className="new-product-box-top-bar"><p className="productbox-title">Add New Product</p></div>
                            <div className="id-inputbox-div">
                                <input className="id-inputbox" type="text" placeholder="Enter Product ID" id="prdouctid" />
                            </div>   
                        <div>
                            <input className="name-inputbox" type="text" placeholder="Enter Product Name" id="productname" />
                        </div>
                        <div>
                            <input className="quantity-inputbox" type="text" placeholder="Enter Product Quantity" id="productquantity" />
                        </div>
                        <div>
                            <input className="price-inputbox" type="text" placeholder="Enter Product Price" id="productprice" />
                        </div>
                        <div>
                            <button className="add-button">Add</button>
                        </div>
                    </div>
                </form>
                <div className="div2">
                    <div className="inventorybox-header" >
                        <p className="inventorybox-header-title">Inventory</p>
                    </div>
                    <div className="inventorybox">
                        <div className="inventorybox-topbar">
                            <div className="id-header">ID</div>
                            <div className="name-header">Name</div>
                            <div className="quantity-header">Quantity</div>
                            <div className="price-header">Price</div>
                        </div>
                        <div className="content-div"> 
                            <div className="fcontent-id">20BCAA61</div>
                            <div className="fcontent-name">Monster Energy</div>
                            <div className="fcontent-quantity">5</div>
                            <div className="fcontent-price">110</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Inventory