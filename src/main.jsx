import React from 'react'
import ReactDOM from 'react-dom/client'

import Mainlayout from './Layouts/Mainlayout.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from "./store/store.js";
import {Persnalinfo,Education,Professional,Department,Login} from './pages/index.js'
const router = createBrowserRouter([
    {
        path: "/ats",
        element: <Mainlayout/>,



        children:[
            {
                path:'/ats' ,
                element: <Department/>
            } ,
            {
                path:'/ats/personal' ,
                element: <Persnalinfo/>
            } ,
            {
                path:'/ats/education' ,
                element:<Education/>

            }
            ,
            {
                path:'/ats/professional' ,
                element:<Professional/>

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
      <Provider store={store}>


      <RouterProvider router={router}>
          <ThemeProvider theme={theme}>

              <Mainlayout/>



          </ThemeProvider>

      </RouterProvider>
      </Provider>


  </React.StrictMode>,
)
