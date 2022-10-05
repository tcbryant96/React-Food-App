import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

export default function SearchForm(props) {
  let [searchList, setSearchList] = useState([])
  useEffect(() => {
    let newList = props.searchList
      setSearchList(newList)
  })

  let handleSearchList = e => {
    e.preventDefault()
    let item = e.target.item.value

    let newList = searchList.concat([item])

    setSearchList(newList)
    props.setSearchList(newList)
    e.target.item.value = ""
  }


  let handleListClear = e =>{
    e.preventDefault()
    setSearchList([])
    props.setSearchList([])
  }
  
  let handleListEdit = e => {
    e.preventDefault()
    let item = e.target.id
    console.log(item)
    console.log(searchList)
    let index = searchList.indexOf(item)
    
    let newSearchList = searchList.splice(index, 1)
    setSearchList(newSearchList)
  
  }

  return (

    <>
      <div className='d-flex justify-content-center p-4'>
        <Card className='col border-success border-5 container-fluid bg-light'>
          <Nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <Button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Single Item</Button>
              <Button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Mixed Items</Button>

            </div>
          </Nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <Form onSubmit={props.handleSingleSearch} className="d-flex  p-4" role="search">

                <Form.Control className="form-control me-2" type="search" placeholder="Keyword..." aria-label="Search" id="singleSearch" required />
                <Button className="btn btn-primary" type="submit">Search</Button>
              </Form>
              <div className='text-center'>
                <h6>
                  Search By An Ingredient
                </h6>
              </div>

              <div className='d-flex justify-content-center'>
                <hr className='col-1'></hr>
                <h6>
                  OR
                </h6>
                <hr className='col-1'></hr>
              </div>
              <div className='text-center'>
                <h6>
                  Search By Ingredient Amount
                </h6>
              </div>





              <Form onSubmit={props.handleMinMaxSearch}>

                <Form.Group className="mb-3 p-4 ">

                  <div className='row'>
                    <div className='d-flex justify-content-between'>
                      <div className='col-5'>
                        <Form.Control required className='col' type="search" placeholder="Keyword..." id="itemByInt" />
                      </div>
                      <div className='col-6 d-flex justify-content-evenly ms-4'>
                        <select className="form-select form-select-sm me-2" aria-label=".form-select-sm example" id="min">
                          <option value="0">Min</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                        </select>

                        <select className="form-select form-select-sm ms me-2" aria-label=".form-select-sm example" id="max">
                          <option value="0">Max</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>

                        </select>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className='col-12 mt-3'>
                    Search
                  </Button>

                </Form.Group>
              </Form>
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div className='justify-content-center d-flex mt-2'>
                <hr className='col-2'></hr>
                <h6>
                  Search By Multiple Items
                </h6>
                <hr className='col-2'></hr>
              </div>
              <div className='ms-5'>
                <ul>
                  {searchList.map((i, idx) => {
                    return (
                      <>
                    <div className='d-flex justify-content-between col-10 mb-2'key={idx}>
                    <li className="fw-bold" key={i}>{i}</li>
                    <button type="button" key={i+idx} onClick={handleListEdit}className="btn-close" id={i} aria-label="Close"></button>
                    </div>
                    </>
                    )
                  })}
                </ul>
              </div>
              <div>
                <Form className="d-flex  p-4" role="search" onSubmit={handleSearchList}>

                  <Form.Control className="form-control me-2" type="search" placeholder="Keyword..." id="item" aria-label="Search" required />
                  <Button className="btn btn-primary" type="submit">+Add</Button>
                </Form>
                <Form className='p-4'onSubmit={props.handleMultiSearch} >
                  <Button className='col-12' type="submit">
                    Search
                  </Button>
                  <Button className='btn-danger col-12 mt-2' onClick={handleListClear}>
                  Clear Search
                </Button>
                </Form>
                
              </div>

            </div>

          </div>
        </Card>

      </div>
    </>
  )
}
