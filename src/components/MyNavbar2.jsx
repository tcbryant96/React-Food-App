import React from 'react'


export default function MyNavbar2(props) {
  return (
    <nav className="navbar navbar-dark bg-success mb">
    <div className="container-fluid">
        <div className='col d-flex justify-content-center'>
        <h1 className='text-white ms-5'>
            My Recipes
        </h1>
        
        </div>
        <button onClick={() => {window.scrollTo(0, 0)}} className="btn btn-outline-light" type="submit">Back To The Top ^</button>
      
    </div>
  </nav>
  )
}
