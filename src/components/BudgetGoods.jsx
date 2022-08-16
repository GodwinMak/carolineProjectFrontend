import React, {useState, useEffect} from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import Select from "react-select";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



import { userData, userPurchase } from '../utils/APIRoutes'




const BudgetGoods = () => {
    const [month, setMonth] = useState("")
    const navigate = useNavigate();


    const [currentUser, setCurrentUser] = useState({})



    useEffect(() => {
        const fetchItem = async () => {
            if (!localStorage.getItem("EM-app-user")) {
                navigate("/")


            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("EM-app-user")))
            }
        }

        fetchItem();
    }, [navigate])

    

    const [values, setValues] = useState({
        budget: 0,
        goodsName: "",
        price: 0,

    })

    

    const options = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' }
    ]

    
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onSubmitBudget= async (event)=>{
        event.preventDefault();
        

        await axios.post(userData,{
            month: month,
            budget: values.budget,
            userId: currentUser._id
        });
        

    }

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
      let temp = 0;
      for(let i = 0; i < values.length; i++){
          temp += parseInt(values[i].price)
      }
      setTotalPrice(temp);
    }, [values])

    


    const onSubimitGoods = async (event) => {
        event.preventDefault();

        // if(totalPrice > budget)

        await axios.post(userPurchase, {
            userId: currentUser._id,
            goodsName: values.goodsName,
            price: values.price
        })

    }


    

  return (
    <Container>
        <div style={{position: "relative", top: "60px"}}>
              <Form onSubmit={onSubmitBudget}>
                  <h3>Make Budget of the Month</h3>
                  <Form.Group className="mb-3">
                      <Form.Label>Month</Form.Label>
                      <Select
                          options={options}
                          isSearchable={true}
                          name='month'
                          placeholder="Choose Month"
                          onChange={ (choice) => setMonth(choice.value)}
                      />
                  </Form.Group>
                  <Form.Group className='amount'>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control 
                        type='number'
                        name = 'budget'
                        onChange={(e) => handleChange(e)}
                        />
                  </Form.Group>
                  <Button variant='success' type='submit' style={{ position: "relative", top: '10px' }}>Add Budget</Button>
                </Form>  
              <hr />
              <Form onSubmit ={onSubimitGoods}>
                  <h3>Make List Of Goods for the Month</h3>
                  <Form.Group>
                      <Form.Label>Goods Name</Form.Label>
                      <Form.Control
                          type='text'
                          name='goodsName'
                          placeholder='Goods Name'
                          onChange={(e) => handleChange(e)}
                      />
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                          type='number'
                          name='price'
                          placeholder='Price'
                          onChange={(e) => handleChange(e)}
                      />
                  </Form.Group>
                  <Button variant='success' type='submit' style={{ position: "relative", top: '20px' }}>Add Goods</Button>
              </Form>

        </div>
    </Container>
    
  )
}

export default BudgetGoods