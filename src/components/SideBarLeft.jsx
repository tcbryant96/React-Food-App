import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import { Link } from "react-router-dom";

export default function SideBarLeft() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect} className=" w-100" variant="dark">
                <Carousel.Item>
                    <div className='text-center'>
                        <img
                            className=" w-75 container-fluid"
                            src={require('../Images/fridge2.png')}
                            alt="Fridge"
                        />
                    </div>
                    <Carousel.Caption>
                        
                        
                    </Carousel.Caption>
                    <h6 className='fw-bold text-center  mt-4 mb-5'>Add whats in your Fridge to recipe search and find out what's for dinner tonight!</h6>
                </Carousel.Item>
                <Carousel.Item className=''>
                    <div className='text-center row'>
                        <img
                            className=" w-75 container-fluid ms-5"

                            src={require('../Images/food.png')}
                            alt="Food Logo"
                        />
                    </div>
                    <div className='row text-center'>
                        <h1 className=' mt-2 mb-3'>
                            Sign Up For Free!
                        </h1>
                        <h6 className="fw-bold">
                            Sign up to keep track of your Shopping List and Fridge for a more personalized experience.
                        </h6>
                        <div className='d-flex justify-content-center'>
                        <Link to="/signup" className='w-75'><Button variant="success" className='w-75 mb-5'>
                            Sign Up
                        </Button></Link>
                        </div>
                       

                    </div>


                   
                </Carousel.Item>
                <Carousel.Item >
                    <div className='mt-5'>
                    <div className='text-center'>
                        <img
                            className=" w-75 container-fluid me-4"
                            src={require('../Images/shoppingCart.png')}
                            alt="Shopping Cart"
                        />
                    </div>

                   <div className='text-center'>
                   <h3 className='text-dark '>Shopping List</h3>
                        <h6 className='mb-5 fw-bold'>
                           Add to your Shopping list, after you go shopping add it to your Fridge, and then find recipes from Fridge!  
                        </h6>
                   </div>
                   </div>
                        
                    
                </Carousel.Item>
            </Carousel>
        </>
    )
}
