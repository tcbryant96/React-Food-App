import React, { useEffect, useState } from 'react'
import { Badge, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import image from "../Images/orange2.jpg"


export default function Recipes(props) {
    const [recipes, setRecipes] = useState([props.fridge])
    const [recipeId, setRecipeId] = useState(0)
    const [modal, setModal] = useState(false)


  // useEffect(() => {
    //     let token = localStorage.token
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer " +token);

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch("http://localhost:5000/api/fridge/user", requestOptions)
    //         .then(response => response.json())
    //         .then(result => setRecipes(result))
    //         .catch(error => console.log('error', error));

    // }, [])

    const handleModal = async e => {
        let id = e.target.id
        setRecipeId(id)
        setModal(true)
    }
    let addToCart = (e) => {
        e.preventDefault()
        setModal(false)
        props.addToCart(e)
    }



    return (
        <>
            {props.recipes ?
                <div className='row ' >

                    {props.recipes.map((r, idx) => {
                        return (
                            <>
                                <div key={idx} className="col-lg-4 d-flex align-items-stretch justify-content-center">
                                    <Card style={{ width: '20rem' }} className="ms-2 mb-3 border-success border-3 bg-light rounded me-2 mt-4" >
                                        <div className='d-flex justify-content-center '>
                                            <Card.Img variant="top" src={r.recipe.image} className=" p-3 border-success rounded" style={{ width: '15rem', height: "12rem" }} />

                                        </div>

                                        <Card.Body>

                                            <Card.Title className='text-center'>{r.recipe.label}</Card.Title>
                                            <hr></hr>
                                            <Card.Text >
                                                <div className='d-flex justify-content-between mb-4'>
                                                    <Badge bg='secondary' className=''>
                                                        {r.recipe.cuisineType}
                                                    </Badge>
                                                    <Badge bg="success">
                                                        {r.recipe.need} Ingredients needed
                                                    </Badge>
                                                </div>

                                                <div className='d-flex justify-content-end'>


                                                    <Button variant="outline-success" className='w-50 btn-sm fw-bold' id={idx} onClick={handleModal}>Recipe</Button>
                                                </div>

                                            </Card.Text>

                                        </Card.Body>

                                    </Card>
                                </div>
                                <Modal show={modal} onHide={() => { setModal(false) }}>
                                    <Modal.Header closeButton>
                                        <div className='row'>
                                            <div className='col-8'>
                                                <Modal.Title>{props.recipes[recipeId].recipe.label}</Modal.Title>
                                            </div>
                                            <div className='col'>
                                                <h6 className='text-dark'>*Calories: {Math.trunc(props.recipes[recipeId].recipe.calories)}</h6>
                                                <Badge>ingredient total: {props.recipes[recipeId].recipe.ingredients.length}</Badge>
                                                {props.recipes[recipeId].recipe.dietLabels.map((i, idx) => {
                                                    return (
                                                        
                                                            <Badge bg="success" className="ms-4">{i}</Badge>

                                                        
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </Modal.Header>
                                    <Modal.Body>

                                        {props.recipes[recipeId].recipe.ingredientLines.map((i, idx) => {
                                            return (
                                                <>
                                                <h6>{i}</h6>
                                                
                                                </>
                                            )
                                        })}



                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className='d-flex justify-content-start col'>
                                       {localStorage.token ? 
                                       <Button id={recipeId} onClick={addToCart}>
                                        +Add Ingredients To Cart
                                       </Button>
                                       : null}
                                       </div>
                                        <Button variant="success">
                                            <a href={props.recipes[recipeId].recipe.url} className="text-white" style={{ textDecoration: 'none' }}>Instructions</a>
                                        </Button>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>)
                    })}

                </div> :
                <div className='row ' style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    {recipes.map((r, idx) => {
                        return (
                            <>
                                <div key={idx} className="col-lg-4 d-flex align-items-stretch">
                                    <Card style={{ width: '20rem' }} className="ms-2 mb-3 border-success border-3 bg-light rounded me-2 mt-4" >
                                        <div className='d-flex justify-content-center '>
                                            <Card.Img variant="top" src={r.recipe.image} className="p-3 border-success rounded" style={{ width: '15rem', height: "12rem" }} />
                                        </div>
                                        <Card.Body>

                                            <Card.Title className='text-center'>{r.recipe.label}</Card.Title>
                                            <hr></hr>
                                            <Card.Text >
                                                <div className='d-flex justify-content-between mb-4'>
                                                    <Badge bg='secondary' className=''>
                                                        {r.recipe.cuisineType}
                                                    </Badge>
                                                    <Badge bg="success">
                                                        {r.recipe.ingredients.length} Ingredients
                                                    </Badge>
                                                </div>
                                                <div className='d-flex justify-content-end'>

                                                    <Button variant="outline-success" className='w-50 btn-sm fw-bold' id={idx} onClick={handleModal}>Recipe</Button>
                                                </div>
                                            </Card.Text>

                                        </Card.Body>

                                    </Card>
                                </div>
                                <Modal show={modal} onHide={() => { setModal(false) }}>
                                    <Modal.Header closeButton>
                                        <div className='row'>
                                            <div className='col-8'>
                                                <Modal.Title>{props.recipes[recipeId].recipe.label}</Modal.Title>

                                            </div>
                                            <div className='col'>

                                                {props.recipes[recipeId].recipe.dietLabels.map((i, idx) => {
                                                    return (
                                                        <>
                                                            <Badge bg="success" className="ms-4">{i}</Badge>

                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </Modal.Header>
                                    <Modal.Body>

                                        {props.recipes[recipeId].recipe.ingredientLines.map((i, idx) => {
                                            return (
                                                <>

                                                    <h6>{i}</h6>

                                                </>
                                            )
                                        })}



                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className='col-7'>
                                            <Button className='btn-success'>
                                                +Add ingredients to shopping list
                                            </Button>
                                        </div>

                                        <Button variant="success">
                                            <a href={props.recipes[recipeId].recipe.url} className="text-white" style={{ textDecoration: 'none' }}>Instructions</a>
                                        </Button>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>)
                    })}

                </div>}
        </>
    )
}
