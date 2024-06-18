import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import  {useState} from 'react'
import {Spinner} from '../components/index.js'

import {useNavigate} from "react-router-dom";
import {checkRegisterationbyphone,login} from '../services/service.js'
import {toast, ToastContainer} from "react-toastify";




const Login = () => {



    const [loading, setLoading] = useState(false)
    const [isregistered, setisregistered] = useState(false)


    const nav = useNavigate()


    const HandleLogin =async (v) => {


        if (isregistered===false) {
            const form = new FormData
            form.append('phone',v.phone)
            setLoading(true)
            const res = await checkRegisterationbyphone(form)
            if (res.data.code==1){

                setLoading(false)
                if (res.data.register){
                   localStorage.setItem('userphone', v.phone)
                    nav('/home')
                } else {
                    setisregistered(true)

                }

            } else {
                toast.warning(res.data.error)
            }



        } else {
            const form = new FormData
            form.append('phone',v.phone)
            form.append('password',v.code);
            setLoading(true)
            let resp = await login(form)


          if (resp.data.code===1){



              localStorage.setItem('userinfo',JSON.stringify(resp.data) )

              setLoading(false)





              toast.success('با موفقیت وارد شدید')
              nav('/home/results')
          } else {
              setLoading(false)
             toast.warning(resp.data.error)
          }

        }

    }


    return (
        <>

            <div

                 style={{width: "100wv", height: '100vh' , display:'flex', justifyContent:'center' , alignItems:'center' , backgroundImage:'url(/asset/images/wallpaper.png)' , backgroundSize:'cover' , backgroundRepeat:'no-repeat'}}>











                <div className="main-login " style={{
                    backgroundColor: 'rgba(9,9,9,0.6)',
                    backdropFilter: 'blur(0.1rem)'
                }}>
                    <input type="checkbox" id="chk" aria-hidden="true"/>

                    <div className="signup is-size-5 has-text-centered yekan-regular">

                        <img src='/asset/images/logo.png' width='42%' />



                    </div>

                    <div className="login">


                        <Formik initialValues={{phone: '', code: ''}} validationSchema={Yup.object().shape({

                            phone: Yup.string().matches(/^[0-9]+$/, 'فقط عدد').length(11, 'شماره درست وارد نشده است').required('ضروری'),


                        })} onSubmit={(values) => HandleLogin(values)}>
                            {({errors, touched}) => (
                                <Form className='has-text-centered'>


                                    <label htmlFor="chk" aria-hidden="true">ورود/ثبت نام</label>
                                    <img src='/asset/images/logo2.webp' />
                                    <Field disabled={isregistered} className='yekan' type="text" id="phone" name="phone"
                                           placeholder="شماره تلفن"/>
                                    <ErrorMessage style={{textAlign:'center' , color:'white'}} component='p' className='yekan-regular '
                                                  name='phone'/>

                                    {
                                        isregistered &&   <Field   className='yekan' type="password" id="code" name="code"
                                                                   placeholder="رمز عبور"


                                        />
                                    }

                                    <ErrorMessage component='span' className='has-text-danger yekan' name='pswd'/>
                                    <button disabled={loading} className='my-4' type='submit' >
                                        {
                                            loading ? <Spinner/> : isregistered ? 'ورود' :'ادامه'
                                        }



                                    </button>

                                    {
                                        isregistered && <button onClick={()=>{
                                            setisregistered(false);

                                        }}  style={{backgroundColor:'rgba(88,86,86,0.39)' , border:'1px solid white'}}>
                                        ویرایش/تغییر شماره
                                        </button>
                                    }




                                </Form>



                            )}


                        </Formik>

                    </div>

                </div>
            </div>

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

        </>
    )
}
export default Login;