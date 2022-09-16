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

export default function Fridge(props) {
  let [addItem, setAddItem] = useState(false)
  let [shoppingList, setShoppingList] = useState([])
  let [edit, setEdit] = useState(false)
  let [modal, setModal] = useState(false)
  let [update, setUpdate] =useState(null)

  useEffect(() => {
    let token = localStorage.token
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/fridge/user", requestOptions)
      .then(response => response.json())
      .then(result => setShoppingList(result))
      .catch(error => console.log('error', error));
    setUpdate(null)
  }, [update])
  let handleAddItem = async e => {
    e.preventDefault()
    let item = e.target.item.value
    let quantity = e.target.quantity.value
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
      setUpdate("updated")
      props.flashMessage("Item Added", "primary")
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

    fetch(`http://localhost:5000/api/fridge/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      setUpdate("updated")
      props.flashMessage("Item Deleted", "danger")

  }
  let handleEditItem = (e) => {
    e.preventDefault()
    let token = localStorage.token
    let id = e.target.itemId.value
    console.log(id)
    let quantity = e.target.quantity.value
    console.log(quantity)
    for (let i = 0; i < shoppingList.length; i++) {
      if (shoppingList[i].id == id) {
        let item = shoppingList[i].item
        console.log(item)
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

        fetch(`http://localhost:5000/api/fridge/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          setEdit(false)
          setUpdate("updated")
          props.flashMessage("Updated", "primary")
      }
    }

  }
  let handleMultiDelete = e => {
    let token = localStorage.token
    for (let i = 0; i < shoppingList.length; i++){

    
    let id = shoppingList[i].id
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`http://localhost:5000/api/fridge/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        setModal(false)
        setUpdate("updated")
        props.flashMessage("Fridge Cleared" , "danger")
}}


  return (
    <div>
      <Card className='m-5 border-primary border-5 full-size '>
        <div className='row'>
          <div className='col-5 ms-3 d-flex justify-content-end'>
            <img src={require('../Images/snowflake.png')} className="mt-4 mb-5" style={{ height: 100 }}></img>

          </div>
          <div className='col d-flex'>
            <h1 className='underline mb-5 mt-5'>Fridge</h1>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-10 '>
            {shoppingList.length >= 1 ?
            <Table striped bordered hover variant="primary">
              <thead>
                <tr>
                  <th className='text-center'>Item</th>
                  <th className='text-center'>Quantity</th>
                  <th></th>
                  <th className='col-2'></th>
                </tr>
              </thead>
              <tbody>
                {shoppingList.map((i, idx) => {
                  return (
                    <>
                      <tr>
                        <td className='text-center'><Badge bg="primary">{i.item}</Badge></td>
                        {edit ?
                             <>
                             <td className='fw-bold text-center d-flex justify-content-evenly'>
                               <div className='row d-flex justify-content-between'>
                                 <Form onSubmit={handleEditItem}>
                                   <Form.Group className="mb-3 d-flex justify-content-evenly">
                                     <div className='col-3'>
                                       <Form.Control id="quantity" placeholder="Quantity" className="text-center " defaultValue={i.quantity} />
                                     </div>
                                     <div className='col-2 d-flex'>
                                       <Button id="itemId" value={i.id} className='me-3' type="submit">Save</Button>
                                       <Button variant='danger' onClick={() => { setEdit(false) }}>Cancel</Button>
                                     </div>
                                   </Form.Group>
                                 </Form>
                               </div>
                             </td> 
                             <td>
                             
                             </td>
                             <td>

                             </td>
                             </> :
                                                   <>
                                                   <td className='fw-bold text-center'>{i.quantity}</td>
                                                 <td><Button onClick={() => { setEdit(true) }} className='container-fluid btn-success'>
                                                   edit
                                                 </Button></td>
                                                 <td><Button id={i.id} onClick={handleDeleteItem} className='container-fluid btn-danger'>
                                                   delete
                                                 </Button></td></>}
                                               </tr>
                                               </>
                  )
                })}
              </tbody>
            </Table>
            :null}
          </div>
        </div>
        {addItem ?
          <div className='row'>
            <Form className='d-flex justify-content-center' onSubmit={handleAddItem}>
              <Row className="align-items-center">
                <Col sm={5} className="my-1">
                  <Form.Control id="item" placeholder="Item" required/>
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
     
          
          <h4 className='text-center mb-5'><button className='bg-white border-white' onClick={() => { setAddItem(true) }}>+Add Item</button></h4>
          {shoppingList.length >=1 ?
          <div className='row'>
          <div className='text-end col-11'>
            <Button onClick={()=>{setModal(true)}} className='btn-danger mb-5 me-4 '>
              Clear List
            </Button>
          </div>

        </div>
        :null}
        
          
      </Card>
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
                    <Button onClick={() => {setModal(false)}}variant='secondary'>
                        Cancel
                    </Button>
                </Modal.Footer>
        </Modal>
    </div>

  )
}
