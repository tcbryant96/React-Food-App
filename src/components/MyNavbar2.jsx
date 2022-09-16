import React from 'react'


export default function MyNavbar2(props) {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <nav className="navbar navbar-dark bg-success mb">
    <div className="container-fluid">
        <div className='col d-flex justify-content-center'>
        <h1 className='text-white ms-5'>
            My Recipes
        </h1>
        
        </div>
        <button onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}} className="btn btn-outline-light" type="submit">Back To The Top ^</button>
      
    </div>
  </nav>
  )
}
