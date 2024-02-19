import React, { useContext, useState } from 'react';
import { myContext } from '../App';
import './style/cartcomp.css'

const CartComp = () => {
    let [data, setdata] = useContext(myContext)
    let totalprice = data.reduce((accum, item) => accum + item.price * (item.quantity || 1), 0)
    let totalqua = data.reduce((accum, item) => accum + (item.quantity || 1), 0)


    let handleReduce = (id, quantity) => {
        setdata((pval) => {
            return pval.map((item) => {
                if (item.id === id && item.quantity > 0) {
                    return { ...item, quantity: (item.quantity - 1) }
                }
                return item;
            })
        })
    }

    let handleIncrease = (id, quantity) => {
        setdata((pval) => {
            return pval.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: (item.quantity + 1 || quantity + 1) }
                }
                return item

            })
        })
    }
    let handleRemoveElem = (id) => {
        setdata((pval) => pval.filter((item) => item.id !== id))
    }

    console.log(data)
    return (
        <div >
            <nav class="navbar navbar-expand-lg ">
                <div class="container">
                    <h4>My Cart   <i class="fa-solid fa-cart-shopping"></i></h4>
                </div>
            </nav>

            {data.map((item, index) => {
                return (
                    <>
                        <div key={index} className='container'>
                            <div className="card mb-3" style={{ maxWidth: '80vw' }} >
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <img src={item.images[0]} className="img-fluid rounded-start mx-auto d-block" alt="Single Image" />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <h4 className="card-title">{item.title}</h4>
                                            <p className="card-text">{item.description}</p>
                                            <p>Brand :{item.brand}</p>
                                            <h5>Price :₹{item.price}</h5>
                                            <p>Category :{item.category}</p>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <div className="input-group shadow">
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        type="button"
                                                        onClick={() => handleReduce(item.id, item.quantity)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="form-control text-center"
                                                        value={item.quantity || 1}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-outline-success"
                                                        type="button"
                                                        onClick={() => handleIncrease(item.id, item.quantity || 1)}
                                                    >
                                                        +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='col-9'>
                                                    <button className='btn btn-outline-secondary shadow' onClick={() => { handleRemoveElem(item.id) }}>Romove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
            <div className='fooder'>
                <h5>Total Price : <span>₹{totalprice}</span></h5>
                <h5>Total Quantity : <span>{totalqua}</span></h5>
            </div>

        </div>
    );
};

export default CartComp;