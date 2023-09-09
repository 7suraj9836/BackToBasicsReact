import React from 'react';
import './pages/assets/scss/dashboard.scss'
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes/index';
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
