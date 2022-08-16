import React, {useState, useRef, useEffect, } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import {userReport}  from "../utils/APIRoutes"



const Purchase = () => {

    const desc = useRef(null);
    const date = useRef(null);
    const amount = useRef(null);
    const price = useRef(null);
    const [purchase, setPurchase] = useState([]);
    const [data, setData] = useState([])
    const [dataPurchase, setdataPurchase] = useState([])
    const [budgets, getBudgets] = useState([]);

    const [currentUser, setCurrentUser] = useState({})


    // fetch current user
    useEffect(() => {
        const fetchItem = async () => {
            setCurrentUser(await JSON.parse(localStorage.getItem("EM-app-user")))
        }

        fetchItem();
    }, []);


    // taking the values from the form and submit them

    const [values, setValues] = useState({
        goodsName: "",
        price: 0,
        amount: 0,
        date: ""

    })


    //posting purchases made
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const addPurchase = async (e) => {
        e.preventDefault();


        setPurchase([...purchase, {
            "desc": desc.current.value,
            "amount": amount.current.value,
            "price": price.current.value,
            "date": date.current.value
        }]);
        if (remainAmount < (values.price * values.amount)) {
            alert("The budget is over")
        }
        else {
        
            await axios.post(userReport, {
                goodsName: values.goodsName,
                price: values.price,
                amount: values.amount,
                date: values.date,
                purchase: (values.price * values.amount),
                userId: currentUser._id

            })
        }
        desc.current.value = "";
        amount.current.value = "";
        date.current.value = null;
        price.current.value = null;
    }


// getting data of goodsName and price accordding to the current user 
    useEffect(() => {
        fetch('http://localhost:5001/api/v1/purchase')
        .then(res => {
            return res.json();
        })
        .then(data =>{
            setData(data.data);
        })
    }, [])
    const optionsPrice = data.filter(d => d.userId === currentUser._id).map((datum, _id) => {
    return (
        <option key={datum._id} value={datum.price}  ref={price} >{datum.price}</option>
    )
    })


    const optionsGoods = data.filter(d => d.userId === currentUser._id).map((datum, _id) =>{
    return (
        <option key={datum._id} value={datum.goodsName}   >{datum.goodsName}</option>
    )
    })


//getting the purchase made
useEffect(() => {
    fetch('http://localhost:5001/api/v1/report')

    .then(res => {
        return res.json();
    })
    .then(data =>{
        setdataPurchase(data.data)
    })
  
}, [])



//getting user budget
useEffect(() => {
    fetch('http://localhost:5001/api/v1/data')
    .then(res => {
        return res.json();
    })
    .then(data =>{
        getBudgets(data.data)
    })
  
}, [])

console.log(budgets);

    


// eslint-disable-next-line array-callback-return
const userBudget = budgets.filter(budget => budget.userId === currentUser._id).map(( data, _id ) => {
    
       return data.budget
    
})


//getting total amount of purchase
const amounts =  dataPurchase.filter(p => p.userId === currentUser._id).map(datum => datum.purchase);
console.log(amounts)


    const total = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

//getting the remain amount
    let remainAmount;
    if(isNaN(parseInt(userBudget -total))){
        remainAmount = userBudget;
    }else{
        remainAmount = parseInt(userBudget - total);
    }









  return (
    <Container>
        <div style={{ right: "30px", position: 'absolute' }}>
            <header>
                <h3>Remain Budget</h3>
                  {<div>{ remainAmount} TSH</div>}
            </header>
        </div>
        <Form style={{ position: "relative", top: "70px" }} onSubmit={addPurchase}>
            <Row>
                <Col md={3}>
                    <Form.Group>
                          <select name='goodsName' onChange={(e) => handleChange(e)} ref={desc} style={{ width: "100%", padddingLeft: "10px", height: '32px', postion: "relative", top: "20px" }}>
                            <option>Select goods</option>
                            {optionsGoods}
                        </select>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <select name='price' onChange={(e) => handleChange(e)} ref={price} style={{ width: "100%", padddingLeft: "10px", height: '32px', postion: "relative", top: "20px" }} >
                            <option>Select Price</option>
                            {optionsPrice}
                        </select>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Control type="number" placeholder='Amount' ref={amount} name='amount' onChange={(e) => handleChange(e)} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Control type="date" placeholder='Purchasing date' ref={date} name='date' onChange={(e) => handleChange(e)} />
                    </Form.Group>
                </Col>
                <Col md ={2}>
                    <Form.Group>
                          <Form.Control type="submit" value="Add Purchase" onClick={() =>window.location.reload(false)} />
                    </Form.Group> 
                </Col>
            </Row>           
        </Form>
        
    </Container>
  )
}

export default Purchase