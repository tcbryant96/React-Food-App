import React from 'react'

export default function HomeTop() {
  return (
    <>
    <Carousel activeIndex={index} onSelect={handleSelect} className="bg-dark w-100" >
      <Carousel.Item>
        <img
          className="d-block"
          src={require('../Images/fridge2.png')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1 className="text-dark">HI</h1>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className=''>
        <img
          className="d-block w-75 "
          src={require('../Images/food.png')}
          alt="Second slide"
        />

        <Carousel.Caption>
        <h1 className="text-dark">HI</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='bg-primary'>
      <img
          className="d-block"
          src={require('../Images/fridge3.jfif')}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className='text-dark'>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </>
  )
}
