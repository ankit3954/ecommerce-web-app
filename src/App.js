import './App.css';
import React from 'react';
import Home from './router/home/home';
import {Routes, Route} from "react-router-dom"
import Navigation from './router/navigation/navigation';
import Authentication from './router/authentication/authentication';
import Shop from './router/shop/shop';


const App = () => {

  return (
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/auth' element={<Authentication />} />
        </Route>
      </Routes>   
  );
};

export default App;

