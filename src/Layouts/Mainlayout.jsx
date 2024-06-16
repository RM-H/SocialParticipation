import {Outlet} from 'react-router-dom'
import {Nav} from '../components/index.js'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Mainlayout = () => {
  return(
      <div className='main-cantainer' >

          <Nav/>


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