import React, {useState, useRef, useEffect, } from 'react'
import { Container, Form } from 'react-bootstrap'
import axios from 'axios'
import {userReport}  from "../utils/APIRoutes"



const Purchase = () => {
    const [purchase, setPurchase] = useState([]);
    const [data, setData] = useState([])
    const [dataPurchase, setdataPurchase] = useState([])
    const [budget, getBudget] = useState([]);

    const [values, setValues] = useState({
        goodsName: "",
        price: 0,
        amount: 0,
        date: ""

    })

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    console.log(values)



    useEffect(() => {
        fetch('http://localhost:5001/api/v1/purchase')
        .then(res => {
            return res.json();
        })
        .then(data =>{
            setData(data.data);
        })
    }, [])

    console.log(data);

    // const priceList = data.data.map(d => d.price)

    // console.log(priceList)
    

    const desc = useRef(null);
    const date = useRef(null);
    const amount = useRef(null);
    const price = useRef(null);

    const addPurchase = async(e) =>{
        e.preventDefault();


        setPurchase([...purchase, {
            "desc": desc.current.value,
            "amount": amount.current.value,
            "price": price.current.value,
            "date": date.current.value
        }]);

        // const one = purchase.map((data, index) => (data.goodsName))
        // const two = purchase.map((data, index) => (data.price))
        // const three = purchase.map((data, index) => (data.amount))
        // const four = purchase.map((data, index) => (data.date))

        await axios.post(userReport, {
            goodsName: values.goodsName,
            price: values.price,
            amount:values.amount ,
            date: values.date,
            purchase: (values.price * values.amount)

        })

        desc.current.value = "";
        amount.current.value = "";
        date.current.value = null;
        price.current.value = null;
    }


    
const optionsPrice = data.map((datum, _id) => {
    return (
        <option key={datum._id} value={datum.price}  ref={price} >{datum.price}</option>
    )
})


const optionsGoods = data.map((datum, _id) =>{
    return (
        <option key={datum._id} value={datum.goodsName}   >{datum.goodsName}</option>
    )
})

useEffect(() => {
    fetch('http://localhost:5001/api/v1/report')

    .then(res => {
        return res.json();
    })
    .then(data =>{
        setdataPurchase(data.data)
    })
  
}, [])

useEffect(() => {
    fetch('http://localhost:5001/api/v1/data')
    .then(res => {
        return res.json();
    })
    .then(data =>{
        getBudget(data.data)
    })
  
}, [])



console.log(budget)




const amounts =  dataPurchase.map(datum => datum.purchase);

console.log(dataPurchase)

    const total = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);



const budgets = budget.map(datum => datum.budget);

const remainAmount = parseInt(budgets - total);

console.log(remainAmount)

const validate = () =>{
    if(remainAmount > 0){
        return true;
    }
    else{
        return false
    }
}





  return (
    <Container>
        <div style={{ right: "30px", position: 'absolute' }}>
            <header>
                <h3>Total Purchase</h3>
                  {<div>{total && total} TSH</div>}
            </header>
        </div>
        { validate() === true ? <Form style={{ position: "relative", top: "70px" }} onSubmit={addPurchase}>
             <Form.Group>
                  <select name='goodsName' onChange={(e) => handleChange(e)} ref={desc} style={{ width: "80%", padddingLeft: "10px", height: '32px', postion: "relative", top: "20px" }}>
                      <option>Select goods</option>
                      {optionsGoods}
                  </select>
              </Form.Group>
              <Form.Group>
                  <select name='price' onChange={(e) => handleChange(e)} ref={price} style={{width: "80%", padddingLeft: "10px", height: '32px', postion: "relative", top: "20px"}} >
                      <option>Select Price</option>
                      {optionsPrice}
                  </select>
              </Form.Group>
              <Form.Group>
                  <Form.Control type="number" placeholder='Amount' ref={amount} name='amount' onChange={(e) => handleChange(e)} />
              </Form.Group>
              <Form.Group>
                  <Form.Control type="date" placeholder='Purchasing date' ref={date} name='date' onChange={(e) => handleChange(e)} />
              </Form.Group>
              <Form.Group>
                  <Form.Control type="submit" value="Add Purchase" onClick={() => window.location.reload(false)} />
              </Form.Group> 
        </Form>: <div> the Budget is over</div> }
        
    </Container>
  )
}

export default Purchase