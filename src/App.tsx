import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';

import Home from "./Components/Home";
import Customer from "./Components/Customer";
import Product from "./Components/Product";
import Order from "./Components/Order";
import Employee from "./components/Employee";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React from "react";

const Main = () => {
  return (
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/product' element={<Product />} />
          <Route path='/order' element={<Order />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
  );
};

const App = () => {
  return (
      <Router>
        <Main />
      </Router>
  );
};

export default App;
