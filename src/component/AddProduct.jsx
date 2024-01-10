import React, { useState } from "react";
import productService from "../service/product.service";

const AddProduct = () => {
    const [product, setProduct] = useState({
        productName:"",
        descripition:"",
        price:"",
        status:"",
    })

    const [msg, setMsg]=useState("");
    const handleChange = (e) => {
        const value = e.target.value;
        setProduct ({ ...product,[e.target.name]: value});
    };

    const ProductRegsite = (e) => {
        e.preventDefault();
       
        productService.saveProduct(product).then((res) => {
            console.log("Porduct Added Sucessfully");
            setMsg("Porduct Added Sucessfully");
            setProduct({
                productName:"",
                descripition:"",
                price:"",
                status:"",
            })
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3"></div>
                <div className="card">
                    <div className="card-header fs-3 text-center">
                    Add Product
                    </div>
                    {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                    <div className="card-body "> 
                        <form onSubmit={(e) => ProductRegsite(e)}> 
                            <div className="mb-3">
                                <label>Enter Product Name</label>
                                <input type="text" name="productName" className="form-control" onChange={(e)=>handleChange(e)} value={product.productName}/>
                            </div>
                            <div className="mb-3">
                                <label>Enter Description</label>
                                <input type="text" name="descripition" className="form-control"onChange={(e)=>handleChange(e)} value={product.descripition}/>
                            </div>
                            <div className="mb-3">
                                <label>Enter Price</label>
                                <input type="text" name="price" className="form-control"onChange={(e)=>handleChange(e)}value={product.price}/>
                            </div>
                            <div className="mb-3">
                                <label>Enter Status</label>
                                <input type="text" name="status" className="form-control"onChange={(e)=>handleChange(e)}value={product.status}/>
                            </div>
                            <button className="btn btn-primary col-md-12">Submit</button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
        </>
    )
}

export default AddProduct