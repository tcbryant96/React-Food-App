import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

export default function ShoppingCart(props) {
    let [addItem, setAddItem] = useState(false)
    let [shoppingList, setShoppingList] = useState([])
    let [edit, setEdit] = useState(false)
    let [modal, setModal] = useState(false)
    let [update, setUpdate] = useState(null)
    let [itemToEdit, setItemToEdit] = useState(null)

    useEffect(() => {

        let token = localStorage.token
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/cart/user/", requestOptions)
            .then(response => response.json())
            .then(result => setShoppingList(result))
            .catch(error => console.log('error', error));
        setUpdate(null)
    }, [update])
    
    let handleAddItem = async e => {
        e.preventDefault()
        let token = localStorage.token
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "item": e.target.item.value,
            "quantity": e.target.quantity.value
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/cart", requestOptions)
            .then(response => response.json())
            .then(result => props.flashMessage(`${result.item} added to Shopping List`, "primary"))
            .catch(error => console.log('error', error));
        props.flashMessage("Item Added", "success")
        setUpdate("updated")
        setAddItem(false)
    }
    
    let handleDeleteItem = (e) => {
        let token = localStorage.token
        let id = e.target.id
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/cart/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => props.flashMessage(`${result.success}`, "danger"))
            .catch(error => console.log('error', error));
        setUpdate("updated")
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    
    let handleEditItem = (e) => {
        e.preventDefault()
        let token = localStorage.token
        let id = e.target.itemId.value
        
        let quantity = e.target.quantity.value
        for (let i = 0; i < shoppingList.length; i++) {
            if (shoppingList[i].id == id) {
                let item = shoppingList[i].item
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "item": item,
                    "quantity": quantity
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`http://localhost:5000/api/cart/${id}`, requestOptions)
                    .then(response => response.json())
                    .then(result =>  props.flashMessage(`${result.item} quantity updated to ${result.quantity}`, "primary"))
                    .catch(error => console.log('error', error));
                setItemToEdit(null)
                props.flashMessage(`${item} Updated`, "success")
                setUpdate("updated")
            }
        }

    }

    let handleAddToFridge = () => {
        for (let i = 0; i < shoppingList.length; i++) {
            let item = shoppingList[i].item
            let quantity = shoppingList[i].quantity
            let id = shoppingList[i].id
            let token = localStorage.token
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "item": item,
                "quantity": quantity
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:5000/api/fridge", requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

            var myHeaders2 = new Headers();
            myHeaders2.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders2,
                redirect: 'follow'
            };

            fetch(`http://localhost:5000/api/cart/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            props.flashMessage("Added To Fridge", "primary")

            setUpdate("updated")
        }
    }
    
    let handleMultiDelete = e => {
        let token = localStorage.token
        for (let i = 0; i < shoppingList.length; i++) {


            let id = shoppingList[i].id
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`http://localhost:5000/api/cart/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            setModal(false)
            setUpdate("updated")
            props.flashMessage("List Cleared", "danger")
        }
    }
    let tableEdit = e => {
        setEdit(true)
        setItemToEdit(e.target.id)
    }

    return (
        <>
            <div>
                <Card className='m-5 border-success border-5 full-size'>
                    <div className='row'>
                        <div className='col-5 d-flex justify-content-end'>
                            <img src={require('../Images/shoppingCart.png')} className="mt-4 mb-5" style={{ height: 100 }}></img>

                        </div>
                        <div className='col d-flex'>
                            <h1 className='underline mb-5 mt-5'>Shopping Cart</h1>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center '>
                        <div className='col-10 '>
                            {shoppingList.length >= 1 ?
                                <Table striped bordered hover variant="success">
                                    <thead>
                                        <tr>
                                            <th className='text-center'>Item</th>
                                            <th className='text-center'>Quantity</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shoppingList.map((i, idx) => {
                                            return (
                                                <>

                                                    {itemToEdit === i.item ?
                    
                                                        <>
                                                            <tr>
                                                                <td className='text-center'><Badge bg="primary">{i.item}</Badge></td>
                                                                <td className='fw-bold text-center'>
                                        
                                                                        <Form onSubmit={handleEditItem}>
                                                                            <Form.Group className=' d-flex justify-content-center'>
                                                                                <div className='col-4 d-flex justify-content-center'>
                                                                                    <Form.Control id="quantity" placeholder="Quantity" className="text-center w-50 " defaultValue={i.quantity} />
                                                                                </div>
                                                                                <div className='col d-flex justify-content-evenly'>
                                                                                    <Button id="itemId" value={i.id} className='me-3' type="submit">Save</Button>
                                                                                    <Button variant='danger' onClick={() => { setItemToEdit(null) }} className="me-2">Cancel</Button>
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Form>
                                                                
                                                                </td>


                                                            </tr>
                                                        </> :

                                                        <tr>
                                                            <td className='text-center'><Badge bg="primary">{i.item}</Badge></td>
                                                            <td className='fw-bold text-center'>
                                                          
                                                                    <div className=' d-flex justify-content-center'>
                                                                        <div className='col-4 d-flex justify-content-center' >
                                                                            {i.quantity}
                                                                        </div>
                                                                        <div className='col d-flex justify-content-evenly'>
                                                                            <Button onClick={tableEdit} variant="success" id={i.item} className='me-3' >
                                                                                Edit
                                                                            </Button>
                                                                            <Button id={i.id} onClick={handleDeleteItem} variant="danger" className='me-2' >
                                                                                Delete
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                   
                                                                
                                                            </td>

                                                        </tr>
                                                    }

                                                </>)
                                        })}
                                    </tbody>
                                </Table> :
                                null}

                        </div>
                    </div>
                    {addItem ?
                        <div className='row m-4'>
                            <Form className='d-flex justify-content-center' onSubmit={handleAddItem}>
                                <Row className="align-items-center">
                                    <Col sm={5} className="my-1">
                                        <Form.Control id="item" placeholder="Item" required />
                                    </Col>
                                    <Col sm={3} className="my-1">
                                        <InputGroup id="quantity">

                                            <Form.Control
                                                id="quantity"
                                                placeholder="Quantity"
                                                required
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col xs="auto" className="my-1">
                                        <Button type="submit">+Add</Button>
                                    </Col>
                                    <Col xs="auto" className="my-1">
                                        <Button className='btn-danger' onClick={() => { setAddItem(false) }}>Cancel</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>

                        : null}


                    <h4 className='text-center mb-5'><button className='bg-white border-white mt-4' onClick={() => { setAddItem(true) }}>+Add Item</button></h4>
                    {shoppingList.length >= 1 ?
                        <div className='row m-5'>

                            <div className='col d-flex justify-content-center'>
                                <Button className='me-5 col-8' onClick={handleAddToFridge}>Add Cart To Fridge</Button>


                                <Button onClick={() => { setModal(true) }} className='ms-5 col-2 btn-danger'>
                                    Clear List
                                </Button>
                            </div>

                        </div>

                        : null}

                </Card>

            </div>

            <Modal show={modal}>
                <Modal.Header>
                    <h3>Are you sure you want to clear list?</h3>
                </Modal.Header>
                <Modal.Body className='fw-bold text-center'>
                    This action can't be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleMultiDelete} variant='danger'>
                        Yes, clear list
                    </Button>
                    <Button onClick={() => { setModal(false) }} variant='secondary'>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
