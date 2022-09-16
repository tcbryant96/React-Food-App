import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default function MyNavbar(props) {
  return (
    <>


    <Navbar bg="success" variant="dark">
    <Container>
      {localStorage.token ? 
    <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1" variant="success">{localStorage.username}</Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
        
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" className='text-danger fw-bold bg-light' onClick={props.logout}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>: null}
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {localStorage.token ?
        <>
        <Nav.Link href="/shopping-cart">Shopping Cart</Nav.Link>
        <Nav.Link href="/fridge">My Fridge</Nav.Link>
        {/* <Nav.Link href="/myrecipes">My Recipes</Nav.Link> */}
</>
        :
        <>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        </>}
      </Nav>
    </Container>
  </Navbar>
  </>
  )
}
