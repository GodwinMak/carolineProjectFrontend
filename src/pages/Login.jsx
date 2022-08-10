import React, { useState, useEffect } from 'react'
import './login.css'
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

import { loginRoute } from '../utils/APIRoutes';



const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    regNo: "",
    password: "",
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleValidation = () => {
    const { password, regNo, } = values;
    if (password === "") {
      toast.error("Registration number and password is required", toastOptions)
      return false;
    } else if (regNo.length === "") {
      toast.error(
        "Registration number and password is required", toastOptions
      );
      return false;
    }
    return true
  }

  useEffect(() => {
    if (localStorage.getItem('EM-app-user')) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleLogin = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { regNo, password } = values;
      const { data } = await axios.post(loginRoute, {
        regNo,
        password
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('EM-app-user', JSON.stringify(data.user))
        navigate("/dashboard");
      }
    };
  }
  

  return (
    <>
    <Container style={{ position: "relative", top: "40px" }}>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={(event) =>handleLogin(event)}>
              <h1 className="text-center">Login</h1>
            <Form.Group className="mb-3" controlId="formBasicRegNo">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Registration Number" 
                name = 'regNo'
                onChange={(e) => handleChange(e)}
                required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                name = 'password'
                onChange={(e) => handleChange(e)}
                required />
            </Form.Group>
            <Button variant="success" type="submit">Login</Button>
            <div className="py-4">
              <p className="">
                Don't have an account ? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
          <Col md={5} className="login__bg"></Col>
      </Row>
    </Container>
    <ToastContainer/>
    </>
  )
}

export default Login