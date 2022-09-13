import React from 'react'


export default function MyNavbar() {
  return (
    <nav className="navbar navbar-dark bg-success">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Navbar</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}
