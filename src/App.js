import React, {useState, useEffect} from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DashBoard from './pages/DashBoard';
import BudgetGoods from './components/BudgetGoods';
import Purchase from './components/Purchase';
import Report from './components/Report';




function App() {
  // const navigate = useNavigate();


  

  

 
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard/>} >
            <Route path ='/dashboard' element={<BudgetGoods/>}/>
            <Route path = '/dashboard/makepurchase' element={<Purchase/>}/>
            <Route path = '/dashboard/report' element= {<Report/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

      
      
  );
}

export default App;
