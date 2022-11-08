import './App.css';
import React from 'react';
import Home from './router/home/home';
import {Routes, Route} from "react-router-dom"
import Navigation from './router/navigation/navigation';
import Authentication from './router/authentication/authentication';
import Shop from './router/shop/shop';
import CheckOut from './components/checkout/checkout';
import {useEffect} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase";
import { setCurrentUser } from './store/user/user-action';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        
        if(user){
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));

    });

    return unsubscribe;
}, []);


  return (
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home />} />
          <Route path='/shop/*' element={<Shop />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/checkout' element={<CheckOut />}/>
        </Route>
      </Routes>   
  );
};

export default App;

