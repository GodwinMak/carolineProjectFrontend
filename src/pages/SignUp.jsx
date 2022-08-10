import React, { useState, useEffect } from 'react'
import "./signup.css"
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Profilepic from '../assests/profilePic.png'
import Select from "react-select";
import college from "../assests/json/college.json"
import courses from "../assests/json/course.json"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

import { signUpRoute } from '../utils/APIRoutes'




const SignUp = () => {
  const navigate = useNavigate();


  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 7048576) {
      return alert("Max file size is 7mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "gmakyao");
    try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/gmak/image/upload", {
        method: "post",
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    regNo: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }


  console.log(values.firstName)
  console.log(values.lastName)
  console.log(values.regNo)
  console.log(values.password)
  console.log(values.confirmPassword)
  



  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleValidation = () => {
    const { password, confirmPassword, regNo, firstName, lastName } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be the same", toastOptions)
      return false;
    } else if (password.length <= 8) {
      toast.error(
        "password should be greater than 8 characters", toastOptions
      );
      return false;
    } else if (regNo.length === "") {
      toast.error(
        "Registration number is required", toastOptions
      );
      return false;
    } else if (firstName === "") {
      toast.error(
        "First name is required", toastOptions
      );
      return false;
    }
    else if (lastName === "") {
      toast.error(
        "Last name is required", toastOptions
      );
      return false;
    }
    return true
  }

  useEffect(() => {
    if (localStorage.getItem('')) {
      navigate("/dashboard")
    }
  }, [navigate])


  const [selectedOptionsCollege, setSelectedOptionsCollege] = useState("");
  const [selectedOptionsCourse, setSelectedOptionsCourse] = useState("");

  // const handleCollege = (data) =>{
  //     setSelectedOptionsCollege(data);
  // }

  // const handleCourse = (data) => {
  //   setSelectedOptionsCourse(data);
  // }
  console.log(selectedOptionsCollege)
  console.log(selectedOptionsCourse)


  const handleSignUp = async (event) =>{
    event.preventDefault();
    
    if (handleValidation()) {
      if (!image) return alert("Please upload your profile picture");
      const url = await uploadImage(image);
     
      const { firstName, lastName, regNo, password } = values;
      const { data } = await axios.post(signUpRoute, {
        firstName,
        lastName,
        regNo,
        college: selectedOptionsCollege,
        course: selectedOptionsCourse,
        picture: url,
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
    <Container style={{position: "relative", top: "40px"}}>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={(event) => handleSignUp(event)}>
            <h1 className="text-center">Create account</h1>
            <div className='signup-profile-pic__container'>
              <img src={ imagePreview ||Profilepic} className="signup-profile-pic" alt='profile Pic' />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon">t</i>
              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="First Name" 
                onChange={(e) => handleChange(e)}
                name ='firstName' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Last Name" 
                onChange={(e) => handleChange(e)}
                name = 'lastName'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRegNo">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Registration number"
                onChange={(e) => handleChange(e)}
                name='regNo' 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCollege">
              <Form.Label>College</Form.Label>
                <Select 
                  options = {college}
                  placeholder="Select College"
                  // value={selectedOptionsCollege}
                  // onChange={handleCollege}
                  onChange={(choice) => setSelectedOptionsCollege(choice.value)}
                  isSearchable={true}
                  name = 'college'
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCollege">
              <Form.Label>Course</Form.Label>
              <Select
                options={courses}
                placeholder="Select Course"
                //   value={selectedOptionsCourse}
                // onChange={handleCourse}
                  onChange={(choice) => setSelectedOptionsCourse(choice.value)}
                isSearchable={true}
                name='course'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                name='password'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='confirmPassword'
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              {uploadingImg? "Signing you up..." : "Signup"}
            </Button>
            <div className="py-4">
              <p className="">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
    <ToastContainer/>
    </>
  )
}

export default SignUp