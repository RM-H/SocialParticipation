import {Outlet} from 'react-router-dom'
import {Nav,Step} from '../components/index.js'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import React from "react";
const Mainlayout = () => {
  return(
      <div className='main-cantainer' >

          <Nav/>
          <Step/>

          <Outlet/>
          <ToastContainer position="top-center"
                          autoClose={3690}
                          hideProgressBar={false}
                          newestOnTop
                          closeOnClick
                          rtl={true}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="dark"

                          transition: Bounce/>



      </div>
  )
}
export default Mainlayout;