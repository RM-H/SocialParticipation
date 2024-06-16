import React from 'react'
import ReactDOM from 'react-dom/client'

import Mainlayout from './Layouts/Mainlayout.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

import {Persnalinfo,Login,Results} from './pages/index.js'
const router = createBrowserRouter([
    {
        path: "/home",
        element: <Mainlayout/>,



        children:[

            {
                path:'/home' ,
                element: <Persnalinfo/>
            } ,
            {
                path:'/home/results' ,
                element:<Results/>

            }




        ]
    },
    {
        path:'/' ,
        element: <Login/>
    }
]);



import { createTheme , ThemeProvider } from '@mui/material/styles';
import {ToastContainer} from "react-toastify";

const theme = createTheme({
    direction: 'rtl',
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>



      <RouterProvider router={router}>
          <ThemeProvider theme={theme}>

              <Mainlayout/>



          </ThemeProvider>

      </RouterProvider>



  </React.StrictMode>,
)
