import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './home.css'



const Home = () => {
  return (
      <Row>
          <Col md={6} className='d-flex flex-direction-column align-items-center justify-content-center'>
            <div>
                <h1>We manage your money Easly</h1>
                <p>helps you to know daily expenditure</p>
                <Link to='/login'>
                  <Button variant="success">
                    Get Started <i className='fas fa-comments home-message-icon'></i>
                  </Button>
                </Link>
            </div>
          </Col>
          <Col md={6} className="home__bg"></Col>
      </Row>
  )
}

export default Home