import './App.css';
import React from 'react';
import Home from './router/home/home';
import {Routes, Route} from "react-router-dom"
import Navigation from './router/navigation/navigation';
import SignIn from './router/sign-in/signin';

const Shop = () => {
  return <div>
    I am shop.
  </div>
}
const App = () => {

  return (
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Route>
      </Routes>   
  );
};

export default App;

